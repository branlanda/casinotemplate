class NotificationSystem {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        // Create notification container if it doesn't exist
        if (!document.getElementById('notification-container')) {
            this.container = document.createElement('div');
            this.container.id = 'notification-container';
            this.container.className = 'fixed top-4 right-4 z-50 space-y-4';
            document.body.appendChild(this.container);
        } else {
            this.container = document.getElementById('notification-container');
        }
    }

    createNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification glassmorphism rounded-lg p-4 shadow-lg transform transition-all duration-300 translate-x-full opacity-0`;
        
        // Set background color based on type
        const bgColors = {
            success: 'bg-green-500/20 border-green-500/50',
            error: 'bg-red-500/20 border-red-500/50',
            info: 'bg-yellow-500/20 border-yellow-500/50'
        };

        // Set icon based on type
        const icons = {
            success: '✅',
            error: '❌',
            info: 'ℹ️'
        };

        notification.innerHTML = `
            <div class="flex items-start space-x-3">
                <span class="text-xl">${icons[type]}</span>
                <div class="flex-1">
                    <p class="text-white font-medium">${message}</p>
                </div>
                <button class="text-gray-400 hover:text-white transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `;

        // Add type-specific styling
        notification.classList.add(bgColors[type]);

        // Add to container
        this.container.appendChild(notification);

        // Trigger animation
        requestAnimationFrame(() => {
            notification.classList.remove('translate-x-full', 'opacity-0');
        });

        // Add click handler for close button
        const closeButton = notification.querySelector('button');
        closeButton.addEventListener('click', () => this.removeNotification(notification));

        // Auto remove after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);

        return notification;
    }

    removeNotification(notification) {
        notification.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }

    // Convenience methods for different notification types
    success(message) {
        return this.createNotification(message, 'success');
    }

    error(message) {
        return this.createNotification(message, 'error');
    }

    info(message) {
        return this.createNotification(message, 'info');
    }
}

// Create global instance
window.notifications = new NotificationSystem();

// Example usage:
// window.notifications.success('¡Has ganado un bono!');
// window.notifications.error('Tu conexión se ha perdido.');
// window.notifications.info('Nuevo torneo disponible.'); 