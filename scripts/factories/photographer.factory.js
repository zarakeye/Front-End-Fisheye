import { Header } from "../components/Header.js";
import { Contact } from "../components/Contact.js";


export const photographerFactory = {
  homepageHeader: () => {
    const header = Header();
    const h1 = document.createElement("h1");
    h1.textContent = "Nos photographes";

    header.appendChild(h1);

    return header;
  },

  totalLikes: (photographerMedias) => {
    let totalLikes = 0;
    photographerMedias.forEach((media) => {
      totalLikes += media.likes;
    });
    return totalLikes;
  },

  contactMe: (photographer) => {
    const contactModal = Contact(photographer);
    document.body.appendChild(contactModal);
    const firstFocusableElement = contactModal.querySelector('input');
    firstFocusableElement.focus();
  }
}
