import { Modal } from "../components/Modal.js";

export function Contact(photographer) {
  // Creation of the DOM element which contains the contact form
  const contact = document.createElement('aside');
  contact.id = 'contact';
  document.body.appendChild(contact);
  
  // Creattion of a modal appended to the contact and filling it with the code of the contact form
  const modal = Modal();
  contact.appendChild(modal);
  const modalSelector = contact.querySelector('.modal');
  modalSelector.innerHTML += `
    <header class='form_contact_header'>
        <div class='form_contact_title'>
          <h2 class="modal_title">Contactez-moi</h2>
          <p class="modal_subtitle">${photographer.name}</p>
        </div>
    </header>
    <form class="form_contact" action="#" aria-label="Formulaire de contact">
      <div>
        <label for="firstname">Prénom</label>
        <input type="text" id="firstName" aria-label="champ Prénom">
      </div>
      <div>
        <label for="firstname">Nom</label>
        <input type="text" id="lastName" aria-label="champ Nom">
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" aria-label="champ Email">
      </div>
      <div>
        <label for="message">Message</label>
        <textarea id="message" aria-label="champ Message"></textarea>
      </div>
      <button class="contact_button cta" type="submit" aria-label="Bouton Envoyer">Envoyer</button>
    </form>
  `;

  document.body.appendChild(contact);
  document.body.querySelector('#contact input').focus();

  const closeContactModal = modalSelector.querySelector('#closeContactModal');
  
  closeContactModal.addEventListener('click', () => {
    document.querySelector('#contact').remove();
  });

  return contact;
}