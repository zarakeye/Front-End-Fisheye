import { Api } from '../api/index.js';
import { MediaFactory } from '../factories/media.factory.js';

export class SortComponent {
  constructor(cards, gallery) {
    this._cards = cards;
    this._gallery = gallery;
  }
  create() {
    const sort = document.createElement('div');
    sort.id = 'sort';
    sort.innerHTML = `
      <p>Trier par</p>

      <button id="sort_button">
        <ul class="options" name="sortBy">
          <i id="arrow" class="fa-solid fa-chevron-down"></i>
          <li class="option" value="popularity" data-selected="true">Popularité</li>
          <hr>
          <li class="option" value="date">Date</li>
          <hr>
          <li class="option" value="title">Titre</li>
        </ul>
      </button>
      <select id="medias_sort" name="medias_sort">
        <option value="popularity">Popularite</option>
        <option value="date">Date</option>
        <option value="title">Titre</option>
      </select>
    `;

    console.log('cards', this._cards);

    // By default, sort by popularity
    this._cards.sort((a, b) => a.dataset.likes - b.dataset.likes);
    this._cards.forEach((card) => {
      this._gallery.appendChild(card);
    })

    const select = sort.querySelector('#medias_sort');
    const optionsList = sort.querySelectorAll('.option');
    console.log('optionsList', optionsList);
    optionsList.forEach((option) => {
      if (!option.dataset.selected === 'true') {
        option.style.display = 'none';
        const hrList = sort.querySelectorAll('hr');
        hrList.forEach((hr) => {
          hr.style.display = 'none';
        })
      }
    })
    select.addEventListener('change', () => {
      const selectedValue = select.value;
      if (selectedValue === 'popularity') {
        this._cards.sort((a, b) => a.dataset.likes - b.dataset.likes);
        console.log('mediasCards sorted by popularity', this._cards);
        this._cards.forEach((card) => {
          this._gallery.appendChild(card);
          console.log('gallery', this._gallery);
        })
      } else if (selectedValue === 'date') {
        this._cards.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
        console.log('mediasCards sorted by date', this._cards);
        this._cards.forEach((card) => {
          this._gallery.appendChild(card);
        })
      } else if (select.value === 'title') {
        this._cards.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
        console.log('mediasCards sorted by title', this._cards);
        this._cards.forEach((card) => {
          this._gallery.appendChild(card);
        })
      }
    });

    this._gallery.before(sort);
  }
}