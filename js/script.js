$('.tel').mask('+7 (999) 999-99-99');

/*  */
$(function () {
	$(".privacy input").checkboxradio();
	$(".select select").selectmenu();
});

Fancybox.bind('.slick-slide:not(.slick-cloned) [data-fancybox]', {

});

/* скролл к якорям */
document.addEventListener('click', function (e) {
	const link = e.target.closest('a[href^="#"]');
	if (!link) return;

	const href = link.getAttribute('href');

	if (href.length < 2) return;

	const target = document.querySelector(href);
	if (!target) return;

	e.preventDefault();

	const header = document.querySelector('.navbar');
	const headerOffset = header ? header.offsetHeight : 0;
	const elementPosition = target.getBoundingClientRect().top;
	const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

	window.scrollTo({
		top: offsetPosition,
		behavior: 'smooth'
	});
});


/* offcanvas */
document.querySelectorAll('#offcanvasNavbar .offcanvas-body *').forEach(link => {
	link.addEventListener('click', () => {
		const offcanvasEl = document.getElementById('offcanvasNavbar');
		const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
		if (bsOffcanvas) {
			bsOffcanvas.hide();
		}
	});
});


$('.services__slider').slick({
	infinite: true,
	slidesToShow: 4,
	speed: 600,
	variableWidth: true,
	prevArrow: '.services__prev',
	nextArrow: '.services__next',
	responsive: [
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
			}
		}
	]
});


document.addEventListener('DOMContentLoaded', function () {
	const buttons = document.querySelectorAll('.choice-filter__btn');
	const wrappers = document.querySelectorAll('.choice__wrapper');
	const initializedSliders = new Set();

	function initSlider(wrapper) {
		const slider = wrapper.querySelector('.choice__slider-wrapper');
		const prevArrow = wrapper.querySelector('.choice__prev');
		const nextArrow = wrapper.querySelector('.choice__next');

		if (slider && !initializedSliders.has(slider)) {
			$(slider).slick({
				infinite: true,
				speed: 600,
				slidesToShow: 4,
				prevArrow: prevArrow,
				nextArrow: nextArrow,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 3,
						}
					},
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 2,
						}
					}
				]
			});

			initializedSliders.add(slider);
		} else {
			setTimeout(() => {
				$(slider).slick('setPosition');
			}, 0);
		}
	}

	const initialActive = document.querySelector('.choice__wrapper.active');
	if (initialActive) {
		initSlider(initialActive);
	}

	buttons.forEach(btn => {
		btn.addEventListener('click', () => {
			const targetId = btn.dataset.target;
			const targetWrapper = document.getElementById(targetId);

			if (!targetWrapper) return;

			buttons.forEach(b => b.classList.remove('active'));
			btn.classList.add('active');

			wrappers.forEach(w => w.classList.remove('active'));
			targetWrapper.classList.add('active');

			initSlider(targetWrapper);

			if (window.innerWidth < 992) {
				const header = document.querySelector('.navbar');
				const headerOffset = header ? header.offsetHeight : 0;

				const scrollTarget = document.querySelector('.choice__info');
				const elementPosition = scrollTarget.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			}
		});
	});
});



/*  */
$('.gallery__slider').slick({
	infinite: true,
	slidesToShow: 7,
	speed: 600,
	variableWidth: true,
	prevArrow: '.gallery__prev',
	nextArrow: '.gallery__next',
	responsive: [
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 3,
			}
		},
		{
			breakpoint: 576,
			settings: {
				slidesToShow: 2,
			}
		}
	]
});

let isGalleryTwoInitialized = false;

$('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
	const targetId = $(e.target).attr('data-bs-target');

	if (targetId === '#gallery-video' && !isGalleryTwoInitialized) {
		const $slider = $('#gallery-video').find('.gallery__slider-two');

		$slider.slick({
			infinite: true,
			slidesToShow: 7,
			speed: 600,
			variableWidth: true,
			prevArrow: '.gallery__prev-two',
			nextArrow: '.gallery__next-two',
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 2,
					}
				}
			]
		});

		isGalleryTwoInitialized = true;
	}
});


Fancybox.bind("[data-fancybox='gallery-two']", {
	on: {
		"Carousel.change": (fancybox, carousel, to, from) => {
			if (from !== null) {
				let prevSlide = fancybox.Carousel.slides[from];
				if (prevSlide.$iframe) {
					prevSlide.$iframe.setAttribute("src", prevSlide.$iframe.getAttribute("src"));
				}
			}
		},
		"close": (fancybox) => {
			fancybox.items.forEach(item => {
				if (item.$iframe) {
					item.$iframe.setAttribute("src", item.$iframe.getAttribute("src"));
				}
			});
		}
	}
});


/* reviews */
function getRemInPx() {
	const html = document.documentElement;
	return parseFloat(getComputedStyle(html).fontSize); // 1rem в px
}

function updateReviewVisibility(context = document) {
	const wraps = context.querySelectorAll('.reviews__wrap');

	const rem = getRemInPx();
	const maxHeight = window.innerWidth < 576 ? 6.4375 * rem : 8.125 * rem;

	wraps.forEach(wrap => {
		const textBlock = wrap.querySelector('.reviews__text');
		const toggleButton = wrap.querySelector('.reviews__show');

		if (!textBlock || !toggleButton) return;

		toggleButton.style.display = 'flex';

		if (textBlock.offsetHeight < maxHeight) {
			toggleButton.style.display = 'none';
		} else {
			if (!toggleButton.dataset.bound) {
				toggleButton.addEventListener('click', () => {
					wrap.classList.toggle('active');
					const span = toggleButton.querySelector('span');
					span.textContent = wrap.classList.contains('active') ? 'Свернуть' : 'Развернуть полностью';
				});
				toggleButton.dataset.bound = 'true';
			}
		}
	});
}

document.addEventListener('DOMContentLoaded', () => {
	const activeTab = document.querySelector('.tab-pane.active.show');

	if (activeTab) {
		updateReviewVisibility(activeTab);
	}

	if (window.innerWidth < 992) {
		document.querySelectorAll('.reviews__slider-wrapper').forEach(wrapper => {
			const slider = wrapper.querySelector('.reviews__slider');
			const prevArrow = wrapper.querySelector('.reviews__prev');
			const nextArrow = wrapper.querySelector('.reviews__next');

			if (slider && prevArrow && nextArrow) {
				$(slider).slick({
					infinite: true,
					slidesToShow: 2,
					speed: 600,
					variableWidth: true,
					prevArrow: prevArrow,
					nextArrow: nextArrow,
				});

				$(slider).on('setPosition afterChange', function () {
					updateReviewVisibility(wrapper);
				});
			}
		});
	} else {
		updateReviewVisibility();
	}
});


document.querySelectorAll('button[data-bs-toggle="tab"]').forEach(tabBtn => {
	tabBtn.addEventListener('shown.bs.tab', (event) => {
		const targetSelector = event.target.getAttribute('data-bs-target') || event.target.getAttribute('href');
		if (targetSelector) {
			const tabContent = document.querySelector(targetSelector);
			if (tabContent) {
				updateReviewVisibility(tabContent);

				const slickSlider = tabContent.querySelector('.reviews__slider.slick-initialized');
				if (slickSlider) {
					$(slickSlider).slick('setPosition');
				}
			}
		}
	});
});

/* reviews (fancybox) */
document.querySelectorAll('.reviews__slide').forEach((slide, index) => {
	const galleryLinks = slide.querySelectorAll('[data-fancybox="reviews-gallery"]');

	// Присваиваем уникальный атрибут для группы
	galleryLinks.forEach(link => {
		link.setAttribute('data-fancybox', `reviews-gallery-${index}`);
	});
});


/* video-modal */
document.querySelectorAll('.modal-video').forEach(modal => {
	modal.addEventListener('hidden.bs.modal', () => {
		const iframes = modal.querySelectorAll('iframe');
		iframes.forEach(iframe => {
			const src = iframe.getAttribute('src');
			iframe.setAttribute('src', src);
		});
	});
});



/* accordion (mobile) */
document.addEventListener('DOMContentLoaded', function () {
	const allItems = document.querySelectorAll('.accordion-item');
	const visibleCount = 4;

	allItems.forEach((item, index) => {
		if (index >= visibleCount) {
			item.classList.add('hidden-faq');
		}
	});

	document.querySelector('.faq__btn').addEventListener('click', function () {
		allItems.forEach(item => item.classList.remove('hidden-faq'));
		this.style.display = 'none';
	});
});

