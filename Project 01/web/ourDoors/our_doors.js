function initImageSlider(menuContainer) {
    const listItems = menuContainer.querySelectorAll('ul li');
    const nextButton = menuContainer.querySelector('.nav-button#next-button');
    const prevButton = menuContainer.querySelector('.nav-button#prev-button');
    let currentStartIndex = 0;
    const itemsPerPage = 3;

    for(let i = 0; i < listItems.length; i++){
        if(i >= itemsPerPage){
            listItems[i].style.display = 'none';
        }
    }

    function updateList() {
        listItems.forEach(item => item.style.display = 'none');
        for(let i = currentStartIndex; i < currentStartIndex + itemsPerPage; i++){
            if(listItems[i]){
                listItems[i].style.display = 'block';
            }
        }
    }

    nextButton.addEventListener('click', () => {
        currentStartIndex += itemsPerPage;
        if(currentStartIndex >= listItems.length){
            currentStartIndex = 0;
        }
        updateList();
    });

    prevButton.addEventListener('click', () => {
        currentStartIndex -= itemsPerPage;
        if (currentStartIndex < 0) {
            currentStartIndex = listItems.length - itemsPerPage;
        }
        updateList();
    });
}


document.querySelectorAll('.menu-container').forEach(menuContainer => {
    initImageSlider(menuContainer);
});
