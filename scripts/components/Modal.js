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

  const closeModalBtn = modal.querySelector('.close-modal');

  const closeModalEvent = new Event('closeModal', {
    bubbles: true
  });

  closeModalBtn.addEventListener('click', () => {
    modal.dispatchEvent(closeModalEvent);
    modal.parentElement.remove();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modal.dispatchEvent(closeModalEvent);
      modal.parentElement.remove();
    }
  });

  return modal;
}