export class FootNoteComponent {
  constructor(photographerObject) {
    this._photographerObject = photographerObject;
  }

  create() {
    const footNote = document.createElement('aside');
    footNote.innerHTML = `
      <p><span id='nbLikes_footNote'> ${this._photographerObject._likes}</span><i class="fa-solid fa-heart"></i></p>
      <p>${this._photographerObject._price}€ / jour</p>
    `;
    return footNote;
  }
}