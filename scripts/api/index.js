export class Api {
  constructor(url) {
    this._url = url;
  }

  async getDatas() {
    try {
      // On récupère les datas
      const response = await fetch(this._url);
      const datas = await response.json();
      return datas;
    } catch (error) {
      console.error('an error occured when fetching datas', error);
    }
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

  async getMediasByPhotographerId(id) {
    try {
      const medias = await this.getMedias(); 
      const photographerMedias = medias.filter(media => media.photographerId === id);
      return photographerMedias;
    } catch (error) {
      console.error('an error occured when fetching medias', error);
    }
  }

  async getPhotographers() {
    try {
      const datas = await this.getDatas();
      const photographers = datas.photographers;
      return photographers;
    } catch (error) {
      console.error('an error occured when fetching photographers', error);
    }
  }

  async getPhotographerById(id) {
    try {
      const photographers = await this.getPhotographers();
      const photographer = await photographers.find(photographer => photographer.id === id);
      return photographer;
    } catch(error) {
      console.error('an error occured when fetching photographer');
    }
  }
}
