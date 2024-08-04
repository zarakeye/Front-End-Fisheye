import { Header } from "../components/Header.js";
import { PhotographerBanner } from "../components/PhotographerBanner.js";
import { Contact } from "../components/Contact.js";
import { photographerFactory } from "../factories/photographer.factory.js";
import { mediaFactory } from "../factories/media.factory.js";
import { Sort } from "../components/Sort.js";
import { FootNote } from "../components/FootNote.js";

export async function PhotographerPage(id) {
  // Extraction of datas of photographers and his medias, then creation of new Photographer and Media objects
  const photographer = await photographerFactory.photographer(id);
  const medias = await mediaFactory.photographerMedias(id);
  
  const root = document.getElementById('root');

  // Header
  const header = Header();
  document.body.appendChild(header);

  // Contact
  const contact = Contact(photographer);
  document.body.appendChild(contact);

  // Banner
  const banner = PhotographerBanner(photographer, contact);
  document.body.appendChild(banner);

  // Cards
  let cards = medias.map((media) => mediaFactory.createCard(media));
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

  // FootNote
  const footNote = await FootNote(photographer);

  document.body.appendChild(footNote);
}