// Booking Confirmation Page JavaScript

// Initialize the booking confirmation page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Booking confirmation page loaded');
    
    // Load booking data
    loadBookingData();
    
    // Initialize event listeners
    initializeEventListeners();
});

// Load booking data from localStorage
function loadBookingData() {
    const bookingData = localStorage.getItem('currentBooking');
    
    if (bookingData) {
        const booking = JSON.parse(bookingData);
        updateBookingDisplay(booking);
    } else {
        // If no booking data, redirect to home
        window.location.href = 'index.html';
    }
}

// Update booking display with data
function updateBookingDisplay(booking) {
    // Generate booking reference
    const bookingRef = generateBookingReference();
    document.getElementById('bookingReference').textContent = bookingRef;
    
    // Update flight information
    document.getElementById('flightNumber').textContent = booking.flightNumber;
    document.getElementById('seatNumber').textContent = booking.seat;
    
    // Calculate total amount
    const basePrice = 299; // Base price from flight data
    const isPremium = isPremiumSeat(booking.seat);
    const totalAmount = isPremium ? basePrice + 50 : basePrice;
    
    document.getElementById('totalAmount').textContent = `${totalAmount} SAR`;
    
    // Store booking reference for future use
    localStorage.setItem('bookingReference', bookingRef);
    
    console.log('Booking display updated:', booking);
}

// Generate booking reference
function generateBookingReference() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `FLY-2024-${timestamp.toString().slice(-6)}${random}`;
}

// Check if seat is premium
function isPremiumSeat(seatId) {
    const row = parseInt(seatId.substring(0, seatId.length - 1));
    const premiumRows = [1, 2, 3, 4, 5];
    return premiumRows.includes(row);
}

// Initialize event listeners
function initializeEventListeners() {
    // Add any additional event listeners here
    console.log('Event listeners initialized');
}

// Download ticket
function downloadTicket() {
    const button = event.target;
    button.classList.add('loading');
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    
    // Simulate ticket generation
    setTimeout(() => {
        // Create ticket content
        const ticketContent = generateTicketContent();
        
        // Create and download file
        const blob = new Blob([ticketContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ticket-${document.getElementById('bookingReference').textContent}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // Reset button
        button.classList.remove('loading');
        button.innerHTML = '<i class="fas fa-download"></i> Download Ticket';
        
        // Show success message
        showNotification('Ticket downloaded successfully!', 'success');
    }, 2000);
}

// Generate ticket content
function generateTicketContent() {
    const bookingRef = document.getElementById('bookingReference').textContent;
    const flightNumber = document.getElementById('flightNumber').textContent;
    const seatNumber = document.getElementById('seatNumber').textContent;
    const totalAmount = document.getElementById('totalAmount').textContent;
    
    return `
FLYSMART AIRLINE TICKET
========================

Booking Reference: ${bookingRef}
Flight Number: ${flightNumber}
Seat Number: ${seatNumber}
Passenger: Ahmed Al-Rashid
Total Amount: ${totalAmount}

Flight Details:
- Departure: RUH (Riyadh) - 15 Jan 2024, 08:30
- Arrival: JED (Jeddah) - 15 Jan 2024, 11:15
- Duration: 2h 45m
- Airline: Saudia (Saudi Arabian Airlines)

Booking Date: ${new Date().toLocaleDateString()}
Booking Time: ${new Date().toLocaleTimeString()}

Please arrive at the airport at least 2 hours before departure.
Have a safe journey!

---
FlySmart - Your Intelligent Travel Companion
    `;
}

// View all bookings
function viewBookings() {
    const button = event.target;
    button.classList.add('loading');
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    // Simulate loading bookings
    setTimeout(() => {
        // In a real application, this would redirect to a bookings page
        // For now, we'll show an alert
        alert('Redirecting to your bookings...');
        
        // Reset button
        button.classList.remove('loading');
        button.innerHTML = '<i class="fas fa-list"></i> View All Bookings';
    }, 1500);
}

// Book another flight
function bookAnother() {
    const button = event.target;
    button.classList.add('loading');
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
    
    // Simulate redirect
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : '#0c5460'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : '#bee5eb'};
        border-radius: 8px;
        padding: 15px 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export functions for use in other scripts
window.bookingConfirmation = {
    downloadTicket,
    viewBookings,
    bookAnother,
    showNotification
};
