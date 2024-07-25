import { HomePage } from "./pages/home.page.js";
import { PhotographerPage } from "./pages/photographer.page.js";

async function App() {
    // this.init = function() {
        const url = new URL(window.location.href);
        console.log('url.pathname: ', url.pathname);

        if (url.pathname === '/' || url.pathname === '/index.html') {
            await HomePage();
        } else if (url.pathname === '/photographer.html') {
            console.log('url.pathname: ', url.pathname);
            const id = parseInt(url.searchParams.get('id'), 10);

            await PhotographerPage(id);
        }
    // }

    // this.init();
}

// const app = new App();

App();