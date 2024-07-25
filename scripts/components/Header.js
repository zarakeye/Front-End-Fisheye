export function Header(parentDOMElement) {
  const header = document.createElement('header');
  header.className = 'header';
  header.innerHTML = `
      <a href="index.html">
      <img src="assets/medias/logo.svg" id="logo" alt="fisheye logo">
  </a>
  `;

  parentDOMElement.appendChild(header);

  const primaryColor = #901C1C;
  const logo = document.getElementById('logo');
  const svgDatas = logo.addEventListener('load', () => {
    const svg = logo.contentDocument;

    const path = svg.querySelector('path');
    path.style.fill = `${primaryColor}`;
  })

  return document.querySelector('.header');
}