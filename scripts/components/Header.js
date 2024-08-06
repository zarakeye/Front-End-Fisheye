export function Header() {
  const header = document.createElement('header');
  header.className = 'header';
  header.setAttribute('tabindex', '0');
  header.innerHTML = `
    <a href="index.html">
      <img src="assets/medias/logo.png" id="logo" alt="fisheye logo">
    </a>
  `;

  return header;
}