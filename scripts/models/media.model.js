export function Media(mediaDatas) {
  this.id = mediaDatas.id;
  this.photographerId = mediaDatas.photographerId;
  this.title = mediaDatas.title;
  if (mediaDatas.video) {
      this.media = mediaDatas.video;
  } else if (mediaDatas.image) {
      this.media = mediaDatas.image;
  }
  this.likes = mediaDatas.likes;
  this.alreadyLiked = false;
  this.date = mediaDatas.date;


  this.like = () => {
      this.likes += 1;
      this.alreadyLiked = true;
  },

  this.unlike = () => {
      this.likes -= 1;
      this.alreadyLiked = false;
  }

  return this;
}