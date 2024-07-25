export function Modal() {
  const modal = document.createElement('div');
  modal.className = 'overlay';

  modal.innerHTML = `
    <div class="modal">
    </div>
  `;

  return modal;
}