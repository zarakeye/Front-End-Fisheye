import { Api } from "../api/index.js";
import { Header } from "../components/Header.js";
import { Photographer } from "../models/photographer.model.js";
import { Media } from "../models/media.model.js";
import { PhotographerBanner } from "../components/PhotographerBanner.js";
import { photographerFactory } from "../factories/photographer.factory.js";
import { mediaFactory } from "../factories/media.factory.js";
import { Sort } from "../components/Sort.js";
import { FootNote } from "../components/FootNote.js";
import { Lightbox } from "../components/Lightbox.js";
import { isInHighFocusTrap } from "../helpers.js";

export async function PhotographerPage(id) {
  const photographerDatas = await Api.photographers.getPhotographerById(id);
  const photographer = new Photographer(photographerDatas);

  const mediasDatas = await Api.medias.getMediasByPhotographerId(id);
  let medias = mediasDatas.map((media) => new Media(media));

  const header = Header();
  document.body.appendChild(header);

  const main = document.createElement('main');
  main.id = 'main';
  document.body.appendChild(main);

  const banner = PhotographerBanner(photographer);
  main.appendChild(banner);

  let activeElementBeforeContactModal = null;
  main.addEventListener('contact', (e) => {
    if (activeElementBeforeContactModal === null) {
      activeElementBeforeContactModal = e.target;
    }

    photographerFactory.contactMe(photographer);
  });
 
  // Gallery
  let cards = medias.map((media) => mediaFactory.createCard(photographer, media));
  medias = mediaFactory.sortMediasBy(medias, 'popularity');
  cards = mediaFactory.sortCardsBy(cards, 'popularity');

  const gallery = document.createElement('section');
  gallery.id = 'gallery';
  gallery.append(...cards);

  const sortSection = Sort(gallery);
  main.appendChild(sortSection);

  main.appendChild(gallery);

  main.addEventListener('sortEvent', (e) => {
    e.preventDefault();
    const sortBy = e.target.id;
    medias = mediaFactory.sortMediasBy(medias, sortBy);
    cards = mediaFactory.sortCardsBy(cards, sortBy);
    gallery.replaceChildren(...cards);
  });

  // Lightbox
  let activeElementBeforeLightbox = null;
  main.addEventListener('mediaClicked', async (e) => {
    if (activeElementBeforeLightbox === null) {
      activeElementBeforeLightbox = e.target;
    }
    const mediaId = parseInt(e.target.id.split('_')[1], 10);
    const clickedMedia = medias.find((media) => media.id === mediaId);
    const lightbox = await Lightbox(clickedMedia, medias);
    document.body.appendChild(lightbox);

    document.querySelector('.next_media').focus();
  });

  const footNote = FootNote(photographer, medias);

  main.appendChild(footNote);

  const focusableElements = document.body.querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  // Focus Trap
  document.body.addEventListener('keydown', (e) => {
    // if the acive element is on the ground (z-index = 0), hold the focus there
    if (!isInHighFocusTrap()) {
      if (e.key === 'Tab') {
        // Manage shift + tab to go back
        if (e.shiftKey) {
          // if the active element is the first focusable element, go to the last focusable element
          if (e.target === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else { // Manage normal tab
          // if the active element is the last focusable element, go to the first focusable element
          if (e.target === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    }
  });

  document.addEventListener('closeModal', () => {
    if (activeElementBeforeLightbox) {
      activeElementBeforeLightbox.focus();
      activeElementBeforeLightbox = null;
    } else if (activeElementBeforeContactModal) {
      activeElementBeforeContactModal.focus();
      activeElementBeforeContactModal = null;
    }
  });
}