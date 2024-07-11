import { ImageCardComponent } from '../components/ImageCard.js';
import { MovieCardComponent } from '../components/MovieCard.js';
import { Media } from '../models/media.model.js';

export class MediaFactory {
  constructor(medias) {
    this._medias = medias;
    // this._photographerId = id;
  }

  async createCards() { 
    const mediasCards = [];
    const mediaObjects = [];
    this._medias.forEach(media => {
      mediaObjects.push(new Media(media));
    });
    // for(const media of medias) {
    for(const media of this._medias) {
      if (media.hasOwnProperty('video')) {
        const object = mediaObjects.find(mediaObject => mediaObject.media === media.video);
        mediasCards.push(new MovieCardComponent(object).create());
      } else if (media.hasOwnProperty('image')) {
        const object = mediaObjects.find(mediaObject => mediaObject.media === media.image);
        mediasCards.push(new ImageCardComponent(object).create());
      }
    }

    // Medieas sorted by likes (popularity)
    mediaObjects.sort((a, b) => a.likes - b.likes);
    mediasCards.sort((a, b) => a.dataset.likes - b.dataset.likes);
    console.log('mediasCards', mediasCards);

    return { mediasCards, mediaObjects };
  }
}

