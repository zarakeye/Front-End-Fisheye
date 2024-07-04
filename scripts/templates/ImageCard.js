export class ImageCard {
  constructor(media) {
    this._media = media;
  }

  createImageCard() {
    const { photographerId, image, title, likes } = this._media;
    console.log('_media: ', this._media);

    const imageCard = `
      <article class='media_card'>
        <div class='media_wrapper' style='background-image: url("assets/images/photographers/${photographerId}/media/${image}"); background-position: center; background-size: cover;'></div>
        <div class='media_description'>
          <p class='media_title'>${title}</p>
          <p class='media_likes'>${likes} <i class="fa-solid fa-heart"></i></p>
        </div>
      </article>
    `;

    return imageCard;
  }
}