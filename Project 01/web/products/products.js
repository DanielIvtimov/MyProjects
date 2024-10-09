const images = ["./images/photoSelector/softline82MD.png", "./images/photoSelector/softline76.png", "./images/photoSelector/effectlne.png"];
let currentImage = 0; 
function nextImage() {
    currentImage++; 
    if (currentImage >= images.length) {
        currentImage = 0;
    }
    document.getElementById("image-selector").src = images[currentImage];
}

const imagesGallery = document.getElementsByClassName('photo-gallery');
for (let i = 0; i < imagesGallery.length; i++) {
    imagesGallery[i].addEventListener("click", function(event){
        const newPhotoRoute = event.target.src;
        let mainImage = document.querySelector("#big-photo-content img");
        mainImage.src = newPhotoRoute;
    });
}

function effectInChanging(){
    const imageElement = document.getElementById("image-selector");
    imageElement.classList.add("fade-out");
    setTimeout(() => {
        nextImage();
        imageElement.classList.remove("fade-out");
    }, 300);
}
document.getElementById("button-selector").addEventListener("click", effectInChanging);
