//Mettre le code JavaScript lié à la page photographer.html
import { displayPhotograherHeader } from "../factory/photographer_factory.js";
import { displayMediasByPhotographerId } from "../factory/media_factory.js";
import { photographerTemplate } from "../templates/photographer_templates.js";
import { mediaTemplate } from "../templates/media_templates.js";
import { getPhotographerById } from "../services/photographer_services.js";
import { displayModal, closeModal } from '../factory/contactForm.js';

async function init() {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  const idParam = parseInt(searchParams.get('id'), 10);

  displayPhotograherHeader(idParam);
  displayMediasByPhotographerId(idParam);
}

init();

