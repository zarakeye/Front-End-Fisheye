export function PhotographerBanner(photographer) {
    const banner = document.createElement('section');
    banner.className = 'photographer_banner';
    banner.innerHTML = `
    <div class='photographer_card'>
        <h1 class='photographer_name' aria-label="${photographer.name}" aria-roledescription="Nom du photographe" tabindex="0">${photographer.name}</h1>
        <p class='photographer_location' aria-label="${photographer.city}" tabindex="0">${photographer.country}, ${photographer.city}</p>
        <p class='photographer_tagline' aria-label="Ma philosophie : ${photographer.tagline}" tabindex="0">${photographer.tagline}</p>
      </div>
      <button id="contact_me" class="cta">Contactez-moi</button>
      <figure class='photographer_portrait_wrapper'>
          <div class="photographer_portrait_background_wrapper">
          <img class="photographer_portrait_background" src="assets/medias/photographers/${photographer.id}/${photographer.portrait}">
          <div class="photographer_portrait_blurFilter">
          <div class="mask">
            <img class="photographer_portrait" src="assets/medias/photographers/${photographer.id}/${photographer.portrait}" alt="Portrait de ${photographer.name}">
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

    contactButton.addEventListener('click', () => {
      contactButton.dispatchEvent(contactMeEvent);
    });

    return banner;
}