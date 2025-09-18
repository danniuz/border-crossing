// Form interactions for enhanced placeholder animations
document.addEventListener('DOMContentLoaded', () => {
  const formControls = document.querySelectorAll('.form-control');

  formControls.forEach((control) => {
    const input = control.querySelector('.form-control__input');

    if (input) {
      checkInputValue(control, input);

      input.addEventListener('input', () => checkInputValue(control, input));
      input.addEventListener('blur', () => checkInputValue(control, input));
    }
  });

  function checkInputValue(control, input) {
    if (input.value.trim() !== '') {
      control.classList.add('has-value');
    } else {
      control.classList.remove('has-value');
    }
  }
});
