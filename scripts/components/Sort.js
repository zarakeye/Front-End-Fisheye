import { mediaFactory } from "../factories/media.factory.js";

export function Sort(medias, parentDOMElement) {
  // console.log('cards', cards);
  const sort = document.createElement("section");
  sort.id = "sort";
  parentDOMElement.appendChild(sort);

  sort.innerHTML = `
    <p>Trier par</p>

    <button class="sort_button cta">
      <ul class="options" name="sortBy">
        <i id="arrow" class="fa fa-chevron-down" data-collapsed="true"></i>
        <li class="option" value="popularity" data-selected="true">Popularité</li>
        <hr>
        <li class="option" value="date" data-selected="false">Date</li>
        <hr>
        <li class="option" value="title" data-selected="false">Titre</li>
      </ul>
    </button>
  `;

  const gallery = document.createElement('section');
  gallery.className = 'gallery';
  parentDOMElement.appendChild(gallery);
  const gallerySelector = parentDOMElement.querySelector('.gallery');

  mediaFactory.sortByPopularity(medias, gallerySelector);

  const sortButtonSelector = document.querySelector('.sort_button');
  const optionsList = sortButtonSelector.querySelectorAll('.option');
  const hrList = sortButtonSelector.querySelectorAll('hr');
  
  optionsList.forEach((option) => {
    if (option.dataset.selected === 'false') {
      option.style.display = 'none';

    }
  });

  hrList.forEach((hr) => {
    hr.style.display = 'none';
  });

  const arrow = sortButtonSelector.querySelector('#arrow');
  
  arrow.addEventListener('click', () => {
    console.log('Arrow clicked');

    if (arrow.dataset.collapsed === 'true') {
      arrow.style.transform = 'rotate(180deg)';
      arrow.dataset.collapsed = 'false';
      optionsList.forEach((option) => {
        option.style.display = 'block';
      });
      hrList.forEach((hr) => {
        hr.style.display = 'block';
      });
    } else if( arrow.dataset.collapsed === 'false') {
      arrow.style.transform = 'rotate(0deg)';
      arrow.dataset.collapsed = 'true';
      optionsList.forEach((option) => {
        if (option.dataset.selected === 'false') {
          option.style.display = 'none';
      }});
      hrList.forEach((hr) => {
        hr.style.display = 'none';
      });
    }
  });

  const optionPopularity = document.querySelector(".option[value='popularity']");
  console.log('optionPopularity: ', optionPopularity);
  optionPopularity.addEventListener('click', (e) => {
    e.preventDefault();

    arrow.style.transform = 'rotate(0deg)';
    
    mediaFactory.sortByPopularity(medias, gallerySelector);

    hrList.forEach((hr) => {
      hr.style.display = 'none';
    });
  
    optionsList.forEach((option) => {
      if (option !== optionPopularity) {
        option.dataset.selected = 'false';
        option.style.display = 'none';
      } else {
        option.dataset.selected = 'true';
        option.style.display = 'block';
      }
    })

  });

  const optionDate = document.querySelector(".option[value='date']");
  console.log('optionDate: ', optionDate);
  optionDate.addEventListener('click', (e) => {
    e.preventDefault();

    arrow.style.transform = 'rotate(0deg)';

    mediaFactory.sortByDate(medias, gallerySelector);
    
    hrList.forEach((hr) => {
      hr.style.display = 'none';
    });


    optionsList.forEach((option) => {
      if (option !== optionDate) {
        option.dataset.selected = 'false';
        option.style.display = 'none';
      } else {
        option.dataset.selected = 'true';
        option.style.display = 'block';
      }
    })
  });

  const optionTitle = document.querySelector(".option[value='title']");
  optionTitle.addEventListener('click', (e) => {
    e.preventDefault();

    arrow.style.transform = 'rotate(0deg)';
    
    mediaFactory.sortByTitle(medias, gallerySelector);
    
    hrList.forEach((hr) => {
      hr.style.display = 'none';
    });

    optionsList.forEach((option) => {
      if (option !== optionTitle) {
        option.dataset.selected = 'false';
        option.style.display = 'none';
      } else {
        option.dataset.selected = 'true';
        option.style.display = 'block';
      }
    })
  });

  return sort;
}