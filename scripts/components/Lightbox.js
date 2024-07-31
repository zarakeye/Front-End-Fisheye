import { Modal } from './Modal.js';
import { mediaFactory } from '../factories/media.factory.js';

export async function Lightbox(currentMedia) {
  // Creation of the DOM element which contains the lightbox
  const lightbox = document.createElement('aside');
  lightbox.id = 'lightbox';
  lightbox.setAttribute('aria-label', 'lightbox');
  document.body.appendChild(lightbox);

  // Creattion of a modal appended to the lightbox and filling it with the code of the lightbox
  const modal = Modal();
  lightbox.appendChild(modal);
  const modalSelector = lightbox.querySelector('.modal');

  // Retrieve the list of medias from the same photographer than the current one
  // const sortOptions = document.querySelectorAll('#sort .option');
  // console.log('sortOptions', sortOptions);
  const selectedSort = document.querySelector('#sort div.active').id;

  const medias = await mediaFactory.photographerMedias(currentMedia.photographerId);
  const sortedMedias = mediaFactory.sortBy(medias, selectedSort);
  console.log('sortedMedias', sortedMedias);

  let thumbnails = '';
  sortedMedias.forEach((media) => {
    thumbnails += `${mediaFactory.thumbnail(media)}`;
  });
  console.log('thumbnails', thumbnails);

  const thumbnail = mediaFactory.thumbnail(currentMedia);

  modalSelector.innerHTML = `
    <div id='go_to_previous_media' class='nav-lightbox'>
      <i id='previous_media' class="fa fa-chevron-left nav-lightbox-btn" aria-label="Bouton Precedent"></i>
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
      <i id='close-lightbox_btn' class='fa fa-times'></i>
      <i id='next_media' class="fa fa-chevron-right nav-lightbox-btn" aria-label="Bouton Suivant"></i>
    </div>
  `;


  const thumbnailsList = lightbox.querySelectorAll('.media');

  let thumbnailSelector;
  for (const item of thumbnailsList) {
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

  const closeBtn = modalSelector.querySelector('#close-lightbox_btn');
  closeBtn.addEventListener('click', () => {
    document.querySelector('#lightbox').remove();
  });

  const figureSelector = lightbox.querySelector('figure');
  const previousMediaBtn = lightbox.querySelector('#previous_media');

  
  let currentMediaIndex = sortedMedias.findIndex((media) => media.id === currentMedia.id);

  const mediasLength = sortedMedias.length;

  function displayPreviousMedia() {
    // Compute the index of the previous media (which becomes the new displayed media)
    --currentMediaIndex;
    if (currentMediaIndex < 0) {
      currentMediaIndex = mediasLength - 1;
    }

    thumbnailsList.forEach((item) => {
      if (parseInt(item.getAttribute('data-id'), 10) !== parseInt(sortedMedias[currentMediaIndex].id, 10)) {
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
      if (parseInt(item.getAttribute('data-id'), 10) !== parseInt(sortedMedias[currentMediaIndex].id, 10)) {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    });
  }

  previousMediaBtn.addEventListener('click', () => {
    displayPreviousMedia();    
  });

  const nextMediaBtn = lightbox.querySelector('#next_media');
  nextMediaBtn.addEventListener('click', async () => {
    displayNextMedia();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      displayPreviousMedia();
    } else if (e.key === 'ArrowRight') {
      displayNextMedia();
    }
  });

  return lightbox;
}