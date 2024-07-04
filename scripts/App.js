// import { Photographer } from "./models/Photographer.js";
import { Media } from "./models/Media.js";
import { PhotographerApi } from "./api/photographer.js";
import { MediaApi } from "./api/media.js";
import { PhotographerCard } from './templates/PhotographerCard.js';
// import { PhotographerHeader } from './templates/PhotographerHeader.js';
// import { ImageCard } from './templates/ImageCard.js';
import { PhotographerPageFactory } from './factories/PhotographerPageFactory.js';

class App {
  constructor() {
    this._photographerApi = new PhotographerApi('../data/photographers.json');
    this._mediaApi = new MediaApi('../data/photographers.json');

    this.generatePageFromUrl();
  }

  generatePageFromUrl() {
    const url = new URL(window.location.href);
    const idParam = parseInt(url.searchParams.get('id'), 10);

    console.log('url: ', url);

    if(url.pathname === '/index.html') {
      this.createIndexPage();
    } else if(url.pathname === '/photographer.html') {
      this.createPhotographerPage(idParam);
    } else {
      console.error('La page demandée n\'existe pas');
    }
  }

  async createIndexPage() {
    const photographersWrapper = document.querySelector(".photographers_wrapper");

    const photographersDatas = await this._photographerApi.getPhotographers();
    console.log('photographersDatas: ', photographersDatas);
    photographersDatas.forEach(photographer => {
      const photographerCard = new PhotographerCard(photographer);
      console.log('photographer: ', photographer);
      photographersWrapper.innerHTML += photographerCard.createPhotographerCard();
    });
  }

  async createPhotographerPage(idParam) {
    const photographer = await this._photographerApi.getPhotographerById(idParam); // On récupère le photographe par son id();
    const photographerMedias = await this._mediaApi.getPhotographerMedias(idParam); // On récupère les medias du photographe();
    const photographerMediasObjects = photographerMedias.map(media => new Media(media));
    console.log('photographerMediasObjects: ', photographerMediasObjects);
    const main = document.querySelector(".photographer_page");
    const photographerPageFactory = new PhotographerPageFactory(photographer, photographerMediasObjects, main);
    
    const banner = photographerPageFactory.createBanner();
    main.innerHTML += banner;

    const gallerySection = document.createElement('section');
    gallerySection.classList.add('gallery');
    const mediasTemplatesArray = photographerPageFactory.createMediasTemplates();
    console.log('mediasTemplatesArray: ', mediasTemplatesArray);
    for(const template of mediasTemplatesArray) {
      gallerySection.innerHTML += template;
    }

    main.appendChild(gallerySection);
  }
}

const app = new App();
// app.generatePageFromUrl();
