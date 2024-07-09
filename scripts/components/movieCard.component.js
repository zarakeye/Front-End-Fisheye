export class MovieCardComponent {
  constructor(media) {
    this._media = media;
  }

  create() {
    // const { photographerId, video, title, likes } = this._media;

    const card = document.createElement('a');
    card.classList.add('media_card');
    card.href = `#/photographer/${this._media._photographerId}/media/${this._media._media}`;
    const cardContent = `
      <article class='media_card'>
        <div class='media_wrapper'>
          <video class='media' src="assets/images/photographers/${this._media.photographerId}/media/${this._media._media}"></video>
        </div>
        <div class='media_description'>
          <p class='media_title'>${this._media._title}</p>
          <p class='media_likes'><span id='nbLikes_${this._media._id}'> ${this._media._likes}</span> <i id="like_${this._media._id}" class="fa-solid fa-heart" data-likes="${this._media._likes}"></i></p>
        </div>
      </article>
    `;

    card.innerHTML = cardContent;

    return card;
  }
}