export class FooterComponent {
  constructor(photographerObject) {
    this._photographerObject = photographerObject;
  }

  async create() {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.innerHTML = `
      <p><span id='nbLikes_footer'> ${this._photographerObject._likes}</span><i class="fa-solid fa-heart"></i></p>
      <p>${this._photographerObject._price}€ / jour</p>
    `;
    return footer;
  }
}