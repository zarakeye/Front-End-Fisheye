import { PhotographerHeader } from '../templates/PhotographerHeader.js';
// import { Media } from '../models/Media.js';
import { ImageCard } from '../templates/ImageCard.js';
import { MovieCard } from '../templates/MovieCard.js';

export class PhotographerPageFactory {
  constructor(photographer, photographerMedias, main) {
    this._photographer = photographer
    this._photographerMedias = photographerMedias;
    this._main = main;
  }

  createPhotographerHeader() {
    return new PhotographerHeader(this._photographer).photographerPageHeaderTemplate();

    // this._main.innerHTML += photographerHeader;
  }

  createMediasTemplates() { 
    // this._main.appendChild(gallery);

    // const photographerMediasObjects = this._photographerMedias.map(media => new Media(media));

    // console.log('photographerMediasObjects: ', photographerMediasObjects);
    
    let mediasTemplatesArray = [];
    this._photographerMedias.forEach(media => {
        if (media.hasOwnProperty('video')) {
          const mediaCard = new MovieCard(media);
          const movieCardTemplate = mediaCard.createMovieCard();
          // gallery.innerHTML += mediaCard.createMovieCard();
          mediasTemplatesArray.push(movieCardTemplate);
        } else if (media.hasOwnProperty('image')) {
          const mediaCard = new ImageCard(media);
          const imageCardTemplate = mediaCard.createImageCard();
          // gallery.innerHTML += mediaCard.createImageCard();
          mediasTemplatesArray.push(imageCardTemplate);
        }
      });

      return mediasTemplatesArray;
  }
}

