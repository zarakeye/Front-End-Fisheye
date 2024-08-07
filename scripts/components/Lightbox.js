import { Modal } from './Modal.js';
import { mediaFactory } from '../factories/media.factory.js';

export async function Lightbox(currentMedia) {
  // Creation of the DOM element which contains the lightbox
  const lightbox = document.createElement('aside');
  lightbox.id = 'lightbox';
  lightbox.setAttribute('aria-label', 'lightbox');

  // Creattion of a modal appended to the lightbox and filling it with the code of the lightbox
  const modal = Modal();
  lightbox.appendChild(modal);
  const modalSelector = lightbox.querySelector('.modal');

  // Retrieve the list of medias from the same photographer than the current one
  const selectedSort = document.querySelector('#sort .active').id;
  const medias = mediaFactory.sortMediasBy(await mediaFactory.photographerMedias(currentMedia.photographerId), selectedSort);

  const thumbnails = medias.map((media) => mediaFactory.thumbnail(media)).join('');
  Array.from(thumbnails).forEach((thumbnail) => thumbnail.removeAttribute('tabindex'));

  modalSelector.innerHTML += `
    <div id='go_to_previous_media' class='nav-lightbox'>
      <button class="previous_media" aria-label="Media Precedent">
        <i id='previous_media' class="fa fa-chevron-left nav-lightbox-btn" aria-label="Bouton Precedent"></i>
      </button>
    </div>
    <figure>
      <div class='media_wrapper'>
        ${thumbnails}
      </div>
      <figcaption>
        <p class='media_title'>${ currentMedia.title }</p>
      </figcaption>
    </figure>
    <div id='go_to_next_media' class='nav-lightbox'>
      <button class="next_media" aria-label="Media Suivant">
        <i id='next_media' class="fa fa-chevron-right nav-lightbox-btn" aria-label="Bouton Suivant"></i>
      </button>
    </div>
  `;


  // const thumbnailsList = lightbox.querySelectorAll('.media');

  let thumbnailSelector;
  for (const item of thumbnails/*List*/) {
    if (parseInt(item.getAttribute('data-id'), 10) !== parseInt(currentMedia.id, 10)) {
      item.style.display = 'none';
    } else {
      thumbnailSelector = item;
    }
  }
  const wrapper = modalSelector.querySelector('.media_wrapper');
  

  const thumbnailObject = new Image();
  thumbnailObject.src = thumbnailSelector.getAttribute('src');
  thumbnailObject.onload = () => {
    const { naturalWidth, naturalHeight } = thumbnailObject;

    if (naturalWidth > naturalHeight) {
      thumbnailSelector.style.width = wrapper.style.width;
    } else if (naturalWidth <= naturalHeight) {
      thumbnailSelector.style.height = wrapper.style.height;
    }
  }

  const closeBtn = modalSelector.querySelector('.close-modal');
  modalSelector.removeChild(closeBtn);

  // const nextMediaBtn = lightbox.querySelector('#next_media');
  const goToNextMedia = lightbox.querySelector('#go_to_next_media');
  const goToPreviousMedia = lightbox.querySelector('#go_to_previous_media');


  
  lightbox.addEventListener('keydown', (e) => {
    
  })

  goToNextMedia.appendChild(closeBtn);

  closeBtn.addEventListener('click', () => {
    document.querySelector('#lightbox').remove();
  });

  
  const focusableElements = lightbox.querySelectorAll('button');
  console.log('focusableElements', focusableElements);
  const firstFocusableElement = focusableElements[0];

  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  const previousMediaBtn = lightbox.querySelector('#previous_media');

  let currentMediaIndex = medias.findIndex((media) => media.id === currentMedia.id);

  const mediasLength = medias.length;

  function displayPreviousMedia() {
    // Compute the index of the previous media (which becomes the new displayed media)
    --currentMediaIndex;
    if (currentMediaIndex < 0) {
      currentMediaIndex = mediasLength - 1;
    }

    thumbnailsList.forEach((item) => {
      if (parseInt(item.getAttribute('data-id'), 10) !== parseInt(medias[currentMediaIndex].id, 10)) {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    });  
  }

  function displayNextMedia() {
    // Compute the index of the next media (which becomes the new displayed media)
    ++currentMediaIndex;
    if (currentMediaIndex >= medias.length) {
      currentMediaIndex = 0;
    }

    thumbnailsList.forEach((item) => {
      if (parseInt(item.getAttribute('data-id'), 10) !== parseInt(medias[currentMediaIndex].id, 10)) {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    });
  }

  previousMediaBtn.addEventListener('click', () => {
    displayPreviousMedia();    
  });

  
  lightbox.addEventListener('click', async (e) => {
    if (goToNextMedia.contains(e.target)) {
      displayNextMedia();
      // closeBtn.style.backgroundColor = '$quaternary-color-light';

    }
    if (goToPreviousMedia.contains(e.target)) {
      displayPreviousMedia();
    }
  });

  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        displayPreviousMedia();
        break;

      case 'ArrowRight':
        displayNextMedia();
        break;

      case 'tab':
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
        break;
    }
    if (e.key === 'ArrowLeft') {
      displayPreviousMedia();
    } else if (e.key === 'ArrowRight') {
      displayNextMedia();
    }
  });

  return lightbox;
}