import { photographerTemplate } from "../templates/photographer_templates.js";
import { getPhotographerById } from "../services/photographer_services.js";
import { displayModal, closeModal } from "./contactForm.js";

/**
 * Asynchronously displays photographer data on the webpage.
 *
 * @param {Array} photographers - An array of photographer objects.
 * @return {Promise<void>} A promise that resolves when the photographers' data is displayed.
 */
export async function displayPhotographersDatas(photographers) {
  const photographersWrapper = document.querySelector(".photographers_wrapper");

  photographers.forEach(photographer => {
    console.log('photographer: ', photographer);
    const photographerCardDOM = photographerTemplate(photographer).photographerCardTemplate();
    photographersWrapper.innerHTML += photographerCardDOM;
  });
}

/**
 * Asynchronously displays photographer header on the webpage.
 *
 * @param {number} idParam - The ID of the photographer.
 * @return {Promise<void>} A promise that resolves when the photographer header is displayed.
 */
export async function displayPhotograherHeader(idParam) {
  const photographer = await getPhotographerById(idParam);
  const photographerPageHeaderDOM = await photographerTemplate(photographer).photographerPageHeaderTemplate();
  document.querySelector(".photographer_page").innerHTML += photographerPageHeaderDOM;

  const contactMeButton = document.querySelector('.contact_me');
  contactMeButton.addEventListener('click', displayModal);
  const closeModalBtn = document.getElementById('closeModal');
  closeModalBtn.addEventListener('click', closeModal);
}

