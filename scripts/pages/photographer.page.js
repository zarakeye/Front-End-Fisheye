import { PhotographerApi } from '../api/photographer.api.js';
import { HeaderComponent } from '../components/header.component.js';
import { PhotographerFactory } from '../factories/photographer.factory.js';
import { MediaFactory } from '../factories/media.factory.js';
import { Like } from '../models/like.model.js';

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
    h1.textContent = `Page de ${photographer.name}`;

    /** Main **/
    const main = document.createElement('main');
    /* Banner */
    const banner = await new PhotographerFactory(this._photographerId).createBanner();
    main.appendChild(banner);

    /* Gallery */
    const mediaFactory = new MediaFactory(this._photographerId);
    const { gallery, mediaObjects } = await mediaFactory.createGallery();
    console.log('mediaObjects', mediaObjects);

    main.appendChild(gallery);

    root.appendChild(main);

    const likes = document.querySelectorAll('.fa-heart.fa-solid');
    console.log('likes', likes);
    const likeIds = [];
    likes.forEach(like => likeIds.push(like.id));
    console.log('likeIds', likeIds);
    for (const objet of mediaObjects) {
      const likebtn = document.getElementById(`like_${objet.id}`);
      likebtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (!likebtn.classList.contains('liked')) {
          --objet.likes;
          document.getElementById(`nbLikes_${objet.id}`).textContent = objet.likes;
          likebtn.classList.add('liked');
        } else {
          ++objet.likes;
          document.getElementById(`nbLikes_${objet.id}`).textContent = objet.likes;
          likebtn.classList.remove('liked');
        }
      })
    }
  }
}
