export class Photographer {
  constructor(data) {
    this._id = data.id;
    this._name = data.name;
    this._city = data.city;
    this._country = data.country;
    this._tagline = data.tagline;
    this._price = data.price;
    this._portrait = data.portrait;
    this._likes = 0;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get city() {
    return this._city;
  }

  get country() {
    return this._country;
  }

  get tagline() {
    return this._tagline;
  }

  get price() {
    return this._price;
  }

  get likes() {
    return this._likes;
  }

  likes(likes) {
    for (const like of likes) {
      this._likes += like;
    }
  }

  like() {
    this._likes += 1;
  }

  unlike() {
    this._likes -= 1;
  }
}