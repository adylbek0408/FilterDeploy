export function scrollToTop() {
	const hero = document.querySelector('#hero');
	if (!hero) return;

	const button = document.createElement('button');
	button.classList.add('scroll-to-top');
	button.innerHTML = `
	<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path fill="currentColor" d="M8.2 751.4c0 8.6 3.4 17.401 10 24.001c13.2 13.2 34.8 13.2 48 0l451.8-451.8l445.2 445.2c13.2 13.2 34.8 13.2 48 0s13.2-34.8 0-48L542 251.401c-13.2-13.2-34.8-13.2-48 0l-475.8 475.8c-6.8 6.8-10 15.4-10 24.2z"/></svg>
	`;
	button.setAttribute('aria-label', 'Scroll to top');

	document.body.appendChild(button);

	window.addEventListener('scroll', () => {
		const heroBottom = hero.getBoundingClientRect().bottom;
		if (heroBottom < 0) {
			button.style.display = 'block';
		} else {
			button.style.display = 'none';
		}
	});

	button.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
}
