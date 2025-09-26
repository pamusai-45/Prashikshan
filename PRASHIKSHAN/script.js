// Main JavaScript functionality for Prashiskshan website

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Search functionality
    const searchInput = document.querySelector('#searchInput, .search-box input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .internship-card, .trending-card, .stakeholder-card, .outcome-card').forEach(el => {
        observer.observe(el);
    });

    // Login/Register button functionality
    const loginBtn = document.querySelector('.btn-login');
    const registerBtn = document.querySelector('.btn-register');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            showModal('login');
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            showModal('register');
        });
    }

    // Hero buttons functionality
    const heroBtns = document.querySelectorAll('.btn-primary, .btn-secondary');
    heroBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.textContent.includes('Continue with Google')) {
                e.preventDefault();
                showNotification('Google authentication coming soon!', 'info');
            } else if (this.textContent.includes('Continue with Email')) {
                e.preventDefault();
                showModal('register');
            }
        });
    });

    // Initialize page-specific functionality
    initializePageSpecificFeatures();
});

// Search function
function performSearch(query) {
    if (!query.trim()) return;
    
    // Simulate search (in real implementation, this would call an API)
    showNotification(`Searching for: ${query}`, 'info');
    
    // Redirect to internships page with search query
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage !== 'internships.html') {
        window.location.href = `internships.html?search=${encodeURIComponent(query)}`;
    } else {
        // If already on internships page, filter results
        if (typeof filterInternships === 'function') {
            filterInternships(query);
        }
    }
}

// Modal functionality
function showModal(type) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>${type === 'login' ? 'Login' : 'Register'}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form class="auth-form">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" required>
                    </div>
                    ${type === 'register' ? `
                        <div class="form-group">
                            <label>Confirm Password</label>
                            <input type="password" required>
                        </div>
                        <div class="form-group">
                            <label>User Type</label>
                            <select required>
                                <option value="">Select Type</option>
                                <option value="student">Student</option>
                                <option value="faculty">Faculty</option>
                                <option value="employer">Employer</option>
                            </select>
                        </div>
                    ` : ''}
                    <button type="submit" class="btn-submit">${type === 'login' ? 'Login' : 'Register'}</button>
                </form>
                <div class="auth-divider">OR</div>
                <button class="btn-google">
                    <i class="fab fa-google"></i>
                    Continue with Google
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modalOverlay);

    // Close modal functionality
    const closeBtn = modalOverlay.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modalOverlay);
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            document.body.removeChild(modalOverlay);
        }
    });

    // Form submission
    const form = modalOverlay.querySelector('.auth-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification(`${type === 'login' ? 'Login' : 'Registration'} functionality coming soon!`, 'info');
        document.body.removeChild(modalOverlay);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 5000);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(notification);
    });
}

// Initialize page-specific features
function initializePageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            initializeHomePage();
            break;
        case 'internships.html':
            initializeInternshipsPage();
            break;
        case 'modules.html':
            initializeModulesPage();
            break;
        case 'about.html':
            initializeAboutPage();
            break;
    }
}

// Home page specific functionality
function initializeHomePage() {
    // Animate stats numbers
    animateNumbers();
    
    // Initialize trending cards hover effects
    const trendingCards = document.querySelectorAll('.trending-card');
    trendingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Internships page specific functionality
function initializeInternshipsPage() {
    // This will be implemented in internships.js
    console.log('Internships page initialized');
}

// Modules page specific functionality
function initializeModulesPage() {
    // Add smooth scrolling for module navigation
    const moduleLinks = document.querySelectorAll('a[href^="#"]');
    moduleLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// About page specific functionality
function initializeAboutPage() {
    // Add interactive elements for problem statement
    const challengeItems = document.querySelectorAll('.challenge-item');
    challengeItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });
}

// Animate numbers
function animateNumbers() {
    const numberElements = document.querySelectorAll('.stat-number, .outcome-number');
    
    numberElements.forEach(element => {
        const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
        if (target) {
            animateValue(element, 0, target, 2000);
        }
    });
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        const originalText = element.textContent;
        const suffix = originalText.replace(/[\d,]/g, '');
        element.textContent = value.toLocaleString() + suffix;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Service worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });

    // Main JavaScript functionality for Prashiskshan website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // ... (rest of your menu toggle logic)
        });
    }

    // --- NEW: SCROLL ANIMATION LOGIC ---
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('is-visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };
    
    // Initial check on page load
    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);
    // --- END OF NEW LOGIC ---


    // ... (rest of your existing script.js code)
    
});

// ... (your other functions like showModal, showNotification, etc.)
}