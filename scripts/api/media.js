import { Api } from './api.js';

export class MediaApi extends Api {
  constructor(url) {
    super(url);
  }

  async getMedias() {
    try {
      const datas = await this.getDatas();
      const medias = datas.media;
      return medias;
    } catch (error) {
      console.error('an error occured when fetching medias', error);
    }
  }

  async getPhotographerMedias(photographerId) {
    try {
      const medias = await this.getMedias();
      const photographerMedias = medias.filter(media => media.photographerId === photographerId);
      return photographerMedias;
    } catch (error) {
      console.error('an error occured when fetching medias', error);
    }
  }
}