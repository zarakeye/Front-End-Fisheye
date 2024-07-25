export function PhotographerCard(photographer, parentDOMElement) {
    const card = document.createElement('a');
    card.href = `photographer.html?id=${photographer.id}`;
    card.className = 'photographer_link';
    card.innerHTML = `
        <figure class='photographer_portrait_wrapper'>
          <div class='photographer_portrait_background' style='background-image: url(assets/medias/photographers/${photographer.id}/${photographer.portrait});'></div>
          <div class='photographer_portrait_blurFilter'></div>
          <div class='photographer_portrait_overlay'>
            <img
              class='photographer_portrait'
              src='assets/medias/photographers/${photographer.id}/${photographer.portrait}'
              alt='portrait of ${photographer.name}'
            >
          </div>
        </figure>
        <figcaption class='photographer_description'>
          <h2 class='photographer_name'>${photographer.name}</h2>
          <p class='photographer_location'>${photographer.country}, ${photographer.city}</p>
          <p class='photographer_tagline'>${photographer.tagline}</p>
          <p class='photographer_price'>${photographer.price}€/jour</p>
        </figcaption>
      `;
    parentDOMElement.appendChild(card);
    return card;
}