// Notifications Module
export class NotificationManager {
    constructor() {
        this.container = this.createContainer();
    }

    createContainer() {
        let container = document.querySelector('.notifications-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notifications-container';
            document.body.appendChild(container);
        }
        return container;
    }

    show(message, type = 'info') {
        // Remove existing notifications of same type
        this.container.querySelectorAll(`.notification--${type}`).forEach(n => n.remove());

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <i class="fas ${this.getIconForType(type)}"></i>
                <span>${message}</span>
                <button class="notification__close" aria-label="Close notification">&times;</button>
            </div>
        `;

        this.container.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Handle close button
        const closeButton = notification.querySelector('.notification__close');
        closeButton.addEventListener('click', () => this.remove(notification));

        // Auto remove
        setTimeout(() => this.remove(notification), 5000);

        return notification;
    }

    remove(notification) {
        if (notification && notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }

    getIconForType(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    clear() {
        this.container.innerHTML = '';
    }
}