import { Api } from "../api/index.js";
import { Photographer } from "../models/photographer.model.js";
import { PhotographerCard } from "../components/PhotographerCard.js";
import { Header } from "../components/Header.js";
import { mediaFactory } from "./media.factory.js";
import { Contact } from "../components/Contact.js";


export const photographerFactory = {
  // photographer: async (id) => {
  //   const photographersDatas = await Api.photographers.getPhotographers();
  //   const photographerDatas = photographersDatas.find((photographer) => photographer.id === id);
  //   return new Photographer(photographerDatas);
  // },
  
  homepageHeader: () => {
    const header = Header();
    const h1 = document.createElement("h1");
    h1.textContent = "Nos photographes";

    header.appendChild(h1);

    return header;
  },
  photographersGrid: (photographers, parentDOMElement) => {
    const photographersGrid = document.createElement("main");
    photographersGrid.className = "photographersGrid";
    parentDOMElement.appendChild(photographersGrid);

    photographers.map((photographer) => {
      PhotographerCard(photographer, photographersGrid);
    })

    return photographersGrid;
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
