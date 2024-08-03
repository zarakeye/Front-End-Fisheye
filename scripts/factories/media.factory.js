import { Api } from "../api/index.js";
import { MediaCard } from "../components/MediaCard.js";
import { Media } from "../models/media.model.js";

export const mediaFactory =  {
  photographerMedias: async (photographerId) => {
    const allMediasDatas = await Api.medias.getMedias()
    const photographerMediasDatas = allMediasDatas.filter((media) => media.photographerId === photographerId);
    const mediasObjects = [];
    photographerMediasDatas.map((media) => {
      media.isAlreadyLiked = false;
      mediasObjects.push(new Media(media));
    });
    
    return mediasObjects;
  },

  createCard: (media) => {
    const mediasGrid = document.createElement("main");
    mediasGrid.className = "mediasGrid";
    if (! mediaFactory.isMediaExist(media)) {
      console.log(`Le fichier medias/photographers/${media.photographerId}/media/${media.media} n\'existe pas`);
    } else {
      return MediaCard(media);
    }
  },

  thumbnail: (media) => {
    if (media.media.endsWith('.jpg')) {
      return `
        <img
          id='media_${media.id}'
          data-id="${media.id}"
          class='media'
          src="assets/medias/photographers/${media.photographerId}/media/${media.media}"
          alt="${media.title}"
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
        >
        </video>
      `;
    }
  },

  isMediaExist: async (media) => {
    const filePath = `assets/medias/photographers/${media.photographerId}/media/${ media.media}`;

    const { status } = await fetch(filePath);
    if (status === 404) {
      return false;
    } else if (status === 200) {
      return true;
    }
  },

  sortBy: (medias, sorType) => {
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

    console.log('sortedCards', sortedCards);

    return sortedCards;
  }
}
