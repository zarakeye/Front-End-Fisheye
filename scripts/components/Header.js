export function Header() {
  const header = document.createElement('header');
  header.className = 'header';
  header.innerHTML = `
    <a href="index.html" tabindex="0">
      <img src="assets/medias/logo.png" id="logo" alt="fisheye logo">
    </a>
  `;

  return header;
}