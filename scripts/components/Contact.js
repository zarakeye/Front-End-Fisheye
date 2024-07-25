import { Modal } from "../components/Modal.js";

export function Contact(photographer, parentDOMElement) {
  // Creation of the DOM element which contains the contact form
  const contact = document.createElement('aside');
  contact.id = 'contact';
  parentDOMElement.appendChild(contact);
  
  // Creattion of a modal appended to the contact and filling it with the code of the contact form
  const modal = Modal();
  contact.appendChild(modal);
  const modalSelector = contact.querySelector('.modal');
  modalSelector.innerHTML = `
    <header class='form_contact_header'>
        <div class='form_contact_title'>
          <h2>Contactez-moi</h2>
          <p>${photographer.name}</p>
        </div>
        <i id='closeContactModal' class='fa fa-times'></i>
    </header>
    <form class="form_contact">
      <div>
        <label for="firstname">Prénom</label>
        <input type="text" id="firstName">
      </div>
      <div>
        <label for="firstname">Nom</label>
        <input type="text" id="lastName">
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email">
      </div>
      <div>
        <label for="message">Message</label>
        <textarea id="message"></textarea>
      </div>
      <button class="contact_button cta">Envoyer</button>
    </form>
  `;

  const closeContactModal = modalSelector.querySelector('#closeContactModal');
  
  closeContactModal.addEventListener('click', () => {
    parentDOMElement.querySelector('#contact').remove();
  });

  return contact;
}