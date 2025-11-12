export function initFadeUp(selector, options = {}) {
  const {
    y = 50,
    duration = 0.8,
    ease = 'ease-out',
    stagger = 0,
    start = 'top 60%',
  } = options;

  const elements = document.querySelectorAll(selector);

  if (elements.length === 0) {
    return;
  }

  // Set initial state
  gsap.set(elements, {
    opacity: 0,
    y,
  });

  if (stagger > 0) {
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration,
      ease,
      stagger,
      scrollTrigger: {
        trigger: elements[0],
        start,
        toggleActions: 'play none none none',
      },
    });
  } else {
    elements.forEach((element) => {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration,
        ease,
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: 'play none none none',
        },
      });
    });
  }
}
