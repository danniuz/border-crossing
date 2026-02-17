let loaderEl = null;

export function initFullscreenLoader() {
  loaderEl = document.querySelector('.fullscreen-loader');

  if (!loaderEl) return;

  loaderEl.classList.remove('is-active');
  loaderEl.setAttribute('hidden', '');
}

export function showFullscreenLoader({ lockScroll = true } = {}) {
  if (!loaderEl) loaderEl = document.querySelector('.fullscreen-loader');
  if (!loaderEl) return;

  loaderEl.classList.add('is-active');
  loaderEl.removeAttribute('hidden');

  if (lockScroll) {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }
}

export function hideFullscreenLoader({ unlockScroll = true } = {}) {
  if (!loaderEl) loaderEl = document.querySelector('.fullscreen-loader');
  if (!loaderEl) return;

  loaderEl.classList.remove('is-active');
  loaderEl.setAttribute('hidden', '');

  if (unlockScroll) {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }
}
