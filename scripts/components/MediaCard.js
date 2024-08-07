import { Lightbox } from "../components/Lightbox.js";
import { mediaFactory } from "../factories/media.factory.js";
import { LikeButton } from "../components/LikeButton.js";

export function MediaCard (media) {
  const card = document.createElement('article');
  card.className = 'media_card';
  card.id = `media_${media.id}`

  const likeButton = LikeButton(media);
  
  card.innerHTML = `
      <figure class='media_wrapper'>
        ${ mediaFactory.thumbnail(media) }
      </figure>
      <figcaption class='media_description'>
        <p class='media_title'>${media.title}</p>
        <p class='media_date sr-only'>${media.date}</p>
        <p class='media_likes'>
          <span id='nbLikes_${media.id}'> ${media.likes}</span>
        </p>
      </figcaption>
  `;

  const pMediaLikes = card.querySelector(`.media_likes`);
  pMediaLikes.appendChild(likeButton);

  const mediaDescription = card.querySelector(`.media_description`);

  let mediaClickedEvent = new Event('mediaClicked', {
    bubbles: true,
  });

  card.addEventListener('click', (e) => {
    if (!mediaDescription.contains(e.target)) {
      // Lightbox(media);
      e.target.dispatchEvent(mediaClickedEvent);
    }
  });

  card.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'tab':
        break;

      case 'Enter':
        if (!likeButton.contains(e.target)) {
          e.preventDefault();
          e.target.dispatchEvent(mediaClickedEvent);
        } else {
          e.preventDefault();
          likeButton.click();
          likeButton.focus();
        }
        break;
    }
  });

  return card;
}