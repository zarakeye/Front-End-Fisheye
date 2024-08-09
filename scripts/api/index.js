export const Api = {
  datas: {
    getDatas: async function () {
      try {
        const response = await fetch('../../data/photographers.json');
        const datas = await response.json();
        return datas;
      } catch (error) {
        console.error('an error occured when fetching datas : ', error);
      }
    }
  },

  photographers: {
    getPhotographers : async function() {
      try {
        return await Api.datas.getDatas().then((datas) => datas.photographers);
      } catch (error) {
        console.error('an error occured when fetching photographers datas : ', error);
      }
    },
    getPhotographerById : async function(photographerId) {
      try {
        return await Api.photographers.getPhotographers().then((photographers) => photographers.find((photographer) => photographer.id === photographerId));
      } catch (error) {
        console.error('an error occured when fetching photographer datas : ', error);
      }
    }
  },

  medias: {
    getMedias : async function () {
        try {
          return await Api.datas.getDatas().then((datas) => datas.media);
        } catch (error) {
            console.error('an error occured when fetching medias datas : ', error);
        }
    },
    getMediasByPhotographerId : async function(photographerId) {
      try {
        return await Api.medias.getMedias().then((medias) => medias.filter((media) => media.photographerId === photographerId));
      } catch (error) {
        console.error('an error occured when fetching medias datas : ', error);
      }
    }
  }
}