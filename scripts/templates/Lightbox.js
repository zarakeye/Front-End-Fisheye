class lightbox {
  constructor(media) {
    this._media = media;
  }

  lightboxTemplate() {
    const { photographerId, image, title } = this._media;
    const lightbox = `
      <div class='lightbox modal'>
        <div class='go_to_previous_media'>
          <i class="fa-solid fa-chevron-left"></i>
        </div>
        <div class='lightbox_media'>
          <img src='assets/images/photographers/${photographerId}/media/${image}' alt='${title}'>
        </div>
        <div class='go_to_next_media'>
          <i class="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    `;
    return lightbox;
  }
}