export function Sort() {
  const sort = document.createElement("section");
  sort.id = "sort";

  sort.innerHTML = `
    <p aria-label="Trier par">Trier par</p>

    <div
      role="tablist"
      aria-label="Options de tri"
      id="sorts_wrapper"
      aria-activedescendant="popularity"
      aria-expanded="false">
      <button id='expandCollapse' tabindex="-1" aria-disabled="true">
        <i id="arrow" class="fa fa-chevron-down" aria-label="dérouler ou réduire les options de tri"></i>
      </button>
      <button
        role='tab'
        id='popularity'
        class='sortType active'
        aria-selected='true'
        tabindex='0'>
        Popularité
      </button>
      <hr>
      <button
        role='tab'
        class='sortType'
        id='date'
        aria-selected='false'
        tabindex='0'>
        Date
      </button>
      <hr>
      <button
        role='tab'
        class='sortType'
        id='title'
        aria-selected='false'
        tabindex='0'>
        Titre
      </button>
    </div>
  `;

  const sortsWrapper = sort.querySelector('#sorts_wrapper');
  const options = sortsWrapper.querySelectorAll('.sortType');
  const hrList = sortsWrapper.querySelectorAll('hr');

  let activeOption = sortsWrapper.querySelector('.active');

  let sortEvent= new Event('sortEvent', {
    bubbles: true,
  });

  // options.forEach((option) => option.setAttribute('tabindex', '0'));
  

  const arrow = sortsWrapper.querySelector('#arrow');

  function collapseSortMenu() {
    arrow.style.transform = 'rotate(0deg)';
    sortsWrapper.ariaExpanded = 'false';
    options.forEach((option) => {
      if (!option.classList.contains('active')) {
        option.style.display = 'none';
        // option.setAttribute('tabindex', '-1');
      } else {
        option.style.backgroundColor = 'transparent';
        // option.setAttribute('tabindex', '0');
      }
    });

    hrList.forEach((hr) => {
      hr.style.display = 'none';
    });

    activeOption.focus();
  }

  function expandSortMenu() {
    arrow.style.transform = 'rotate(180deg)';
    sortsWrapper.ariaExpanded = 'true';
    options.forEach((option) => {
      option.style.display = 'block';
      // option.setAttribute('tabindex', '0');
    });
    hrList.forEach((hr) => {
      hr.style.display = 'block';
    });

    activeOption.style.backgroundColor = '#D3573C';
    activeOption.focus();
    activeOption.setAttribute('aria-selected', 'true');
  }

  function arrowDownHandler(e) {
    e.preventDefault();
    if (sortsWrapper.ariaExpanded === 'false') {
      expandSortMenu();
    }  else {
      let selectedOptionIndex = Array.from(options).findIndex((option) => option.getAttribute('aria-selected') === 'true');
      let selectedOption = options[selectedOptionIndex];
      if (!selectedOption.classList.contains('active')) {
        selectedOption.style.backgroundColor = 'transparent';
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
  }

  function arrowUpHandler(e) {
    e.preventDefault();
    if (sortsWrapper.ariaExpanded === 'true') {
      let selectedOptionIndex = Array.from(options).findIndex((option) => option.getAttribute('aria-selected') === 'true');
      let selectedOption = options[selectedOptionIndex];
      selectedOption.setAttribute('aria-selected', 'false');
      if (!selectedOption.classList.contains('active')) {
        selectedOption.style.backgroundColor = 'transparent';
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
  }

  function updateActiveOption(e) {
    // The old active option is set to inactive and the new active option is set to active
    activeOption.classList.remove('active');
    activeOption.setAttribute('aria-selected', 'false');
    activeOption.style.backgroundColor = 'transparent';
    activeOption.style.display = 'none';

    // The clicked option is set to active
    activeOption = e.target;
    e.target.classList.add('active');
    e.target.setAttribute('aria-selected', 'true');
    e.target.style.display = 'block';
    sortsWrapper.setAttribute('aria-activedescendant', e.target.id);
    collapseSortMenu();
    e.target.dispatchEvent(sortEvent);
  }

  document.addEventListener('click', (e) => {
    // Closes the sort menu if the user clicks outside of it
    if (!sortsWrapper.contains(e.target)) {
      collapseSortMenu();
    } else {
    
  // sortsWrapper.addEventListener('click', (e) => { // Cases when the user clicks on an element of the sort menu
    
    if (sortsWrapper.ariaExpanded === 'false') {
      expandSortMenu();
    } else {
    // Cases when the user clicks on an option
      if (e.target.classList.contains('sortType')) {
        // Expand/collapse the sort menu when the user clicks on the already selected option
        if (e.target.classList.contains('active')) {
          collapseSortMenu();
        }
        // Expand/collapse the sort menu when the user clicks on an option other than the already selected one
        else {
          updateActiveOption(e);
          // // The old active option is set to inactive and the new active option is set to active
          // activeOption.classList.remove('active');
          // activeOption.setAttribute('aria-selected', 'false');
          // activeOption.style.backgroundColor = 'transparent';
          // activeOption.style.display = 'none';

          // // The clicked option is set to active
          // activeOption = e.target;
          // e.target.classList.add('active');
          // e.target.setAttribute('aria-selected', 'true');
          // e.target.style.display = 'block';
          // sortsWrapper.setAttribute('aria-activedescendant', e.target.id);
          // collapseSortMenu();
          // e.target.dispatchEvent(sortEvent);


          options.forEach((item) => {
            item.setAttribute('tabindex', '-1 ');
          });
        }
      }
    }
  }});

  sortsWrapper.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'Tab':
        if (sortsWrapper.contains(e.target)) {
          if (sortsWrapper.ariaExpanded === 'false') {
          } else {
            if (e.shiftKey) {
              arrowUpHandler(e);
            } else {
              arrowDownHandler(e);
            }
          } 
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (sortsWrapper.ariaExpanded === 'false') { 
          expandSortMenu();
        } else {
          updateActiveOption(e);
        }
        break;

      case 'Escape':
        if (sortsWrapper.ariaExpanded === 'true') {
          collapseSortMenu();
        }
        break;

      case 'ArrowDown':
        arrowDownHandler(e);
        break;

      case 'ArrowUp':
        arrowUpHandler(e);
        break;
    }
  }); 

  return sort;
}
