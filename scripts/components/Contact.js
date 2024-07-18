
import { ModalComponent } from '../components/Modal.js';

export class ContactComponent {
  constructor(main) {
    this.create(main);
  }

  create(main) {
    const contactModal = document.createElement('div');
    main.appendChild(contactModal);
    contactModal.id = 'contact_modal';

    const contactModalSelector = main.querySelector('#contact_modal');

    contactModalSelector.innerHTML += `
    <div class="modal contactModal">
      <header>
        <h2>Contactez-moi</h2>
        <img id="closeContactModal" src="assets/icons/close.svg" alt="bouton de fermeture de la modale de contact">
      </header>
      <form>
        <div>
          <label for="name">Prénom</label>
          <input type="text" id="name">
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email">
        </div>
        <div>
          <label for="message">Message</label>
          <textarea id="message"></textarea>
        </div>
        <button class="contact_button">Envoyer</button>
      </form>
    `;

    const closeContactModal = document.getElementById("closeContactModal");
    closeContactModal.addEventListener('click', () => {
      contactModal.style.display = "none";
    });

    return contactModal;
  }

  displayContactModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "flex";
  }
  
}