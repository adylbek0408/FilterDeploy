import { initBurger } from "./burger.js";
import { initTrustUsComments } from "./comments.js";
import { initHero } from "./const/hero.js";
import { initWR } from "./const/wr.js";
import { initConsultationForms } from "./consultation-form.js";
import { animateCounter } from "./counter.js";
import { initIcons } from "./icons.js";
import { scrollToTop } from "./scroll-to-top.js";
import { initNavLinks } from "./ui-links.js";

function init() {
  AOS.init();
  initBurger();
  initHero();
  initWR();
  initNavLinks();
  initConsultationForms();
  initTrustUsComments();
  scrollToTop();
  initIcons();
}

document.addEventListener("DOMContentLoaded", init);
