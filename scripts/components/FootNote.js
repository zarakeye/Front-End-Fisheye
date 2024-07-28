import { photographerFactory } from "../factories/photographer.factory.js";

export async function FootNote(photographer, parentDOMElement) {
  const footNote = document.createElement('aside');
  footNote.id = 'footNote';
  let nbLikes = await photographerFactory.totalLikes(photographer);
  footNote.innerHTML = `
    <p><span id='nbLikes_footNote' aria-label='nombre de likes de ${photographer.name}' class='likes'>${nbLikes}</span> <i class="fa fa-heart"></i></p>
    <p aria-label='prix journalier de ${photographer.name}'>${photographer.price}€ / jour</p>
  `;

  document.body.appendChild(footNote);

}