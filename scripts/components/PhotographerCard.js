/**
 * Creates a photographer card element with a link to the photographer's page.
 *
 * @param {Object} photographer - An object containing the photographer's details.
 * @param {number} photographer.id - The photographer's ID.
 * @param {string} photographer.portrait - The photographer's portrait image file name.
 * @param {string} photographer.name - The photographer's name.
 * @param {string} photographer.country - The photographer's country.
 * @param {string} photographer.city - The photographer's city.
 * @param {string} photographer.tagline - The photographer's tagline.
 * @param {number} photographer.price - The photographer's daily price.
 * @return {HTMLElement} The created photographer card element.
 */
export function PhotographerCard(photographer) {
    const card = document.createElement('a');
    card.href = `photographer.html?id=${photographer.id}`;
    card.className = 'photographer_link';
    card.innerHTML = `
      <figure class='photographer_portrait_wrapper'>
        <div class="photographer_portrait_background_wrapper">
          <img
            class="photographer_portrait_background"
            src="assets/medias/photographers/${photographer.id}/${photographer.portrait}"
            alt="portrait de ${photographer.name}"
            aria-hidden="true">
          <div class="photographer_portrait_blurFilter">
          <div class="mask">
            <img
              class="photographer_portrait"
              src="assets/medias/photographers/${photographer.id}/${photographer.portrait}"
              alt="portrait de ${photographer.name}">
          </div>
          </div>
        </div>

      </figure>
      <figcaption class='photographer_description'>
        <h2 class='photographer_name' aria-label='nom de l'artiste'>${photographer.name}</h2>
        <p class='photographer_location' aria-label='localisation'>${photographer.country}, ${photographer.city}</p>
        <p class='photographer_tagline' aria-label='tagline'>${photographer.tagline}</p>
        <p class='photographer_price' aria-label='tarif journalier'>${photographer.price}€/jour</p>
      </figcaption>
    `;
    
    return card;
}