import { lightboxComponent } from '../components/Lightbox.js';

export class lightboxFactory {
  constructor(id, medias, main) {
    this.create(id, medias, main); 
  }

  create(id, medias, main) {
    return  new lightboxComponent().create(id, medias, main);
    // return lightbox;
  }
}
