export function initMenu() {
	const nav = document.querySelector(".menu__nav-wrapper");
	const burger = document.querySelector(".menu__burger");
	const closeBtn = document.querySelector(".menu__nav-link--close");

	if (!nav || !burger) return;

	const OPEN_CLASS = "is-open";

	const openNav = () => {
		nav.removeAttribute("hidden");

		requestAnimationFrame(() => {
			nav.classList.add(OPEN_CLASS);
		});
	};

	const closeNav = () => {
		nav.classList.remove(OPEN_CLASS);

		const onEnd = (e) => {
			if (e.target !== nav) return;
			nav.removeEventListener("transitionend", onEnd);
		};

		nav.addEventListener("transitionend", onEnd);
	};

	const toggleNav = () => {
		const isOpen = nav.classList.contains(OPEN_CLASS);
		if (isOpen) closeNav();
		else openNav();
	};

	const burgerLink = burger.closest("a");
	burgerLink && burgerLink.addEventListener("click", (e) => {
		e.preventDefault();
		toggleNav();
	});

	closeBtn && closeBtn.addEventListener("click", (e) => {
		e.preventDefault();
		closeNav();
	});
}
