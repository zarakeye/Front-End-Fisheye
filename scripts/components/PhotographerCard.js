export function PhotographerCard(photographer, parentDOMElement) {
    const card = document.createElement('a');
    card.href = `photographer.html?id=${photographer.id}`;
    card.className = 'photographer_link';
    card.innerHTML = `
        <figure class='photographer_portrait_wrapper'>
          <div class='photographer_portrait_background' style='background-image: url(assets/medias/photographers/${photographer.id}/${photographer.portrait});'></div>
          <div class='photographer_portrait_blurFilter_card'></div>
          <div class='photographer_portrait_overlay'>
            <img
              class='photographer_portrait'
              src='assets/medias/photographers/${photographer.id}/${photographer.portrait}'
              alt='portrait of ${photographer.name}'
            >
          </div>
        </figure>
        <figcaption class='photographer_description'>
          <h2 class='photographer_name' aria-label='nom de l'artiste'>${photographer.name}</h2>
          <p class='photographer_location' aria-label='localisation'>${photographer.country}, ${photographer.city}</p>
          <p class='photographer_tagline' aria-label='tagline'>${photographer.tagline}</p>
          <p class='photographer_price' aria-label='tarif journalier'>${photographer.price}€/jour</p>
        </figcaption>
      `;
    parentDOMElement.appendChild(card);
    return card;
}