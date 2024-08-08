export function Modal() {
  const modal = document.createElement('div');
  modal.className = 'overlay';

  modal.innerHTML = `
    <div class="modal">
      <button class="close-modal" aria-label="Fermer la fenêtre modal">
        <i class="fa fa-times"></i>
      </button>
    </div>
  `;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modal.parentElement.remove();
    }
  });

  return modal;
}