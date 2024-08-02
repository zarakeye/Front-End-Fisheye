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
