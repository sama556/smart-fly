  
        // Animated Background
        function createFloatingShapes() {
            const bg = document.getElementById('animatedBg');
            for (let i = 0; i < 15; i++) {
                const shape = document.createElement('div');
                shape.className = 'floating-shape';
                shape.style.left = Math.random() * 100 + '%';
                shape.style.width = (Math.random() * 50 + 10) + 'px';
                shape.style.height = shape.style.width;
                shape.style.animationDelay = Math.random() * 20 + 's';
                shape.style.animationDuration = (Math.random() * 10 + 15) + 's';
                bg.appendChild(shape);
            }
        }

        // Header scroll effect
        function handleScroll() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Mobile menu toggle
        function initMobileMenu() {
            const menuToggle = document.getElementById('menuToggle');
            const navLinks = document.getElementById('navLinks');
            
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            });

            // Close menu when clicking on links
            navLinks.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    navLinks.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        }

        // Flight slider
        function initFlightSlider() {
            const slides = document.getElementById('flightSlides');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            if (!slides || !prevBtn || !nextBtn) return;
            let currentSlide = 0;
            const slideWidth = 380; // 350px card + 30px margin

            function updateSlider() {
                const translateX = -currentSlide * slideWidth;
                slides.style.transform = `translateX(${translateX}px)`;
            }

            nextBtn.addEventListener('click', () => {
                const maxSlides = slides.children.length - Math.floor(slides.parentElement.offsetWidth / slideWidth);
                if (currentSlide < maxSlides) {
                    currentSlide++;
                    updateSlider();
                }
            });

            prevBtn.addEventListener('click', () => {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateSlider();
                }
            });

            // Auto-slide
            setInterval(() => {
                const maxSlides = slides.children.length - Math.floor(slides.parentElement.offsetWidth / slideWidth);
                if (currentSlide < maxSlides) {
                    currentSlide++;
                } else {
                    currentSlide = 0;
                }
                updateSlider();
            }, 4000);
        }

        // Testimonial slider
        function initTestimonialSlider() {
            let currentSlide = 0;
            const slides = document.querySelectorAll('.testimonial-slide');
            const dots = document.querySelectorAll('.dot');
            
            function showSlide(n) {
                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                
                currentSlide = (n + slides.length) % slides.length;
                
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            }
            
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                });
            });
            
            // Auto slide
            setInterval(() => {
                showSlide(currentSlide + 1);
            }, 6000);
        }

        // Scroll animations
        function initScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.scroll-animate').forEach(el => {
                observer.observe(el);
            });
        }

        // Counter animation
        function animateCounters() {
            const counters = document.querySelectorAll('[data-count]');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = parseFloat(counter.dataset.count);
                        const duration = 2000;
                        const step = target / (duration / 16);
                        let current = 0;

                        const updateCounter = () => {
                            if (current < target) {
                                current += step;
                                if (target >= 1) {
                                    counter.textContent = Math.floor(current);
                                } else {
                                    counter.textContent = current.toFixed(1);
                                }
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.textContent = target >= 1 ? Math.floor(target) : target;
                            }
                        };

                        updateCounter();
                        observer.unobserve(counter);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => observer.observe(counter));
        }

        // Modal functionality
        // Form submissions

        // Smooth scrolling for anchor links
        function initSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerHeight = document.getElementById('header').offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu if open
                        const navLinks = document.getElementById('navLinks');
                        const menuToggle = document.getElementById('menuToggle');
                        if (navLinks) navLinks.classList.remove('active');
                        if (menuToggle) {
                            const icon = menuToggle.querySelector('i');
                            if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-times'); }
                        }
                    }
                });
            });
        }

        // Add booking functionality to flight cards
        function initBookingButtons() {
            document.querySelectorAll('.book-btn').forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const card = this.closest('.flight-card');
                    const { from, to, airline, price } = flightFromCard(card);
                    const summary = `Route: ${from} → ${to} • ${airline} • ${price}`;

                    openHoldModal(
                        summary,
                        () => placeHold(card),
                        () => {
                            alert(`Proceeding to booking for ${summary}`);
                        }
                    );
                });
            });
        }

        // ----- Temporary Hold (10 minutes) -----
        const HOLD_MINUTES = 10;
        const HOLDS_KEY = 'fs_holds_v1';

        function getHolds() {
            try { return JSON.parse(localStorage.getItem(HOLDS_KEY)) || {}; }
            catch { return {}; }
        }
        function setHolds(holds) {
            localStorage.setItem(HOLDS_KEY, JSON.stringify(holds));
        }

        function flightFromCard(card) {
            const cities = Array.from(card.querySelectorAll('.route .city')).map(n => n.textContent.trim());
            const airline = card.querySelector('.airline')?.textContent.trim() || '';
            const price = card.querySelector('.price-badge')?.textContent.trim() || '';
            const id = `${cities[0] || ''}-${cities[1] || ''}-${airline}-${price}`.replace(/\s+/g, '_');
            return { id, from: cities[0] || '', to: cities[1] || '', airline, price };
        }

        function formatRemaining(ms) {
            const total = Math.max(0, Math.floor(ms / 1000));
            const m = String(Math.floor(total / 60)).padStart(2,'0');
            const s = String(total % 60).padStart(2,'0');
            return `${m}:${s}`;
        }

        function applyHoldUI(card, remainingMs) {
            if (!card.querySelector('.hold-badge')) {
                const badge = document.createElement('div');
                badge.className = 'hold-badge';
                badge.textContent = 'On Hold';
                card.querySelector('.flight-image').appendChild(badge);
            }
            let chip = card.querySelector('.countdown-chip');
            if (!chip) {
                chip = document.createElement('div');
                chip.className = 'countdown-chip';
                card.querySelector('.flight-info').appendChild(chip);
            }
            chip.textContent = `Expires in ${formatRemaining(remainingMs)}`;
            card.classList.add('on-hold');
            const btn = card.querySelector('.book-btn');
            btn.disabled = true;
        }

        function clearHoldUI(card) {
            card.classList.remove('on-hold');
            card.querySelector('.hold-badge')?.remove();
            card.querySelector('.countdown-chip')?.remove();
            const btn = card.querySelector('.book-btn');
            if (btn) {
                btn.disabled = false;
                btn.textContent = 'Book Now';
            }
        }

        function refreshAllHolds() {
            const holds = getHolds();
            const now = Date.now();
            let changed = false;

            document.querySelectorAll('.flight-card').forEach(card => {
                const { id } = flightFromCard(card);
                const hold = holds[id];
                if (hold && now < hold.expiresAt) {
                    applyHoldUI(card, hold.expiresAt - now);
                } else if (hold && now >= hold.expiresAt) {
                    delete holds[id];
                    clearHoldUI(card);
                    changed = true;
                } else {
                    clearHoldUI(card);
                }
            });

            if (changed) setHolds(holds);
        }

        function startCountdownTicker() {
            refreshAllHolds();
            setInterval(refreshAllHolds, 1000);
        }

        function openHoldModal(summaryText, onConfirm, onContinue) {
            const modal = document.getElementById('holdModal');
            if (!modal) { onConfirm?.(); return; }
            const closeBtn = modal.querySelector('[data-close]');
            const confirmBtn = document.getElementById('confirmHoldBtn');
            const contBtn = document.getElementById('continueBookingBtn');
            const summary = document.getElementById('holdModalSummary');
            if (summary) summary.textContent = summaryText;

            modal.style.display = 'flex';

            const cleanup = () => {
                confirmBtn.removeEventListener('click', confirmHandler);
                contBtn.removeEventListener('click', continueHandler);
                closeBtn.removeEventListener('click', closeHandler);
                modal.removeEventListener('click', outsideHandler);
            };
            const confirmHandler = () => { cleanup(); modal.style.display = 'none'; onConfirm?.(); };
            const continueHandler = () => { cleanup(); modal.style.display = 'none'; onContinue?.(); };
            const closeHandler = () => { cleanup(); modal.style.display = 'none'; };
            const outsideHandler = (e) => { if (e.target === modal) closeHandler(); };

            confirmBtn.addEventListener('click', confirmHandler);
            contBtn.addEventListener('click', continueHandler);
            closeBtn.addEventListener('click', closeHandler);
            modal.addEventListener('click', outsideHandler);
        }

        function placeHold(card) {
            const flight = flightFromCard(card);
            const holds = getHolds();
            const expiresAt = Date.now() + HOLD_MINUTES * 60 * 1000;
            holds[flight.id] = { ...flight, expiresAt };
            setHolds(holds);
            applyHoldUI(card, expiresAt - Date.now());
            if (window.showNotification) showNotification('Fare held for 10 minutes.', 'success');
        }

        // Add interactive effects
        function addInteractiveEffects() {
            // Add hover effect to feature cards
            document.querySelectorAll('.feature-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.background = 'white';
                });
            });

            // Add floating animation to hero elements
            const heroContent = document.querySelector('.hero-content');
            let floatDirection = 1;
            setInterval(() => {
                heroContent.style.transform = `translateY(${Math.sin(Date.now() * 0.001) * 5}px)`;
            }, 16);

            // Add parallax effect to sections
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const sections = document.querySelectorAll('.section, .hero');
                
                sections.forEach((section, index) => {
                    const speed = (index + 1) * 0.1;
                    section.style.transform = `translateY(${scrolled * speed}px)`;
                });
            });
        }

        // Particles background effect
        function createParticles() {
            const particlesContainer = document.createElement('div');
            particlesContainer.style.position = 'fixed';
            particlesContainer.style.top = '0';
            particlesContainer.style.left = '0';
            particlesContainer.style.width = '100%';
            particlesContainer.style.height = '100%';
            particlesContainer.style.pointerEvents = 'none';
            particlesContainer.style.zIndex = '-1';
            particlesContainer.style.opacity = '0.1';
            
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = '2px';
                particle.style.height = '2px';
                particle.style.backgroundColor = 'white';
                particle.style.borderRadius = '50%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                
                // Animate particles
                const animateParticle = () => {
                    particle.style.transform = `translateY(${Math.sin(Date.now() * 0.001 + i) * 20}px) translateX(${Math.cos(Date.now() * 0.001 + i) * 10}px)`;
                    requestAnimationFrame(animateParticle);
                };
                animateParticle();
                
                particlesContainer.appendChild(particle);
            }
            
            document.body.appendChild(particlesContainer);
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize all features
            setTimeout(() => {
                createFloatingShapes();
                createParticles();
                initMobileMenu();
                initFlightSlider();
                initTestimonialSlider();
                initScrollAnimations();
                animateCounters();
             
                initSmoothScrolling();
                initBookingButtons();
                startCountdownTicker();
                addInteractiveEffects();
                
                // Add scroll listener
                window.addEventListener('scroll', handleScroll);
                
                // Set current date as minimum for date inputs
                const today = new Date().toISOString().split('T')[0];
                document.querySelectorAll('input[type="date"]').forEach(input => {
                    try { input.min = today; } catch {}
                });
                
                // Add typing effect to hero title
                const heroTitle = document.querySelector('.hero h1');
                if (heroTitle) {
                    const text = heroTitle.textContent;
                    heroTitle.textContent = '';
                let i = 0;
                
                const typeWriter = () => {
                    if (i < text.length) {
                        heroTitle.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, 50);
                    }
                };
                
                    setTimeout(typeWriter, 2500);
                }
                
                // Add success notifications for forms
                window.showNotification = function(message, type = 'success') {
                    const notification = document.createElement('div');
                    notification.style.cssText = `
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        padding: 15px 25px;
                        background: ${type === 'success' ? '#10b981' : '#ef4444'};
                        color: white;
                        border-radius: 10px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                        z-index: 10000;
                        animation: slideInRight 0.3s ease-out;
                        font-weight: 600;
                    `;
                    
                    notification.textContent = message;
                    document.body.appendChild(notification);
                    
                    setTimeout(() => {
                        notification.style.animation = 'slideOutRight 0.3s ease-out';
                        setTimeout(() => {
                            document.body.removeChild(notification);
                        }, 300);
                    }, 3000);
                };
                
                // Add CSS animations for notifications
                const notificationStyles = document.createElement('style');
                notificationStyles.textContent = `
                    @keyframes slideInRight {
                        from { transform: translateX(100px); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                    @keyframes slideOutRight {
                        from { transform: translateX(0); opacity: 1; }
                        to { transform: translateX(100px); opacity: 0; }
                    }
                `;
                document.head.appendChild(notificationStyles);
                
            }, 100);
        });

        // Add resize handler for responsive adjustments
        window.addEventListener('resize', function() {
            // Recalculate flight slider on resize
            const slides = document.getElementById('flightSlides');
            if (slides) {
                slides.style.transform = 'translateX(0)';
            }
        });

        // Add keyboard navigation support
        document.addEventListener('keydown', function(e) {
            // Close modals with Escape key
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.style.display = 'none';
                });
            }
            
            // Navigate testimonials with arrow keys
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const currentDot = document.querySelector('.dot.active');
                if (currentDot) {
                    const dots = document.querySelectorAll('.dot');
                    const currentIndex = Array.from(dots).indexOf(currentDot);
                    let nextIndex;
                    
                    if (e.key === 'ArrowLeft') {
                        nextIndex = currentIndex > 0 ? currentIndex - 1 : dots.length - 1;
                    } else {
                        nextIndex = currentIndex < dots.length - 1 ? currentIndex + 1 : 0;
                    }
                    
                    dots[nextIndex].click();
                }
            }
        });
    