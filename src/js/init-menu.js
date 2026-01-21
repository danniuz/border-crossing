export function initMenu() {
	const nav = document.querySelector(".menu__nav-wrapper");
	const burger = document.querySelector(".menu__burger");
	const closeBtn = document.querySelector(".menu__nav-link--close");

	if (!nav || !burger) return;

	const burgerLink = burger.closest("a");
	burgerLink?.addEventListener("click", (e) => {
		e.preventDefault();
		nav.classList.toggle("is-open");
	});

	closeBtn?.addEventListener("click", (e) => {
		e.preventDefault();
		nav.classList.remove("is-open");
	});
}
