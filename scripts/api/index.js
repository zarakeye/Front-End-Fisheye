export const Api = {
  photographers: {
/**
 * Retrieves the list of photographers from the JSON file.
 *
 * @return {Promise<Array<Object>>} A promise that resolves to an array of photographer objects.
 * @throws {Error} If an error occurs while fetching the data.
 */
    getPhotographers : async function() {
      try {
        return await fetch('../../data/photographers.json')
          .then((response) => response.json())
          .then((datas) => datas.photographers);
      } catch (error) {
        console.error('an error occured when fetching photographers datas : ', error);
      }
    },
    /**
     * Retrieves a photographer object by its ID.
     *
     * @param {number} photographerId - The ID of the photographer to retrieve.
     * @return {Promise<Object>} A promise that resolves to the photographer object, or undefined if not found.
     */
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
    /**
     * Retrieves the list of media from the JSON file.
     *
     * @return {Promise<Array<Object>>} A promise that resolves to an array of media objects.
     * @throws {Error} If an error occurs while fetching the data.
     */
    getMedias : async function () {
        try {
          return await fetch('../../data/photographers.json')
            .then((response) => response.json())
            .then((datas) => datas.media);
        } catch (error) {
            console.error('an error occured when fetching medias datas : ', error);
        }
    },
    /**
     * Retrieves a list of media objects associated with a specific photographer.
     *
     * @param {number} photographerId - The ID of the photographer.
     * @return {Promise<Array<Object>>} A promise that resolves to an array of media objects.
     */
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