export function Header(parentDOMElement) {
  const header = document.createElement('header');
  header.className = 'header';
  header.innerHTML = `
      <a href="index.html">
      <img src="assets/medias/logo.svg" id="logo" alt="fisheye logo">
  </a>
  `;

  parentDOMElement.appendChild(header);

  const logo = document.getElementById('logo');
  const svgDatas = logo.contentEditable;
  console.log('svgDatas: ', svgDatas);

  return document.querySelector('.header');
}