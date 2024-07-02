import { getMediasByPhotographerId } from "../services/media_services.js";
import { mediaTemplate } from "../templates/media_templates.js";

export async function displayMediasByPhotographerId(idParam) {
  const medias = await getMediasByPhotographerId(idParam);
  console.log('medias: ', medias);
  const gallery = document.createElement("section");
  gallery.classList.add("gallery");
  medias.forEach(media => {
    if (media.hasOwnProperty("video")) {
      const mediaCardDOM = mediaTemplate(media).videoCardTemplate();
      gallery.innerHTML += mediaCardDOM;
    } else if(media.hasOwnProperty("image")) {
      const mediaCardDOM = mediaTemplate(media).imageCardTemplate();
      gallery.innerHTML += mediaCardDOM;
    }
  });
  document.querySelector('.photographer_page').appendChild(gallery);
}