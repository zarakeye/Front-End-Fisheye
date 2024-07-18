import { HeaderComponent } from '../components/Header.js';
import { PhotographerFactory } from '../factories/photographer.factory.js';
import { Photographer } from '../models/photographer.model.js';
import { Api } from '../api/index.js';

export class HomePage {
  constructor() {
    this.create();
  }
  
  async create() {
    /** Extraction of photographer and his medias datas from api **/
    const api = new Api('../data/photographers.json');
    const photographerDatas = await api.getPhotographers();

    /** Creation of corresponding objects using Photographer model **/
    const photographers = photographerDatas.map(photographerData => new Photographer(photographerData));

    /** Entry point **/
    const root = document.getElementById('root');

    /** Header **/
    root.appendChild(new HeaderComponent().create());
    const headerElement = document.querySelector('header');
    const h1 = document.createElement('h1');
    headerElement.appendChild(h1);
    h1.textContent = 'Nos photographes';

    /** Main **/
    const main = document.createElement('main');
    main.classList.add('photographers_grid');
    root.appendChild(main);

    await new PhotographerFactory().createCards(photographers, main);
  }
}
