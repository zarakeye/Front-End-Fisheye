export class Media {
  constructor(data) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    if (data.hasOwnProperty('video')) {
      this._media = data.video;
    } else if (data.hasOwnProperty('image')) {
      this._media = data.image;
    }
    this._likes = data.likes;
    this.$alreadyLiked = false;
    this._date = data.date;
  }

  get id() {
    return this._id;
  }

  get photographerId() {
    return this._photographerId;
  }

  get title() {
    return this._title;
  }

  get media() {
    return this._media;
  }

  get likes() {
    return this._likes;
  }

  like() {
    this.$alreadyLiked = true;
    this._likes += 1;
  }

  unlike() {
    this.$alreadyLiked = false;
    this._likes -= 1;
  }

  get date() {
    return this._date;
  }

  get isImage() {
    return !!this._image;
  }

  get alreadyLiked() {
    return this.$alreadyLiked;
  }

  // Setters
  set media(media) {
    this._media = media;
  }

  set likes(likes) {
    this._likes = likes;
  }

  isVideo() {
    if (filename.test(/\.mp4$/i)) {
      return true;
    }
  }
} 