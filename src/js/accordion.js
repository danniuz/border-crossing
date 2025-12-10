/**
 * @param {Object} params
 * @param {string[]} params.avoidEventBubbleClasses
 * @param {number} params.worksMinWidth
 * @param {boolean} params.singleOpened
 * @param {boolean} param.firstOpened
 */
export function initAccordion(
  accordionSelector,
  accordionItemClass,
  accordionOpenedClass,
  params = {},
) {
  const {
    avoidEventBubbleClasses = [],
    worksMinWidth = 0,
    singleOpened = false,
    firstOpened = false,
  } = params;

  if (worksMinWidth && window.innerWidth <= worksMinWidth) {
    return;
  }

  const accordionTemplate = document.querySelector(accordionSelector);

  if (!accordionTemplate) {
    return;
  }

  const accordionItems =
    accordionTemplate.getElementsByClassName(accordionItemClass);

  Array.from(accordionItems).forEach((item, index) => {
    if (firstOpened && index === 0) {
      item.classList.add(accordionOpenedClass);
    }

    item.addEventListener('click', (event) => {
      const target = event.target;

      if (singleOpened) {
        Array.from(accordionItems).forEach((item) => {
          item.classList.remove(accordionOpenedClass);
        });
      }

      const isAvoidEventBubble = avoidEventBubbleClasses.some((className) =>
        target.closest(`.${className}`),
      );

      if (isAvoidEventBubble) {
        event.preventDefault();
        event.stopPropagation();

        return;
      }

      event.stopPropagation();
      item.classList.toggle(accordionOpenedClass);
    });
  });
}
