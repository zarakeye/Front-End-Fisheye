export class PhotographerCard {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createPhotographerCard() {
    const { name, id, portrait, city, country, tagline, price } = this._photographer;
    
    const photographerCard = `
      <a class='photographer_link' href='photographer.html?id=${id}'>
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
      </a>
    `;

    return photographerCard;
  }
}