import { HeaderComponent } from '../components/Header.js';
import { PhotographerFactory } from '../factories/photographer.factory.js';

export class HomePage {
  async create() {
    /** Entry point **/
    const root = document.getElementById('root');

    /** Header **/
    root.appendChild(new HeaderComponent().create());
    const headerElement = document.querySelector('header');
    const h1 = document.createElement('h1');
    headerElement.appendChild(h1);
    h1.textContent = 'Nos photographes';

    /** Main **/
    const main = await new PhotographerFactory().createCards();
    root.appendChild(main);
  }
}
