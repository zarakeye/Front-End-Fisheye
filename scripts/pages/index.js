import { getPhotographers } from "../services/photographer_services.js";
import { displayPhotographersDatas } from "../factory/photographer_factory.js";

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  console.log('photographers: ', photographers);
  displayPhotographersDatas(photographers);
}

// init();

