/**
 * Initializes the language selector dropdown
 * @param {string} buttonSelector - Selector for the language selector button
 * @param {string} dropdownSelector - Selector for the dropdown menu
 */
export function initLanguageSelector(buttonSelector, dropdownSelector) {
  const button = document.querySelector(buttonSelector);
  const dropdown = document.querySelector(dropdownSelector);

  if (!button || !dropdown) {
    return;
  }

  // Toggle dropdown on button click
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('language-dropdown--opened');
    button.classList.toggle('footer__language-selector-button--opened');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!button.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('language-dropdown--opened');
      button.classList.remove('footer__language-selector-button--opened');
    }
  });

  const buttonText = button.querySelector('span');

  dropdown.addEventListener('click', (e) => {
    const item = e.target.closest('.language-dropdown__item');
    if (!item) return;

    e.preventDefault();
    const selectedLanguage = item.textContent.trim();

    if (buttonText) {
      buttonText.textContent = selectedLanguage;
    }

    const activeItem = dropdown.querySelector('.language-dropdown__item--active');
    if (activeItem) {
      activeItem.classList.remove('language-dropdown__item--active');
    }
    item.classList.add('language-dropdown__item--active');

    dropdown.classList.remove('language-dropdown--opened');
    button.classList.remove('language-selector-button--opened');
  });
}
