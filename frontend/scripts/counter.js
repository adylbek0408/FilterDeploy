export function animateCounter(elementId, start, end, duration) {
  const obj = document.getElementById(elementId);
  const range = end - start;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const current = Math.floor(progress * range + start);
    obj.textContent = current.toLocaleString("ru-RU");
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

const counter = document.getElementById("counter");
let hasAnimated = false;

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        animateCounter("counter", 0, 40000, 2500);
        hasAnimated = true;
        observer.unobserve(counter);
      }
    });
  },
  {
    threshold: 1,
  }
);

observer.observe(counter);
