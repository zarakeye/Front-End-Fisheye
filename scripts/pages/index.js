import { photographerTemplate } from "../templates/photographer.js";
import { getPhotographers } from "../helpers.js";

async function displayPhotographersDatas(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach(photographer => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.displayUserCardDOM();
    photographersSection.innerHTML += userCardDOM;
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayPhotographersDatas(photographers);
}

init();

