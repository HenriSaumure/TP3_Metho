function initSwipeDetection() {
    const imageContainer = document.getElementById('image-container');
    const currentImage = document.getElementById('current-image');
    let startX, startY, endX, endY;
    let isDragging = false;
    let hasBeenDragged = false;
    
    // Seuils pour la détection des swipes
    const swipeThreshold = 100;
    const fadeThreshold = 150;
    const minDragDistance = 20;
    const verticalThreshold = 100;
    const directionRatio = 1.5;

    // Function to handle mouse/touch start
    const handleStart = function(e) {
        isDragging = true;
        hasBeenDragged = false;
        const point = e.touches ? e.touches[0] : e;
        startX = point.clientX;
        startY = point.clientY;
        endX = startX;
        endY = startY;
        
        // Reset transform and opacity
        imageContainer.style.transform = '';
        currentImage.style.opacity = 1;
        
        // Ajouter un effet de prise en main
        imageContainer.style.cursor = 'grabbing';
    };

    // Function to handle mouse/touch move
    const handleMove = function(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const point = e.touches ? e.touches[0] : e;
        endX = point.clientX;
        endY = point.clientY;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Vérifier si l'utilisateur a suffisamment déplacé pour considérer un drag
        if (Math.abs(deltaX) > minDragDistance || Math.abs(deltaY) > minDragDistance) {
            hasBeenDragged = true;
        }
        
        // Déterminer la direction dominante du mouvement
        const isVerticalMovement = Math.abs(deltaY) > Math.abs(deltaX) * directionRatio;
        
        // Si le mouvement est principalement vertical (vers le haut), n'appliquer que la transformation Y
        if (isVerticalMovement && deltaY < 0) {
            imageContainer.style.transform = `translateY(${deltaY}px)`;
            
            // Suppression de l'effet de fade
            currentImage.style.opacity = 1;
            
            imageContainer.classList.remove('like-border');
            imageContainer.classList.remove('dislike-border');
        } 
        // Sinon, si c'est un mouvement horizontal, appliquer la rotation et le déplacement X
        else if (!isVerticalMovement) {
            // Calculer les transformations basées sur les distances de drag
            const rotation = deltaX * 0.1;
            
            // Déplacer la carte pendant que l'utilisateur glisse
            imageContainer.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
            
            // Suppression de l'effet de fade
            currentImage.style.opacity = 1;
            
            // Afficher les indicateurs visuels en fonction de la direction du glissement
            if (deltaX > swipeThreshold/2) {
                imageContainer.classList.add('like-border');
                imageContainer.classList.remove('dislike-border');
            } else if (deltaX < -swipeThreshold/2) {
                imageContainer.classList.add('dislike-border');
                imageContainer.classList.remove('like-border');
            } else {
                imageContainer.classList.remove('like-border');
                imageContainer.classList.remove('dislike-border');
            }
        }
    };

    // Function to handle mouse/touch end
    const handleEnd = function() {
        if (!isDragging) return;
        isDragging = false;
        
        // Rétablir le curseur normal
        imageContainer.style.cursor = 'grab';
        
        // Ne traiter l'action que si l'utilisateur a vraiment fait un drag
        if (!hasBeenDragged) {
            // Simple clic sans drag, ne rien faire
            return;
        }
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Vérifier si le mouvement est principalement vertical
        const isVerticalMovement = Math.abs(deltaY) > Math.abs(deltaX) * directionRatio;
        
        // Traiter le swipe vertical vers le haut
        if (isVerticalMovement && deltaY < -verticalThreshold) {
            // Swipe vers le haut - animation de sortie par le haut
            imageContainer.style.transition = 'all 0.5s ease';
            imageContainer.style.transform = 'translateY(-' + window.innerHeight + 'px)';
            // Suppression du fade
            currentImage.style.opacity = 1;
            
            setTimeout(() => {
                nextImage();
                
                // Réinitialiser après l'animation
                imageContainer.style.transition = '';
                imageContainer.style.opacity = 1;
                imageContainer.style.transform = '';
                
                imageContainer.classList.remove('like-border');
                imageContainer.classList.remove('dislike-border');
            }, 500);
        } 
        // Traiter le swipe horizontal seulement si c'est clairement un mouvement horizontal
        else if (!isVerticalMovement && Math.abs(deltaX) > swipeThreshold) {
            // Si le déplacement horizontal est suffisant, lancer l'animation de sortie
            const direction = deltaX > 0 ? 1 : -1;
            const finalX = direction * window.innerWidth;
            
            // Animation de sortie sans fondu
            imageContainer.style.transition = 'all 0.5s ease';
            imageContainer.style.transform = `translateX(${finalX}px) rotate(${direction * 45}deg)`;
            // Suppression du fade
            currentImage.style.opacity = 1;
            
            // Traiter l'action de swipe - mais NE PAS réinitialiser l'animation
            setTimeout(() => {
                if (deltaX > 0) {
                    handleSwipeAction('right');
                } else {
                    handleSwipeAction('left');
                }
            }, 500);
        } else {
            // Pas assez de mouvement ou mouvement ambigu, retour à la position initiale avec animation
            imageContainer.style.transition = 'transform 0.3s ease';
            currentImage.style.transition = 'opacity 0.3s ease';
            imageContainer.style.transform = '';
            currentImage.style.opacity = 1;
            
            // Supprimer la transition après qu'elle soit terminée
            setTimeout(() => {
                imageContainer.style.transition = '';
                currentImage.style.transition = '';
                imageContainer.classList.remove('like-border');
                imageContainer.classList.remove('dislike-border');
            }, 300);
        }
    };

    // Add event listeners for touch devices
    imageContainer.addEventListener('touchstart', handleStart, false);
    imageContainer.addEventListener('touchmove', handleMove, { passive: false });
    imageContainer.addEventListener('touchend', handleEnd, false);
    
    // Add event listeners for mouse (desktop)
    imageContainer.addEventListener('mousedown', handleStart, false);
    window.addEventListener('mousemove', handleMove, false);
    window.addEventListener('mouseup', handleEnd, false);
    
    // Style initial pour le curseur
    imageContainer.style.cursor = 'grab';
    
    // Ajouter des indices visuels pour montrer que l'image peut être glissée
    imageContainer.addEventListener('mouseover', () => {
        imageContainer.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    });
    
    imageContainer.addEventListener('mouseout', () => {
        imageContainer.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    });
    
    // Ajouter un texte d'indication au survol
    const hintElement = document.createElement('div');
    hintElement.textContent = 'Cliquez et maintenez pour glisser';
    hintElement.style.position = 'absolute';
    hintElement.style.bottom = '10px';
    hintElement.style.left = '0';
    hintElement.style.right = '0';
    hintElement.style.textAlign = 'center';
    hintElement.style.color = 'white';
    hintElement.style.backgroundColor = 'rgba(0,0,0,0.5)';
    hintElement.style.padding = '5px';
    hintElement.style.borderRadius = '5px';
    hintElement.style.opacity = '0';
    hintElement.style.transition = 'opacity 0.3s ease';
    imageContainer.appendChild(hintElement);
    
    imageContainer.addEventListener('mouseover', () => {
        hintElement.style.opacity = '1';
    });
    
    imageContainer.addEventListener('mouseout', () => {
        hintElement.style.opacity = '0';
    });
}

// This function will be called by our event handlers
function handleSwipeAction(direction) {
    // Call the app.js function to handle the swipe
    window.handleSwipe(direction);
}

// This function will be called when swiping up
function nextImage() {
    // Call the app.js function to load the next image
    window.loadNextImage();
}

document.addEventListener('DOMContentLoaded', initSwipeDetection);