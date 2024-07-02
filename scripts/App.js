import { Photographer } from "./models/Photographer.js";
import { Media } from "./models/Media.js";
import { PhotographerApi } from "./api/Api.js";
import { MediaApi } from "./api/Api.js";
import { PhotographerCard } from './templates/PhotographerCard.js';
import { PhotographerHeader } from './templates/PhotographerHeader.js';
import { MediaCard } from './templates/MediaCard.js';

class App {
  constructor() {
    this._photographerApi = new PhotographerApi('../data/photographers.json');
    this._mediaApi = new MediaApi('../data/photographers.json');
  }

  generatePageFromUrl() {
    const url = window.location.href;

    console.log('url: ', url);

    if(url.includes('/index')) {
      console.log('index page');
      this.createIndexPage();
    } else if(url.includes('/photographer')) {
      console.log('photographer page');
      this.createPhotographerPage();
    }
  }

  createIndexPage() {
    const photographersWrapper = document.querySelector(".photographers_wrapper");

    const photographersDatas = this._photographerApi.getPhotographers();
    console.log('photographersDatas: ', photographersDatas);
    photographersDatas
    .map(photographer => new Photographer(photographer))
    .forEach(photographer => {
      const photographerCardDOM = new PhotographerCard(photographer).photographerCardTemplate();
      photographersWrapper.innerHTML += photographerCardDOM;
    });

    console.log('photographers: ', photographersDatas);
  }

  createPhotographerPage() {
    const idParam = parseInt(url.searchParams.get('id'), 10);
    const mediasDatas = this._mediaApi.getMediasByPhotographerId(idParam);
    const photographer = this._photographerApi.getPhotographerById(idParam);
    const photographerPage = document.querySelector(".photographer_page");
    const photographerHeader = new PhotographerHeader(photographer);
    photographerPage.innerHTML += photographerHeader.createPhotographerPageHeader();

    const mediasWrapper = document.createElement(".medias_wrapper");
    mediasDatas
      .map(media => new Media(media))
      .forEach(media => {
        if (media.isVideo()) {
          const video = document.createElement("video");
          video.src = `assets/images/photographers/${idParam}/media/${media.media}`;
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnailDataToUrl = canvas.toDataURL('image/jpeg');
          console.log('thumbnail: ', thumbnailDataToUrl);
          media.media = thumbnailDataToUrl;
        }

        const mediaCard = new MediaCard(media);
        mediasWrapper.innerHTML += mediaCard.movieCardTemplate();
        photographerPage.appendChild(mediasWrapper);
      });
    // for (const media of mediasDatas) {
    //   const mediaCard = new MediaCard(media);
    //   // const mediasWrapper = document.querySelector(".medias_wrapper");
    //   mediasWrapper.innerHTML += mediaCard.movieCardTemplate();
    // }
  }
  // async main() {
  //   const { photographers } = await this.photographerApi.getPhotographers();
  //   displayPhotographersDatas(photographers);
  //   const url = new URL(window.location.href);
  //   const searchParams = url.searchParams;
  //   const idParam = parseInt(searchParams.get('id'), 10);
  //   displayPhotograherHeader(idParam);
  //   displayMediasByPhotographerId(idParam);
  // }
}

const app = new App();
app.generatePageFromUrl();