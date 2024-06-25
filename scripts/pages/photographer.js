//Mettre le code JavaScript lié à la page photographer.html
import { photographerTemplate, displayMediaCardDOM } from "../templates/photographer.js";
import { getPhotographerById, getMedias, getMediasByPhotographerId } from "../helpers.js";
import { displayModal, closeModal } from '../utils/contactForm.js';

const url = new URL(window.location.href);
const searchParams = url.searchParams;

const idParam = parseInt(searchParams.get('id'), 10);
const photographer = await getPhotographerById(idParam);

const closeFormBtn = document.getElementById('closeModal');
closeFormBtn.addEventListener('click', closeModal);

/**
 * Asynchronously displays user data on the page.
 *
 * @param {Object} photographer - The photographer object containing user data.
 * @return {Promise<void>} A promise that resolves when the user data is displayed.
 */
async function displayUserData(photographer) {
  const main = document.getElementById('main');
  const photographerModel = photographerTemplate(photographer);
  const userPageHeader = photographerModel.displayUserPageHeaderDOM();
  main.innerHTML = userPageHeader;
  
  const contactMeButton = document.querySelector('.contact_me');
  contactMeButton.addEventListener('click', displayModal);
}
displayUserData(photographer);

const medias = await getMedias();
console.log('medias: ', medias);

const photographerMedias = await getMediasByPhotographerId(idParam);
console.log('photographer Medias: ', photographerMedias);

photographerMedias.forEach(media => {
  
  const photographerModel = photographerTemplate(photographer);
  const mediaCardDOM = photographerModel.displayMediaCardDOM(media);

  const main = document.getElementById('main');

  main.innerHTML += mediaCardDOM;
});

