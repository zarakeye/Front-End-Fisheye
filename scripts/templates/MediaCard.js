export class MediaCard {
  constructor(media) {
    this._media = media;
  }

  movieCardTemplate() {
    const { photographerId, image, title, likes } = this._media;

    if (media.isVideo()) {
      const video = document.createElement('video');
      video.src = `assets/images/photographers/${photographerId}/media/${image}`;


    }
    const mediaCard = `
      <article class='media_card'>
       
        <img class='media' src='assets/images/photographers/${photographerId}/media/${image}' alt='${title}'>
        <div class='media_description'>
          <p class='media_title'>${title}</p>
          <p class='media_likes'>${likes} <i class="fa-solid fa-heart"></i></p>
        </div>
      </article>
    `;

    return mediaCard;
  }
}