import { PhotographerBanner } from "../components/PhotographerBanner.js";
import { Header } from "../components/Header.js";
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
  const header = Header(root);

  // Banner
  const banner = PhotographerBanner(photographer, root);

  // Sort
  const sortSection = Sort(medias, root);

  // FootNote
  const footNote = await FootNote(photographer);

  document.body.appendChild(footNote);
}