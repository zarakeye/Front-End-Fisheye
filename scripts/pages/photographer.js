//Mettre le code JavaScript lié à la page photographer.html
import { photographerTemplate } from "../templates/photographer.js";
import { getPhotographerById, getMedias, getMediasByPhotographerId } from "../helpers.js";
import {displayModal, closeModal} from '../utils/contactForm.js';

const url = new URL(window.location.href);
const searchParams = url.searchParams;

const idParam = parseInt(searchParams.get('id'), 10);
const photographer = await getPhotographerById(idParam);
// console.log('photographer: ', photographer);

const closeFormBtn = document.getElementById('closeModal');
closeFormBtn.addEventListener('click', closeModal);

async function displayUserData(photographer) {
  const main = document.getElementById('main');
  const photographerModel = photographerTemplate(photographer);
  const userPageHeader = photographerModel.getUserPageHeaderDOM();
  main.innerHTML = userPageHeader;
  
  const contactMeButton = document.querySelector('.contact_me');
  contactMeButton.addEventListener('click', displayModal);
}
displayUserData(photographer);

const medias = await getMedias();
console.log('medias: ', medias);

const photographerMedias = await getMediasByPhotographerId(idParam);
console.log('photographer Medias: ', photographerMedias);

