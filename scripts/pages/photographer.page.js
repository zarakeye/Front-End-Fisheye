import { PhotographerApi } from '../api/photographer.api.js';
import { HeaderComponent } from '../components/header.component.js';
import { PhotographerFactory } from '../factories/photographer.factory.js';
import { MediaFactory } from '../factories/media.factory.js';
import { MediaApi } from '../api/media.api.js';
import { Photographer } from '../models/photographer.model.js';
import { SortComponent } from '../components/sort.component.js';
// import { SortFactory } from '../factories/sort.factory.js';

export class PhotographerPage {
  constructor(id) {
  this._photographerId = id;
  }

  async create() {
    /** Entry point **/
    const root = document.getElementById('root');
    /** Header **/
    root.appendChild(new HeaderComponent().create());
    const headerElement = document.querySelector('header');
    const h1 = document.createElement('h1');
    h1.classList.add('sr-only');
    headerElement.appendChild(h1);
    const photographerApi = new PhotographerApi('../data/photographers.json');
    const photographer = await photographerApi.getPhotographerById(this._photographerId);
    const mediaApi = new MediaApi('../data/photographers.json');
    const medias = await mediaApi.getPhotographerMedias(this._photographerId);
    h1.textContent = `Page de ${photographer.name}`;

    /** Main **/
    const main = document.createElement('main');
    /* Banner */
    const banner = await new PhotographerFactory(this._photographerId).createBanner();
    main.appendChild(banner);

    // const mediaFactory = new MediaFactory(this._photographerId);
    /* Sort Options */
    const sortComponent = new SortComponent(this._photographerId);
    const sort = await sortComponent.create();
    const gallery = document.createElement('section');
    gallery.classList.add('gallery');
    console.log('sortComponent', sort);
    main.appendChild(sort);
    main.appendChild(gallery);
    root.appendChild(main);
    const mediaFactory = new MediaFactory(medias);
    let { mediaObjects, mediasCards } = await mediaFactory.createCards();
    console.log('mediasCards', mediasCards);
    console.log('mediaObjects', mediaObjects);

    const likesList = mediaObjects.map(media => media.likes);
    
    console.log('photographer', photographer);
    const photographerObject = new Photographer(photographer);
    photographerObject.likes(likesList);

    console.log('photographerObject', photographerObject);


    for (const mediaCard of mediasCards) {
      gallery.appendChild(mediaCard);
    }
    const select = sort.children[1];
    console.log('select', select);

    select.addEventListener('change', (e) => {
      const selectedValue = select.value;
      if (selectedValue === 'popularity') {
        mediasCards.sort((a, b) => a.dataset.likes - b.dataset.likes);
        console.log('mediasCards sorted by popularity', mediasCards);
        mediaObjects.sort((a, b) => a.likes - b.likes);
        console.log('mediaObjects sorted by popularity', mediaObjects);
        gallery.innerHTML = '';
        for (const card of mediasCards) {
          gallery.appendChild(card);
        }
      } else if (selectedValue === 'date') {
        mediasCards.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
        console.log('mediasCards sorted by date', mediasCards);
        mediaObjects.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log('mediaObjects sorted by date', mediaObjects);
        gallery.innerHTML = '';
        for (const mediaCard of mediasCards) {
          gallery.appendChild(mediaCard);
        }
      } else if (select.value === 'title') {
        mediasCards.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
        console.log('mediasCards sorted by title', mediasCards);
        mediaObjects.sort((a, b) => a.title.localeCompare(b.title));
        console.log('mediaObjects sorted by title', mediaObjects);
        gallery.innerHTML = '';
        for (const mediaCard of mediasCards) {
          gallery.appendChild(mediaCard);
        }
      }
    });

    const likes = document.querySelectorAll('.fa-heart.fa-solid');
    console.log('likes', likes);

    for (const objet of mediaObjects) {
      const likebtn = document.getElementById(`like_mediaId_${objet.id}`);
      likebtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (likebtn.classList.contains('fa-regular')) {
          objet.like();
          photographerObject.like();
          console.log('photographerObject likes', photographerObject._likes);
          document.getElementById(`nbLikes_${objet.id}`).textContent = objet.likes;
          likebtn.classList.remove('fa-regular')
          likebtn.classList.add('fa-solid');
          photographerObject
        } else {
          objet.unlike();
          photographerObject.unlike();
          console.log('photographerObject likes', photographerObject._likes);
          document.getElementById(`nbLikes_${objet.id}`).textContent = objet.likes;
          likebtn.classList.remove('fa-solid')
          likebtn.classList.add('fa-regular');
        }
      });
    }

    console.log('photographerObject likes', photographerObject._likes);
  }
}
