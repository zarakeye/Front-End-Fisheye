import { displayModal } from '../utils/contactForm.js';

export function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data;
  console.log('data: ', data);

  function getUserCardDOM() {
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

  function getUserPageHeaderDOM() {
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
  return { name, portrait, id, city, country, tagline, price, getUserCardDOM, getUserPageHeaderDOM }
}