import { HomePage } from "./pages/home.page.js";
import { PhotographerPage } from "./pages/photographer.page.js";

async function App() {
  const url = new URL(window.location.href);

  if (url.pathname === '/' || url.pathname === '/index.html') {
      await HomePage();
  } else if (url.pathname === '/photographer.html') {
      const id = parseInt(url.searchParams.get('id'), 10);

      await PhotographerPage(id);
  }
}

App();