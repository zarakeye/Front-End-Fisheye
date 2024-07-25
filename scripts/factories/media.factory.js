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
    console.log('medias: ', mediasObjects);
    
    return mediasObjects;
  },

  createCard: (media, parentDOMElement) => {
    const mediasGrid = document.createElement("main");
    mediasGrid.className = "mediasGrid";
    if (! mediaFactory.isMediaExist(media)) {
      console.log(`Le fichier medias/photographers/${media.photographerId}/media/${media.media} n\'existe pas`);
    } else {
      return MediaCard(media, parentDOMElement);
    }
  },

  rightThumbnail: (media) => {
    if (media.media.endsWith('.jpg')) {
      return `
        <img
          id='media_${media.id}'
          class='media'
          src="assets/medias/photographers/${media.photographerId}/media/${media.media}"
          alt="${media.title}"
        >
      `;
    } else if (media.media.endsWith('.mp4')) {
      return `
        <video
          id='media_${media.id}'
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

  sortByPopularity: (medias, parentDOMElement) => {
    medias.sort((a, b) => b.likes - a.likes);
    console.log('medias sorted by popularity: ', medias);
    const cards = [];
    medias.forEach((media) => {
      cards.push(mediaFactory.createCard(media, parentDOMElement));
    });
    console.log('cards by popularity: ', cards);
    mediaFactory.displayMediasCardsGrid(cards, parentDOMElement);
    return medias;
  },

  sortByDate: (medias, parentDOMElement) => {
    console.log('medias before sort: ', medias);
    medias.sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log('medias sorted by date: ', medias);
    const cards = [];
    medias.forEach((media) => {
      cards.push(mediaFactory.createCard(media, parentDOMElement));
    });
    console.log('cards by date: ', cards);
    mediaFactory.displayMediasCardsGrid(cards, parentDOMElement);
    return medias;
  },

  sortByTitle: (medias, parentDOMElement) => {
    medias.sort((a, b) => a.title.localeCompare(b.title));
    console.log('cards sorted by title: ', medias);
    const cards = [];
    medias.forEach((media) => {
      cards.push(mediaFactory.createCard(media, parentDOMElement));
    });
    console.log('cards by title: ', cards);
    mediaFactory.displayMediasCardsGrid(cards, parentDOMElement);
    return medias;
  },

  displayMediasCardsGrid: (cards, parentDOMElement) => {
    console.log('cards to display: ', cards);
    parentDOMElement.innerHTML = '';
    cards.forEach((card) => {
      parentDOMElement.appendChild(card);
    })
  }
}
