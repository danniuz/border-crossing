export function initDropdowns() {
  const dropdowns = document.querySelectorAll('[data-dropdown]');

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector('[data-dropdown-trigger]');
    const menu = dropdown.querySelector('[data-dropdown-menu]');
    const valueElement = dropdown.querySelector('[data-dropdown-value]');
    const items = dropdown.querySelectorAll('[data-dropdown-item]');

    if (!trigger || !menu) return;

    // Toggle dropdown
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('dropdown-outline--open');

      // Close all other dropdowns
      document.querySelectorAll('[data-dropdown]').forEach((dd) => {
        dd.classList.remove('dropdown-outline--open');
      });

      // Toggle current dropdown
      if (!isOpen) {
        dropdown.classList.add('dropdown-outline--open');
      }
    });

    // Handle item selection
    items.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = item.dataset.value;

        if (valueElement) {
          valueElement.textContent = value;
        }

        dropdown.classList.remove('dropdown-outline--open');

        // Dispatch custom event for external listeners
        dropdown.dispatchEvent(
          new CustomEvent('dropdown-change', {
            detail: { value },
          }),
        );
      });
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-dropdown]')) {
      document.querySelectorAll('[data-dropdown]').forEach((dd) => {
        dd.classList.remove('dropdown-outline--open');
      });
    }
  });
}
