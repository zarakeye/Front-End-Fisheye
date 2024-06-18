function photographerTemplate(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        // const article = `
        //   <article>
        //     <img src='${picture}'>
        //     <h2>${name}</h2>
        //   </article>
        // `;

        return (article);
    }
    return { name, picture, getUserCardDOM }
}