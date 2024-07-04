export class MovieCard {
  constructor(media) {
    this._media = media;
  }

  createMovieCard() {
    // const { photographerId, video, title, likes } = this._media;
    console.log('MovieCard._media: ', this._media);

    const movieCard = `
      <article class='media_card'>
        <div class='media_wrapper'>
          <video class='media' src="assets/images/photographers/${this._media.photographerId}/media/${this._media.media}"></video>
        </div>
        <div class='media_description'>
          <p class='media_title'>${this._media.title}</p>
          <p class='media_likes'>${this._media.likes} <i class="fa-solid fa-heart"></i></p>
        </div>
      </article>
    `;

    return movieCard;
  }
}