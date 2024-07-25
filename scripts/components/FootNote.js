import { photographerFactory } from "../factories/photographer.factory.js";

export async function FootNote(photographer, parentDOMElement) {
  const footNote = document.createElement('aside');
  footNote.id = 'footNote';
  parentDOMElement.appendChild(footNote);
  footNote.innerHTML = `
    <p><span id='nbLikes_footNote'>${await photographerFactory.totalLikes(photographer)}</span> <i class="fa fa-heart"></i></p>
    <p>${photographer.price}€ / jour</p>
  `;

}