/**
 * @param {Object} params
 * @param {number} params.worksMinWidth
 * @param {number} params.scrollBoxHeight
 * @param {boolean} params.hitBoxHelper
 * @param {string} params.imageSelector
 */
export function initAutoScrollAccordion(
  accordionSelector,
  accordionItemClass,
  accordionOpenedClass,
  params = {},
) {
  const {
    worksMinWidth = 0,
    scrollBoxHeight = 200,
    hitBoxHelper = false,
    imageSelector = null,
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

  const imageElement = imageSelector
    ? document.querySelector(imageSelector)
    : null;

  if (imageElement) {
    const initialOpenedItem = Array.from(accordionItems).find((item) =>
      item.classList.contains(accordionOpenedClass),
    );
    if (initialOpenedItem) {
      const imgSrc = initialOpenedItem.getAttribute('data-img-src');

      if (imgSrc) {
        imageElement.src = imgSrc;
      }
    }
  }

  const boxOffset = scrollBoxHeight / 2;

  if (hitBoxHelper) {
    const helperBox = document.createElement('div');

    helperBox.style.cssText = `
      position: fixed;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: ${scrollBoxHeight}px;
      border: 2px solid red;
      background: rgba(255, 0, 0, 0.1);
      pointer-events: none;
      z-index: 9999;
      box-sizing: border-box;
    `;

    document.body.appendChild(helperBox);
  }

  function updateImageWithTransition(imgElement, newSrc) {
    imgElement.classList.remove('fade-in');
    imgElement.classList.add('fade-out');

    setTimeout(() => {
      imgElement.src = newSrc;
      imgElement.onload = () => {
        imgElement.classList.remove('fade-out');
        imgElement.classList.add('fade-in');
        setTimeout(() => {
          imgElement.classList.remove('fade-in');
        }, 200);
      };
      if (imgElement.complete) {
        imgElement.onload();
      }
    }, 200);
  }

  Array.from(accordionItems).forEach((item, _) => {
    let isInHitbox = false;

    ScrollTrigger.create({
      trigger: item,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: () => {
        const rect = item.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const boxTop = viewportCenter - boxOffset;
        const boxBottom = viewportCenter + boxOffset;

        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const overlaps = elementTop < boxBottom && elementBottom > boxTop;

        if (overlaps && !isInHitbox) {
          isInHitbox = true;

          Array.from(accordionItems).forEach((otherItem) => {
            if (otherItem !== item) {
              otherItem.classList.remove(accordionOpenedClass);
            }
          });

          item.classList.add(accordionOpenedClass);

          if (imageElement) {
            const imgSrc = item.getAttribute('data-img-src');

            if (imgSrc && imageElement.src !== imgSrc) {
              updateImageWithTransition(imageElement, imgSrc);
            }
          }
        } else if (!overlaps && isInHitbox) {
          isInHitbox = false;
        }
      },
    });
  });
}
