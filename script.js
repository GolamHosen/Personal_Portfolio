// Modern Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initNavbarScroll();
    initScrollAnimations();
    initProgressBars();
    initContactForm();
    initTypingEffect();
    initParallaxEffect();
    initLogoAnimations();
});

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Background on Scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            navbar.style.background = 'rgba(52, 58, 64, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.style.background = 'rgba(52, 58, 64, 0.95)';
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.hero-image, .section-title, .stat-item, .skill-category, .timeline-item, .project-card, .contact-info');
    
    animateElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

// Animate Progress Bars
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                
                // Reset width and animate
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Typing Effect for Hero Section - DISABLED
function initTypingEffect() {
    // Typing effect disabled - keeping static text
    return;
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < heroSection.offsetHeight) {
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// Add CSS for navbar scroll effect
const style = document.createElement('style');
style.textContent = `
    .navbar-scrolled {
        box-shadow: 0 2px 20px rgba(0,0,0,0.1);
    }
`;
document.head.appendChild(style);

// Project Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Simple Logo Animation Functions
function initLogoAnimations() {
    // Simple logo hover effects
    const logoContainers = document.querySelectorAll('.logo-container, .hero-logo-container, .footer-logo-container');
    
    logoContainers.forEach(container => {
        const logo = container.querySelector('.logo, .hero-logo, .footer-logo');
        
        if (logo) {
            container.addEventListener('mouseenter', function() {
                logo.style.transform = 'scale(1.1)';
            });
            
            container.addEventListener('mouseleave', function() {
                logo.style.transform = 'scale(1)';
            });
        }
    });
}

// Skill Progress Animation on Scroll
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const progressBar = item.querySelector('.progress-bar');
        const percentage = progressBar.style.width;
        
        if (percentage) {
            progressBar.style.width = '0%';
            setTimeout(() => {
                progressBar.style.width = percentage;
            }, 500);
        }
    });
}

// Initialize skill animation when skills section is visible
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    skillsObserver.observe(skillsSection);
}

// Add loading animation to images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // Set initial state
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
});

// Simple Logo Animation Functions
function initLogoAnimations() {
    // Simple logo hover effects
    const logoContainers = document.querySelectorAll('.logo-container, .hero-logo-container, .footer-logo-container');
    
    logoContainers.forEach(container => {
        const logo = container.querySelector('.logo, .hero-logo, .footer-logo');
        
        if (logo) {
            container.addEventListener('mouseenter', function() {
                logo.style.transform = 'scale(1.1)';
            });
            
            container.addEventListener('mouseleave', function() {
                logo.style.transform = 'scale(1)';
            });
        }
    });
}

// Mobile Menu Close on Link Click
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: true
                });
            }
        });
    });
});

// Simple Logo Animation Functions
function initLogoAnimations() {
    // Simple logo hover effects
    const logoContainers = document.querySelectorAll('.logo-container, .hero-logo-container, .footer-logo-container');
    
    logoContainers.forEach(container => {
        const logo = container.querySelector('.logo, .hero-logo, .footer-logo');
        
        if (logo) {
            container.addEventListener('mouseenter', function() {
                logo.style.transform = 'scale(1.1)';
            });
            
            container.addEventListener('mouseleave', function() {
                logo.style.transform = 'scale(1)';
            });
        }
    });
}

// Add scroll to top button
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'btn btn-primary scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// Add hover effects to social links
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-links .btn');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Simple Logo Animation Functions
function initLogoAnimations() {
    // Simple logo hover effects
    const logoContainers = document.querySelectorAll('.logo-container, .hero-logo-container, .footer-logo-container');
    
    logoContainers.forEach(container => {
        const logo = container.querySelector('.logo, .hero-logo, .footer-logo');
        
        if (logo) {
            container.addEventListener('mouseenter', function() {
                logo.style.transform = 'scale(1.1)';
            });
            
            container.addEventListener('mouseleave', function() {
                logo.style.transform = 'scale(1)';
            });
        }
    });
}

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Resume Section Functionality
function downloadResume() {
    // Create a new window for printing/downloading
    const resumeContent = document.getElementById('resumeContent');
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>John Doe - Resume</title>
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    line-height: 1.6;
                    color: #333;
                    margin: 0;
                    padding: 20px;
                    background: white;
                }
                .resume-header-section {
                    text-align: center;
                    border-bottom: 3px solid #007bff;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .resume-name {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #007bff;
                    margin-bottom: 10px;
                }
                .resume-title {
                    font-size: 1.5rem;
                    color: #6c757d;
                    font-weight: 500;
                    margin-bottom: 20px;
                }
                .resume-contact {
                    font-size: 1rem;
                    color: #666;
                }
                .resume-contact p {
                    margin: 5px 0;
                }
                .resume-section {
                    margin-bottom: 30px;
                    page-break-inside: avoid;
                }
                .section-header {
                    font-size: 1.4rem;
                    font-weight: 600;
                    color: #007bff;
                    border-bottom: 2px solid #e9ecef;
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                }
                .experience-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 15px;
                    flex-wrap: wrap;
                }
                .experience-header h4 {
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: #343a40;
                    margin: 0;
                    flex: 1;
                }
                .company {
                    font-weight: 500;
                    color: #007bff;
                    margin: 0 15px;
                }
                .duration {
                    font-weight: 500;
                    color: #6c757d;
                    font-size: 0.9rem;
                }
                .achievement-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .achievement-list li {
                    padding: 5px 0;
                    position: relative;
                    padding-left: 20px;
                    color: #555;
                }
                .achievement-list li::before {
                    content: '•';
                    position: absolute;
                    left: 0;
                    color: #007bff;
                    font-weight: bold;
                }
                .skill-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .skill-list li {
                    padding: 5px 0;
                    position: relative;
                    padding-left: 20px;
                    color: #555;
                }
                .skill-list li::before {
                    content: '▸';
                    position: absolute;
                    left: 0;
                    color: #007bff;
                    font-weight: bold;
                }
                .project-item {
                    margin-bottom: 20px;
                    padding: 15px;
                    background: #f8f9fa;
                    border-radius: 8px;
                    border-left: 4px solid #007bff;
                }
                .project-tech {
                    font-style: italic;
                    color: #007bff;
                    font-weight: 500;
                    margin-bottom: 10px;
                    font-size: 0.9rem;
                }
                .education-item {
                    padding: 15px;
                    background: #f8f9fa;
                    border-radius: 8px;
                    border-left: 4px solid #28a745;
                }
                .certification-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .certification-list li {
                    padding: 8px 0;
                    position: relative;
                    padding-left: 25px;
                    color: #555;
                    border-bottom: 1px solid #e9ecef;
                }
                .certification-list li:last-child {
                    border-bottom: none;
                }
                .certification-list li::before {
                    content: '🏆';
                    position: absolute;
                    left: 0;
                    font-size: 1rem;
                }
                @media print {
                    body { margin: 0; padding: 15px; }
                    .resume-section { page-break-inside: avoid; }
                }
            </style>
        </head>
        <body>
            ${resumeContent.innerHTML}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    
    // Wait for content to load, then trigger print dialog
    printWindow.onload = function() {
        printWindow.print();
    };
    
    showNotification('Resume download initiated!', 'success');
}

function printResume() {
    // Hide buttons and other non-printable elements
    const resumeContent = document.getElementById('resumeContent');
    const originalContent = resumeContent.innerHTML;
    
    // Create a temporary div with print-optimized content
    const printDiv = document.createElement('div');
    printDiv.innerHTML = resumeContent.innerHTML;
    printDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 9999;
        padding: 20px;
        overflow: auto;
    `;
    
    // Add print styles
    const printStyles = document.createElement('style');
    printStyles.textContent = `
        @media print {
            body * { visibility: hidden; }
            .print-content, .print-content * { visibility: visible; }
            .print-content { position: absolute; left: 0; top: 0; }
            .btn { display: none !important; }
        }
    `;
    document.head.appendChild(printStyles);
    
    document.body.appendChild(printDiv);
    printDiv.classList.add('print-content');
    
    // Trigger print
    window.print();
    
    // Clean up
    document.body.removeChild(printDiv);
    document.head.removeChild(printStyles);
    
    showNotification('Print dialog opened!', 'info');
}

function shareResume() {
    if (navigator.share) {
        navigator.share({
            title: 'John Doe - Full Stack MERN Developer Resume',
            text: 'Check out my resume for Full Stack MERN Developer position',
            url: window.location.href + '#resume'
        }).then(() => {
            showNotification('Resume shared successfully!', 'success');
        }).catch(() => {
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
}

function fallbackShare() {
    // Copy URL to clipboard
    const url = window.location.href + '#resume';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Resume URL copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Unable to share resume', 'error');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Resume URL copied to clipboard!', 'success');
    }
}

// Add resume section to scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const resumeSection = document.querySelector('#resume');
    if (resumeSection) {
        const resumeObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                    entry.target.classList.add('loaded');
                }
            });
        }, { threshold: 0.1 });
        
        resumeObserver.observe(resumeSection);
    }
});

// Add smooth scroll to resume section
document.addEventListener('DOMContentLoaded', function() {
    const resumeLinks = document.querySelectorAll('a[href="#resume"]');
    
    resumeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const resumeSection = document.querySelector('#resume');
            if (resumeSection) {
                const offsetTop = resumeSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Simple Logo Animation Functions
function initLogoAnimations() {
    // Simple logo hover effects
    const logoContainers = document.querySelectorAll('.logo-container, .hero-logo-container, .footer-logo-container');
    
    logoContainers.forEach(container => {
        const logo = container.querySelector('.logo, .hero-logo, .footer-logo');
        
        if (logo) {
            container.addEventListener('mouseenter', function() {
                logo.style.transform = 'scale(1.1)';
            });
            
            container.addEventListener('mouseleave', function() {
                logo.style.transform = 'scale(1)';
            });
        }
    });
}
