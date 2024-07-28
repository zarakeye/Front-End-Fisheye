import { mediaFactory } from "../factories/media.factory.js";

export function Sort(medias) {
  const sort = document.createElement("section");
  sort.id = "sort";

  sort.innerHTML = `
    <p>Trier par</p>

    <button class="sort_button cta" aria-label="Trier par">
      <ul class="options" name="sortBy">
        <i id="arrow" class="fa fa-chevron-down" data-collapsed="true" aria-label="dérouler ou réduire les options de tri"></i>
        <li class="option" value="popularity" aria-selected="true" aria-label="Trier par popularité">Popularité</li>
        <hr>
        <li class="option" value="date" aria-selected="false" aria-label="Trier par date">Date</li>
        <hr>
        <li class="option" value="title" aria-selected="false" aria-label="Trier par titre">Titre</li>
      </ul>
    </button>
  `;

  document.body.appendChild(sort);

  const gallery = document.createElement('section');
  gallery.id = 'gallery';
  document.body.appendChild(gallery);

  const mediasByPopularity = mediaFactory.sortBy(medias, 'popularity');
  console.log('mediasByPopularity', mediasByPopularity);
  const mediasByDate = mediaFactory.sortBy(medias, 'date');
  console.log('mediasByDate', mediasByDate);
  const mediasByTitle = mediaFactory.sortBy(medias, 'title');
  console.log('mediasByTitle', mediasByTitle);

  const cardsByPopularity = [...mediasByPopularity.map((media) => mediaFactory.createCard(media))];
  console.log('cardsByPopularity', cardsByPopularity);
  const cardsByDate = [...mediasByDate.map((media) => mediaFactory.createCard(media))];
  console.log('cardsByDate', cardsByDate);
  const cardsByTitle = [...mediasByTitle.map((media) => mediaFactory.createCard(media))];
  console.log('cardsByTitle', cardsByTitle);


  gallery.append(...cardsByPopularity);

  const sortButtonSelector = document.querySelector('.sort_button');
  const optionsList = sortButtonSelector.querySelectorAll('.option');
  const hrList = sortButtonSelector.querySelectorAll('hr');
  
  optionsList.forEach((option) => {
    if (option.ariaSelected === 'false') {
      option.style.display = 'none';

    }
  });

  hrList.forEach((hr) => {
    hr.style.display = 'none';
  });

  const arrow = sortButtonSelector.querySelector('#arrow');
  
  function collapseSortMenu() {
    arrow.style.transform = 'rotate(0deg)';
    arrow.dataset.collapsed = 'true';
    optionsList.forEach((option) => {
      if (option.ariaSelected === 'false') {
        option.style.display = 'none';
      }
    });
    hrList.forEach((hr) => {
      hr.style.display = 'none';
    });
  }

  function expandSortMenu() {
    arrow.style.transform = 'rotate(180deg)';
    arrow.dataset.collapsed = 'false';
    optionsList.forEach((option) => {
      option.style.display = 'block';
    });
    hrList.forEach((hr) => {
      hr.style.display = 'block';
    });
  }

  document.addEventListener('click', (e) => {
    // Closes the sort menu if the user clicks outside of it
    if (!sortButtonSelector.contains(e.target)) {
      if (arrow.dataset.collapsed === 'false') {
        collapseSortMenu();
      }
    }

    // Cases when the user clicks on an element of the sort menu
    else {
      // Expand/collapse the sort menu when the user clicks on the arrow
      if (e.target.id === 'arrow') {
        if (arrow.dataset.collapsed === 'true') {
          expandSortMenu();
        } else {
          collapseSortMenu();
        }
      }

      // Cases when the user clicks on an option
      if (e.target.classList.contains('option')) {
        // Expand/collapse the sort menu when the user clicks on the already selected option
        if (e.target.ariaSelected === 'true') {
          if (arrow.dataset.collapsed === 'true') {
            expandSortMenu();
          } else {
            collapseSortMenu();
          }
        }
        // Expand/collapse the sort menu when the user clicks on an option other than the already selected one
        else {
          // The aria-selected attribute of the clicked option is set to true when the user clicks on an option
          // The aria-selected attribute of the other options is set to false
          optionsList.forEach((item) => {
            if (item !== e.target) {
              item.setAttribute('aria-selected', 'false');
            } else {
              item.setAttribute('aria-selected', 'true');
            }
          });

          collapseSortMenu();
          
          // Update the gallery with the new sorted medias
          gallery.innerHTML = '';

          const optionValue = e.target.getAttribute('value');
          switch (optionValue) {
            case 'popularity':
              gallery.append(...cardsByPopularity);
              break;

            case 'date':
              gallery.append(...cardsByDate);
              break;

            case 'title':
              gallery.append(...cardsByTitle);
              break;
          }
        }
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      collapseSortMenu();
    }
  });


  return sort;
}