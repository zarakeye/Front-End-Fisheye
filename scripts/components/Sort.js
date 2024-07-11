import { Api } from '../api/index.js';
import { MediaFactory } from '../factories/media.factory.js';

export class SortComponent {
  constructor(id) {
    this._photographerId = id;
    // this._mediaApi = new MediaApi('../data/photographers.json');
    this._api = new Api('../data/photographers.json');
  }
  create() {
    const sort = document.createElement('div');
    sort.classList.add('sort');
    sort.innerHTML = `
      <p>Trier par</p>
      <select id="medias_sort" name="medias_sort">
        <option value="popularity">Popularite</option>
        <option value="date">Date</option>
        <option value="title">Titre</option>
      </select>
    `;

    return sort;
  }
}