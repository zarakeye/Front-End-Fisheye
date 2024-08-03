import { Lightbox } from "../components/Lightbox.js";
import { mediaFactory } from "../factories/media.factory.js";
import { LikeButton } from "../components/LikeButton.js";

export function MediaCard (media) {
  const card = document.createElement('article');
  card.className = 'media_card';
  card.id = `media_${media.id}`
  card.setAttribute('tabindex', '0');

  const likeButton = LikeButton(media);

  card.innerHTML = `
      <figure class='media_portrait_wrapper'>
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

  card.addEventListener('click', (e) => {
    if (card.contains(e.target) && !likeButton.contains(e.target)) {
      Lightbox(media);
    }
  });

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !likeButton.contains(e.target)) {
      Lightbox(media);
    }
  });

  // const nbLikes = card.querySelector(`#nbLikes_${media.id}`);
  // card.addEventListener('change', (e) => {
  //   nbLikes.textContent = media.likes;
  // });

  // likeButton = card.querySelector(`#like_mediaId_${media.id}`);
  // likeButton.addEventListener('mouseenter', (e) => {
  //   e.preventDefault();

  //   if (!media.alreadyLiked) {
  //     likeButton.classList.remove('fa-heart-o');
  //     likeButton.classList.add('fa-heart');
  //   } else {
  //     likeButton.classList.remove('fa-heart');
  //     likeButton.classList.add('fa-heart-o');
  //   }
  // });

  // likeButton.addEventListener('mouseleave', (e) => {
  //   e.preventDefault();
  //   if (!media.alreadyLiked) {
  //     likeButton.classList.remove('fa-heart');
  //     likeButton.classList.add('fa-heart-o');
  //   } else {
  //     likeButton.classList.remove('fa-heart-o');
  //     likeButton.classList.add('fa-heart');
  //   }
  // });

  // likeButton.addEventListener('click', async (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (!media.alreadyLiked) {
  //     media.like();
  //     document.querySelector(`#nbLikes_${media.id}`).textContent = media.likes;
  //     // likeButton.classList.remove('fa-regular');
  //     // likeButton.classList.add('fa-solid');
  //     const photographerLikesDisplay = document.querySelector('#nbLikes_footNote');
  //     photographerLikesDisplay.textContent = `${parseInt(photographerLikesDisplay.textContent, 10) + 1}`;
  //     likeButton.focus();
  //   } else {
  //     media.unlike();
  //     document.querySelector(`#nbLikes_${media.id}`).textContent = media.likes;
  //     // likeButton.classList.remove('fa-heart');
  //     // likeButton.classList.add('fa-heart-o');
  //     const photographerLikesDisplay = document.querySelector('#nbLikes_footNote');
  //     photographerLikesDisplay.textContent = `${parseInt(photographerLikesDisplay.textContent, 10) - 1}`;
  //     likeButton.focus();
  //   }
  // });

  // likeButton.addEventListener('keydown', (e) => {
  //   if (e.key === 'Enter') {
  //     likeButton.click();
  //     // if (media.alreadyLiked) {
  //     //   likeButton.classList.remove('fa-heart-o');
  //     //   likeButton.classList.add('fa-heart');
  //     // } else {
  //     //   likeButton.classList.remove('fa-heart');
  //     //   likeButton.classList.add('fa-heart-o');
  //     // }
  //   }
  // });

  return card;
}