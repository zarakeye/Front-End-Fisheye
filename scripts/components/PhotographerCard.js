export class PhotographerCardComponent {
  create(photographer) {
    const card = document.createElement('a');
    card.classList.add('photographer_link');
    card.href = `photographer.html?id=${photographer._id}`;
    card.innerHTML = `
      <article class='photographer_card'>
        <div class='photographer_portrait_wrapper' style='background-image: url("assets/images/photographers/${photographer._id}/${photographer._portrait}");'>
          <!-- <img
            class='photographer_portrait'
            src='assets/images/photographers/${photographer._id}/${photographer._portrait}'
            alt='portrait of ${photographer._name}'
          > -->
        </div>
        <h2 class='photographer_name'>${photographer._name}</h2>
        <p class='photographer_location'>${photographer._country}, ${photographer._city}</p>
        <p class='photographer_tagline'>${photographer._tagline}</p>
        <p class='photographer_price'>${photographer._price}€/jour</p>
      </article>
    `;

    return card;
  }
}