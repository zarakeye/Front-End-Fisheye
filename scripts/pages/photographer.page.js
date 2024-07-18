import { HeaderComponent } from '../components/Header.js';
import { PhotographerFactory } from '../factories/photographer.factory.js';
import { MediaFactory } from '../factories/media.factory.js';
import { Api } from '../api/index.js';
import { Photographer } from '../models/photographer.model.js';
import { SortComponent } from '../components/Sort.js';
import { FootNoteFactory } from '../factories/footNote.factory.js';
import { Media } from '../models/media.model.js';
import { ContactComponent } from '../components/Contact.js';
export class PhotographerPage {
  constructor(photographerId) {
    this.create(photographerId);
  }

  async create(photographerId) {

    /** Extraction of photographer and his medias datas from api **/
    const api = new Api('../data/photographers.json');
    const photographerDatas = await api.getPhotographerById(photographerId);
    const mediasDatas = await api.getMediasByPhotographerId(photographerId);

    /** Creation of corresponding objects using Photographer and Media models **/
    const photographer = new Photographer(photographerDatas);
    // medias sorted by popularity by default
    const medias = mediasDatas.map(mediaDatas => new Media(mediaDatas)).sort((a, b) => a.likes - b.likes);

    /** Entry point **/
    const root = document.getElementById('root');

    /** Page title **/
    const pageTitle = document.querySelector('title');
    pageTitle.textContent = `Fisheye - Page de ${photographer.name}`;

    /** Header **/
    root.appendChild(new HeaderComponent().create());
    const headerElement = document.querySelector('header');
    const h1 = document.createElement('h1');
    h1.classList.add('sr-only');
    headerElement.appendChild(h1);
    h1.textContent = `Page de ${photographer.name}`;

    /** Main **/
    const main = document.createElement('main');
    root.appendChild(main);

    /** Contact modal creation */
    const contactModal = new ContactComponent(main);

    new PhotographerFactory().createBanner(photographer, contactModal, main);
    
    const gallery = document.createElement('section');
    gallery.classList.add('gallery');
    main.appendChild(gallery);
    root.appendChild(main);

    const mainSelector = document.querySelector('main');
    console.log('mainSelector', mainSelector);

    new FootNoteFactory(photographer, medias, main).create();

    const nbLikes = document.querySelector('#nbLikes_footNote');

    /* Media Cards Gallery */
    const cards = new MediaFactory(medias, mainSelector, photographer, nbLikes).createCards();
    
    /* Sort Options */
    new SortComponent(cards, gallery).create();

    
  }
}
