import { PhotographerBannerComponent } from '../components/PhotographerBanner.js';
import { PhotographerCardComponent } from '../components/PhotographerCard.js';
import { Api } from '../api/index.js';

export class PhotographerFactory {
  constructor(id) {
    this._photographerId = id;
    this._api = new Api('../data/photographers.json');
  }

  async createBanner() {
    const photographer = await this._api.getPhotographerById(this._photographerId);
    const banner = new PhotographerBannerComponent(photographer).create();

    return banner;
  }

  async createCards() {
    const photographers = await this._api.getPhotographers();
    const main = document.createElement('main');
    for (const photographer of photographers) {
      const card = new PhotographerCardComponent(photographer).create();
      main.appendChild(card);
    }
    return main;
  }
}

