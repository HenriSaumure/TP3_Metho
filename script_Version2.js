// Curseur personnalisé et effets de particules
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor-heart');
    const particlesContainer = document.getElementById('particles-container');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    const particles = [];
    
    // Suivi du curseur
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Créer une particule à chaque mouvement de souris (mais pas toujours)
        if (Math.random() > 0.7) {
            createParticle(mouseX, mouseY);
        }
    });
    
    // Animation du curseur coeur
    function animateCursor() {
        // Animation douce du curseur
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.2;
        cursorY += dy * 0.2;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        // Effet de grossissement lors du mouvement rapide
        const speed = Math.sqrt(dx * dx + dy * dy) * 0.05;
        const scale = Math.min(Math.max(1 + speed * 0.2, 1), 1.5);
        cursor.style.transform = `translate(-50%, -50%) scale(${scale})`;
        
        requestAnimationFrame(animateCursor);
    }
    
    // Créer une particule
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Taille aléatoire
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Couleur aléatoire (nuances de rouge et rose)
        const colors = ['#e61c5d', '#ff4d6d', '#ff8fa3', '#ffb6c1'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Position initiale
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Ajout au DOM
        particlesContainer.appendChild(particle);
        
        // Configuration de l'animation
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const lifetime = Math.random() * 1000 + 500; // Durée de vie en ms
        
        // Tracker la particule
        const particleInfo = {
            element: particle,
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            opacity: 1,
            lifetime: lifetime,
            createdAt: Date.now()
        };
        
        particles.push(particleInfo);
    }
    
    // Animation des particules
    function animateParticles() {
        const now = Date.now();
        
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            const age = now - p.createdAt;
            
            // Supprimer les particules trop vieilles
            if (age > p.lifetime) {
                p.element.remove();
                particles.splice(i, 1);
                continue;
            }
            
            // Mettre à jour la position
            p.x += p.vx;
            p.y += p.vy + 0.1; // Légère gravité
            
            // Ralentissement
            p.vx *= 0.99;
            p.vy *= 0.99;
            
            // Opacité
            p.opacity = 1 - (age / p.lifetime);
            
            // Appliquer les changements
            p.element.style.left = `${p.x}px`;
            p.element.style.top = `${p.y}px`;
            p.element.style.opacity = p.opacity;
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    // Démarrer les animations
    animateCursor();
    animateParticles();
    
    // Effets sur les liens et boutons
    const interactiveElements = document.querySelectorAll('a, button, .feature-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.mixBlendMode = 'screen';
            
            // Effet de pluie de particules
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createParticle(mouseX, mouseY);
                }, i * 50);
            }
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.mixBlendMode = 'normal';
        });
    });
    
    // Effet de clic
    document.addEventListener('click', (e) => {
        // Explosion de particules au clic
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createParticle(e.clientX, e.clientY);
            }, i * 20);
        }
        
        // Animation de pulsation du curseur
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        }, 100);
        setTimeout(() => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 200);
    });
    
    // Ajouter des interactions aux cartes de fonctionnalités
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Faire tourner l'icône
            const icon = card.querySelector('i');
            icon.style.transition = 'transform 0.5s ease-out';
            icon.style.transform = 'rotateY(180deg) scale(1.2)';
            
            // Ajouter un effet de brillance
            card.style.boxShadow = `0 10px 30px rgba(230, 28, 93, 0.3), 
                                    inset 0 0 10px rgba(255, 255, 255, 0.8)`;
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('i');
            icon.style.transform = 'rotateY(0deg) scale(1)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Animation du bouton d'appel à l'action
    const ctaButton = document.querySelector('.cta-button');
    
    ctaButton.addEventListener('mouseenter', () => {
        // Créer un effet de pulsation
        ctaButton.style.animation = 'pulse 1s infinite';
    });
    
    ctaButton.addEventListener('mouseleave', () => {
        ctaButton.style.animation = 'none';
    });
    
    // Définir l'animation de pulsation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});