// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Animate skill bars on scroll
const skillFills = document.querySelectorAll('.skill-fill');

const animateSkills = () => {
    skillFills.forEach(fill => {
        const percentage = fill.dataset.percentage; // Read from data-percentage attribute
        fill.style.width = '0%'; // Reset to 0 before animating
        fill.style.animation = `progressAnimation 2s forwards`;
        fill.style.setProperty('--target-width', percentage); // Set a CSS variable for animation
    });
};

// Trigger animation when the skills section is in view
const skillsGraphSection = document.querySelector('.skills-graph-section');
// Also observe the main skills section for the technical, programming, and tools skills
const mainSkillsSection = document.querySelector('.skills-section');

const observerOptions = {
    threshold: 0.4 // Trigger when 40% of the section is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

if (skillsGraphSection) {
    observer.observe(skillsGraphSection);
}

if (mainSkillsSection) {
    observer.observe(mainSkillsSection);
} 