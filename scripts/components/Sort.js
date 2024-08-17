/**
 * Creates a sort component with a dropdown menu for sorting options.
 *
 * @return {HTMLElement} The created sort component.
 */
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
      <button role='tab' id='expandCollapse' aria-disabled="true" tabindex="-1">
        <span class="sr-only">Dérouler/enrouler </span><i id="arrow" class="fa fa-chevron-down"></i>
      </button>
      <button
        role='tab'
        id='popularity'
        class='sortType active'
        aria-selected='true'>
        Popularité
      </button>
      <hr>
      <button
        role='tab'
        class='sortType'
        id='date'
        aria-selected='false'>
        Date
      </button>
      <hr>
      <button
        role='tab'
        class='sortType'
        id='title'
        aria-selected='false'>
        Titre
      </button>
    </div>
  `;

  const sortsWrapper = sort.querySelector('#sorts_wrapper');
  const options = sortsWrapper.querySelectorAll('.sortType');

  const hrList = sortsWrapper.querySelectorAll('hr');

  const expandCollapseBtn = sort.querySelector('#expandCollapse');

  const arrow = sort.querySelector('#arrow');

  let activeOption = sortsWrapper.querySelector('.active');

  if (sortsWrapper.ariaExpanded === 'false') {
    activeOption.style.paddingTop = '23px';
  }

  let sortEvent= new Event('sortEvent', {
    bubbles: true,
  });

  /**
   * Collapses the sort menu by rotating the arrow, hiding inactive options, 
   * and adjusting the active option's padding.
   *
   * @return {void}
   */
  function collapseSortMenu() {
    arrow.style.transform = 'rotate(0deg)';

    sortsWrapper.ariaExpanded = 'false';
    options.forEach((option) => {
      if (!option.classList.contains('active')) {
        option.style.display = 'none';
        option.style.paddingTop = '14px';
      } else {
        option.style.backgroundColor = 'transparent';
      }
    });

    hrList.forEach((hr) => {
      hr.style.display = 'none';
    });

    activeOption.focus();
    activeOption.style.paddingTop = '23px';
  }

/**
 * Expands the sort menu by rotating the arrow, setting the ariaExpanded attribute to true,
 * displaying the options and setting their padding, displaying the first option with a larger padding,
 * displaying the hr elements, setting the active option's background color, focusing on the active option,
 * and setting the aria-selected attribute to true.
 *
 * @return {void} This function does not return a value.
 */
  function expandSortMenu() {
    arrow.style.transform = 'rotate(180deg)';
    sortsWrapper.ariaExpanded = 'true';
    options.forEach((option) => {
      option.style.display = 'block';
      option.style.paddingTop = '14px';
    });
    options[0].style.paddingTop = '23px';
    hrList.forEach((hr) => {
      hr.style.display = 'block';
    });

    activeOption.style.backgroundColor = '#D3573C';
    activeOption.focus();
    activeOption.setAttribute('aria-selected', 'true');
  }

  /**
   * Handles the down arrow key press event to navigate through the sort options.
   * If the sort menu is collapsed, it expands the menu. If the menu is already expanded,
   * it moves the selection to the next option, updates the aria-selected attribute, and focuses on the new option.
   *
   * @param {Event} e - The key press event.
   * @return {void} This function does not return a value.
   */
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

  /**
   * Handles the up arrow key press event to navigate through the sort options.
   * If the sort menu is expanded, it moves the selection to the previous option, 
   * updates the aria-selected attribute, and focuses on the new option.
   *
   * @param {Event} e - The key press event.
   * @return {void} This function does not return a value.
   */
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

  /**
   * Updates the active option in the sort menu.
   *
   * @param {Event} e - The event that triggered the update.
   * @return {void} This function does not return a value.
   */
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
    
    // if (!sortsWrapper.contains(e.target)
    //   && document.querySelectorAll('.modal').forEach((modal) => !modal.contains(e.target))) {
    if (!sortsWrapper.contains(e.target)) {
      if (sortsWrapper.ariaExpanded === 'true') {
        collapseSortMenu();
      } else {
        return;
      }
    }
    
    if (sortsWrapper.contains(e.target) && sortsWrapper.ariaExpanded === 'false') {
      expandSortMenu();
    } else {
      // if(e.target.id === 'arrow' && sortsWrapper.ariaExpanded === 'true') {
      //   collapseSortMenu();
      // }
    // Cases when the user clicks on an sort option
      if (e.target.classList.contains('sortType')) {
        // Expand/collapse the sort menu when the user clicks on the already selected option
        if (e.target.classList.contains('active')) {
          collapseSortMenu();
        }
        // Expand/collapse the sort menu when the user clicks on an option other than the already selected one
        else {
          updateActiveOption(e);
        }
      }
    }
  });

  expandCollapseBtn.addEventListener('click', () => {
    if (sortsWrapper.getAttribute('aria-expanded') === 'false') {
      expandSortMenu();
    }
    if (sortsWrapper.getAttribute('aria-expanded') === 'true') {
      // collapseSortMenu();
      sortsWrapper.setAttribute('aria-expanded', 'false');
      options.forEach((option) => {
        if (!option.classList.contains('active')) {
          option.style.display = 'none';
        }
      });
      
      hrList.forEach((hr) => {
        hr.style.display = 'none';
      });
    }
  });

  sortsWrapper.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'Tab':
        if (sortsWrapper.contains(e.target)) {
          if (sortsWrapper.ariaExpanded === 'false') {
            return;
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
