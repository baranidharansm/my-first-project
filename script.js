// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Dynamic navbar expansion based on scroll position
let lastScrollY = 0;
const navbar = document.querySelector('.navbar');
const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    const scrollPercentage = (currentScrollY / pageHeight) * 100;
    
    // Expand navbar when scrolled down past 30% or show full navbar
    if (scrollPercentage > 30 && currentScrollY > lastScrollY) {
        // Scrolling down
        navbar.classList.add('expanded');
    } else if (currentScrollY < 100) {
        // At top
        navbar.classList.remove('expanded');
    }
    
    lastScrollY = currentScrollY;
    
    // Also expand if user is past 50% of page
    if (scrollPercentage > 50) {
        navbar.classList.add('expanded');
    }
});

// Notification button interaction
document.addEventListener('DOMContentLoaded', function() {
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotification('You have 3 new course recommendations!', 'info');
        });
    }
    
    // Search box functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            if (searchInput.value.trim()) {
                showNotification(`Searching for: ${searchInput.value}`, 'info');
                searchInput.value = '';
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                showNotification(`Searching for: ${this.value}`, 'info');
                this.value = '';
            }
        });
    }
    
    // Profile button interaction
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            showNotification('Profile menu clicked!', 'info');
        });
    }
});

function enrollCourse(courseName) {
    // Create and show success message with animation
    const message = document.createElement('div');
    message.textContent = `✓ Successfully enrolled in ${courseName}!`;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.5s ease-out;
        z-index: 1000;
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideInLeft 0.5s ease-out';
        setTimeout(() => message.remove(), 500);
    }, 3000);
    
    console.log(`User enrolled in: ${courseName}`);
}

// Handle contact form submission with animation
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.elements[0].value;
    const email = form.elements[1].value;
    const message = form.elements[2].value;
    
    // Validate form
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        showNotification('Please fill in all fields!', 'error');
        return;
    }
    
    // Show loading state
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        console.log('Form submitted:', {
            name: name,
            email: email,
            message: message
        });
        
        showNotification(`Thank you ${name}! Your message has been sent.`, 'success');
        form.reset();
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
}

// Notification helper function
function showNotification(text, type) {
    const notification = document.createElement('div');
    notification.textContent = text;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.5s ease-out;
        z-index: 1000;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Add animation to course cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe course cards
document.addEventListener('DOMContentLoaded', function() {
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
    
    // Add active link highlighting on navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.style.opacity = '1');
            this.style.opacity = '0.5';
        });
    });
});

// Add some interactivity to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
});

// Create ripple effect
function createRipple(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: rippleAnimation 0.6s ease-out;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add hover effect to course cards with shadow animation
document.addEventListener('DOMContentLoaded', function() {
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'glow 0.6s ease-in-out';
        });
    });
});

// Add progress animation to stats on scroll
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat h3');
    let animated = false;
    
    window.addEventListener('scroll', function() {
        if (!animated && window.scrollY > document.querySelector('.about').offsetTop - 400) {
            stats.forEach(stat => {
                animateCounter(stat);
            });
            animated = true;
        }
    });
});

// Animate counter numbers
function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 1500;
    const increment = target / (duration / 16);
    let current = 0;
    
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Add smooth scroll behavior and parallax effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown') {
        const nextSection = document.querySelector('section:focus ~ section') || document.querySelector('section:first-of-type');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add page visibility animation
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = 'Come back to EduLearn!';
    } else {
        document.title = 'EduLearn - Your Learning Platform';
    }
});

// Add mouse position tracking for interactive background
document.addEventListener('mousemove', function(e) {
    const courses = document.querySelector('.courses');
    if (courses) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        courses.style.backgroundPosition = `${x}% ${y}%`;
    }
});

// Add section visibility indicator
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => sectionObserver.observe(section));
});

// Add text selection animation
document.addEventListener('mousedown', function(e) {
    const courseCard = e.target.closest('.course-card');
    if (courseCard) {
        courseCard.style.transform = 'scale(0.98)';
    }
});

document.addEventListener('mouseup', function(e) {
    const courseCard = e.target.closest('.course-card');
    if (courseCard) {
        courseCard.style.transform = 'scale(1)';
    }
});
