export function initNavLanguageDropdown() {
  const navLanguageMenuLink = document.getElementById('nav-language-menu-link');
  const navLanguageDropdown = document.getElementById('nav-language-dropdown');

  if (!navLanguageMenuLink || !navLanguageDropdown) {
    return;
  }

  navLanguageMenuLink.addEventListener('click', function (e) {
    e.stopPropagation();

    const isOpened = navLanguageDropdown.classList.toggle(
      'nav-language-dropdown--opened'
    );

    navLanguageMenuLink.classList.toggle('active', isOpened);
  });

  document.addEventListener('click', function (e) {
    if (
      !navLanguageMenuLink.contains(e.target) &&
      !navLanguageDropdown.contains(e.target)
    ) {
      navLanguageDropdown.classList.remove('nav-language-dropdown--opened');
      navLanguageMenuLink.classList.remove('active');
    }
  });
}
