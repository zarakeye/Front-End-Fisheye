import { Header } from "../components/Header.js";
import { PhotographerBanner } from "../components/PhotographerBanner.js";
import { Contact } from "../components/Contact.js";
import { photographerFactory } from "../factories/photographer.factory.js";
import { mediaFactory } from "../factories/media.factory.js";
import { Sort } from "../components/Sort.js";
import { FootNote } from "../components/FootNote.js";
import { Lightbox } from "../components/Lightbox.js";

export async function PhotographerPage(id) {
  // Extraction of datas of photographers and his medias, then creation of new Photographer and Media objects
  let photographer = await photographerFactory.photographer(id);
  let medias = await mediaFactory.photographerMedias(id);
  
  // const root = document.getElementById('root');

  // Header
  const header = Header();
  document.body.appendChild(header);
  header.querySelector('a').focus();

  // Banner
  const banner = PhotographerBanner(photographer);
  document.body.appendChild(banner);

  // Contact
  document.body.addEventListener('contact', (e) => {
    e.preventDefault();
    const contactModal = photographerFactory.contactMe(photographer);
    

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
  document.body.appendChild(sortSection);

  // Bind Gallery to DOM
  document.body.appendChild(gallery);

  document.body.addEventListener('sortEvent', (e) => {
    e.preventDefault();
    const sortBy = e.target.id;
    medias = mediaFactory.sortMediasBy(medias, sortBy);
    cards = mediaFactory.sortCardsBy(cards, sortBy);
    gallery.replaceChildren(...cards);
  });

  // Lightbox
  document.body.addEventListener('mediaClicked', async (e) => {
    e.preventDefault();
    const mediaId = parseInt(e.target.id.split('_')[1], 10);
    const media = medias.find((media) => media.id === mediaId);
    const lightbox = await Lightbox(media);
    document.body.appendChild(lightbox);

    document.getElementById('go_to_next_media').focus();
  });

  // FootNote
  const footNote = await FootNote(photographer);

  document.body.appendChild(footNote);
}