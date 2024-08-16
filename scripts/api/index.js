export const Api = {
  photographers: {
    getPhotographers : async function() {
      try {
        return await fetch('../../data/photographers.json')
          .then((response) => response.json())
          .then((datas) => datas.photographers);
      } catch (error) {
        console.error('an error occured when fetching photographers datas : ', error);
      }
    },
    getPhotographerById : async function(photographerId) {
      try {
        return await fetch('../../data/photographers.json')
          .then((response) => response.json())
          .then((datas) => datas.photographers)
          .then((photographers) => photographers.find((photographer) => photographer.id === photographerId));
      } catch (error) {
        console.error('an error occured when fetching photographer datas : ', error);
      }
    }
  },

  medias: {
    getMedias : async function () {
        try {
          return await fetch('../../data/photographers.json')
            .then((response) => response.json())
            .then((datas) => datas.media);
        } catch (error) {
            console.error('an error occured when fetching medias datas : ', error);
        }
    },
    getMediasByPhotographerId : async function(photographerId) {
      try {
        return await fetch('../../data/photographers.json')
        .then((response) => response.json())
        .then((datas) => datas.media).then((medias) => medias.filter((media) => media.photographerId === photographerId));
      } catch (error) {
        console.error('an error occured when fetching medias datas : ', error);
      }
    }
  }
}