//Mettre le code JavaScript lié à la page photographer.html
import { displayModal, closeModal } from "../utils/contactForm.js";

const contactButton = document.querySelector('.contact_button');
const closeFormBtn = document.querySelector('.modal header img');

contactButton.addEventListener('click', displayModal);
closeFormBtn.addEventListener('click', closeModal);
