export function initFooterHighlightWordAnimation(selector, options = {}) {
  const step = 18;

  const {
    duration = 0.6,
    ease = 'power2.inOut',
    delay = 2.5,
  } = options;

  const parent = document.querySelector(selector);
  
  if (!parent) {
    return;
  }

  const words = parent.querySelectorAll('.footer__title-highlight-word');

  if (words.length === 0) {
    return;
  }

  // Set initial positions - all hidden below except first
  gsap.set(words, {
    opacity: 0,
    y: step,
    position: 'absolute',
  });

  // Show first word initially
  gsap.set(words[0], {
    opacity: 1,
    y: 0,
  });

  let currentIndex = 0;

  // Create animation function
  function animateWords() {
    const currentWord = words[currentIndex];
    const nextIndex = (currentIndex + 1) % words.length;
    const nextWord = words[nextIndex];

    const tl = gsap.timeline();

    // Reset next word to bottom position FIRST (instant, at the start)
    tl.set(nextWord, {
      y: step,
      opacity: 0,
    }, 0);

    // Animate current word up and out (from center to top)
    tl.to(currentWord, {
      opacity: 0,
      y: -step,
      duration,
      ease,
    }, 0);

    // Animate next word in from bottom to center (starts slightly before current word finishes)
    tl.to(
      nextWord,
      {
        opacity: 1,
        y: 0,
        duration,
        ease,
      },
      duration * 0.4,
    );

    currentIndex = nextIndex;
  }

  // Start the cycling animation immediately
  const interval = setInterval(animateWords, delay * 1000);
  
  // Store interval on element for cleanup if needed
  parent._animationInterval = interval;
}
