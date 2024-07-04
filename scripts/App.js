// import { Photographer } from "./models/Photographer.js";
import { Media } from "./models/Media.js";
import { PhotographerApi } from "./api/Api.js";
import { MediaApi } from "./api/Api.js";
import { PhotographerCard } from './templates/PhotographerCard.js';
// import { PhotographerHeader } from './templates/PhotographerHeader.js';
// import { ImageCard } from './templates/ImageCard.js';
import { PhotographerPageFactory } from './factories/PhotographerPageFactory.js';

class App {
  constructor() {
    this._photographerApi = new PhotographerApi('../data/photographers.json');
    this._mediaApi = new MediaApi('../data/photographers.json');
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
    const allPhotographers = await this._photographerApi.getPhotographers();
    const photographer = await allPhotographers.find(photographer => photographer.id === idParam);
    const allMedias = await this._mediaApi.getMedias();
    const photographerMedias = await allMedias.filter(media => media.photographerId === idParam);
    const photographerMediasObjects = photographerMedias.map(media => new Media(media));
    console.log('photographerMediasObjects: ', photographerMediasObjects);
    const main = document.querySelector(".photographer_page");
    const photographerPageFactory = new PhotographerPageFactory(photographer, photographerMediasObjects, main);
    
    const photographerHeader = photographerPageFactory.createPhotographerHeader();
    main.innerHTML += photographerHeader;

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
app.generatePageFromUrl();
