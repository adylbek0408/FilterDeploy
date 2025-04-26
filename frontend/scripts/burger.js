export function initBurger() {
  const burger = document.getElementById("burger");
  const list = document.getElementById("ul-links");
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    list.classList.toggle("active");
  });
}
