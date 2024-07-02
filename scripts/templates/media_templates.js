/**
 * Generates the DOM for a media card.
 *
 * @param {Object} media - The media object containing information about the media.
 * @param {number} media.id - The ID of the media.
 * @param {number} media.photographerId - The ID of the photographer who took the media.
 * @param {string} media.title - The title of the media.
 * @param {string} media.image - The path to the image file of the media.
 * @param {number} media.likes - The number of likes the media has.
 * @param {string} media.date - The date the media was taken.
 * @param {number} media.price - The price of the media.
 * @return {string} The HTML string representing the media card.
 */
export function mediaTemplate(media) {
  const { id, photographerId, title, image, likes, video, date, price } = media;

  function imageCardTemplate() {
    const imageCard = `
      <article class='media_card'>
        <img class='media' src='assets/images/photographers/${photographerId}/media/${image}' alt='${title}'>
        <div class='media_description'>
          <p class='media_title'>${title}</p>
          <p class='media_likes'>${likes} <i class="fa-solid fa-heart"></i></p>
        </div>
      </article>
    `;

    return imageCard;
  }

  function videoCardTemplate() {
    const videoCard = `
      <article class='media_card'>
        <video class='media' src='assets/images/photographers/${photographerId}/media/${video}' alt='${title}'></video>
        <div class='media_description'>
          <p class='media_title'>${title}</p>
          <p class='media_likes'>${likes} <i class="fa-solid fa-heart"></i></p>
        </div>
      </article>
    `;

    return videoCard;
  }

  function lightboxTemplate(media) {
    const lightbox = `
      <div class='lightbox modal'>
        <div class='go_to_previous_media'>
          <i class="fa-solid fa-chevron-left"></i>
        </div>
        <div class='lightbox_media'>
          <img src='assets/images/photographers/${photographerId}/media/${video}' alt='${title}'>
        </div>
        <div class='go_to_next_media'>
          <i class="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    `;

    return lightbox;
  }

  return { imageCardTemplate, videoCardTemplate, lightboxTemplate };
}