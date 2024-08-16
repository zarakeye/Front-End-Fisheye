import { Api } from "../api/index.js";
import { Photographer } from "../models/photographer.model.js";
import { photographerFactory } from "../factories/photographer.factory.js";
import { PhotographerCard } from "../components/PhotographerCard.js";

export async function HomePage() {
  const photographersDatas = await Api.photographers.getPhotographers();
  const photographers = photographersDatas.map((photographer) => new Photographer(photographer));

  const header = photographerFactory.homepageHeader();
  document.body.appendChild(header);

  const main = document.createElement('main');
  document.body.appendChild(main);

  const grid = document.createElement('section');
  grid.className = 'photographersGrid';
  main.appendChild(grid);

  // Card of each photographer
  const cards = photographers.map((photographer) => PhotographerCard(photographer));

  grid.append(...cards);

  const focusableElements = document.body.querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  // Focus trap
  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) { // Shift + Tab is pressed
        if (e.target === firstFocusableElement) {
          e.preventDefault();
          lastFocusableElement.focus();
        }
      } else { // Tab pressed
        if (e.target === lastFocusableElement) {
          e.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
  });
}

