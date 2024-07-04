import { PhotographerHeader } from '../templates/PhotographerHeader.js';
import { Media } from '../models/Media.js';
import { ImageCard } from '../templates/ImageCard.js';
import { MovieCard } from '../templates/MovieCard.js';

export class PhotographerPageFactory {
  constructor(photographer, photographerMediasObjects, main) {
    this._photographer = photographer;
    this._photographerMediasObjects = photographerMediasObjects;
    this._main = main;
  }

  createPhotographerHeader() {
    return new PhotographerHeader(this._photographer).photographerPageHeaderTemplate();

    // this._main.innerHTML += photographerHeader;
  }

  createMediasTemplates() { 
    console.log('PhotographerPageFactory._photographerMediasObjects: ', this._photographerMediasObjects);
    // this._main.appendChild(gallery);

    // const photographerMediasObjects = this._photographerMedias.map(media => new Media(media));

    // console.log('photographerMediasObjects: ', photographerMediasObjects);
    
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

