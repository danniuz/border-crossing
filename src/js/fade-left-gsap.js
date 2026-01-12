export function initFadeLeft(selector, options = {}) {
  const {
    x = -50,
    duration = 0.8,
    ease = 'ease-in-out',
    stagger = 0,
    start = 'top 60%',
    delay = 0,
  } = options;

  const elements = document.querySelectorAll(selector);

  if (elements.length === 0) {
    return;
  }

  gsap.set(elements, {
    opacity: 0,
    x,
  });

  if (stagger > 0) {
    gsap.to(elements, {
      opacity: 1,
      x: 0,
      duration,
      ease,
      stagger,
      delay,
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
        x: 0,
        duration,
        ease,
        delay,
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: 'play none none none',
        },
      });
    });
  }
}
