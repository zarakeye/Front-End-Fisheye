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
  const { name, portrait, id, city, country, tagline, price } = data;
  // const medias = getMediasByPhotographerId(id);
  console.log('data: ', data);

/**
 * Generates the DOM for a user card.
 *
 * @return {string} The HTML string representing the user card.
 */
  function displayUserCardDOM() {
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
  function displayUserPageHeaderDOM() {
    const photographHeader = `
    <div class='photograph-header'>
      <div class='photographer_card'>
        <h2 class='photographer_name'>${name}</h2>
        <p class='photographer_location'>${country}, ${city}</p>
        <p class='photographer_tagline'>${tagline}</p>
      </div>
      <button class="contact_me">Contactez-moi</button>
      <img class='photographer_portrait' src='assets/images/photographers/${id}/portrait.jpg' alt="Portrait of the artist">
    </div>
    `;

    return photographHeader;
  }
  return { name, portrait, id, city, country, tagline, price, displayUserCardDOM, displayUserPageHeaderDOM, displayMediaCardDOM }
}

// export function mediaTemplate(data) {

/**
 * Generates the DOM for a media card.
 *
 * @param {Object} media - The media object containing information about the media.
 * @param {number} media.id - The ID of the media.
 * @param {number} media.photographerId - The ID of the photographer who took the media.
 * @param {string} media.title - The title of the media.
 * @param {string} media.image - The path to the image file of the media.
 * @param {number} media.likes - The number of likes the media has.
 * @param {string} media.date - The date the media was taken.
 * @param {number} media.price - The price of the media.
 * @return {string} The HTML string representing the media card.
 */
export function displayMediaCardDOM(media) {
  const { id, photographerId, title, image, likes, date, price } = media;

  const mediaCard = `
  <article class='media_card'>
    <img class='media' src='assets/images/photographers/${photographerId}/media/${image}' alt='${title}'>
    <div class='media_description'>
      <p class='media_title'>${title}</p>
      <p class='media_likes'>${likes} <i class="fa-solid fa-heart"></i></p>
    </div>
  </article>
  `;

  return mediaCard;
}
// }