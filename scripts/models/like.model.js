export class Like {
  constructor(id) {
    if (Like.like) {
      return Like.instance;
    }

    Like.like = true;
    Like.instance = this;
  }

  delete () {
    delete this;
  }
}
