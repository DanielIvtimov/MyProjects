const catalogLinks = document.querySelectorAll('.details-columns a');
catalogLinks.forEach((link) => {
    const catalogUrl = link.href;
    const viewCountElem = link.parentElement.querySelector('.view-count');
    let views = localStorage.getItem(catalogUrl) || 0;
    viewCountElem.textContent = `Views: ${views}`;

    link.addEventListener('click', function () {
        views++;
        localStorage.setItem(catalogUrl, views);
        viewCountElem.textContent = `Views: ${views}`; 
    });
});
