export function initHero() {
	const swiperEl = document.querySelector('.banner');
	const wrapper = swiperEl?.querySelector('.hero.swiper-wrapper');

	if (!swiperEl || !wrapper) {
		console.error('Swiper container or wrapper not found.');
		return;
	}

	Array.from({ length: 7 }).forEach((_, index) => {
		const el = document.createElement('div');
		el.classList.add('swiper-slide', 'b-item');

		el.innerHTML = `
			<div class='b-content'>
				<h1 data-swiper-parallax="-300">Чистая вода в каждом доме!</h1>
				<p data-swiper-parallax="-200">Более 1000 человек приобрели фильтры у нас и сохранили здоровье своих семей</p>
				<p data-swiper-parallax="-100">Купите фильтр для воды сейчас и наслаждайтесь чистотой в каждом глотке!</p>
				<a href="https://wa.me/+996706004004" target="_blank" class="btn btn-solid btn-white" data-swiper-parallax="-50">Связаться с нами</a>
			</div>
			<figure>
				<img src="./assets/images/hero/image${index + 1}.png" alt="Hero Image - I-${
			index + 1
		}" />
			</figure>
			`;

		wrapper.append(el);
	});

	new Swiper(swiperEl, {
		slidesPerView: 1,
		spaceBetween: 250,
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false
		},
		parallax: true,
		pagination: {
			el: swiperEl.querySelector('.hero.swiper-pagination'),
			clickable: true
		}
	});
}
