export class LightboxComponent {
  constructor(media, medias, main) {
    this._media = media;
    this._medias = medias;
    this._main = main;
    this.create();
  }

  create() {
    let lightboxMediaContainer;

    if (this._media._media.endsWith('.jpg')) {
      lightboxMediaContainer = `
        <div id='lightbox_container'>
          <img class='media' src='assets/images/photographers/${this._media._photographerId}/media/${this._media._media}' alt='${this._media._title}'>
          <h2 class='media_title'>${this._media._title}</h2>
        </div>
      `;
    } else if (this._media._media.endsWith('.mp4')) {
      lightboxMediaContainer = `
        <div id='lightbox_container'>  
          <video class='media'
            id='media_${this._media._id}'
            src="assets/images/photographers/${this._media._photographerId}/media/${this._media._media}">
          </video>
          <h2 class='media_title'>${this._media._title}</h2>
        </div>
      `;
    }

    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
      <div class='modal'>
        <div id='go_to_previous_media'>
          <i id='previous_media' class="fa-solid fa-chevron-left nav-lightbox-btn"></i>
        </div>
        ${lightboxMediaContainer}
        <div id='go_to_next_media'>
          <img id="closeModal" src="assets/icons/close.svg" alt="bouton de fermeture de la modale">
          <i id='next_media' class="fa-solid fa-chevron-right nav-lightbox-btn"></i>
        </div>
      </div>
    `;

    this._main.appendChild(lightbox);

    const mediasLength = this._medias.length;

    const lightboxSelector = this._main.querySelector('#lightbox');
    const previousMedia = lightbox.querySelector('#previous_media');
    const goToPreviousMedia = lightbox.querySelector('#go_to_previous_media');
    const nextMedia = lightbox.querySelector('#next_media');
    const goToNextMedia = lightbox.querySelector('#go_to_next_media');
    const closeModal = lightbox.querySelector('#closeModal');
    const lightboxContainer = lightbox.querySelector('#lightbox_container');
    const currentMedia = lightboxContainer.querySelector('.media');
    const modal = this._main.querySelector('#lightbox .modal');
    const navLightboxBtns = modal.querySelectorAll('.nav-lightbox-btn');

    let currentMediaIndex = this._medias.indexOf(this._media);

    previousMedia.addEventListener('click', (e) => {
      e.preventDefault();
      let previousMediaIndex = --currentMediaIndex;
      if (previousMediaIndex < 0) {
        currentMediaIndex = mediasLength - 1;
        previousMediaIndex = mediasLength - 1;
      }

      console.log('currentMediaIndex', currentMediaIndex);
      console.log('previousMediaIdndex', previousMediaIndex);
      if (this._medias[previousMediaIndex]._media.endsWith('.jpg')) {
        lightboxContainer.innerHTML = `
          <img
            class='media'
            src='assets/images/photographers/${this._medias[previousMediaIndex]._photographerId}/media/${this._medias[previousMediaIndex]._media}' alt='${this._medias[previousMediaIndex]._title}'
          >
          <h2 class='media_title'>${this._medias[previousMediaIndex]._title}</h2>
        `;
      } else if (this._medias[previousMediaIndex]._media.endsWith('.mp4')) {
        lightboxContainer.innerHTML = `
          <video
            id='media_${this._medias[previousMediaIndex]._id}'
            class='media'
            src="assets/images/photographers/${this._medias[previousMediaIndex]._photographerId}/media/${this._medias[previousMediaIndex]._media}">
          </video>
          <h2 class='media_title'>${this._medias[previousMediaIndex]._title}</h2>
        `;
      }
    });

    nextMedia.addEventListener('click', (e) => {
      e.preventDefault();
      let nextMediaIndex = ++currentMediaIndex;
      if (nextMediaIndex >= mediasLength) {
        currentMediaIndex = 0;
        nextMediaIndex = 0;

      }
      if (this._medias[nextMediaIndex]._media.endsWith('.jpg')) {
        lightboxContainer.innerHTML = `
          <img
            id='media_${this._medias[nextMediaIndex]._id}'
            class='media'
            src='assets/images/photographers/${this._medias[nextMediaIndex]._photographerId}/media/${this._medias[nextMediaIndex]._media}' alt='${this._medias[nextMediaIndex]._title}'
          >
          <h2 class='media_title'>${this._medias[nextMediaIndex]._title}</h2>
        `;
      } else if (this._medias[nextMediaIndex]._media.endsWith('.mp4')) {
        lightboxContainer.innerHTML = `
          <video
            id='media_${this._medias[nextMediaIndex]._id}'
            class='media'
            src='assets/images/photographers/${this._medias[nextMediaIndex]._photographerId}/media/${this._medias[nextMediaIndex]._media}'
          </video>
          <h2 class='media_title'>${this._medias[nextMediaIndex]._title}</h2>
        `;
      }
    });

    closeModal.addEventListener('click', () => {
      lightboxSelector.remove();
    });

    return lightbox;
  }

}