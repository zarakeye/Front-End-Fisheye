import { MediaCardComponent } from '../components/MediaCard.js';

export class MediaFactory {
  constructor(medias, main, photographer, nbLikes) {
    this._medias = medias;
    this._main = main;
    this._photographer = photographer;
    this._nbLikes = nbLikes;
  }

  createCards() { 
    // const cards = medias.map(media => new MediaCardComponent(media, gallery));
    const cards = [];
    for(const media of this._medias) {
      cards.push(new MediaCardComponent(media, this._medias, this._main, this._photographer, this._nbLikes).create());
    }
    
    console.log('cards', cards);

    return cards;
  }

}

