import { trustedComments } from "./const/comments.js";

export function initTrustUsComments() {
  const swiperEl = document.querySelector(".trusted-comments");
  const wrapper = swiperEl?.querySelector(".trust-us.swiper-wrapper");

  if (!swiperEl || !wrapper) {
    console.error("Swiper container or wrapper not found.");
    return;
  }

  trustedComments.forEach((comment, i) => {
    const el = document.createElement("div");
    el.classList.add("swiper-slide", "cm-item");

    const stars = Array.from(
      { length: 5 },
      () => `<span class="icon icon-star"></span>`
    ).join("");

    el.innerHTML = `
            <div class="cm-top">
                <figure>
                    <img src="/assets/images/user/user${i + 1}.png" alt="User ${
      i + 1
    }" />
                </figure>
                <div class="col">
                    <span>${comment.username}</span>
                    <div class="stars">${stars}</div>
                </div>
            </div>
            <p>${comment.content}</p>
        `;

    wrapper.append(el);
  });

  new Swiper(swiperEl, {
    freeMode: true,
    slidesPerView: 'auto',
    spaceBetween: 15,
    loop: false,
    pagination: {
      el: swiperEl.querySelector(".trust-us.swiper-pagination"),
      clickable: true,
    },
  });
}
