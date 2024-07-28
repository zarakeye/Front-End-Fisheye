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
  const selectedSort = document.querySelector('#sort .option[aria-selected="true"]').getAttribute('value');

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
  // const thumbnailSrc = thumbnailSelector
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

  previousMediaBtn.addEventListener('click', () => {
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

    // let updatedThumbnail = mediaFactory.thumbnail(sortedMedias[currentMediaIndex]);

    // // Update the display with the new current media
    // figureSelector.innerHTML = `
    //   <div class='media_wrapper'>
    //     ${updatedThumbnail}
    //   </div>
    //   <figcaption>${ medias[currentMediaIndex].title }</figcaption>
    // `;

    
  });

  const nextMediaBtn = lightbox.querySelector('#next_media');
  // Compute the index of the next media (which becomes the new displayed media)
  nextMediaBtn.addEventListener('click', async () => {
    ++currentMediaIndex;
    if (currentMediaIndex >= medias.length) {
      currentMediaIndex = 0;
    }
    
    // let updatedThumbnail = mediaFactory.thumbnail(sortedMedias[currentMediaIndex]);

    // // Update the display with the new current media
    // figureSelector.innerHTML = `
    //   <div class='media_wrapper'>
    //     ${updatedThumbnail}
    //   </div>
    //   <figcaption>${ medias[currentMediaIndex].title }</figcaption>
    // `;

    thumbnailsList.forEach((item) => {
      if (parseInt(item.getAttribute('data-id'), 10) !== parseInt(sortedMedias[currentMediaIndex].id, 10)) {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    });
  });

  return lightbox;
}