export function initAutoScrollTop(
  selectors = '#manager-speech-statement-list'
) {
  const list = Array.isArray(selectors) ? selectors : [selectors];

  const run = () => {
    const hasAny = list.some((s) => document.querySelector(s));
    if (!hasAny) return;

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const el = document.scrollingElement || document.documentElement;
    el.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
}
