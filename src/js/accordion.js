/**
 * @param {Object} params
 * @param {string[]} params.avoidEventBubbleClasses
 * @param {number} params.worksMinWidth
 */
export function initAccordion(
  accordionSelector,
  accordionItemClass,
  accordionOpenedClass,
  params = {},
) {
  const { avoidEventBubbleClasses = [], worksMinWidth = 0 } = params;

  if (worksMinWidth && window.innerWidth <= worksMinWidth) {
    return;
  }

  const accordionTemplate = document.querySelector(accordionSelector);

  console.log(accordionSelector);

  if (!accordionTemplate) {
    return;
  }

  const accordionItems =
    accordionTemplate.getElementsByClassName(accordionItemClass);

  console.log(accordionItems);

  Array.from(accordionItems).forEach((item) => {
    item.addEventListener('click', (event) => {
      const target = event.target;

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
