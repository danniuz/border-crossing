export function initNavLanguageDropdown() {
  const navLanguageMenuLink = document.getElementById('nav-language-menu-link');

  const navLanguageDropdown = document.getElementById('nav-language-dropdown');

  if (!navLanguageMenuLink || !navLanguageDropdown) {
    return;
  }


  navLanguageMenuLink.addEventListener('click', (e) => {
    e.stopPropagation();
    navLanguageDropdown.classList.toggle('nav-language-dropdown--opened');
  });

  document.addEventListener('click', (e) => {
    if (!navLanguageMenuLink.contains(e.target) && !navLanguageDropdown.contains(e.target)) {
      navLanguageDropdown.classList.remove('nav-language-dropdown--opened');
    }
  });
}