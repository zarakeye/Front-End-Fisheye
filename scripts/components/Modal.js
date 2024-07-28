export function Modal() {
  const modal = document.createElement('div');
  modal.className = 'overlay';

  modal.innerHTML = `
    <div class="modal">
    </div>
  `;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modal.parentElement.remove();
    }
  });

  return modal;
}