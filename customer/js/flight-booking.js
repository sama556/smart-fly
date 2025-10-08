// Flight Booking Page JavaScript

// Flight data (in a real app, this would come from an API)
const flightData = {
    flightNumber: 'SV1234',
    airline: 'Saudia (Saudi Arabian Airlines)',
    aircraft: 'Boeing 737-800',
    departure: {
        airport: 'RUH',
        city: 'Riyadh',
        date: '15 Jan 2024',
        time: '08:30'
    },
    arrival: {
        airport: 'JED',
        city: 'Jeddah',
        date: '15 Jan 2024',
        time: '11:15'
    },
    duration: '2h 45m',
    price: 299,
    status: 'On Time'
};

// Seat map data
const seatMapData = {
    totalSeats: 180,
    availableSeats: 45,
    rows: 30,
    seatsPerRow: 6,
    premiumRows: [1, 2, ], // First 5 rows are premium
    occupiedSeats: [
        '1A', '1B', '1C', '2A', '2B', '3A', '3B', '3C', '4A', '4B',
        '5A', '5B', '5C', '6A', '6B', '7A', '7B', '8A', '8B', '8C',
        
      
    ]
};

let selectedSeat = null;

// Check for data from index page
function checkForIndexPageData() {
    // Check for search data from index page
    const searchData = localStorage.getItem('searchData');
    if (searchData) {
        try {
            const data = JSON.parse(searchData);
            console.log('Search data from index page:', data);
            
            // Update flight information with search data
            updateFlightInfoWithSearchData(data);
            
            // Clear the search data after using it
            localStorage.removeItem('searchData');
        } catch (error) {
            console.error('Error parsing search data:', error);
        }
    }
    
    // Check for selected flight data from index page
    const selectedFlight = localStorage.getItem('selectedFlight');
    if (selectedFlight) {
        try {
            const data = JSON.parse(selectedFlight);
            console.log('Selected flight data from index page:', data);
            
            // Update flight information with selected flight data
            updateFlightInfoWithSelectedFlight(data);
            
            // Clear the selected flight data after using it
            localStorage.removeItem('selectedFlight');
        } catch (error) {
            console.error('Error parsing selected flight data:', error);
        }
    }
}

// Update flight info with search data
function updateFlightInfoWithSearchData(data) {
    // Update departure and arrival cities
    if (data.from) {
        const departureCity = document.querySelector('.departure-city');
        if (departureCity) {
            departureCity.textContent = data.from;
        }
    }
    
    if (data.to) {
        const arrivalCity = document.querySelector('.arrival-city');
        if (arrivalCity) {
            arrivalCity.textContent = data.to;
        }
    }
    
    if (data.departure) {
        const departureDate = document.querySelector('.departure-date');
        if (departureDate) {
            departureDate.textContent = new Date(data.departure).toLocaleDateString();
        }
    }
}

// Update flight info with selected flight data
function updateFlightInfoWithSelectedFlight(data) {
    // Update flight route
    if (data.from && data.to) {
        const departureCity = document.querySelector('.departure-city');
        const arrivalCity = document.querySelector('.arrival-city');
        
        if (departureCity) departureCity.textContent = data.from;
        if (arrivalCity) arrivalCity.textContent = data.to;
    }
    
    // Update flight time
    if (data.flightTime) {
        const flightDuration = document.querySelector('.flight-duration');
        if (flightDuration) {
            flightDuration.textContent = data.flightTime;
        }
    }
    
    // Update airline
    if (data.airline) {
        const airlineName = document.querySelector('.airline-name');
        if (airlineName) {
            airlineName.textContent = data.airline;
        }
    }
    
    // Update price
    if (data.price) {
        const priceElement = document.querySelector('.flight-price');
        if (priceElement) {
            priceElement.textContent = data.price;
        }
    }
}

// Initialize the flight booking page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Flight booking page loaded');
    
    // Load flight data from URL parameters or localStorage
    loadFlightData();
    
    // Check for data from index page
    checkForIndexPageData();
    
    // Generate seat map
    generateSeatMap();
    
    // Initialize event listeners
    initializeEventListeners();

    // Initialize cart badge
    updateCartBadge && updateCartBadge();
});

// Load flight data
function loadFlightData() {
    // Get flight data from URL parameters or use default
    const urlParams = new URLSearchParams(window.location.search);
    const flightNumber = urlParams.get('flight') || flightData.flightNumber;
    
    // Update flight information display
    updateFlightInfo(flightNumber);
}

// Update flight information display
function updateFlightInfo(flightNumber) {
    document.getElementById('flightNumber').textContent = flightNumber;
    
    // In a real application, you would fetch flight data from an API
    // For now, we'll use the static data
    console.log('Loading flight data for:', flightNumber);
}

// Generate seat map
function generateSeatMap() {
    const seatMap = document.getElementById('seatMap');
    const rows = seatMapData.rows;
    const seatsPerRow = seatMapData.seatsPerRow;
    const occupiedSeats = seatMapData.occupiedSeats;
    const premiumRows = seatMapData.premiumRows;
    
    // Create seat map container
    seatMap.innerHTML = '';
    
    // Generate seat rows
    for (let row = 1; row <= rows; row++) {
        const rowContainer = document.createElement('div');
        rowContainer.className = 'seat-row';
        
        // Add row label
        const rowLabel = document.createElement('div');
        rowLabel.className = 'seat-row-label';
        rowLabel.textContent = row;
        rowContainer.appendChild(rowLabel);
        
        // Create seat grid for this row
        const seatGrid = document.createElement('div');
        seatGrid.className = 'seat-grid';
        
        // Generate seats for this row
        for (let seat = 0; seat < seatsPerRow; seat++) {
            const seatLetter = String.fromCharCode(65 + seat); // A, B, C, D, E, F
            const seatId = `${row}${seatLetter}`;
            const seatElement = document.createElement('div');
            
            seatElement.className = 'seat';
            seatElement.id = seatId;
            seatElement.textContent = seatLetter;
            seatElement.dataset.seatId = seatId;
            
            // Determine seat status
            if (occupiedSeats.includes(seatId)) {
                seatElement.classList.add('occupied');
            } else {
                seatElement.classList.add('available');
                
                // Add premium class for premium rows
                if (premiumRows.includes(row)) {
                    seatElement.classList.add('premium');
                }
                
                // Add click event listener
                seatElement.addEventListener('click', () => selectSeat(seatId));
            }
            
            seatGrid.appendChild(seatElement);
        }
        
        rowContainer.appendChild(seatGrid);
        seatMap.appendChild(rowContainer);
    }
}

// Select seat
function selectSeat(seatId) {
    // Remove previous selection
    if (selectedSeat) {
        const previousSeat = document.getElementById(selectedSeat);
        if (previousSeat) {
            previousSeat.classList.remove('selected');
            previousSeat.classList.add('available');
        }
    }
    
    // Select new seat
    const seat = document.getElementById(seatId);
    if (seat && !seat.classList.contains('occupied')) {
        seat.classList.remove('available');
        seat.classList.add('selected');
        selectedSeat = seatId;
        
        // Show seat selection feedback
        showSeatSelectionFeedback(seatId);
    }
}

// Show seat selection feedback
function showSeatSelectionFeedback(seatId) {
    const feedback = document.getElementById('seatFeedback');
    const selectedSeatNumber = document.getElementById('selectedSeatNumber');
    const selectedRow = document.getElementById('selectedRow');
    const selectedSeatLetter = document.getElementById('selectedSeatLetter');
    const seatPrice = document.getElementById('seatPrice');
    
    if (feedback && selectedSeatNumber && selectedRow && selectedSeatLetter && seatPrice) {
        const row = seatId.substring(0, seatId.length - 1);
        const seat = seatId.substring(seatId.length - 1);
        const isPremium = seatMapData.premiumRows.includes(parseInt(row));
        const price = isPremium ? flightData.price + 50 : flightData.price;
        
        selectedSeatNumber.textContent = seatId;
        selectedRow.textContent = row;
        selectedSeatLetter.textContent = seat;
        seatPrice.textContent = `${price} SAR`;
        
        feedback.style.display = 'block';
    }
}

// Initialize event listeners
function initializeEventListeners() {
    // Add any additional event listeners here
    console.log('Event listeners initialized');

    // Toggle cart dropdown
    const cartIcon = document.getElementById('cartIcon');
    const cartDropdown = document.getElementById('cartDropdown');
    if (cartIcon && cartDropdown) {
        cartIcon.addEventListener('click', () => {
            const visible = cartDropdown.style.display === 'block';
            cartDropdown.style.display = visible ? 'none' : 'block';
            if (!visible) { renderCart && renderCart(); }
        });
    }
}

// Proceed to manual booking
function proceedToManualBooking() {
    if (!selectedSeat) {
        alert('Please select a seat before proceeding with manual booking.');
        return;
    }
    
    // Show loading state
    const button = document.querySelector('.manual-booking');
    button.classList.add('loading');
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Simulate add to cart
    setTimeout(() => {
        addToCart && addToCart({
            flightNumber: flightData.flightNumber,
            airline: flightData.airline,
            departure: flightData.departure,
            arrival: flightData.arrival,
            seat: selectedSeat,
            price: flightData.price,
            type: 'manual'
        });
        const cartDropdown = document.getElementById('cartDropdown');
        if (cartDropdown) {
            cartDropdown.style.display = 'block';
            renderCart && renderCart();
        }
        button.classList.remove('loading');
        button.innerHTML = '<i class="fas fa-hand-pointer"></i> <span>Manual Booking</span> <i class="fas fa-arrow-right"></i>';
    }, 1000);
}



// Cart: storage and UI helpers
function getCart() {
    try { return JSON.parse(localStorage.getItem('cartItems') || '[]'); } catch(_) { return []; }
}

function setCart(items) {
    localStorage.setItem('cartItems', JSON.stringify(items));
    updateCartBadge();
}

function addToCart(item) {
    const items = getCart();
    items.push({ ...item, id: Date.now() });
    setCart(items);
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) badge.textContent = getCart().length;
}

function renderCart() {
    const listEl = document.getElementById('cartList');
    const footerEl = document.getElementById('cartFooter');
    if (!listEl || !footerEl) return;
    const items = getCart();
    if (!items.length) {
        listEl.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-bag"></i><p>Your cart is empty</p><p style="font-size: 0.9rem; margin-top: 10px;">Add some flights to get started!</p></div>';
        footerEl.style.display = 'none';
        return;
    }
    listEl.innerHTML = items.map(it => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-title"><i class="fas fa-plane"></i> ${it.flightNumber} - ${it.seat || '-'}</div>
                <div class="cart-item-sub">${it.departure.airport} → ${it.arrival.airport}</div>
            </div>
            <div class="cart-item-price">${it.price} SAR</div>
        </div>
    `).join('');
    footerEl.style.display = 'block';
}

function proceedToCheckout() {
    const items = getCart();
    if (!items.length) return;
    const current = items[items.length - 1];
    const bookingData = {
        flightNumber: current.flightNumber,
        seat: current.seat || null,
        price: current.price,
        type: current.type,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('currentBooking', JSON.stringify(bookingData));
    window.location.href = 'booking-confirmation.html';
}

// Find best available seat using AI logic
function findBestAvailableSeat() {
    const occupiedSeats = seatMapData.occupiedSeats;
    const premiumRows = seatMapData.premiumRows;
    const rows = seatMapData.rows;
    const seatsPerRow = seatMapData.seatsPerRow;
    
    // AI logic: prefer window seats, then aisle seats, avoid middle seats
    const seatPreferences = ['A', 'F', 'B', 'E', 'C', 'D']; // Window, Aisle, Middle
    
    for (let row = 1; row <= rows; row++) {
        for (let seatIndex = 0; seatIndex < seatsPerRow; seatIndex++) {
            const seatLetter = String.fromCharCode(65 + seatIndex);
            const seatId = `${row}${seatLetter}`;
            
            if (!occupiedSeats.includes(seatId)) {
                // Check if this seat matches our preferences
                if (seatPreferences.includes(seatLetter)) {
                    return seatId;
                }
            }
        }
    }
    
    // Fallback: return first available seat
    for (let row = 1; row <= rows; row++) {
        for (let seatIndex = 0; seatIndex < seatsPerRow; seatIndex++) {
            const seatLetter = String.fromCharCode(65 + seatIndex);
            const seatId = `${row}${seatLetter}`;
            
            if (!occupiedSeats.includes(seatId)) {
                return seatId;
            }
        }
    }
    
    return null;
}

// Get seat information
function getSeatInfo(seatId) {
    const row = parseInt(seatId.substring(0, seatId.length - 1));
    const seat = seatId.substring(seatId.length - 1);
    const isPremium = seatMapData.premiumRows.includes(row);
    
    return {
        row: row,
        seat: seat,
        isPremium: isPremium,
        price: isPremium ? flightData.price + 50 : flightData.price
    };
}

// Validate seat selection
function validateSeatSelection() {
    if (!selectedSeat) {
        return {
            valid: false,
            message: 'Please select a seat before proceeding.'
        };
    }
    
    const seatInfo = getSeatInfo(selectedSeat);
    
    return {
        valid: true,
        seat: selectedSeat,
        info: seatInfo
    };
}

// Export functions for use in other scripts
window.flightBooking = {
    selectSeat,
    proceedToManualBooking,
    proceedToAutomaticBooking,
    getSeatInfo,
    validateSeatSelection
};
