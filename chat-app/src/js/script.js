const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const userName = 'VotreNom'; // Remplacez par le nom de la personne

function addMessage(text, type) {
    const messagesDiv = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'sent');
        input.value = '';

        // Simuler une réponse après 2 secondes
        setTimeout(() => {
            addMessage('Ceci est une réponse automatique', 'received');
        }, 2000);
    }
}

// Permettre l'envoi avec la touche Entrée
document.getElementById('message-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

const firstNames = ['Emma', 'Lucas', 'Léa', 'Hugo', 'Chloé', 'Louis', 'Sarah', 'Jules', 'Alice', 'Sébastien'];
const lastNames = ['Martin', 'Bernard', 'Dubois', 'Robert', 'Richard', 'Petit', 'Durand', 'Leroy', 'Moreau', 'Derumière'];

function generateRandomName() {
    const randomFirst = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLast = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${randomFirst} ${randomLast}`;
}

// Mettre à jour le nom dans l'en-tête au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const headerName = document.querySelector('.chat-header h2');
    headerName.textContent = generateRandomName();
});