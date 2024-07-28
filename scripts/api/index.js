export const Api = {
  photographers: {
    getPhotographers : async function() {
      try {
        const response = await fetch('../../data/photographers.json');
        const datas = await response.json();

        return datas.photographers;
      } catch (error) {
        console.log('an error occured when fetching photographers datas : ', error);
      }
    }
  },

  medias: {
    getMedias : async function () {
        try {
            const response = await fetch('../../data/photographers.json');
            const datas = await response.json();
            
            return datas.media;
        } catch (error) {
            console.log('an error occured when fetching medias datas : ', error);
        }
    }
  }
}