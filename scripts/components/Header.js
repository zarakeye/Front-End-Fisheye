export function Header(parentDOMElement) {
    const header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = `
        <a href="index.html">
        <img src="assets/medias/logo.svg" class="logo" alt="fisheye logo">
    </a>
    `;

    parentDOMElement.appendChild(header);
    return document.querySelector('.header');
}