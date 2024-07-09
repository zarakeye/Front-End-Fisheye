import { DatasApi } from './datas.api.js';

export class PhotographerApi extends DatasApi {
  constructor(url) {
    super(url);
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
