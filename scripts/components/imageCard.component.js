import { Media } from "../models/media.model.js";

export class ImageCardComponent {
  constructor(media) {
    this._media = media;
  }

  create() {
    const card = document.createElement('a');
    card.classList.add('media_card');
    card.href = `#/photographer/${this._media._photographerId}/media/${this._media._media}`;
    const cardContent = `
      <article class='media_card'>
        <div
          class='media_wrapper'
          style='background-image: url("assets/images/photographers/${this._media._photographerId}/media/${this._media._media}"); background-position: center; background-size: cover;'>
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