// This file contains the main JavaScript logic for the swipe image application.

// Attendre que le DOM soit complètement chargé avant d'accéder aux éléments
document.addEventListener('DOMContentLoaded', function() {
    const imageContainer = document.getElementById('image-container');
    const currentImage = document.getElementById('current-image');
    const imageFiles = [
        'images/65270ffde8a1ae823a9b4405764f0829.jpg',
        'images/6bd7a8d98edd4de5009ba663b8181014.jpg',
        'images/9687d7238955b17ae7f91e71ea800e5f.jpg',
        'images/467399159_10233135758591824_8370814502020202997_n.jpg',
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

    // Fonction pour précharger les images pour une transition plus fluide
    function preloadImages() {
        imageFiles.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }

    // Load and display the current image
    function displayImage() {
        currentImage.src = imageFiles[currentIndex];
        
        // Reset border color
        imageContainer.classList.remove('like-border');
        imageContainer.classList.remove('dislike-border');
    }

    // Handle swipe gestures (called from swipe.js)
    window.handleSwipe = function(direction) {
        if (direction === 'left') {
            // User disliked the image - l'animation est déjà gérée dans swipe.js
            // Passer à l'image suivante après un délai
            setTimeout(loadNextImage, 500);
        } else if (direction === 'right') {
            // User liked the image - l'animation est déjà gérée dans swipe.js
            // Passer à l'image suivante après un délai
            setTimeout(loadNextImage, 500);
        }
    };

    // Load the next image (also called from swipe.js)
    window.loadNextImage = function() {
        // Passer à l'image suivante
        currentIndex = (currentIndex + 1) % imageFiles.length;
        
        // Afficher immédiatement la nouvelle image sans animation de fondu
        displayImage();
        
        // Réinitialiser toutes les transformations
        imageContainer.style.transition = 'none';
        imageContainer.style.transform = 'scale(1) translateY(0)';
        imageContainer.style.opacity = '1';
    };

    // Initialize the application
    function init() {
        // Précharger toutes les images
        preloadImages();
        
        // Afficher la première image directement sans fondu
        displayImage();
        imageContainer.style.opacity = '1';
        imageContainer.style.transform = 'scale(1) translateY(0)';
    }

    // Initialize once DOM is fully loaded
    init();
});