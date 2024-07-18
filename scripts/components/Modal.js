export class ModalComponent {
  constructor(parent) {
    this.create(parent);
  }

  create(parent) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
      <header>
        <h2></h2>
        <img id="closeModal" src="assets/icons/close.svg" alt="bouton de fermeture de la modale">
      </header>
      <!-- <div id="modal_content"></div> -->
    `;

    parent.appendChild(modal);
    return modal;
  }
}