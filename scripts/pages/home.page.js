import { Api } from "../api/index.js";
import { Photographer } from "../models/photographer.model.js";
import { photographerFactory } from "../factories/photographer.factory.js";
import { Header } from "../components/Header.js";

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
}

