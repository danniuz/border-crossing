/**
 * @param {Object} params
 * @param {string[]} params.avoidEventBubbleClasses
 */
export function initAccordion(
  accordionSelector,
  accordionItemClass,
  accordionOpenedClass,
  params = {},
) {
  const { avoidEventBubbleClasses = [] } = params;

  const accordionTemplate = document.querySelector(accordionSelector);

  if (!accordionTemplate) {
    return;
  }

  const accordionItems =
    accordionTemplate.getElementsByClassName(accordionItemClass);

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
