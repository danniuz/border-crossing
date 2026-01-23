/**
 * @param {Object} params
 * @param {boolean} params.opened
 */
export function initAsideTogglerAccordion(btnSelector, accordionSelector) {
  const btn = document.querySelector(btnSelector);
  const accordion = document.querySelector(accordionSelector);

  if (!btn || !accordion) return;

  const img = btn.querySelector('img');

  //onclick, not event listener!!
  btn.onclick = () => {
    accordion.classList.toggle('active');

    if (img) {
      img.classList.toggle('rotate-x');
    }
  };
}
