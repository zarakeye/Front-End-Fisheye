import { FootNoteComponent } from '../components/FootNote.js';

export class FootNoteFactory {
  constructor(photographer, medias, main) {
    this._photographer = photographer;
    this._medias = medias;
    this._main = main;
  }

  create() {
    const likesList = this._medias.map(media => media.likes);
    console.log('photographer likes', this._photographer._likes);
    this._photographer.likes(likesList);
    console.log('likesList', likesList);

    new FootNoteComponent(this._photographer, this._main).create();
  }
}