
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
    if (!menuToggle || !navLinks) return;

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
    if (!flightSlides || !prevBtn || !nextBtn || flightCards.length === 0) {
        return; // Slider not present on this page
    }
    let currentIndex = 0;
    const cardsPerView = Math.max(1, Math.floor(flightSlides.offsetWidth / 380));
    
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
    if (quickSearchForm) quickSearchForm.addEventListener('submit', function(e) {
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
    if (contactForm) contactForm.addEventListener('submit', function(e) {
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
    if (slides.length === 0 || dots.length === 0) return;
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
    if (!notificationIcon || !cartIcon || !profileIcon || !notificationDropdown || !cartDropdown || !profileDropdown) return;
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







// Add click handlers to book buttons
function setupBookButtons() {
    const bookButtons = document.querySelectorAll('.book-btn');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Navigate to airline details with id
            window.location.href = 'airline-details.html?id=1';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createAnimatedBackground();
    handleHeaderScroll();
    setupMobileMenu();
    setupFlightSlider();
  
    setupScrollAnimations();
    setupFormHandlers();
    setupTestimonialSlider();
    setupHeaderIcons();
    setupBookButtons();
    
    // Add scroll event listener for header
    window.addEventListener('scroll', handleHeaderScroll);
});
