import { Header } from "../components/Header.js";
import { PhotographerBanner } from "../components/PhotographerBanner.js";
import { photographerFactory } from "../factories/photographer.factory.js";
import { mediaFactory } from "../factories/media.factory.js";
import { Sort } from "../components/Sort.js";
import { FootNote } from "../components/FootNote.js";
import { Lightbox } from "../components/Lightbox.js";
import { isInTopFocusTrap } from "../helpers/isInTopFocusTrap.js";

export async function PhotographerPage(id) {
  // Extraction of datas of photographers and his medias, then creation of new Photographer and Media objects
  let photographer = await photographerFactory.photographer(id);
  let medias = await mediaFactory.photographerMedias(id);
  
  // Header
  const header = Header();
  document.body.appendChild(header);

  // Main
  const main = document.createElement('main');
  main.id = 'main';
  document.body.appendChild(main);

  // Banner
  const banner = PhotographerBanner(photographer);
  main.appendChild(banner);

  // Contact
  main.addEventListener('contact', (e) => {
    e.preventDefault();
    photographerFactory.contactMe(photographer);
  });
 
  // Cards
  let cards = medias.map((media) => mediaFactory.createCard(media));
  medias = mediaFactory.sortMediasBy(medias, 'popularity');
  cards = mediaFactory.sortCardsBy(cards, 'popularity');

  // Gallery
  const gallery = document.createElement('section');
  gallery.id = 'gallery';
  gallery.append(...cards);

  // Sort
  const sortSection = Sort(gallery);
  main.appendChild(sortSection);

  // Bind Gallery to DOM
  main.appendChild(gallery);

  main.addEventListener('sortEvent', (e) => {
    e.preventDefault();
    const sortBy = e.target.id;
    medias = mediaFactory.sortMediasBy(medias, sortBy);
    cards = mediaFactory.sortCardsBy(cards, sortBy);
    gallery.replaceChildren(...cards);
  });

  // Lightbox
  main.addEventListener('mediaClicked', async (e) => {
    e.preventDefault();
    const mediaId = parseInt(e.target.id.split('_')[1], 10);
    const media = medias.find((media) => media.id === mediaId);
    const lightbox = await Lightbox(media);
    document.body.appendChild(lightbox);

    // document.getElementById('next_media').focus();
  });

  // FootNote
  const footNote = await FootNote(photographer);

  main.appendChild(footNote);

  const focusableElements = document.body.querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  // Focus Trap
  document.body.addEventListener('keydown', (e) => {

    if (!isInTopFocusTrap()) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (e.target === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (e.target === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    }
  });
}