export class PhotographerCardComponent {
  constructor(photographer) {
    this._photographer = photographer;
  }

  create() {
    const { name, id, portrait, city, country, tagline, price } = this._photographer;
    const card = document.createElement('a');
    card.classList.add('photographer_link');
    card.href = `photographer.html?id=${id}`;
    const cardContent = `
      <article class='photographer_card'>
        <div class='photographer_portrait_wrapper' style='background-image: url("assets/images/photographers/${id}/${portrait}");'>
          <!-- <img
            class='photographer_portrait'
            src='assets/images/photographers/${id}/${portrait}'
            alt='portrait of ${name}'
          > -->
        </div>
        <h2 class='photographer_name'>${name}</h2>
        <p class='photographer_location'>${country}, ${city}</p>
        <p class='photographer_tagline'>${tagline}</p>
        <p class='photographer_price'>${price}€/jour</p>
      </article>
    `;

    card.innerHTML = cardContent;

    return card;
  }
}