import { LightboxComponent } from "./Lightbox.js";

export class MediaCardComponent {
  constructor(media, medias, main, photographer, nbLikes) {
    this._media = media;
    this._medias = medias;
    this._main = main;
    this._photographer = photographer;
    this._nbLikes = nbLikes;
  }

  create() {
    const card = document.createElement('article');
    card.id = `media_${this._media._id}`;
    card.classList.add('media_card');
    
    let mediaThumbnail;
    if (this._media._media.endsWith('.jpg')) {
      mediaThumbnail = `
      <figure>
        <img
          id='media_${this._media._id}'
          class='media'
          src="assets/images/photographers/${this._media._photographerId}/media/${this._media._media}"
          alt="${this._media._title}"
        >
      </figure>
      `;
    } else if (this._media.media.endsWith('.mp4')) {
      mediaThumbnail = `
      <figure>
        <video
          id='media_${this._media._id}'
          class='media'
          src="assets/images/photographers/${this._media._photographerId}/media/${this._media._media}">
        </video>
      </figure>
      `;
    }


    card.innerHTML = `
      ${mediaThumbnail}
      <figcaption class='media_description'>
        <p class='media_title'>${this._media._title}</p>
        <p class='media_likes'><span id='nbLikes_${this._media._id}'> ${this._media._likes}</span> <i id="like_mediaId_${this._media._id}" class="fa-regular fa-heart" data-id="${this._media._id}" data-likes="${this._media._likes}"></i></p>
      </figcaption>
    `;

    console.log('card', card);
    console.log('this._media.$alreadyLiked', this._media.$alreadyLiked);

    const mediaWrapperSelector = card.querySelector(`#media_${this._media._id}`);
    
    mediaWrapperSelector.addEventListener('click', (e) => {
      e.preventDefault();
      const lightbox = new LightboxComponent(this._media, this._medias, this._main);
      console.log('lightbox', lightbox);
    });

    const likebtn = card.querySelector(`#like_mediaId_${this._media._id}`);
    likebtn.addEventListener('mouseenter', (e) => {
      e.preventDefault();
      if (likebtn.classList.contains('fa-regular') && this._media.$alreadyLiked === false) {
        likebtn.classList.remove('fa-regular');
        likebtn.classList.add('fa-solid');
      } else if (likebtn.classList.contains('fa-solid') && this._media.$alreadyLiked === false) {
        likebtn.classList.remove('fa-solid')
        likebtn.classList.add('fa-regular');
      }
    });

    likebtn.addEventListener('mouseleave', (e) => {
      e.preventDefault();
      if (likebtn.classList.contains('fa-solid') && this._media.$alreadyLiked === false) {
        likebtn.classList.remove('fa-solid');
        likebtn.classList.add('fa-regular');
      } else if (likebtn.classList.contains('fa-regular') && this._media.$alreadyLiked === true) {
        likebtn.classList.remove('fa-regular');
        likebtn.classList.add('fa-solid');
      }
    });
    likebtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (this._media.$alreadyLiked === false) {
        this._media.like();
        console.log('photographerObject likes', this._media._likes);
        document.getElementById(`nbLikes_${this._media._id}`).textContent = this._media._likes;
        // likebtn.classList.remove('fa-regular');
        likebtn.classList.add('fa-solid');
        this._photographer._likes += 1;
        console.log('photographerObject likes', this._photographer._likes);
        this._nbLikes.textContent = this._photographer._likes;
      } else {
        this._media.unlike();
        console.log('photographerObject likes', this._media._likes);
        document.getElementById(`nbLikes_${this._media._id}`).textContent = this._media._likes;
        // likebtn.classList.remove('fa-solid')
        likebtn.classList.add('fa-regular');
        this._photographer._likes -= 1;
        console.log('photographerObject likes', this._photographer._likes);
        this._nbLikes.textContent = this._photographer._likes;
      }
    });

    return card;
  }
}
