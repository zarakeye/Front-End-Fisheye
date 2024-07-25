import { Lightbox } from "../components/Lightbox.js";
import { mediaFactory } from "../factories/media.factory.js";
import { photographerFactory } from "../factories/photographer.factory.js";

export function MediaCard (media, parentDOMElement) {
  console.log('Entry in MediaCard, media: ', media);
  const card = document.createElement('article');
  card.className = 'media_card';
  card.id = `media_${media.id}`
  parentDOMElement.appendChild(card);
  card.innerHTML = `
      <figure class='media_portrait_wrapper'>
        ${ mediaFactory.rightThumbnail(media) }
      </figure>
      <figcaption class='media_description'>
        <p class='media_title'>${media.title}</p>
        <p class='media_likes'>
          <span id='nbLikes_${media.id}'> ${media.likes}</span> <i id="like_mediaId_${media.id}" class="fa fa-heart-o fa-2x" data-id="${media.id}" data-likes="${media.likes}"></i>
        </p>
      </figcaption>
  `;

  const cardSelector = document.querySelector(`#media_${media.id}`);
  const pageRoot = document.querySelector('#root');
  cardSelector.addEventListener('click', () => {
    const lightbox = Lightbox(media, pageRoot);

    console.log('parentDOMElement: ', parentDOMElement);
    console.log('lightbox: ', lightbox);
  });

  const likeButton = card.querySelector(`#like_mediaId_${media.id}`);
  likeButton.addEventListener('mouseenter', (e) => {
    e.preventDefault();

    if (!media.alreadyLiked) {
      likeButton.classList.remove('fa-heart-o');
      likeButton.classList.add('fa-heart');
    } else {
      likeButton.classList.remove('fa-heart');
      likeButton.classList.add('fa-heart-o');
    }
  });

  likeButton.addEventListener('mouseleave', (e) => {
    e.preventDefault();
    if (!media.alreadyLiked) {
      likeButton.classList.remove('fa-heart');
      likeButton.classList.add('fa-heart-o');
    } else {
      likeButton.classList.remove('fa-heart-o');
      likeButton.classList.add('fa-heart');
    }
  });

  likeButton.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!media.alreadyLiked) {
      media.like();
      document.querySelector(`#nbLikes_${media.id}`).textContent = media.likes;
      likeButton.classList.remove('fa-regular');
      likeButton.classList.add('fa-solid');
      const photographerLikesDisplay = document.querySelector('#nbLikes_footNote');
      console.log('photographerLikesDisplay: ', photographerLikesDisplay);
      photographerLikesDisplay.textContent = `${parseInt(photographerLikesDisplay.textContent, 10) + 1}`;
      console.log('photographerLikesDisplay: ', photographerLikesDisplay.textContent);
    } else {
      media.unlike();
      document.querySelector(`#nbLikes_${media.id}`).textContent = media.likes;
      likeButton.classList.remove('fa-heart');
      likeButton.classList.add('fa-heart-o');
      const photographerLikesDisplay = document.querySelector('#nbLikes_footNote');
      console.log('photographerLikesDisplay: ', photographerLikesDisplay);
      photographerLikesDisplay.textContent = `${parseInt(photographerLikesDisplay.textContent, 10) - 1}`;
      console.log('photographerLikesDisplay: ', photographerLikesDisplay.textContent);
    }
  });

  return card;
}