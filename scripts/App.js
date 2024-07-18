import { HomePage } from "./pages/homepage.page.js";
import { PhotographerPage } from "./pages/photographer.page.js";

class App {
  constructor() {
    this.generatePageFromUrl();
  }

  generatePageFromUrl() {
    const url = new URL(window.location.href);
    const idParam = parseInt(url.searchParams.get('id'), 10);

    if(url.pathname === '/index.html') {
      new HomePage();
    } else if(url.pathname === '/photographer.html') {
      new PhotographerPage(idParam);
    } else {
      console.error('La page demandée n\'existe pas');
    }
  }
}

const app = new App();
