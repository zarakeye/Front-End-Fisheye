/**
 * Creates a new Photographer object with the provided data.
 *
 * @param {Object} photographerDatas - The data for the photographer.
 * @param {number} photographerDatas.id - The ID of the photographer.
 * @param {string} photographerDatas.name - The name of the photographer.
 * @param {string} photographerDatas.city - The city of the photographer.
 * @param {string} photographerDatas.country - The country of the photographer.
 * @param {string} photographerDatas.tagline - The tagline of the photographer.
 * @param {number} photographerDatas.price - The price of the photographer.
 * @param {string} photographerDatas.portrait - The portrait image file name of the photographer.
 * @return {Photographer} A new Photographer object with the provided data.
 */
export function Photographer (photographerDatas) {
    this.id = photographerDatas.id;
    this.name = photographerDatas.name;
    this.city = photographerDatas.city;
    this.country = photographerDatas.country;
    this.tagline = photographerDatas.tagline;
    this.price = photographerDatas.price;
    this.portrait = photographerDatas.portrait;
    this.likes = null;
    return this;
}
