const GetIcon = async name => {
	let svg = ``;
	await fetch(`/assets/icons/${name}.svg`)
		.then(r => r.text())
		.then(r => {
			svg = r;
		});
	return svg;
};

export function initIcons() {
	const Icons = document.querySelectorAll('.icon');

	Icons.forEach(iconElement => {
		const iconName = iconElement.classList
			.toString()
			.match(/icon-([a-zA-Z0-9-_]+)/);

		if (iconName) {
			const name = iconName[1];
			GetIcon(name).then(svg => {
				iconElement.innerHTML = svg;
			});
		}
	});
}
