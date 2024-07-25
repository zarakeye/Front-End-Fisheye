import { Modal } from './Modal.js';
import { mediaFactory } from '../factories/media.factory.js';

export async function Lightbox(currentMedia, parentDOMElement) {
  // Creation of the DOM element which contains the lightbox
  const lightbox = document.createElement('aside');
  lightbox.id = 'lightbox';
  parentDOMElement.appendChild(lightbox);

  // Creattion of a modal appended to the lightbox and filling it with the code of the lightbox
  const modal = Modal();
  lightbox.appendChild(modal);
  const modalSelector = lightbox.querySelector('.modal');
  modalSelector.innerHTML = `
    <div id='go_to_previous_media' class='nav-lightbox'>
      <i id='previous_media' class="fa fa-chevron-left nav-lightbox-btn"></i>
    </div>
    <figure>
      ${mediaFactory.rightThumbnail(currentMedia)}
      <figcaption>${ currentMedia.title }</figcaption>
    </figure>
    <div id='go_to_next_media' class='nav-lightbox'>
      <i id='close-lightbox_btn' class='fa fa-times'></i>
      <i id='next_media' class="fa fa-chevron-right nav-lightbox-btn"></i>
    </div>
  `;

  const closeBtn = modalSelector.querySelector('#close-lightbox_btn');
  closeBtn.addEventListener('click', () => {
    parentDOMElement.querySelector('#lightbox').remove();
  });

  const figureSelector = lightbox.querySelector('figure');
  const previousMediaBtn = lightbox.querySelector('#previous_media');
  console.log('previousMediaBtn: ', previousMediaBtn);

  // Retrieve the list of medias from the same photographer than the current one 
  const medias = await mediaFactory.photographerMedias(currentMedia.photographerId);
  let currentMediaIndex = medias.findIndex((media) => media.id === currentMedia.id);

  console.log('currentMediaIndex: ', currentMediaIndex);
  const mediasLength = medias.length;

  previousMediaBtn.addEventListener('click', () => {
    // Compute the index of the previous media (which becomes the new displayed media)
    --currentMediaIndex;
    if (currentMediaIndex < 0) {
      currentMediaIndex = mediasLength - 1;
    }

    // Update the display with the new current media
    figureSelector.innerHTML = `
      ${mediaFactory.rightThumbnail(medias[currentMediaIndex])}
      <figcaption>${ medias[currentMediaIndex].title }</figcaption>
    `;
  });

  const nextMediaBtn = lightbox.querySelector('#next_media');
  // Compute the index of the next media (which becomes the new displayed media)
  nextMediaBtn.addEventListener('click', async () => {
    ++currentMediaIndex;
    if (currentMediaIndex >= medias.length) {
      currentMediaIndex = 0;
    }

    // Update the display with the new current media
    figureSelector.innerHTML = `
      ${mediaFactory.rightThumbnail(medias[currentMediaIndex])}
      <figcaption>${ medias[currentMediaIndex].title }</figcaption>
    `;
  });

  return lightbox;
}