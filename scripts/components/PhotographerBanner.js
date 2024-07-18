export class PhotographerBannerComponent {
  constructor(args) {
    this.create(args);
  }

  create(args) {
    const photographer = args[0];
    const contactModal = args[1];
    const main = args[2];

    const banner = document.createElement('section');
    banner.classList.add('photographer_banner');
    banner.innerHTML = `
      <div class='photographer_card'>
        <h1 class='photographer_name'><span class='sr-only'>Page de </span>${photographer._name}</h1>
        <p class='photographer_location'>${photographer._country}, ${photographer._city}</p>
        <p class='photographer_tagline'>${photographer._tagline}</p>
      </div>
      <button id="contact_me">Contactez-moi</button>
      <div class='photographer_portrait_wrapper' style='background-image: url("assets/images/photographers/${photographer._id}/${photographer._portrait}");'>
      </div>
    `;

    main.appendChild(banner);
    const contact = document.getElementById('contact_me');

    contact.addEventListener('click', () => {
      contactModal.displayContactModal();
    });

    return banner;
  }
}