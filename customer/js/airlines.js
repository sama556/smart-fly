// Airlines Page JavaScript

// Saudi Arabian Airlines data
const airlinesData = [
    {
        id: 1,
        companyNumber: "SV001",
        companyName: "Saudia (Saudi Arabian Airlines)",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Saudia_logo.svg/200px-Saudia_logo.svg.png",
        description: "The national flag carrier of Saudi Arabia, connecting the Kingdom to the world with world-class service and modern aircraft.",
        features: ["Business Class", "Economy Plus", "WiFi", "Entertainment"],
        stats: {
            destinations: "90+",
            aircraft: "150+",
            founded: "1945"
        },
        routes: ["Domestic", "Middle East", "Europe", "Asia", "Africa", "Americas"]
    },
    {
        id: 2,
        companyNumber: "FZ002",
        companyName: "Flyadeal",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Flyadeal_logo.svg/200px-Flyadeal_logo.svg.png",
        description: "Saudi Arabia's leading low-cost carrier, offering affordable domestic and international flights with modern aircraft.",
        features: ["Economy", "Business", "WiFi", "Entertainment"],
        stats: {
            destinations: "30+",
            aircraft: "25+",
            founded: "2017"
        },
        routes: ["Domestic", "Middle East", "Europe", "Asia"]
    },
    {
        id: 3,
        companyNumber: "XY003",
        companyName: "Flynas",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flynas_logo.svg/200px-Flynas_logo.svg.png",
        description: "Saudi Arabia's first low-cost airline, providing affordable travel options across the Middle East and beyond.",
        features: ["Economy", "Business", "WiFi", "Entertainment"],
        stats: {
            destinations: "50+",
            aircraft: "40+",
            founded: "2007"
        },
        routes: ["Domestic", "Middle East", "Europe", "Asia", "Africa"]
    },
    {
        id: 4,
        companyNumber: "RX004",
        companyName: "Riyadh Air",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Riyadh_Air_logo.svg/200px-Riyadh_Air_logo.svg.png",
        description: "Saudi Arabia's newest airline, connecting Riyadh to the world with premium service and modern aircraft.",
        features: ["First Class", "Business Class", "Economy", "WiFi"],
        stats: {
            destinations: "20+",
            aircraft: "15+",
            founded: "2023"
        },
        routes: ["Domestic", "Middle East", "Europe", "Asia"]
    }
];

// Initialize airlines page
document.addEventListener('DOMContentLoaded', function() {
    loadAirlines();
    setupEventListeners();
});

// Load airlines data (now static in HTML)
function loadAirlines() {
    // Airlines are now static in HTML, no need to load dynamically
    console.log('Airlines loaded from static HTML');
}

// Display airlines (not needed since data is static)
function displayAirlines() {
    // This function is no longer needed since airlines are static in HTML
    console.log('Airlines are displayed from static HTML');
}

// Open airline details page
function openAirlineDetails(airlineId) {
    const airline = airlinesData.find(a => a.id === airlineId);
    if (airline) {
        // Store airline data in sessionStorage for the details page
        sessionStorage.setItem('selectedAirline', JSON.stringify(airline));
        // Navigate to airline details page
        window.location.href = `airline-details.html?id=${airlineId}`;
    }
}

// Book with airline
function bookWithAirline(airlineId) {
    const airline = airlinesData.find(a => a.id === airlineId);
    if (airline) {
        alert(`Redirecting to ${airline.companyName} booking system...`);
        // In a real application, this would redirect to the airline's booking system
        // or integrate with the main booking system
    }
}

// Scroll to airlines section
function scrollToAirlines() {
    document.getElementById('airlines').scrollIntoView({
        behavior: 'smooth'
    });
}

// Setup event listeners
function setupEventListeners() {
    // Add any additional event listeners here
}

// Search functionality (if needed)
function searchAirlines(query) {
    const filteredAirlines = airlinesData.filter(airline => 
        airline.companyName.toLowerCase().includes(query.toLowerCase()) ||
        airline.companyNumber.toLowerCase().includes(query.toLowerCase())
    );
    
    // Update display with filtered results
    displayFilteredAirlines(filteredAirlines);
}

// Display filtered airlines
function displayFilteredAirlines(airlines) {
    const airlinesGrid = document.getElementById('airlinesGrid');
    
    if (airlines.length === 0) {
        airlinesGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No airlines found</h3>
                <p>Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }
    
    airlinesGrid.innerHTML = airlines.map(airline => `
        <div class="airline-card" onclick="openAirlineDetails(${airline.id})">
            <div class="airline-header">
                <img src="${airline.logo}" alt="${airline.companyName}" class="airline-logo" onerror="this.src='./images/airline-placeholder.png'">
                <div class="airline-info">
                    <h3>${airline.companyName}</h3>
                    <span class="airline-number">${airline.companyNumber}</span>
                </div>
            </div>
            
            <div class="airline-details">
                <p class="airline-description">${airline.description}</p>
                
                <div class="airline-features">
                    ${airline.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
                
                <div class="airline-stats">
                    <div class="stat-item">
                        <span class="stat-value">${airline.stats.destinations}</span>
                        <span class="stat-label">Destinations</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${airline.stats.aircraft}</span>
                        <span class="stat-label">Aircraft</span>
                    </div>
                </div>
            </div>
            
            <div class="airline-actions">
                <button class="btn-airline btn-primary-airline" onclick="event.stopPropagation(); openAirlineDetails(${airline.id})">
                    View Details
                </button>
                <button class="btn-airline btn-secondary-airline" onclick="event.stopPropagation(); bookWithAirline(${airline.id})">
                    Book Now
                </button>
            </div>
        </div>
    `).join('');
}
