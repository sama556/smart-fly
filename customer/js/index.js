
// Create animated background
function createAnimatedBackground() {
    const bg = document.getElementById('animatedBg');
    const colors = ['rgba(255,255,255,0.1)', 'rgba(200,200,255,0.05)', 'rgba(150,200,255,0.08)'];
    
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        shape.classList.add('floating-shape');
        
        // Random properties
        const size = Math.random() * 100 + 50;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 30 + 20;
        const animationDelay = Math.random() * 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.left = `${left}%`;
        shape.style.background = color;
        shape.style.animationDuration = `${animationDuration}s`;
        shape.style.animationDelay = `${animationDelay}s`;
        
        bg.appendChild(shape);
    }
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Mobile menu toggle
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Flight slider functionality
function setupFlightSlider() {
    const flightSlides = document.getElementById('flightSlides');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const flightCards = document.querySelectorAll('.flight-card');
    let currentIndex = 0;
    const cardsPerView = Math.floor(flightSlides.offsetWidth / 380);
    
    function updateSlider() {
        const translateX = -currentIndex * (380 + 30);
        flightSlides.style.transform = `translateX(${translateX}px)`;
    }
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < flightCards.length - cardsPerView) {
            currentIndex++;
            updateSlider();
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    // Initialize slider
    updateSlider();
}

// Auto-booking functionality
function setupAutoBooking() {
    const autoBookingToggle = document.getElementById('autoBookingToggle');
    const autoBookingOptions = document.getElementById('autoBookingOptions');
    const autoBookingNotification = document.getElementById('autoBookingNotification');
    
    autoBookingToggle.addEventListener('change', function() {
        if (this.checked) {
            autoBookingOptions.classList.add('active');
            
            // Show notification
            autoBookingNotification.classList.add('show');
            setTimeout(() => {
                autoBookingNotification.classList.remove('show');
            }, 5000);
            
            // Simulate auto-booking process
            simulateAutoBooking();
        } else {
            autoBookingOptions.classList.remove('active');
        }
    });
}

// Simulate auto-booking process
function simulateAutoBooking() {
    setTimeout(() => {
        const notification = document.getElementById('autoBookingNotification');
        notification.querySelector('.notification-icon').innerHTML = '<i class="fas fa-plane"></i>';
       
        notification.querySelector('div > div:last-child').textContent = 'A flight matching your preferences has been found';
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }, 3000);
}

// Scroll animations
function setupScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('animate');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.2)) {
                displayScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Initial check
    handleScrollAnimation();
}

// Form submission handlers
function setupFormHandlers() {
    // Quick search form
    const quickSearchForm = document.getElementById('quickSearch');
    quickSearchForm.addEventListener('submit', function(e) {
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
        
        // Simulate search process
        setTimeout(() => {
            searchBtn.innerHTML = originalText;
            searchBtn.disabled = false;
            
            // Show success message
            alert(`Searching for flights from ${from} to ${to} on ${departure}`);
        }, 2000);
    });
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate sending process
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        }, 2000);
    });
}

// Testimonial slider
function setupTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = n;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-advance slides
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

// Header Icons functionality
function setupHeaderIcons() {
    const notificationIcon = document.getElementById('notificationIcon');
    const cartIcon = document.getElementById('cartIcon');
    const profileIcon = document.getElementById('profileIcon');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const cartDropdown = document.getElementById('cartDropdown');
    const profileDropdown = document.getElementById('profileDropdown');
    const notificationBadge = document.getElementById('notificationBadge');
    const cartBadge = document.getElementById('cartBadge');

    // Notification icon click
    notificationIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        cartDropdown.classList.remove('show');
        profileDropdown.classList.remove('show');
        notificationDropdown.classList.toggle('show');
    });

    // Cart icon click
    cartIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationDropdown.classList.remove('show');
        profileDropdown.classList.remove('show');
        cartDropdown.classList.toggle('show');
    });

    // Profile icon click
    profileIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationDropdown.classList.remove('show');
        cartDropdown.classList.remove('show');
        profileDropdown.classList.toggle('show');
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!notificationIcon.contains(e.target) && !notificationDropdown.contains(e.target)) {
            notificationDropdown.classList.remove('show');
        }
        if (!cartIcon.contains(e.target) && !cartDropdown.contains(e.target)) {
            cartDropdown.classList.remove('show');
        }
        if (!profileIcon.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.remove('show');
        }
    });

    // Update notification count
    updateNotificationCount();
    updateCartCount();
}

// Update notification count
function updateNotificationCount() {
    const notificationBadge = document.getElementById('notificationBadge');
    const notificationItems = document.querySelectorAll('.notification-item');
    const count = notificationItems.length;
    notificationBadge.textContent = count;
    notificationBadge.style.display = count > 0 ? 'flex' : 'none';
}

// Update cart count
function updateCartCount() {
    const cartBadge = document.getElementById('cartBadge');
    const cartItemCount = document.getElementById('cartItemCount');
    const cartItems = document.querySelectorAll('.cart-item:not(.empty-cart)');
    const count = cartItems.length;
    cartBadge.textContent = count;
    cartBadge.style.display = count > 0 ? 'flex' : 'none';
    cartItemCount.textContent = count + ' items';
}

// Clear all notifications
function clearAllNotifications() {
    const notificationList = document.getElementById('notificationList');
    notificationList.innerHTML = '<div class="notification-item"><div class="notification-message">No notifications</div></div>';
    updateNotificationCount();
}

// Add flight to cart
function addToCart(flightData) {
    const cartList = document.getElementById('cartList');
    const cartFooter = document.getElementById('cartFooter');
    const emptyCart = cartList.querySelector('.empty-cart');
    
    if (emptyCart) {
        emptyCart.remove();
    }

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
        <div class="cart-item-info">
            <div class="cart-route">${flightData.from} → ${flightData.to}</div>
            <div class="cart-details">${flightData.airline} • ${flightData.duration}</div>
            <div class="cart-price">${flightData.price} SAR</div>
        </div>
        <button class="cart-remove" onclick="removeFromCart(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    cartList.appendChild(cartItem);
    cartFooter.style.display = 'block';
    updateCartCount();
    updateCartTotal();
}

// Remove flight from cart
function removeFromCart(button) {
    const cartItem = button.closest('.cart-item');
    cartItem.remove();
    
    const cartList = document.getElementById('cartList');
    const cartFooter = document.getElementById('cartFooter');
    
    if (cartList.children.length === 0) {
        cartList.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Your cart is empty</p>
                <p style="font-size: 0.9rem; margin-top: 10px;">Add some flights to get started!</p>
            </div>
        `;
        cartFooter.style.display = 'none';
    }
    
    updateCartCount();
    updateCartTotal();
}

// Update cart total
function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item:not(.empty-cart)');
    let total = 0;
    
    cartItems.forEach(item => {
        const priceText = item.querySelector('.cart-price').textContent;
        const price = parseInt(priceText.replace(/[^\d]/g, ''));
        total += price;
    });
    
    const cartTotal = document.getElementById('cartTotal');
    cartTotal.textContent = total + ' SAR';
}

// Proceed to checkout
function proceedToCheckout() {
    const cartItems = document.querySelectorAll('.cart-item:not(.empty-cart)');
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert('Redirecting to checkout...');
    // Here you would redirect to checkout page
}

// Profile navigation functions
function openProfile() {
    window.location.href = '../admin/profile.html';
}

function openBookings() {
    window.location.href = '../admin/bookings.html';
}

function openFavorites() {
    alert('Favorites page coming soon!');
}

function openSettings() {
    alert('Settings page coming soon!');
}

function openHelp() {
    alert('Help & Support page coming soon!');
}

function logout() {
    if (confirm('Are you sure you want to sign out?')) {
        window.location.href = '../login.html';
    }
}

// Add click handlers to book buttons
function setupBookButtons() {
    const bookButtons = document.querySelectorAll('.book-btn');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const flightCard = this.closest('.flight-card');
            const route = flightCard.querySelector('.route');
            const airline = flightCard.querySelector('.airline');
            const price = flightCard.querySelector('.price-badge');
            const flightTime = flightCard.querySelector('.flight-time');
            
            const flightData = {
                from: route.querySelector('.city:first-child').textContent,
                to: route.querySelector('.city:last-child').textContent,
                airline: airline.textContent,
                duration: flightTime.textContent,
                price: price.textContent
            };
            
            addToCart(flightData);
            
            // Show success message
            const notification = document.getElementById('autoBookingNotification');
            notification.querySelector('.notification-icon').innerHTML = '<i class="fas fa-check"></i>';
            notification.querySelector('div > div:last-child').textContent = 'Flight added to cart successfully!';
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createAnimatedBackground();
    handleHeaderScroll();
    setupMobileMenu();
    setupFlightSlider();
    setupAutoBooking();
    setupScrollAnimations();
    setupFormHandlers();
    setupTestimonialSlider();
    setupHeaderIcons();
    setupBookButtons();
    
    // Add scroll event listener for header
    window.addEventListener('scroll', handleHeaderScroll);
});
