export function initNavSearchMenu() {
	const link = document.getElementById('nav-search-menu-link');
	const menu = document.getElementById('nav-search-menu');
	const closeBtn = menu ? menu.querySelector('.search-menu__close') : null;

	if (!link || !menu) return;

	const OPEN_CLASS = 'search-menu--opened';

	const open = () => {
		menu.removeAttribute('hidden');

		requestAnimationFrame(() => {
			menu.classList.add(OPEN_CLASS);
			const input = menu.querySelector('.search-menu__input');
			if (input) input.focus();
		});
	};

	const close = () => {
		menu.classList.remove(OPEN_CLASS);

		const onEnd = (e) => {
			if (e.target !== menu) return;
			menu.setAttribute('hidden', '');
			menu.removeEventListener('transitionend', onEnd);
		};

		menu.addEventListener('transitionend', onEnd);
	};

	const toggle = () => {
		const isOpen = !menu.hasAttribute('hidden') && menu.classList.contains(OPEN_CLASS);
		if (isOpen) close();
		else open();
	};

	link.addEventListener('click', (e) => {
		e.preventDefault();
		e.stopPropagation();
		toggle();
	});

	if (closeBtn) {
		closeBtn.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			close();
		});
	}

	document.addEventListener('click', (e) => {
		const target = e.target;
		if (!link.contains(target) && !menu.contains(target)) {
			if (!menu.hasAttribute('hidden')) close();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && !menu.hasAttribute('hidden')) close();
	});
}
