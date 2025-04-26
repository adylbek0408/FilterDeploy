export function initWR() {
  const swiperEl = document.querySelector(".wr-banner");
  const wrapper = swiperEl?.querySelector(".wr.swiper-wrapper");

  if (!swiperEl || !wrapper) {
    console.error("Swiper container or wrapper not found.");
    return;
  }

  new Swiper(swiperEl, {
    pagination: {
      el: ".wr.swiper-pagination",
      clickable: true,
    },
    freeMode: true,
    slidesPerView: 'auto',
    spaceBetween: 20,
  });
}
