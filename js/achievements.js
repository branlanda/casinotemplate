class AchievementSystem {
    constructor() {
        this.animations = {
            trophy: 'https://assets2.lottiefiles.com/packages/lf20_obhph3sh.json',
            medal: 'https://assets5.lottiefiles.com/packages/lf20_4kx2q2.json',
            star: 'https://assets9.lottiefiles.com/packages/lf20_ydo1amjm.json',
            fireworks: 'https://assets3.lottiefiles.com/packages/lf20_obhph3sh.json'
        };
        
        this.init();
    }

    init() {
        // Create container if it doesn't exist
        if (!document.getElementById('achievement-container')) {
            const container = document.createElement('div');
            container.id = 'achievement-container';
            container.className = 'fixed inset-0 flex items-center justify-center z-50 pointer-events-none';
            document.body.appendChild(container);
        }
    }

    showAchievement(achievement) {
        const container = document.getElementById('achievement-container');
        
        // Create achievement popup
        const popup = document.createElement('div');
        popup.className = 'glassmorphism rounded-lg p-6 max-w-sm w-[90%] mx-auto text-center pointer-events-auto transform scale-0 transition-transform duration-300';
        
        // Create animation container
        const animationContainer = document.createElement('div');
        animationContainer.className = 'w-32 h-32 mx-auto mb-4';
        
        // Create title and description
        const title = document.createElement('h3');
        title.className = 'text-xl font-bold text-yellow-500 mb-2';
        title.textContent = achievement.title;
        
        const description = document.createElement('p');
        description.className = 'text-gray-300 mb-4';
        description.textContent = achievement.description;
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.className = 'px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors';
        closeButton.textContent = 'Cerrar';
        
        // Assemble popup
        popup.appendChild(animationContainer);
        popup.appendChild(title);
        popup.appendChild(description);
        popup.appendChild(closeButton);
        container.appendChild(popup);
        
        // Load and play animation
        const animation = lottie.loadAnimation({
            container: animationContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: this.animations[achievement.type]
        });
        
        // Show popup with animation
        setTimeout(() => {
            popup.classList.remove('scale-0');
            popup.classList.add('scale-100');
        }, 100);
        
        // Auto-hide after 6 seconds
        const timeout = setTimeout(() => {
            this.hideAchievement(popup);
        }, 6000);
        
        // Close button handler
        closeButton.addEventListener('click', () => {
            clearTimeout(timeout);
            this.hideAchievement(popup);
        });
    }
    
    hideAchievement(popup) {
        popup.classList.remove('scale-100');
        popup.classList.add('scale-0');
        
        setTimeout(() => {
            popup.remove();
        }, 300);
    }
}

// Initialize achievement system
const achievementSystem = new AchievementSystem();

// Example usage:
// achievementSystem.showAchievement({
//     title: '¡Nuevo Logro Desbloqueado!',
//     description: 'Has ganado tu primer trofeo',
//     type: 'trophy'
// }); 