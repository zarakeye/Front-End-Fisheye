export class FootNoteComponent {
  constructor(photographer, main) {
    this._photographer = photographer;
    this._main = main;
  }

  create() {
    const footNote = document.createElement('aside');
    footNote.classList.add('footnote');
    footNote.innerHTML = `
      <p><span id='nbLikes_footNote'>${this._photographer._likes}</span> <i class="fa-solid fa-heart"></i></p>
      <p>${this._photographer._price}€ / jour</p>
    `;

    this._main.appendChild(footNote);
    return footNote;
  }
}