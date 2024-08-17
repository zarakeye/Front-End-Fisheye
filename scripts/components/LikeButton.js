/**
 * Creates a LikeButton element for a media item.
 *
 * @param {object} photographer - The photographer object associated with the media item.
 * @param {object} media - The media item object.
 * @return {HTMLElement} The created LikeButton element.
 */
export function LikeButton (photographer, media) {
  const likeButton = document.createElement('button');

  likeButton.id = `likeId_${media.id}`;
  likeButton.classList.add('likeButton');
  likeButton.setAttribute('aria-label', 'Like');
  likeButton.setAttribute('aria-pressed', media.alreadyLiked);
  likeButton.innerHTML = media.alreadyLiked ? '<i class="fa fa-heart"></i>' : '<i class="fa fa-heart-o"></i>';

  const likeBtnActionnedEvent = new Event('likeBtnActionned', {
    bubbles: true
  });

/**
 * Handles the click event on the LikeButton element. Toggles the like status of the media item and updates the UI accordingly.
 *
 * @param {Event} e - The click event object.
 * @return {void} This function does not return anything.
 */
  function LikeButtonHandler(e) {
    e.preventDefault();

    if (media.alreadyLiked) {
      media.unlike();
      likeButton.previousElementSibling.textContent = media.likes;
      likeButton.setAttribute('aria-pressed', media.alreadyLiked);
      likeButton.dispatchEvent(likeBtnActionnedEvent);
      likeButton.innerHTML = '<i class="fa fa-heart-o"></i>';
    } else {
      media.like();
      likeButton.previousElementSibling.textContent = media.likes;
      likeButton.setAttribute('aria-pressed', media.alreadyLiked);
      likeButton.dispatchEvent(likeBtnActionnedEvent);
      likeButton.innerHTML = '<i class="fa fa-heart"></i>';
    }

    likeButton.focus();
  }

  likeButton.addEventListener('click', LikeButtonHandler);
  likeButton.addEventListener('Keydown', (e) => {
    if (e.key === 'Enter') {
      LikeButtonHandler(e);
    }
  });

  return likeButton;
}


