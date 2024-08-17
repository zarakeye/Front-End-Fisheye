import { MediaCard } from "../components/MediaCard.js";

export const mediaFactory =  {
  /**
   * Creates a media card for a given photographer and media.
   *
   * @param {object} photographer - The photographer object.
   * @param {object} media - The media object.
   * @return {object} The created MediaCard object or null if media does not exist.
   */
  createCard: (photographer, media) => {
    const mediasGrid = document.createElement("main");
    mediasGrid.className = "mediasGrid";
    if (! mediaFactory.isMediaExist(media)) {
      console.log(`Le fichier medias/photographers/${media.photographerId}/media/${media.media} n'existe pas`);
    } else {
      return MediaCard(photographer, media);
    }
  },

  /**
   * Returns an HTML string representing a media thumbnail.
   *
   * @param {object} media - The media object containing information about the media.
   * @return {string} An HTML string representing the media thumbnail.
   */
  thumbnail: (media) => {
    if (media.media.endsWith('.jpg')) {
      return `
        <img
          id='media_${media.id}'
          data-id="${media.id}"
          class='media'
          src="assets/medias/photographers/${media.photographerId}/media/${media.media}"
          alt="${media.title}"
          aria-label="${media.title}"
        >
      `;
    } else if (media.media.endsWith('.mp4')) {
      return `
        <video
          id='media_${media.id}'
          data-id="${media.id}"
          class='media'
          src="assets/medias/photographers/${media.photographerId}/media/${media.media}"
          alt="${media.title}"
          aria-label="${media.title}"
          controls
        >
        </video>
      `;
    }
  },

/**
 * Checks if a media file exists.
 *
 * @param {Object} media - The media object containing information about the media.
 * @param {string} media.photographerId - The ID of the photographer.
 * @param {string} media.media - The name of the media file.
 * @return {Promise<boolean>} A Promise that resolves to true if the media file exists, false otherwise.
 */
  isMediaExist: async (media) => {
    const filePath = `assets/medias/photographers/${media.photographerId}/media/${ media.media}`;

    const { status } = await fetch(filePath);
    if (status === 404) {
      return false;
    } else if (status === 200) {
      return true;
    }
  },

  /**
   * Sorts an array of media objects based on the specified sort type.
   *
   * @param {Object[]} medias - The array of media objects to be sorted.
   * @param {string} sorType - The type of sorting to be applied. Can be 'popularity', 'date', or 'title'.
   * @return {Object[]} The sorted array of media objects.
   */
  sortMediasBy: (medias, sorType) => {
    let sortedMedias = [];
    
    switch (sorType) {
      case 'popularity':
        sortedMedias.push(...medias.sort((a, b) => b.likes - a.likes));
        break;

      case 'date':
        sortedMedias.push(...medias.sort((a, b) => new Date(b.date) - new Date(a.date)));
        break;

      case 'title':
        sortedMedias.push(...medias.sort((a, b) => a.title.localeCompare(b.title)));
        break;
    }

    return sortedMedias;
  },

  /**
   * Sorts an array of media cards based on the specified sort type.
   *
   * @param {Array} cards - The array of media cards to be sorted.
   * @param {string} sorType - The type of sorting to be applied. Can be 'popularity', 'date', or 'title'.
   * @return {Array} The sorted array of media cards.
   */
  sortCardsBy: (cards, sorType) => {
    let sortedCards = [];
    switch (sorType) {
      case 'popularity':
        sortedCards.push(...cards.sort((a, b) => b.querySelector('.media_likes span').textContent - a.querySelector('.media_likes span').textContent));
        break;

      case 'date':
        sortedCards.push(...cards.sort((a, b) => new Date(b.querySelector('.media_date').textContent) - new Date(a.querySelector('.media_date').textContent)));
        break;

      case 'title':
        sortedCards.push(...cards.sort((a, b) => a.querySelector('.media_title').textContent.localeCompare(b.querySelector('.media_title').textContent)));
        break;
    }

    return sortedCards;
  }
}
