import { mediaFactory } from "../factories/media.factory.js";
import { LikeButton } from "../components/LikeButton.js";

/**
 * Creates a media card element with a thumbnail, title, date, and likes.
 * The card is interactive, allowing users to click or press Enter to trigger a 'mediaClicked' event.
 *
 * @param {object} photographer - The photographer object associated with the media.
 * @param {object} media - The media object containing title, date, likes, and other properties.
 * @return {HTMLElement} The created media card element.
 */
export function MediaCard (photographer, media) {
  const card = document.createElement('article');
  card.className = 'media_card';
  card.id = `media_${media.id}`

  const likeButton = LikeButton(photographer,media);
  const thumbnailString = mediaFactory.thumbnail(media);
  card.innerHTML = `
    <figure class='media_wrapper'>
      ${ thumbnailString }
    </figure>
    <figcaption class='media_description' tabindex='0' aria-label='nombre de likes ${media.likes} sur ${media.title}'>
      <p class='media_title'>${media.title}</p>
      <p class='media_date sr-only'>${media.date}</p>
      <p class='media_likes'>
        <span id='nbLikes_${media.id}'>${media.likes}</span>
      </p>
    </figcaption>
  `;

  card.querySelector('.media').setAttribute('tabindex', 0);

  const pMediaLikes = card.querySelector(`.media_likes`);
  pMediaLikes.appendChild(likeButton);

  const mediaDescription = card.querySelector(`.media_description`);

  let mediaClickedEvent = new Event('mediaClicked', {
    bubbles: true,
  });

  card.addEventListener('click', (e) => {
    if (!mediaDescription.contains(e.target)) {
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
        }
        break;
    }
  });

  return card;
}