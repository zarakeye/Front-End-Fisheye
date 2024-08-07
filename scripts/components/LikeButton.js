import { mediaFactory } from "../factories/media.factory.js";
import { photographerFactory } from "../factories/photographer.factory.js";
import { Photographer } from "../models/photographer.model.js";

export function LikeButton (media) {
  const likeButton = document.createElement('button');

  likeButton.id = `likeId_${media.id}`;
  likeButton.classList.add('likeButton');
  likeButton.setAttribute('aria-label', 'Like');
  likeButton.setAttribute('aria-pressed', media.alreadyLiked);
  likeButton.innerHTML = media.alreadyLiked ? '<i class="fa fa-heart"></i>' : '<i class="fa fa-heart-o"></i>';

  likeButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const photographer = await photographerFactory.photographer(media.photographerId);

    if (media.alreadyLiked) {
      media.unlike();
      likeButton.previousElementSibling.textContent = media.likes;
      const footNote = document.querySelector('#nbLikes_footNote');
      photographer.likes = --footNote.textContent;
      likeButton.innerHTML = '<i class="fa fa-heart-o"></i>';
    } else {
      media.like();
      likeButton.previousElementSibling.textContent = media.likes;
      const footNote = document.querySelector('#nbLikes_footNote');
      photographer.likes = ++footNote.textContent
      likeButton.innerHTML = '<i class="fa fa-heart"></i>';
    }
  });

  return likeButton;
}


