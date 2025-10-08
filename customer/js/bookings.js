// Bookings Page - User-Specific Data

// Current logged-in user
const currentUser = {
    id: 'TRV-998877',
    name: 'Ahmed Al-Rashid',
    email: 'ahmed.alrashid@email.com',
    status: 'Active Member'
};

// All bookings data (in real app, this would come from database)
const allBookings = [
    {
        bookingNumber: 'FLY-2025-000123',
        bookerId: 'TRV-998877',
        tripNumber: 'TR-7816',
        bookingDate: '05 Oct 2025',
        totalPriceSar: 899,
        status: 'confirmed',
        statusText: 'Confirmed',
        passengerType: 'Traveler',
        passengerId: 'TRV-998877',
        bookingType: 'Automatic',
        flightRoute: {
            from: 'Riyadh (RUH)',
            to: 'Jeddah (JED)',
            date: '15 Oct 2025',
            time: '14:30 - 17:15'
        }
    },
    {
        bookingNumber: 'FLY-2025-000124',
        bookerId: 'TRV-998877',
        tripNumber: 'TR-5412',
        bookingDate: '03 Oct 2025',
        totalPriceSar: 1249,
        status: 'pending',
        statusText: 'Pending Payment',
        passengerType: 'Traveler',
        passengerId: 'TRV-998877',
        bookingType: 'Manual',
        flightRoute: {
            from: 'Jeddah (JED)',
            to: 'Riyadh (RUH)',
            date: '20 Oct 2025',
            time: '09:15 - 11:45'
        }
    },
    {
        bookingNumber: 'FLY-2025-000125',
        bookerId: 'TRV-998877',
        tripNumber: 'TR-9012',
        bookingDate: '28 Sep 2025',
        totalPriceSar: 540,
        status: 'completed',
        statusText: 'Completed',
        passengerType: 'Traveler',
        passengerId: 'TRV-998877',
        bookingType: 'Automatic',
        flightRoute: {
            from: 'Riyadh (RUH)',
            to: 'Dammam (DMM)',
            date: '25 Oct 2025',
            time: '16:20 - 17:50'
        }
    },
    {
        bookingNumber: 'FLY-2025-000126',
        bookerId: 'TRV-998877',
        tripNumber: 'TR-6720',
        bookingDate: '20 Sep 2025',
        totalPriceSar: 999,
        status: 'confirmed',
        statusText: 'Confirmed',
        passengerType: 'Traveler',
        passengerId: 'TRV-998877',
        bookingType: 'Manual',
        flightRoute: {
            from: 'Dammam (DMM)',
            to: 'Riyadh (RUH)',
            date: '30 Oct 2025',
            time: '12:00 - 13:30'
        }
    },
    // Other users' bookings (should not appear for current user)
    {
        bookingNumber: 'FLY-2025-000127',
        bookerId: 'TRV-112233',
        tripNumber: 'TR-9999',
        bookingDate: '01 Oct 2025',
        totalPriceSar: 750,
        status: 'confirmed',
        statusText: 'Confirmed',
        passengerType: 'Traveler',
        passengerId: 'TRV-112233',
        bookingType: 'Automatic',
        flightRoute: {
            from: 'Riyadh (RUH)',
            to: 'Dubai (DXB)',
            date: '10 Oct 2025',
            time: '08:00 - 10:30'
        }
    }
];

document.addEventListener('DOMContentLoaded', function () {
    // Filter bookings for current user only
    const userBookings = allBookings.filter(booking => booking.bookerId === currentUser.id);
    
    // Update user info in the page
    updateUserInfo();
    
    // Render user's bookings
    renderStaticBookings(userBookings);
    
    // Update statistics
    updateBookingStats(userBookings);
    
    // Handle URL parameters for specific booking navigation
    handleBookingNavigation();
});

function handleBookingNavigation() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookingId = urlParams.get('booking');
    
    if (bookingId) {
        // Scroll to and highlight the specific booking
        setTimeout(() => {
            highlightSpecificBooking(bookingId);
        }, 500);
    }
}

function highlightSpecificBooking(bookingId) {
    // Find the booking card that matches the booking ID
    const bookingCards = document.querySelectorAll('.booking-card');
    
    bookingCards.forEach(card => {
        const bookingNumber = card.querySelector('.booking-number .value');
        const flightNumber = card.querySelector('.flight-info .value');
        
        if (bookingNumber && bookingNumber.textContent.includes(bookingId)) {
            // Scroll to the booking card
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Add highlight effect
            card.style.border = '3px solid #3b82f6';
            card.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
            card.style.transform = 'scale(1.02)';
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
                card.style.border = '';
                card.style.boxShadow = '';
                card.style.transform = '';
            }, 3000);
            
            // Show notification
            showBookingHighlightNotification(bookingId);
        }
    });
}

function showBookingHighlightNotification(bookingId) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #3b82f6;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.9rem;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>Showing booking: ${bookingId}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function updateUserInfo() {
    // Update page title with user's name
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        pageTitle.innerHTML = `<i class="fas fa-plane"></i> ${currentUser.name}'s Bookings`;
    }
    
    // Update page subtitle
    const pageSubtitle = document.querySelector('.page-subtitle');
    if (pageSubtitle) {
        pageSubtitle.textContent = `Welcome back, ${currentUser.name}! Manage your flight bookings here.`;
    }
}

function updateBookingStats(bookings) {
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const completedBookings = bookings.filter(b => b.status === 'completed').length;
    
    // Update stats cards
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length >= 4) {
        // Total Bookings
        const totalCard = statCards[0];
        const totalNumber = totalCard.querySelector('h3');
        if (totalNumber) totalNumber.textContent = totalBookings;
        
        // Confirmed Bookings
        const confirmedCard = statCards[1];
        const confirmedNumber = confirmedCard.querySelector('h3');
        if (confirmedNumber) confirmedNumber.textContent = confirmedBookings;
        
        // Pending Bookings
        const pendingCard = statCards[2];
        const pendingNumber = pendingCard.querySelector('h3');
        if (pendingNumber) pendingNumber.textContent = pendingBookings;
        
        // Completed Bookings
        const completedCard = statCards[3];
        const completedNumber = completedCard.querySelector('h3');
        if (completedNumber) completedNumber.textContent = completedBookings;
    }
}

function renderStaticBookings(bookings) {
    const listEl = document.getElementById('bookingsList');
    if (!listEl) return;

    // Ensure list is visible and any loading state is hidden
    listEl.style.display = 'block';
    const loading = document.getElementById('loadingState');
    if (loading) loading.style.display = 'none';

    listEl.innerHTML = bookings.map(renderBookingCard).join('');
}

function renderBookingCard(b) {
    return `
<div class="booking-card" dir="ltr" aria-label="Booking details card">
    <!-- Card 1: Flight Details -->
    <div class="booking-section flight-details-section">
        <div class="section-header">
            <i class="fas fa-plane"></i>
            <h3>Flight Details</h3>
        </div>
        <div class="flight-main-info">
            <div class="flight-route-display">
                <div class="route-point departure">
                    <div class="airport-code">${getAirportCode(b.flightRoute.from)}</div>
                    <div class="city-name">${getCityName(b.flightRoute.from)}</div>
                    <div class="route-time">${getDepartureTime(b.flightRoute.time)}</div>
                </div>
                
                <div class="route-connector">
                    <div class="flight-duration">${calculateFlightDuration(b.flightRoute.time)}</div>
                    <div class="connector-line"></div>
                    <i class="fas fa-plane"></i>
                </div>
                
                <div class="route-point arrival">
                    <div class="airport-code">${getAirportCode(b.flightRoute.to)}</div>
                    <div class="city-name">${getCityName(b.flightRoute.to)}</div>
                    <div class="route-time">${getArrivalTime(b.flightRoute.time)}</div>
                </div>
            </div>
            
            <div class="flight-metadata">
                <div class="metadata-item">
                    <i class="fas fa-calendar"></i>
                    <span>${escapeHtml(b.flightRoute.date)}</span>
                </div>
                <div class="metadata-item">
                    <i class="fas fa-clock"></i>
                    <span>${escapeHtml(b.flightRoute.time)}</span>
                </div>
                <div class="metadata-item">
                    <i class="fas fa-ticket-alt"></i>
                    <span>${escapeHtml(b.tripNumber)}</span>
                </div>
            </div>
        </div>
        
        <div class="status-display">
            <div class="status-badge ${escapeHtml(b.status)}">
                ${statusIcon(b.status)}
                ${escapeHtml(b.statusText)}
            </div>
        </div>
    </div>

    <!-- Card 2: Customer Details -->
    <div class="booking-section customer-details-section">
        <div class="section-header">
            <i class="fas fa-user"></i>
            <h3>Customer Details</h3>
        </div>
        <div class="customer-info-grid">
            <div class="customer-info-item">
                <div class="info-label">
                    <i class="fas fa-user-circle"></i>
                    Passenger Name
                </div>
                <div class="info-value">${escapeHtml(currentUser.name)}</div>
            </div>
            
            <div class="customer-info-item">
                <div class="info-label">
                    <i class="fas fa-envelope"></i>
                    Email Address
                </div>
                <div class="info-value">${escapeHtml(currentUser.email)}</div>
            </div>
            
            <div class="customer-info-item">
                <div class="info-label">
                    <i class="fas fa-id-card"></i>
                    Passenger ID
                </div>
                <div class="info-value">${escapeHtml(b.passengerId)}</div>
            </div>
            
            <div class="customer-info-item">
                <div class="info-label">
                    <i class="fas fa-receipt"></i>
                    Booking Number
                </div>
                <div class="info-value">${escapeHtml(b.bookingNumber)}</div>
            </div>
            
            <div class="customer-info-item">
                <div class="info-label">
                    <i class="fas fa-calendar-alt"></i>
                    Booking Date
                </div>
                <div class="info-value">${escapeHtml(b.bookingDate)}</div>
            </div>
            
            <div class="customer-info-item">
                <div class="info-label">
                    <i class="fas fa-robot"></i>
                    Booking Type
                </div>
                <div class="info-value">${escapeHtml(b.bookingType)}</div>
            </div>
        </div>
    </div>

    <!-- Card 3: Total & QR Code -->
    <div class="booking-section total-qr-section">
        <div class="section-header">
            <i class="fas fa-receipt"></i>
            <h3>Payment & Boarding</h3>
        </div>
        <div class="total-qr-content">
            <div class="price-summary">
                <div class="price-breakdown">
                    <div class="price-item">
                        <span class="price-label">Base Fare</span>
                        <span class="price-amount">${escapeNumber(b.totalPriceSar * 0.7)} SAR</span>
                    </div>
                    <div class="price-item">
                        <span class="price-label">Taxes & Fees</span>
                        <span class="price-amount">${escapeNumber(b.totalPriceSar * 0.3)} SAR</span>
                    </div>
                    <div class="price-divider"></div>
                    <div class="price-total">
                        <span class="total-label">Total Amount</span>
                        <span class="total-amount">${escapeNumber(b.totalPriceSar)} SAR</span>
                    </div>
                </div>
                <div class="payment-status">
                    <i class="fas fa-check-circle"></i>
                    <span>Payment ${b.status === 'pending' ? 'Pending' : 'Completed'}</span>
                </div>
            </div>
            
            <div class="qr-container">
                <div class="qr-code-display">
                    <div class="qr-placeholder">
                        <i class="fas fa-qrcode"></i>
                        <span>Boarding Pass QR</span>
                    </div>
                </div>
                <div class="qr-info">
                    <div class="qr-flight">${escapeHtml(b.tripNumber)}</div>
                    <div class="qr-passenger">${escapeHtml(currentUser.name)}</div>
                    <div class="qr-notice">Scan at boarding gate</div>
                </div>
            </div>
        </div>
    </div>
</div>`;
}

// Helper functions for flight details
function getAirportCode(route) {
    const match = route.match(/\(([^)]+)\)/);
    return match ? match[1] : route.split(' ')[0];
}

function getCityName(route) {
    return route.split(' (')[0];
}

function getDepartureTime(timeRange) {
    return timeRange.split(' - ')[0];
}

function getArrivalTime(timeRange) {
    return timeRange.split(' - ')[1];
}

function calculateFlightDuration(timeRange) {
    const [departure, arrival] = timeRange.split(' - ');
    const depTime = new Date(`2000/01/01 ${departure}`);
    const arrTime = new Date(`2000/01/01 ${arrival}`);
    const diff = (arrTime - depTime) / (1000 * 60); // difference in minutes
    
    if (diff < 0) {
        // Handle overnight flights
        return "24h+";
    }
    
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    
    if (hours > 0) {
        return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
    return `${minutes}m`;
}

function statusIcon(status) {
    switch (status) {
        case 'confirmed':
            return '<i class="fas fa-check-circle"></i>';
        case 'pending':
            return '<i class="fas fa-credit-card"></i>';
        case 'cancelled':
            return '<i class="fas fa-times-circle"></i>';
        case 'completed':
            return '<i class="fas fa-check-double"></i>';
        default:
            return '<i class="fas fa-info-circle"></i>';
    }
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function escapeNumber(n) {
    const num = Number(n);
    if (Number.isNaN(num)) return escapeHtml(n);
    return num.toLocaleString('en-US');
}
