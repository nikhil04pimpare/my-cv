// ===========================
// SMOOTH SCROLL BEHAVIOR
// ===========================
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

// ===========================
// NAVBAR BACKGROUND ON SCROLL
// ===========================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// ===========================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all skill tags and project cards
document.querySelectorAll('.tag, .project-card, .timeline-item, .education-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// ACTIVE NAVIGATION LINK
// ===========================
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    let current = '';
    
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
            link.style.color = 'var(--primary)';
        } else {
            link.style.color = '';
        }
    });
});

// ===========================
// CONTACT FORM HANDLING
// ===========================
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for reaching out! I\'ll get back to you soon.');
        contactForm.reset();
    });
}

// ===========================
// DARK MODE TOGGLE (Optional)
// ===========================
function initDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.documentElement.style.colorScheme = 'dark';
    }
}

// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', initDarkMode);

// ===========================
// COPY TO CLIPBOARD FUNCTIONALITY
// ===========================
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('mailto:')) {
            const email = this.getAttribute('href').replace('mailto:', '');
            // You can add copy to clipboard functionality here
            console.log('Email:', email);
        }
    });
});

// ===========================
// LAZY LOADING IMAGES (if needed)
// ===========================
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('loading');
                imageObserver.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}

// ===========================
// SCROLL TO TOP BUTTON
// ===========================
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTop';
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        font-weight: 700;
        cursor: pointer;
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.4)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.3)';
    });
}

// Initialize scroll to top button when DOM is ready
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================
// Debounce function for scroll events
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

// ===========================
// PAGE LOAD ANIMATION
// ===========================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    const elements = document.querySelectorAll('.section-title');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
        }, index * 100);
    });
});

// ===========================
// CONSOLE MESSAGE
// ===========================
console.log('%c👋 Thanks for visiting my resume!', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
console.log('%cFeel free to explore and get in touch with me!', 'font-size: 14px; color: #6b7280;');
