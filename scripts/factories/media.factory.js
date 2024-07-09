import { ImageCardComponent } from '../components/imageCard.component.js';
import { MovieCardComponent } from '../components/movieCard.component.js';
import { MediaApi } from '../api/media.api.js';
import { Media } from '../models/media.model.js';

export class MediaFactory {
  constructor(id) {
    this._photographerId = id;
  }

  async createGallery() { 
    const gallery = document.createElement('section');
    gallery.classList.add('gallery');
    const medias = await new MediaApi('../data/photographers.json').getPhotographerMedias(this._photographerId);
    
    const mediaObjects = [];
    medias.forEach(media => {
      mediaObjects.push(new Media(media));
    });
    for(const media of medias) {
      if (media.hasOwnProperty('video')) {
        const object = mediaObjects.find(mediaObject => mediaObject.media === media.video);
        gallery.appendChild(new MovieCardComponent(object).create());
      } else if (media.hasOwnProperty('image')) {
        const object = mediaObjects.find(mediaObject => mediaObject.media === media.image);
        gallery.appendChild(new ImageCardComponent(object).create());
      }
    }

    return { gallery, mediaObjects };
  }
}

