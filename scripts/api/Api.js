export class Api {
  constructor(url) {
    this._url = url;
  }

  async getDatas() {
    try {
      const response = await fetch(this._url);
      const datas = await response.json();
      console.log('datas: ', datas);
      return datas;
    } catch (error) {
      console.error('an error occured when fetching datas', error);
    }
  }
}

export class PhotographerApi extends Api {
  constructor(url) {
    super(url);
  }

  async getPhotographers() {
    try {
      const datas = await this.getDatas();
      console.log('datas: ', datas);
      return datas.photographers;
    } catch (error) {
      console.error('an error occured when fetching photographers', error);
    }
  }
}

export class MediaApi extends Api {
  constructor(url) {
    super(url);
  }

  async getMedias() {
    try {
      const datas = await this.getDatas();
      return datas.media;
    } catch (error) {
      console.error('an error occured when fetching medias', error);
    }
  }
}