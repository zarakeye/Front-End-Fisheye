import { Modal } from "../components/Modal.js";
import { isInTopFocusTrap } from "../helpers/isInTopFocusTrap.js";

export function Contact(photographer) {
  // Creation of the DOM element which contains the contact form
  const contact = document.createElement('aside');
  contact.id = 'contact';
  contact.setAttribute('aria-label', 'contact');
  contact.setAttribute('role', 'dialog');
  contact.setAttribute('aria-modal', 'true');
  
  // Creation of a modal appended to the contact and filling it with the code of the contact form
  const modal = Modal();
  contact.appendChild(modal);
  const modalSelector = contact.querySelector('.modal');
  modalSelector.innerHTML += `
    <header class='form_contact_header' aria-label='Contacter ${photographer.name}'>
        <div class='form_contact_title'>
          <h2 class="modal_title">Contactez-moi <span class='sr-only'>${photographer.name}</span></h2>
          <p class="modal_subtitle">${photographer.name}</p>
        </div>
    </header>
    <form class="form_contact" action="#" aria-label="Formulaire de contact" role="form" method="get">
      <div>
        <label for="firstname">Prénom</label>
        <input type="text" id="firstName" name="firstname" aria-label="champ Prénom" placeholder="John" tabindex="0">
      </div>
      <div>
        <label for="firstname">Nom</label>
        <input type="text" id="lastName" name="lastname" aria-label="champ Nom" placeholder="Doe">
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" aria-label="champ Email" placeholder="john.doe@me.com">
      </div>
      <div>
        <label for="message">Message</label>
        <textarea id="message" name="message" aria-label="champ Message" placeholder="Tapez votre message..."></textarea>
      </div>
      <button class="contact_button cta" type="submit" aria-label="Bouton Envoyer">Envoyer</button>
    </form>
  `;

  modalSelector.setAttribute('aria-modal', 'true');
  const modalTitle = modalSelector.querySelector('.modal_title');
  modalSelector.setAttribute('aria-label', 'Formulaire de contact');

  const closeModal = modalSelector.querySelector('.close-modal');
  closeModal.setAttribute('aria-label', 'Fermer la fenêtre de contact');

  const focusableElements = modalSelector.querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];
  console.log('focusableElements', focusableElements);

  modalSelector.addEventListener('keydown', function (e) {
    
    // if (isInTopFocusTrap()) {
    if (modalSelector.contains(e.target)){
      console.log('isInTopFocusTrap', isInTopFocusTrap());
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (e.target === firstFocusableElement) {
            e.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (e.target === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    }
  });

  closeModal.addEventListener('click', () => {
    contact.style.display = 'none';
  });

  // const form = contact.querySelector('form');
  // form.addEventListener('submit', (e) => {
  //   e.preventDefault();

  //   const formData = new FormData(form);
  //   // const data = {};
  //   // formData.forEach((value, key) => {
  //   //   data[key] = value;
  //   // });

  //   const firstName = formData.get('firstName').trim();
  //   const lastName = formData.get('lastName').trim();
  //   const email = formData.get('email').trim();
  //   const message = formData.get('message').trim();
  //   // const data = {
  //   //   firstName,
  //   //   lastName,
  //   //   email,
  //   //   message
  //   // };

  //   console.log('formData', formData.entries());
  //   console.log('data', data);
  //   // contact.style.display = 'none';
  //   let submitEvent = new Event('formSubmitted', {bubbles: true});
  //   form.dispatchEvent(submitEvent);

  //   // alert(data);
  // });

  return contact;
}