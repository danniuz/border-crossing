export function initInfographListAnimation() {
  if (typeof window === 'undefined' || !window.gsap || !window.ScrollTrigger) {
    console.warn('GSAP or ScrollTrigger not available');
    return;
  }

  const { gsap } = window;

  const element = document.getElementById('infograph-list');
  if (!element) return;

  const items = element.querySelectorAll('.infograph-list__item');
  if (items.length === 0) return;

  const numberElements = element.querySelectorAll('[data-type="number"]');
  const numberTargets = [];

  numberElements.forEach((el) => {
    const targetValue = parseInt(el.textContent.trim(), 10);
    if (!Number.isNaN(targetValue)) {
      numberTargets.push({ element: el, target: targetValue });
      // Set initial value to 0
      el.textContent = '0';
    }
  });

  gsap.set(items, {
    opacity: 0,
    y: 50,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: 'top 75%',
      end: 'bottom 20%',
      toggleActions: 'play none none none',
    },
  });

  tl.to(items, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
  });

  numberTargets.forEach(({ element: el, target }, index) => {
    const counter = { value: 0 };
    tl.to(
      counter,
      {
        value: target,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = Math.round(counter.value);
        },
      },
      index * 0.15 + 0.2
    );
  });
}
