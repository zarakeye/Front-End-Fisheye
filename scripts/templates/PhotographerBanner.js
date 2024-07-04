export class PhotographerBanner {
  constructor(photographer) {
    this._photographer = photographer;
  }

  create() {
    const { name, id, portrait, city, country, tagline } = this._photographer;
    const banner = `
      <div class='photographer_header'>
        <div class='photographer_card'>
          <h1 class='photographer_name'><span class='sr-only'>Page de </span>${name}</h1>
          <p class='photographer_location'>${country}, ${city}</p>
          <p class='photographer_tagline'>${tagline}</p>
        </div>
        <button class="contact_me">Contactez-moi</button>
        <div class='photographer_portrait_wrapper' style='background-image: url("assets/images/photographers/${id}/${portrait}");'>
        </div>
      </div>
    `;
    return banner;
  }
}