const _UlLinks = [
	{ label: 'О Нас', href: '#' },
	{ label: 'Роль воды', href: '#wr' },
	{ label: 'Преимущества', href: '#' },
	{ label: 'Каталог', href: '#' },
	{ label: 'Контакты', href: '#' },
	{ label: 'Вакансии', href: '#' }
];

export function initNavLinks() {
	const UlLinks = document.querySelectorAll('.ul-links');

	UlLinks.forEach(ul => {
		_UlLinks.forEach(link => {
			let label = '';
			let href = '#';

			if (typeof link === 'string') {
				label = link;
			} else if (typeof link === 'object' && link.label) {
				label = link.label;
				href = link.href || '#';
			}

			const li = document.createElement('li');
			const a = document.createElement('a');
			a.href = href;
			a.textContent = label;
			li.appendChild(a);
			ul.appendChild(li);
		});
	});
}
