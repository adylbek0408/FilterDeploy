const _UlLinks = [
  { label: "О Нас", href: "#about_us" },
  { label: "Роль воды", href: "#wr" },
  { label: "Преимущества", href: "#pcl" },
  { label: "Каталог", href: "#our-products" },
  { label: "Контакты", href: "#footer" },
  {
    label: "Вакансии",
    href: "https://api.whatsapp.com/send?phone=996706004004&text=Спасибо,%20что%20обратились%20в%20компанию%20Filter.kg.%20В%20скором%20времени%20с%20вами%20свяжутся",
  },
];

export function initNavLinks() {
  const UlLinks = document.querySelectorAll(".ul-links");

  UlLinks.forEach((ul) => {
    _UlLinks.forEach((link) => {
      let label = "";
      let href = "#";

      if (typeof link === "string") {
        label = link;
      } else if (typeof link === "object" && link.label) {
        label = link.label;
        href = link.href || "#";
      }

      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = href;
      a.textContent = label;
      if (href.startsWith("http")) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      li.appendChild(a);
      ul.appendChild(li);
    });
  });
}
