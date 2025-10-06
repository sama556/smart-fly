// Airline Details Page JavaScript

// Initialize airline details page
document.addEventListener('DOMContentLoaded', function() {
    // Content is now static in HTML, no need to load dynamically
    console.log('Airline details page loaded with static content');
    
    // Initialize search form functionality
    initializeSearchForm();
    
    // Initialize auto-booking functionality
    initializeAutoBooking();
});

// Initialize search form functionality
function initializeSearchForm() {
    const searchForm = document.getElementById('quickSearch');
    if (!searchForm) return;
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const from = formData.get('from') || this.querySelector('input[type="text"]').value;
        const to = formData.get('to') || this.querySelectorAll('input[type="text"]')[1].value;
        const departure = formData.get('departure') || this.querySelector('input[type="date"]').value;
        
        // Show loading state
        const searchBtn = this.querySelector('.search-btn');
        const originalText = searchBtn.innerHTML;
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
        searchBtn.disabled = true;
        
        // Simulate search process and redirect to flight-booking
        setTimeout(() => {
            searchBtn.innerHTML = originalText;
            searchBtn.disabled = false;
            
            // Store search data in localStorage for flight-booking page
            const searchData = {
                from: from,
                to: to,
                departure: departure,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('searchData', JSON.stringify(searchData));
            
            // Redirect to flight-booking page
            window.location.href = 'flight-booking.html';
        }, 2000);
    });
}

// Initialize auto-booking functionality
function initializeAutoBooking() {
    const autoBookingToggle = document.getElementById('autoBookingToggle');
    const autoBookingOptions = document.getElementById('autoBookingOptions');
    
    if (!autoBookingToggle || !autoBookingOptions) return;
    
    autoBookingToggle.addEventListener('change', function() {
        if (this.checked) {
            autoBookingOptions.classList.add('active');
            
            // Show notification
            showAutoBookingNotification();
        } else {
            autoBookingOptions.classList.remove('active');
        }
    });
}

// Show auto-booking notification
function showAutoBookingNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'auto-booking-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 12px;
        padding: 15px 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.9rem;
        color: #1f2937;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-robot" style="color: #4facfe; font-size: 1.2rem;"></i>
        <div>
            <div style="font-weight: 600;">Auto-Booking Enabled</div>
            <div style="font-size: 0.8rem; color: #6b7280;">We'll notify you when flights match your criteria</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Book flight function
function bookFlight(flightNumber) {
    // Store flight data for the booking page
    const flightData = {
        flightNumber: flightNumber,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('selectedFlight', JSON.stringify(flightData));
    
    // Redirect to flight booking page
    window.location.href = `flight-booking.html?flight=${flightNumber}`;
}

// Display airline details
function displayAirlineDetails(airline) {
    const content = document.getElementById('airlineDetailsContent');
    
    content.innerHTML = `
        <div class="airline-header-detail">
            <div class="airline-header-content">
                <img src="${airline.logo}" alt="${airline.companyName}" class="airline-logo-large" onerror="this.src='./images/airline-placeholder.png'">
                <div class="airline-info-detail">
                    <h1>${airline.companyName}</h1>
                    <span class="airline-number-large">${airline.companyNumber}</span>
                    <p class="airline-description-large">${airline.description}</p>
                </div>
            </div>
        </div>
        
        <div class="airline-stats-detail">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-globe"></i>
                </div>
                <span class="stat-value-large">${airline.stats.destinations}</span>
                <span class="stat-label-large">Destinations</span>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-plane"></i>
                </div>
                <span class="stat-value-large">${airline.stats.aircraft}</span>
                <span class="stat-label-large">Aircraft</span>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-calendar"></i>
                </div>
                <span class="stat-value-large">${airline.stats.founded}</span>
                <span class="stat-label-large">Founded</span>
            </div>
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-star"></i>
                </div>
                <span class="stat-value-large">4.8</span>
                <span class="stat-label-large">Rating</span>
            </div>
        </div>
        
        <div class="airline-features-detail">
            <h2>Services & Features</h2>
            <div class="features-grid">
                ${airline.features.map(feature => `
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-${getFeatureIcon(feature)}"></i>
                        </div>
                        <h3 class="feature-title">${feature}</h3>
                        <p class="feature-description">${getFeatureDescription(feature)}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="routes-section">
            <h2>Route Network</h2>
            <p>Explore the destinations served by ${airline.companyName}</p>
            <div class="routes-grid">
                ${airline.routes.map(route => `
                    <div class="route-tag">${route}</div>
                `).join('')}
            </div>
        </div>
        
        <div class="booking-section">
            <h2>Book Your Flight</h2>
            <p>Ready to fly with ${airline.companyName}? Choose your preferred booking option.</p>
            <div class="booking-actions">
                <button class="btn-booking btn-primary-booking" onclick="bookWithAirline('${airline.companyName}')">
                    <i class="fas fa-plane"></i> Book Now
                </button>
                <button class="btn-booking btn-secondary-booking" onclick="viewFlights('${airline.companyName}')">
                    <i class="fas fa-search"></i> View Flights
                </button>
                <a href="airlines.html" class="btn-booking btn-secondary-booking">
                    <i class="fas fa-arrow-left"></i> Back to Airlines
                </a>
            </div>
        </div>
    `;
}

// Get feature icon based on feature name
function getFeatureIcon(feature) {
    const iconMap = {
        'Business Class': 'briefcase',
        'Economy Plus': 'plus',
        'Economy': 'users',
        'First Class': 'crown',
        'QSuite': 'bed',
        'The Residence': 'home',
        'WiFi': 'wifi',
        'Entertainment': 'tv'
    };
    return iconMap[feature] || 'check';
}

// Get feature description based on feature name
function getFeatureDescription(feature) {
    const descriptionMap = {
        'Business Class': 'Premium seating with enhanced comfort and service',
        'Economy Plus': 'Extra legroom and enhanced amenities',
        'Economy': 'Comfortable seating with standard amenities',
        'First Class': 'Luxury seating with premium service',
        'QSuite': 'Revolutionary business class suite experience',
        'The Residence': 'Ultimate luxury with private suite',
        'WiFi': 'Complimentary high-speed internet access',
        'Entertainment': 'Personal entertainment system with latest content'
    };
    return descriptionMap[feature] || 'Premium service and amenities';
}

// Book with airline
function bookWithAirline(airlineName) {
    alert(`Redirecting to ${airlineName} booking system...`);
    // In a real application, this would redirect to the airline's booking system
    // or integrate with the main booking system
}

// View flights
function viewFlights(airlineName) {
    alert(`Searching for ${airlineName} flights...`);
    // In a real application, this would open a flight search with the airline filter
}

// Show error state
function showErrorState() {
    const content = document.getElementById('airlineDetailsContent');
    
    content.innerHTML = `
        <div class="error-state">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Airline Not Found</h3>
            <p>Sorry, we couldn't find the airline details you're looking for.</p>
            <a href="airlines.html" class="btn-booking btn-primary-booking">
                <i class="fas fa-arrow-left"></i> Back to Airlines
            </a>
        </div>
    `;
}

// Add to favorites
function addToFavorites(airlineId) {
    // In a real application, this would add the airline to user's favorites
    alert('Airline added to favorites!');
}

// Share airline
function shareAirline(airlineName) {
    if (navigator.share) {
        navigator.share({
            title: `${airlineName} - FlySmart`,
            text: `Check out ${airlineName} on FlySmart`,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        });
    }
}
