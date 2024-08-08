import { Api } from "../api/index.js";
import { Photographer } from "../models/photographer.model.js";
import { photographerFactory } from "../factories/photographer.factory.js";
import { Header } from "../components/Header.js";
import { isInTopFocusTrap } from "../helpers/isInTopFocusTrap.js";

export async function HomePage() {
  // Extraction of datas of photographers, then creation of new Photographer objects
  const photographersDatas = await Api.photographers.getPhotographers();
  const photographers = photographersDatas.map((photographer) => new Photographer(photographer));
  // Entry point
  const root = document.getElementById('root');

  // Header
  const header = photographerFactory.homepageHeader();
  document.body.appendChild(header);

  // Photographers grid
  photographerFactory.photographersGrid(photographers, root);

  const focusableElements = document.body.querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  document.body.addEventListener('keydown', (e) => {
    if (!isInTopFocusTrap()) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (e.target === firstFocusableElement) {
            e.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (e.target === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    }
  });
}

