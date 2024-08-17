import { Modal } from './Modal.js';
import { mediaFactory } from '../factories/media.factory.js';

export async function Lightbox(currentMedia, medias) {
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
  medias = mediaFactory.sortMediasBy(medias, selectedSort);

  const thumbnailsStrings = medias.map((media) => mediaFactory.thumbnail(media)).join('');
  
  modalSelector.innerHTML += `
    <div id='go_to_previous_media' class='nav-lightbox'>
      <button class="previous_media navBtn" aria-label="Media Precedent">
        <i id='previous_media' class="fa fa-chevron-left nav-lightbox-btn"></i>
      </button>
    </div>
    <figure>
      <div class='media_wrapper'>
        ${thumbnailsStrings}
      </div>
      <figcaption aria-label="Titre: ${currentMedia.title}" tabindex="0">
        <p class='media_title'>${ currentMedia.title }</p>
      </figcaption>
    </figure>
    <div id='go_to_next_media' class='nav-lightbox'>
      <button class="next_media navBtn" aria-label="Media Suivant" tabindex="0" role="button">
        <i id='next_media' class="fa fa-chevron-right nav-lightbox-btn"></i>
      </button>
    </div>
  `;

  modalSelector.setAttribute('aria-modal', 'true');
  modalSelector.setAttribute('role', 'dialog');
  const mediaTitle = modalSelector.querySelector('.media_title');

  const figCaption = modalSelector.querySelector('figcaption');

  const nextBtn = lightbox.querySelector('.next_media');
  nextBtn.focus();
  const thumbnails = lightbox.querySelectorAll('.media');
  Array.from(thumbnails).forEach((thumbnail) => thumbnail.removeAttribute('tabindex'));

  let thumbnailSelector;
  for (const item of thumbnails) {
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

  const goToNextMedia = lightbox.querySelector('#go_to_next_media');
  const goToPreviousMedia = lightbox.querySelector('#go_to_previous_media');

  goToNextMedia.appendChild(closeBtn);

  const closeModalEvent = new Event('closeModal', {
    bubbles: true
  });

  closeBtn.addEventListener('click', () => {
    lightbox.dispatchEvent(closeModalEvent);
    document.querySelector('#lightbox').remove();
  });

  const previousMediaBtn = lightbox.querySelector('#previous_media');

  let currentMediaIndex = medias.findIndex((media) => media.id === currentMedia.id);

  const mediasLength = medias.length;

  function displayPreviousMedia() {
    // Compute the index of the previous media (which becomes the new displayed media)
    --currentMediaIndex;
    if (currentMediaIndex < 0) {
      currentMediaIndex = mediasLength - 1;
    }

    figCaption.setAttribute('aria-label', `Titre: ${medias[currentMediaIndex].title}`);
    mediaTitle.textContent = medias[currentMediaIndex].title;

    thumbnails.forEach((item) => {
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

    figCaption.setAttribute('aria-label', `Titre: ${medias[currentMediaIndex].title}`);
    mediaTitle.textContent = medias[currentMediaIndex].title;

    thumbnails.forEach((item) => {
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
    }
    if (goToPreviousMedia.contains(e.target)) {
      displayPreviousMedia();
    }
  });

  const focusableElements = modalSelector.querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  modalSelector.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        displayPreviousMedia();
        break;

      case 'ArrowRight':
        displayNextMedia();
        break;

      case 'Tab':
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault();
            lastFocusableElement.focus();
          }
        } else if (document.activeElement === lastFocusableElement) {
          e.preventDefault();
          firstFocusableElement.focus();
        }
        break;
    }
  });

  return lightbox;
}