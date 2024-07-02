export class PhotographerHeader {
  constructor(photographer) {
    this._photographer = photographer;
  }

  photographerPageHeaderTemplate() {
    const { name, id, portrait, city, country, tagline, price } = this._photographer;
    const photographerPageHeader = `
      <div class='photographer_header'>
        <div class='photographer_card'>
          <h1 class='photographer_name'><span class='sr-only'>Page de </span>${name}</h1>
          <p class='photographer_location'>${country}, ${city}</p>
          <p class='photographer_tagline'>${tagline}</p>
        </div>
        <button class="contact_me">Contactez-moi</button>
        <div class='photographer_portrait_wrapper'>
          <img
            class='photographer_portrait'
            src='assets/images/photographers/${id}/${portrait}'
            alt='portrait of ${name}'
          >
        </div>
      </div>
    `;
    return photographerPageHeader;
  }
}