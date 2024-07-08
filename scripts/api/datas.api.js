export class DatasApi {
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
}
