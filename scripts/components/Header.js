export class HeaderComponent {
  create() {
    const header = document.createElement('header');
    const headerContent = `
      <a href="index.html">
        <img src="assets/images/logo.png" class="logo" alt="fisheye logo">
      </a>
    `;

    header.innerHTML = headerContent;
    return header;
  }
}