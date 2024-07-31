import { mediaFactory } from "../factories/media.factory.js";

export function Sort(medias) {
  const sort = document.createElement("section");
  sort.id = "sort";

  sort.innerHTML = `
    <p aria-label="Trier par">Trier par</p>

    <div
      role="tablist"
      aria-label="Options de tri"
      id="sortList"
      aria-activedescendant="popularity"
    >
      <i id="arrow" class="fa fa-chevron-down" data-collapsed="true" aria-label="dérouler ou réduire les options de tri"></i>
      <div
        role='tab'
        id='popularity'
        class='active'
        aria-selected='true'
        tabindex='0'>
        Popularité
      </div>
      <hr>
      <div
        role='tab'
        id='date'
        aria-selected='false'
        tabindex='-1'>
        Date
      </div>
      <hr>
      <div
        role='tab'
        id='title'
        aria-selected='false'
        tabindex='-1'>
        Titre
        </div>
    </div>
  `;

  document.body.appendChild(sort);

  const gallery = document.createElement('section');
  gallery.id = 'gallery';
  document.body.appendChild(gallery);

  const mediasByPopularity = mediaFactory.sortBy(medias, 'popularity');
  const mediasByDate = mediaFactory.sortBy(medias, 'date');
  const mediasByTitle = mediaFactory.sortBy(medias, 'title');

  const cardsByPopularity = [...mediasByPopularity.map((media) => mediaFactory.createCard(media))];
  const cardsByDate = [...mediasByDate.map((media) => mediaFactory.createCard(media))];
  const cardsByTitle = [...mediasByTitle.map((media) => mediaFactory.createCard(media))];


  gallery.append(...cardsByPopularity);

  const sortList = document.querySelector('#sortList');
  const options = sortList.querySelectorAll('#sortList div[role="tab"]');
  const hrList = sortList.querySelectorAll('hr');

  let activeOption = sortList.querySelector('.active');
  let activeIndex = Array.from(options).indexOf(activeOption);
  
  options.forEach((option) => {
    option.setAttribute('tabindex', '0');
  });

  hrList.forEach((hr) => {
    hr.style.display = 'none';
  });

  const arrow = sortList.querySelector('#arrow');

  function collapseSortMenu() {
    arrow.style.transform = 'rotate(0deg)';
    arrow.dataset.collapsed = 'true';
    options.forEach((option) => {
      if (!option.classList.contains('active')) {
        option.style.display = 'none';
        option.setAttribute('tabindex', '-1');
      } else {
        option.style.backgroundColor = '#901C1C';
        option.setAttribute('tabindex', '0');
      }
    });
    hrList.forEach((hr) => {
      hr.style.display = 'none';
    });

    activeOption.focus();
  }

  function expandSortMenu() {
    arrow.style.transform = 'rotate(180deg)';
    arrow.dataset.collapsed = 'false';
    options.forEach((option) => {
      option.style.display = 'block';
      option.setAttribute('tabindex', '0');
    });
    hrList.forEach((hr) => {
      hr.style.display = 'block';
    });

    activeOption.style.backgroundColor = '#D3573C';
    activeOption.focus();
    activeOption.setAttribute('aria-selected', 'true');
  }

  document.addEventListener('click', (e) => {
    // Closes the sort menu if the user clicks outside of it
    if (!sortList.contains(e.target)) {
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
      if (e.target.getAttribute('role') === 'tab') {
        // Expand/collapse the sort menu when the user clicks on the already selected option
        if (e.target.classList.contains('active')) {
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
          options.forEach((item) => {
            if (item !== e.target) {
              item.classList.remove('active');
              item.setAttribute('aria-selected', 'false');
              item.style.display = 'none';
            } else {
              item.classList.add('active');
              item.setAttribute('aria-selected', 'true');
              item.style.display = 'block';
            }
          });

          collapseSortMenu();
          
          // Update the gallery with the new sorted medias
          gallery.innerHTML = '';

          const sortType = e.target.id;
          switch (sortType) {
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

          // Focus on the first card

          gallery.querySelector('.media').focus();

          options.forEach((item) => {
            item.setAttribute('tabindex', '-1 ');
          });

        }
      }
    }
  });

  sortList.addEventListener('keydown', async (e) => {
    switch (e.key) {
      case 'Tab':
        if (arrow.dataset.collapsed === 'false') {
          collapseSortMenu();
          gallery.querySelector('.media').focus();
        }
        break;

      case 'Enter':
        if (arrow.dataset.collapsed === 'true') {
          expandSortMenu();
        }
        else {
          if (e.target === activeOption) {
            collapseSortMenu();
          } else {
            activeOption.classList.remove('active');
            activeOption.setAttribute('aria-selected', 'false');
            activeOption.style.backgroundColor = '#901C1C';
            activeOption = e.target;
            activeOption.classList.add('active');
            activeOption.setAttribute('aria-selected', 'true');
            activeOption.style.backgroundColor = '#901C1C';

            gallery.innerHTML = '';

            const sortType = e.target.id;
            switch(sortType) {
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

            collapseSortMenu();

            gallery.querySelector('.media').focus();
          }
        }
        break;

      case 'Escape':
        if (arrow.dataset.collapsed === 'false') {
          collapseSortMenu();
        }
        break;

      case 'ArrowDown':
        if (arrow.dataset.collapsed === 'true') {
          expandSortMenu();
        }  else {
          e.preventDefault();

          let selectedOptionIndex = Array.from(options).findIndex((option) => option.getAttribute('aria-selected') === 'true');
          let selectedOption = options[selectedOptionIndex];
          if (!selectedOption.classList.contains('active')) {
            selectedOption.style.backgroundColor = '#901C1C';
          }

          selectedOption.setAttribute('aria-selected', 'false');
          selectedOptionIndex = ++selectedOptionIndex;
          if (selectedOptionIndex === options.length) {
            selectedOptionIndex = 0;
          }

          selectedOption = options[selectedOptionIndex];
          selectedOption.setAttribute('aria-selected', 'true');
          if (!selectedOption.classList.contains('active')) {
            selectedOption.style.backgroundColor = '#DB8876';
          }
          selectedOption.focus();
        }
        break;

      case 'ArrowUp':
        if (arrow.dataset.collapsed === 'false') {
          e.preventDefault();
          let selectedOptionIndex = Array.from(options).findIndex((option) => option.getAttribute('aria-selected') === 'true');
          let selectedOption = options[selectedOptionIndex];
          selectedOption.setAttribute('aria-selected', 'false');
          if (!selectedOption.classList.contains('active')) {
            selectedOption.style.backgroundColor = '#901C1C';
          }
          selectedOptionIndex = --selectedOptionIndex;
          
          if (selectedOptionIndex === -1) {
            selectedOptionIndex = options.length - 1;
          }
          
          selectedOption = options[selectedOptionIndex];
          selectedOption.setAttribute('aria-selected', 'true');
          if (!selectedOption.classList.contains('active')) { // If not active, set the background color
            selectedOption.style.backgroundColor = '#DB8876';
          }
          selectedOption.focus();
        }
        break;
    }
  }); 

  return sort;
}
