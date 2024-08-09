import { photographerFactory } from "../factories/photographer.factory.js";

export function FootNote(photographer, photographerMedias) {
  const footNote = document.createElement('aside');
  footNote.id = 'footNote';
  let nbLikes = photographerFactory.totalLikes(photographerMedias);
  footNote.innerHTML = `
    <p><span id='nbLikes_footNote' aria-label='nombre de likes de ${photographer.name}' class='likes'>${nbLikes}</span> <i class="fa fa-heart"></i></p>
    <p aria-label='prix journalier de ${photographer.name}'>${photographer.price}€ / jour</p>
  `;

  const nbLikesFootNote = footNote.querySelector('#nbLikes_footNote');

  document.addEventListener('likeBtnActionned', (e) => {
    nbLikesFootNote.textContent = photographerFactory.totalLikes(photographerMedias);
  });

  return footNote;
}