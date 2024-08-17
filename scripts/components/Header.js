/**
 * Creates and returns a header element with a link to the homepage.
 *
 * @return {HTMLElement} The created header element.
 */
export function Header() {
  const header = document.createElement('header');
  header.className = 'header';
  header.innerHTML = `
    <a href="index.html"  aria-label="Retourner sur la page d'accueil" role="link">
      <figure class="logo" >
        <img src="assets/medias/logo.png" id="logo" alt="fisheye logo">
      </figure>
    </a>
  `;

  return header;
}