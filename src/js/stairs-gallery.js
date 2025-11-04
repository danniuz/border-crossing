export function initStairsGallery() {
  document.addEventListener('DOMContentLoaded', () => {
    const stairsGallery1 = document.getElementById('stairs-gallery-1');
    const stairsGallery2 = document.getElementById('stairs-gallery-2');
    const stairsGallery3 = document.getElementById('stairs-gallery-3');

    if (!stairsGallery1 || !stairsGallery2 || !stairsGallery3) {
      return;
    }

    gsap.from(stairsGallery1, {
      y: -100,
      duration: 1,
      ease: 'ease-in-out',
      opacity: 0,
      delay: 0.5,
    });

    gsap.from(stairsGallery2, {
      y: 300,
      duration: 1,
      ease: 'ease-in-out',
      opacity: 0,
      delay: 0.8,
    });

    gsap.from(stairsGallery3, {
      y: 300,
      duration: 1,
      ease: 'ease-in-out',
      opacity: 0,
      delay: 0.4,
    });
  });
}
