import { Contact } from "./Contact.js";

export function PhotographerBanner(photographer, contactModal) {
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
          <div class='photographer_portrait_background' style='background-image: url(assets/medias/photographers/${photographer.id}/${photographer.portrait});'></div>
          <div class='photographer_portrait_blurFilter_banner'></div>
          <div class='photographer_portrait_overlay'>
            <img
              class='photographer_portrait'
              src='assets/medias/photographers/${photographer.id}/${photographer.portrait}'
              alt='portrait of ${photographer.name}'
            >
          </div>
        </figure>
    </div>
    `;

    const contactButton = banner.querySelector('#contact_me');

    contactButton.addEventListener('click', () => {
      contactModal.style.display = 'flex';
      contactModal.querySelector('input').focus();
    });

    return banner;
}