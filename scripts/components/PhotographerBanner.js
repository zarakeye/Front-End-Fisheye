import { Contact } from "./Contact.js";

export function PhotographerBanner(photographer, parentDOMElement) {
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
          <div class='photographer_portrait_blurFilter'></div>
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

    parentDOMElement.appendChild(banner);
    const contact = document.getElementById('contact_me');

    contact.addEventListener('click', () => {
      Contact(photographer, parentDOMElement);
    });

    return banner;
}