import { photographerFactory } from "../factories/photographer.factory.js";

/**
 * Creates a FootNote element with the given photographer and their medias.
 *
 * @param {Object} photographer - The photographer object.
 * @param {Array} photographerMedias - The array of medias for the photographer.
 * @return {HTMLElement} The created FootNote element.
 */
export function FootNote(photographer, photographerMedias) {
  const footNote = document.createElement('aside');
  footNote.id = 'footNote';
  let nbLikes = photographerFactory.totalLikes(photographerMedias);
  footNote.innerHTML = `
    <p><span id='nbLikes_footNote' aria-label='nombre de likes de ${photographer.name} ${nbLikes}' class='likes' tabindex='0'>${nbLikes}</span> <i class="fa fa-heart"></i></p>
    <p aria-label='prix journalier de ${photographer.name} ${photographer.price}€ par jour' tabindex='0'>${photographer.price}€ / jour</p>
  `;

  const nbLikesFootNote = footNote.querySelector('#nbLikes_footNote');

  document.addEventListener('likeBtnActionned', () => {
    nbLikesFootNote.textContent = photographerFactory.totalLikes(photographerMedias);
  });

  return footNote;
}