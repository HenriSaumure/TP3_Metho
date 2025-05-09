// This file contains the main JavaScript logic for the swipe image application.

const imageContainer = document.getElementById('image-container');
const currentImage = document.getElementById('current-image');
const imageFiles = [
    'images/65270ffde8a1ae823a9b4405764f0829.jpg',
    'images/6bd7a8d98edd4de5009ba663b8181014.jpg',
    'images/9687d7238955b17ae7f91e71ea800e5f.jpg',
    'images/humain-prenant-un-selfie-avec-le-chien-concept-de-meilleurs-amis-jeune-fema-125740101.webp',
    'images/images (1).jfif',
    'images/images (2).jfif',
    'images/images (3).jfif',
    'images/images (4).jfif',
    'images/images (5).jfif',
    'images/images (6).jfif',
    'images/images.jfif',
    'images/istockphoto-1368427462-612x612.jpg',
    'images/istockphoto-1449355009-612x612.jpg',
    'images/istockphoto-1486674561-612x612.jpg',
    'images/istockphoto-470281876-170667a.jpg'
];
let currentIndex = 0;

// Shuffle array to randomize images - cette fonction ne sera plus utilisée
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Load and display the current image
function displayImage() {
    currentImage.src = imageFiles[currentIndex];
    
    // Reset border color
    imageContainer.classList.remove('like-border');
    imageContainer.classList.remove('dislike-border');
    
    // Reset indicators
    document.getElementById('like-indicator').classList.add('hidden');
    document.getElementById('dislike-indicator').classList.add('hidden');
}

// Handle swipe gestures (called from swipe.js)
window.handleSwipe = function(direction) {
    if (direction === 'left') {
        // User disliked the image
        imageContainer.classList.add('dislike-border');
        document.getElementById('dislike-indicator').classList.remove('hidden');
        
        // Wait a moment then go to next image
        setTimeout(loadNextImage, 1000);
    } else if (direction === 'right') {
        // User liked the image
        imageContainer.classList.add('like-border');
        document.getElementById('like-indicator').classList.remove('hidden');
        
        // Wait a moment then go to next image
        setTimeout(loadNextImage, 1000);
    }
};

// Load the next image (also called from swipe.js)
window.loadNextImage = function() {
    currentIndex = (currentIndex + 1) % imageFiles.length;
    displayImage();
};

// Initialize the application
function init() {
    // Ne plus mélanger les images, simplement afficher la première
    // shuffleArray(imageFiles);  <-- Cette ligne est supprimée
    
    // Display the first image (index 0)
    displayImage();
}

// Start the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);