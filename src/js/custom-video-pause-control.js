export function initCustomVideoPauseControl(videoSelector, stopButtonSelector) {
  const video = document.querySelector(videoSelector);
  const toggleBtn = document.querySelector(stopButtonSelector); // your only button

  if (!video || !toggleBtn) return;

  function togglePlay() {
    if (video.paused || video.ended) {
      console.log('play');
      video.play();
    } else {
      console.log('pause');
      video.pause();
    }
  }

  function updateButtonState() {
    if (video.paused || video.ended) {
      toggleBtn.setAttribute('aria-label', 'Play');
      // keep same icon, or change class/text if you ever want
      // toggleBtn.textContent = 'Play';
    } else {
      toggleBtn.setAttribute('aria-label', 'Pause');
      // toggleBtn.textContent = 'Pause';
    }
  }

  function stopVideo() {
    video.pause();
    video.currentTime = 0;
    updateButtonState();
  }

  // one button for both play/pause
  toggleBtn.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay);

  video.addEventListener('play', updateButtonState);
  video.addEventListener('pause', updateButtonState);
  video.addEventListener('ended', updateButtonState);

  updateButtonState();
}
