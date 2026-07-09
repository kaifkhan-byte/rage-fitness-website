// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = 'none';
            }
        }
    });
});

// CTA Button Functionality
const ctaButtons = document.querySelectorAll('.cta-btn, .cta-btn-large');
ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Thank you for your interest! Please call us at 080100 24423 to join Rage Fitness.');
    });
});

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe facility and review cards
document.querySelectorAll('.facility-card, .review-card, .rating-card, .info-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Add active class to navigation based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Phone Number Click Handler
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('Phone number clicked:', this.href);
    });
});

// Smooth Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add loading state
document.body.style.opacity = '0.95';

// Mobile responsive menu
const handleResize = () => {
    if (window.innerWidth > 768 && navMenu) {
        navMenu.style.display = 'flex';
    } else if (navMenu) {
        navMenu.style.display = 'none';
    }
};

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

// Counter Animation for Stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.rating-card h3');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = current.toFixed(1);
                setTimeout(updateCounter, 30);
            } else {
                counter.textContent = counter.textContent; // Reset to original
            }
        };
        
        // Trigger animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counter.hasAttribute('data-animated')) {
                // Uncomment to enable counter animation
                // updateCounter();
                counter.setAttribute('data-animated', 'true');
                observer.unobserve(counter);
            }
        });
        
        observer.observe(counter);
    });
};

animateCounters();

// Dark mode toggle (optional feature)
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

// Initialize dark mode from localStorage
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Form handling (if contact form is added)
const handleFormSubmit = (e) => {
    if (e && e.preventDefault) {
        e.preventDefault();
        alert('Thank you for reaching out! We will contact you soon.');
    }
};

// Add form submit listener if form exists
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', handleFormSubmit);
}

// Log page analytics
console.log('Rage Fitness Website Loaded');
console.log('Contact: 080100 24423');
console.log('Hours: 6 AM - 10:30 PM, 7 Days a Week');