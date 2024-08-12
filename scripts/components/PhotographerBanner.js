import { Contact } from "./Contact.js";

export function PhotographerBanner(photographer) {
    const banner = document.createElement('section');
    banner.className = 'photographer_banner';
    banner.innerHTML = `
    <div class='photographer_card'>
        <h1 class='photographer_name'><span class='sr-only'>Page de </span>${photographer.name}</h1>
        <p class='photographer_location'>${photographer.country}, ${photographer.city}</p>
        <p class='photographer_tagline'>${photographer.tagline}</p>
      </div>
      <button id="contact_me" class="cta">Contactez-moi</button>
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
    </div>
    `;

    const contactButton = banner.querySelector('#contact_me');

    let contactMeEvent = new Event('contact', {
      bubbles: true
    });

    contactButton.addEventListener('click', (e) => {
      contactButton.dispatchEvent(contactMeEvent);
    });

    return banner;
}