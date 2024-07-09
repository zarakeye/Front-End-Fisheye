import { PhotographerBannerComponent } from '../components/photographerBanner.component.js';
import { PhotographerCardComponent } from '../components/photographerCard.component.js';
import { PhotographerApi } from '../api/photographer.api.js';

export class PhotographerFactory {
  constructor(id) {
    this._photographerId = id;
    this._photographerApi = new PhotographerApi('../data/photographers.json');
  }

  async createBanner() {
    const photographer = await this._photographerApi.getPhotographerById(this._photographerId);
    const banner = new PhotographerBannerComponent(photographer).create();

    return banner;
  }

  async createCards() {
    const photographers = await this._photographerApi.getPhotographers();
    const main = document.createElement('main');
    for (const photographer of photographers) {
      const card = new PhotographerCardComponent(photographer).create();
      main.appendChild(card);
    }
    return main;
  }
}

