import { Api } from "../api/index.js";
import { Photographer } from "../models/photographer.model.js";
import { photographerFactory } from "../factories/photographer.factory.js";

export async function HomePage() {
    // Extraction of datas of photographers, then creation of new Photographer objects
    const photographersDatas = await Api.photographers.getPhotographers();
    const photographers = photographersDatas.map((photographer) => new Photographer(photographer));
    console.log('photographers: ', photographers);
    // Entry point
    const root = document.getElementById('root');

    // Header
    const header = photographerFactory.homepageHeader(root);
    console.log('header: ', header);

    // Photographers grid
    const photographersGrid = photographerFactory.photographersGrid(photographers, root);
    console.log('photographersGrid: ', photographersGrid);
}

