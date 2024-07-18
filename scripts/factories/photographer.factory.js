import { PhotographerBannerComponent } from '../components/PhotographerBanner.js';
import { PhotographerCardComponent } from '../components/PhotographerCard.js';

export class PhotographerFactory {
  createBanner(photographer, contactModal, main) {
    const args = [photographer, contactModal, main];

    return new PhotographerBannerComponent(args);

    // return banner;
  }

  async createCards(photographers, main) {
    for (const photographer of photographers) {
      const card = new PhotographerCardComponent().create(photographer);
      main.appendChild(card);
    }
  }
}

