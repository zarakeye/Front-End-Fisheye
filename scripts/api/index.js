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
        },

        // getPhotographerById : function(id) {
        //     try {
        //         return this.getPhotographers().find(elt => elt.id === id);
        //     } catch (error) {
        //         console.log("an error occured when fetching photographer's datas : ", error);
        //     }
        // }
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
        },

        // getMediasByPhotographerId : function(id) {
        //     try {
        //         return this.getMedias().filter(elt => elt.photographerId === id);
        //     } catch (error) {
        //         console.log("an error occured when fetching photographer's medias datas : ", error);
        //     }
        // }
    }
}