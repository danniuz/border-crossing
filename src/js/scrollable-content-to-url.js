export function initScrollableContentToUrl() {
  document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('[data-scrollable-content]');

    if (!sections.length) return;

    const hash = window.location.hash.slice(1);

    if (hash) {
      const targetSection = document.querySelector(
        `[data-scrollable-content="${hash}"]`
      );

      if (targetSection) {
        setTimeout(() => {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

          const activeLink = document.querySelector(`[href="#${hash}"]`);

          if (activeLink) {
            activeLink.classList.add('smooth-aside-link__item--active');
          }
        }, 100);
      }
    } else {
      const activeLink = document.querySelector('.smooth-aside-link__item');

      if (activeLink) {
        activeLink.classList.add('smooth-aside-link__item--active');
      }
    }

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute(
            'data-scrollable-content'
          );

          if (window.location.hash !== `#${sectionId}`) {
            history.replaceState(null, '', `#${sectionId}`);
            const previousActiveLink = document.querySelector(
              '.smooth-aside-link__item--active'
            );

            if (previousActiveLink) {
              previousActiveLink.classList.remove(
                'smooth-aside-link__item--active'
              );
            }

            const activeLink = document.querySelector(`[href="#${sectionId}"]`);

            if (activeLink) {
              activeLink.classList.add('smooth-aside-link__item--active');
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          const targetId = href.slice(1);
          const targetSection = document.querySelector(
            `[data-scrollable-content="${targetId}"]`
          );

          if (targetSection) {
            e.preventDefault();
            targetSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
            history.pushState(null, '', href);
          }
        }
      });
    });
  });
}
