import { Header } from "../components/Header.js";
import { Contact } from "../components/Contact.js";


export const photographerFactory = {
/**
 * Creates a header element with the text "Nos photographes" and returns it.
 *
 * @return {HTMLElement} The created header element.
 */
  homepageHeader: () => {
    const header = Header();
    const h1 = document.createElement("h1");
    h1.textContent = "Nos photographes";

    header.appendChild(h1);

    return header;
  },

  /**
   * Calculates the total number of likes for a photographer's medias.
   *
   * @param {Array} photographerMedias - An array of media objects, each containing a 'likes' property.
   * @return {Number} The total number of likes for the photographer's medias.
   */
  totalLikes: (photographerMedias) => {
    let totalLikes = 0;
    photographerMedias.forEach((media) => {
      totalLikes += media.likes;
    });
    return totalLikes;
  },

  /**
   * Displays a contact form modal for the given photographer and focuses on the first input field.
   *
   * @param {object} photographer - The photographer object containing information to be used in the contact form.
   * @return {void}
   */
  contactMe: (photographer) => {
    const contactModal = Contact(photographer);
    document.body.appendChild(contactModal);
    const firstFocusableElement = contactModal.querySelector('input');
    firstFocusableElement.focus();
  }
}
