const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'qYnjAZtToJtJAZfNwxBv6hBQrbP7xRdzqZp9nIGkdUM';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
      ready = true;
        loader.hidden = true;
    }
  }

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//Create Elements For Links & Photos, Add to DOM
function displayPhoto(){
    imagesLoaded = 0;
    totalImages= photosArray.length;
    console.log('totalImages:', totalImages);
    photosArray.forEach((photo) => {
   // Create <a> to link Unsplash
   const item = document.createElement('a');
   setAttributes(item, {
       href: photo.links.html,
       target: '_blank',
   });

//    item.setAttribute('href', photo.links.html);
//    item.setAttribute('target', '_blank');

   //Create <img> for Photo
   const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

//    img.setAttribute('src', photo.urls.regular);
//    img.setAttribute('alt', photo.alt_description);
//    img.setAttribute('title', photo.alt_description);

//Event Listener, check when each is finished loaded
img.addEventListener('load', imageLoaded);

   //Put <img> inside <a>, then put both inside imageContainer Element
   item.appendChild(img);
   imageContainer.appendChild(item);
    });
}


// Get photos from Unsplash API
async function getUnsplash() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhoto();
    } catch (error) {
        //Catch Error Here
    }
}

//Check to See if scrolling near bottom of page Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getUnsplash();
    }
  });

//On Load
getUnsplash();