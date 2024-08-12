export function PhotographerCard(photographer) {
    const card = document.createElement('a');
    card.href = `photographer.html?id=${photographer.id}`;
    card.className = 'photographer_link';
    card.innerHTML = `
      <figure class='photographer_portrait_wrapper'>
        <div class="photographer_portrait_background_wrapper">
          <img class="photographer_portrait_background" src="assets/medias/photographers/${photographer.id}/${photographer.portrait}">
          <div class="photographer_portrait_blurFilter">
          <div class="mask">
            <img class="photographer_portrait" src="assets/medias/photographers/${photographer.id}/${photographer.portrait}">
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