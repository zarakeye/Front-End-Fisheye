/**
 * Generates the DOM for a photographer template.
 *
 * @param {Object} data - The data object containing information about the photographer.
 * @param {string} data.name - The name of the photographer.
 * @param {string} data.portrait - The URL of the photographer's portrait.
 * @param {string} data.id - The ID of the photographer.
 * @param {string} data.city - The city of the photographer.
 * @param {string} data.country - The country of the photographer.
 * @param {string} data.tagline - The tagline of the photographer.
 * @param {number} data.price - The price of the photographer's services.
 * @return {Object} An object containing the generated DOM and helper functions.
 */
export function photographerTemplate(data) {
  const { name, id, city, country, tagline, price } = data;

  /**
   * Generates the DOM for a user card.
   *
   * @return {string} The HTML string representing the user card.
   */
  function photographerCardTemplate() {
    // const { name, id, city, country, tagline, price } = data;
    const photographerCard = `
      <a class='photographer_link' href='photographer.html?id=${id}'>
        <article class='photographer_card'>
          <img class='photographer_portrait' src='../../assets/images/photographers/${id}/portrait.jpg' alt='portrait of the artist'>
          <h2 class='photographer_name'>${name}</h2>
          <p class='photographer_location'>${country}, ${city}</p>
          <p class='photographer_tagline'>${tagline}</p>
          <p class='photographer_price'>${price}€/jour</p>
        </article>
      </a>
    `;

    return photographerCard;
  }

  /**
   * Generates the DOM for the user page header.
   *
   * @return {string} The HTML string representing the user page header.
   */
  function photographerPageHeaderTemplate(data) {
    // const { name, id, city, country, tagline } = data;
    const photographHeader = `
      <div class='photographer_header'>
        <div class='photographer_card'>
          <h1 class='photographer_name'><span class='sr-only'>Page de </span>${name}</h1>
          <p class='photographer_location'>${country}, ${city}</p>
          <p class='photographer_tagline'>${tagline}</p>
        </div>
        <button class="contact_me">Contactez-moi</button>
        <img class='photographer_portrait' src='assets/images/photographers/${id}/portrait.jpg' alt="Portrait of the artist">
      </div>
    `;

    return photographHeader;
  }
  // return { name, portrait, id, city, country, tagline, price, userCardTemplate, userPageHeaderTemplate, mediaCard_template }
  return { photographerCardTemplate, photographerPageHeaderTemplate }
}