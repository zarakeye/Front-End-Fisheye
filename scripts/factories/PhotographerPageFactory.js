import { PhotographerBanner } from '../components/photographerBanner.component.js';
import { Media } from '../models/media.model.js';
import { ImageCard } from '../components/imageCard.component.js';
import { MovieCard } from '../components/movieCard.component.js';

export class PhotographerPageFactory {
  constructor(photographer, photographerMediasObjects, main) {
    this._photographer = photographer;
    this._photographerMediasObjects = photographerMediasObjects;
    this._main = main;
  }

  createBanner() {
    return new PhotographerBanner(this._photographer).create();

    // this._main.innerHTML += photographerHeader;
  }

  createMediasTemplates() { 
    console.log('PhotographerPageFactory._photographerMediasObjects: ', this._photographerMediasObjects);
    
    let mediasTemplatesArray = [];
    for(const media of this._photographerMediasObjects) {
        console.log('media: ', media);
        const filename = media.media;
        console.log('filename: ', filename);
        // if (media.hasOwnProperty('video')) {
        if (filename.endsWith('.mp4')) {
          const mediaCard = new MovieCard(media);
          const movieCardTemplate = mediaCard.createMovieCard();
          // gallery.innerHTML += mediaCard.createMovieCard();
          mediasTemplatesArray.push(movieCardTemplate);
        } else if (filename.endsWith('.jpg')) {
          const mediaCard = new ImageCard(media);
          const imageCardTemplate = mediaCard.createImageCard();
          // gallery.innerHTML += mediaCard.createImageCard();
          mediasTemplatesArray.push(imageCardTemplate);
        }
      }

      return mediasTemplatesArray;
  }
}

