import { getMediasByPhotographerId } from "../services/media_services.js";
import { mediaTemplate } from "../templates/media_templates.js";

export async function displayMediasByPhotographerId(idParam) {
  const medias = await getMediasByPhotographerId(idParam);
  const mediasGrid = document.createElement("section");
  mediasGrid.classList.add("gallery");
  medias.forEach(media => {
    const mediaCardDOM = mediaTemplate(media).mediaCardTemplate();
    mediasGrid.innerHTML += mediaCardDOM;
  });
  document.querySelector('.photographer_page').appendChild(mediasGrid);
}