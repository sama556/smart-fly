// Notifications System
const notificationsData = [
    {
        id: 1,
        type: 'flight-change',
        title: 'Flight Schedule Change',
        message: 'Your flight SV-7816 from Riyadh to Jeddah has been rescheduled to 16:30 (was 14:30). Please check your updated itinerary.',
        time: '2 hours ago',
        unread: true,
        actions: [
            { text: 'View Details', type: 'primary', action: 'viewFlightDetails' },
            { text: 'Accept Change', type: 'secondary', action: 'acceptChange' }
        ]
    },
    {
        id: 2,
        type: 'auto-reservation',
        title: 'Automatic Reservation Confirmed',
        message: 'Your automatic booking for flight TR-5412 has been successfully confirmed. Seat 8B has been assigned.',
        time: '4 hours ago',
        unread: true,
        actions: [
            { text: 'View Booking', type: 'primary', action: 'viewBooking' },
            { text: 'Download Ticket', type: 'secondary', action: 'downloadTicket' }
        ]
    },
    
];

let notificationsDropdown = null;
let notificationIcon = null;
let notificationBadge = null;

// Initialize notifications system
document.addEventListener('DOMContentLoaded', function() {
    initializeNotifications();
});

function initializeNotifications() {
    // Create notifications dropdown if it doesn't exist
    if (!document.getElementById('notificationsDropdown')) {
        createNotificationsDropdown();
    }
    
    notificationsDropdown = document.getElementById('notificationsDropdown');
    notificationIcon = document.getElementById('notificationIcon');
    notificationBadge = document.getElementById('notificationBadge');
    
    // Add click event to notification icon
    if (notificationIcon) {
        notificationIcon.addEventListener('click', toggleNotificationsDropdown);
    }
    
    // Update notification badge
    updateNotificationBadge();
    
    // Render notifications
    renderNotifications();
}

function createNotificationsDropdown() {
    const dropdownHTML = `
        <div class="notifications-dropdown" id="notificationsDropdown">
            <div class="notifications-header">
                <h3 class="notifications-title">
                    <i class="fas fa-bell"></i>
                    Notifications
                </h3>
                <p class="notifications-subtitle">Stay updated with your flight information</p>
            </div>
            <div class="notifications-list" id="notificationsList">
                <!-- Notifications will be rendered here -->
            </div>
            <div class="notifications-footer">
                <button class="mark-all-read-btn" onclick="markAllAsRead()">
                    <i class="fas fa-check-double"></i> Mark All as Read
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', dropdownHTML);
}

function toggleNotificationsDropdown() {
    if (!notificationsDropdown) return;
    
    const isVisible = notificationsDropdown.classList.contains('show');
    
    if (isVisible) {
        notificationsDropdown.classList.remove('show');
    } else {
        notificationsDropdown.classList.add('show');
        // Close other dropdowns
        closeOtherDropdowns();
    }
}

function closeOtherDropdowns() {
    // Close cart dropdown if open
    const cartDropdown = document.getElementById('cartDropdown');
    if (cartDropdown && cartDropdown.classList.contains('show')) {
        cartDropdown.classList.remove('show');
    }
    
    // Close profile dropdown if open
    const profileDropdown = document.getElementById('profileDropdown');
    if (profileDropdown && profileDropdown.classList.contains('show')) {
        profileDropdown.classList.remove('show');
    }
}

function renderNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    if (!notificationsList) return;
    
    if (notificationsData.length === 0) {
        notificationsList.innerHTML = `
            <div class="empty-notifications">
                <i class="fas fa-bell-slash"></i>
                <h3>No Notifications</h3>
                <p>You're all caught up! We'll notify you when there are updates.</p>
            </div>
        `;
        return;
    }
    
    const notificationsHTML = notificationsData.map(notification => `
        <div class="notification-item ${notification.unread ? 'unread' : ''}" data-id="${notification.id}">
            <div class="notification-icon ${notification.type}">
                <i class="fas ${getNotificationIcon(notification.type)}"></i>
            </div>
            <div class="notification-content">
                <h4 class="notification-title">${escapeHtml(notification.title)}</h4>
                <p class="notification-message">${escapeHtml(notification.message)}</p>
                <div class="notification-time">
                    <i class="fas fa-clock"></i>
                    ${escapeHtml(notification.time)}
                </div>
                ${notification.actions ? `
                    <div class="notification-actions">
                        ${notification.actions.map(action => `
                            <button class="notification-btn ${action.type}" onclick="handleNotificationAction('${action.action}', ${notification.id})">
                                ${action.text}
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
    
    notificationsList.innerHTML = notificationsHTML;
}

function getNotificationIcon(type) {
    const icons = {
        'flight-change': 'fa-plane',
        'auto-reservation': 'fa-robot',
        'booking-update': 'fa-receipt',
        'promotion': 'fa-gift'
    };
    return icons[type] || 'fa-bell';
}

function updateNotificationBadge() {
    if (!notificationBadge) return;
    
    const unreadCount = notificationsData.filter(n => n.unread).length;
    notificationBadge.textContent = unreadCount;
    notificationBadge.style.display = unreadCount > 0 ? 'block' : 'none';
}

function markAllAsRead() {
    notificationsData.forEach(notification => {
        notification.unread = false;
    });
    
    renderNotifications();
    updateNotificationBadge();
    
    // Show success message
    showNotificationToast('All notifications marked as read', 'success');
}

function markAsRead(notificationId) {
    const notification = notificationsData.find(n => n.id === notificationId);
    if (notification) {
        notification.unread = false;
        renderNotifications();
        updateNotificationBadge();
    }
}

function handleNotificationAction(action, notificationId) {
    // Mark as read when action is taken
    markAsRead(notificationId);
    
    switch (action) {
        case 'viewFlightDetails':
            showNotificationToast('Opening flight details...', 'info');
            // Navigate to airline details page with id
            setTimeout(() => {
                window.location.href = 'airline-details.html?id=1';
            }, 1000);
            break;
            
        case 'acceptChange':
            showNotificationToast('Flight change accepted', 'success');
            // Navigate to bookings page after accepting
            setTimeout(() => {
                window.location.href = 'bookings.html';
            }, 1500);
            break;
            
        case 'viewBooking':
            showNotificationToast('Opening booking details...', 'info');
            // Navigate to bookings page with specific booking ID
            const notification = notificationsData.find(n => n.id === notificationId);
            const bookingId = getBookingIdFromNotification(notification);
            setTimeout(() => {
                if (bookingId) {
                    window.location.href = `bookings.html?booking=${bookingId}`;
                } else {
                    window.location.href = 'bookings.html';
                }
            }, 1000);
            break;
            
        case 'downloadTicket':
            showNotificationToast('Downloading ticket...', 'info');
            // In real app, trigger ticket download
            break;
            
        case 'viewReceipt':
            showNotificationToast('Opening receipt...', 'info');
            // Navigate to bookings page to view receipt
            setTimeout(() => {
                window.location.href = 'bookings.html';
            }, 1000);
            break;
            
        case 'viewGateInfo':
            showNotificationToast('Gate information displayed', 'info');
            // Navigate to bookings page for gate info
            setTimeout(() => {
                window.location.href = 'bookings.html';
            }, 1000);
            break;
            
        case 'upgradeSeat':
            showNotificationToast('Processing seat upgrade...', 'info');
            // Navigate to bookings page for seat upgrade
            setTimeout(() => {
                window.location.href = 'bookings.html';
            }, 1000);
            break;
            
        case 'declineUpgrade':
            showNotificationToast('Seat upgrade declined', 'info');
            break;
            
        case 'usePromoCode':
            showNotificationToast('Promo code copied to clipboard', 'success');
            break;
            
        case 'dismissPromo':
            showNotificationToast('Promotion dismissed', 'info');
            break;
            
        default:
            showNotificationToast('Action completed', 'success');
    }
}

function showNotificationToast(message, type = 'info') {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `notification-toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.9rem;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function getBookingIdFromNotification(notification) {
    if (!notification) return null;
    
    // Extract booking ID from notification message or title
    const message = notification.message || '';
    const title = notification.title || '';
    
    // Look for booking numbers in the format FLY-XXXX-XXXXXX
    const bookingMatch = (message + ' ' + title).match(/FLY-\d{4}-\d{6}/);
    if (bookingMatch) {
        return bookingMatch[0];
    }
    
    // Look for trip numbers in the format TR-XXXX
    const tripMatch = (message + ' ' + title).match(/TR-\d{4}/);
    if (tripMatch) {
        return tripMatch[0];
    }
    
    // Look for flight numbers in the format SV-XXXX
    const flightMatch = (message + ' ' + title).match(/SV-\d{4}/);
    if (flightMatch) {
        return flightMatch[0];
    }
    
    return null;
}

// Close notifications when clicking outside
document.addEventListener('click', function(event) {
    if (notificationsDropdown && notificationsDropdown.classList.contains('show')) {
        if (!notificationsDropdown.contains(event.target) && 
            !notificationIcon.contains(event.target)) {
            notificationsDropdown.classList.remove('show');
        }
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);
