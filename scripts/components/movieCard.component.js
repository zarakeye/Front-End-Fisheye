export class MovieCardComponent {
  constructor(media) {
    this._media = media;
  }

  create() {
    const card = document.createElement('a');
    card.classList.add('media_link');
    card.href = `#/photographer/${this._media._photographerId}/media/${this._media._media}`;
    card.setAttribute('data-likes', `${this._media._likes}`);
    card.setAttribute('data-title', `${this._media._title}`);
    card.setAttribute('data-date', `${this._media._date}`);
    card.innerHTML = `
      <a class='media_link' href='#/photographer/${this._media._photographerId}/media/${this._media._media}'>
        <article class='media_card'>
          <div class='media_wrapper'>
            <video class='media' src="assets/images/photographers/${this._media.photographerId}/media/${this._media._media}"></video>
          </div>
          <div class='media_description'>
            <p class='media_title'>${this._media._title}</p>
            <p class='media_likes'><span id='nbLikes_${this._media._id}'> ${this._media._likes}</span> <i id="like_${this._media._id}" class="fa-solid fa-heart" data-id="${this._media._id}" data-likes="${this._media._likes}"></i></p>
          </div>
        </article>
      </a>
    `;

    return card;
  }
}