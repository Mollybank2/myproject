
document.addEventListener('DOMContentLoaded', () => {
    // Navigation Bar Styling
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Rest of your JavaScript code...
});

  
// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.display = 'none';
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const words = ['Web Developer', 'UI/UX Designer', 'Freelancer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

type();

// Mobile Menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


    // Portfolio Data
const portfolioData = [
    {
        id: 1,
        title: "E-Commerce Platform",
        category: "web",
        image: src="images/work-3.png",
        description: "A full-stack e-commerce website with payment integration",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        demoLink: "https://demo.example.com",
        githubLink: "https://github.com/example",
        details: {
            challenge: "Creating a scalable and secure e-commerce platform",
            solution: "Implemented modern architecture with React and Node.js",
            features: [
                "User authentication",
                "Product management",
                "Shopping cart",
                "Payment processing"
            ]
        }
    },
    {
        id: 2,
        title: "Social Media App",
        category: "app",
        image: src="images/work-1.png",
        description: "Mobile social networking application",
        technologies: ["React Native", "Firebase", "Redux"],
        demoLink: "https://demo.example.com",
        githubLink: "https://github.com/example",
        details: {
            challenge: "Building real-time social interactions",
            solution: "Used Firebase for real-time updates and notifications",
            features: [
                "Real-time messaging",
                "Post sharing",
                "User profiles",
                "Push notifications"
            ]
        }
    },
    // Add more portfolio items...
];

// Initialize Portfolio
function initPortfolio() {
    const portfolioGrid = document.getElementById('portfolio-items');
    
    // Create portfolio items
    portfolioData.forEach(item => {
        const portfolioItem = createPortfolioItem(item);
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Create Portfolio Item
function createPortfolioItem(item) {
    const div = document.createElement('div');
    div.className = `portfolio-item ${item.category}`;
    
    div.innerHTML = `
        <div class="portfolio-image">
            <img src="${item.image}" alt="${item.title}">
            <div class="portfolio-overlay">
                <div class="overlay-buttons">
                    <button class="view-details" data-id="${item.id}">View Details</button>
                    <a href="${item.demoLink}" target="_blank" class="demo-link">Live Demo</a>
                </div>
            </div>
        </div>
        <div class="portfolio-info">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="tech-stack">
                ${item.technologies.map(tech => `
                    <span class="tech-tag">${tech}</span>
                `).join('')}
            </div>
        </div>
    `;

    return div;
}

// Filter Portfolio Items
function filterPortfolio() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Modal Functionality
function initModal() {
    const modal = document.getElementById('portfolioModal');
    const closeBtn = document.querySelector('.close-modal');
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // View Details button click handler
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-details')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            const item = portfolioData.find(item => item.id === itemId);
            showProjectDetails(item);
        }
    });
}

// Show Project Details in Modal
function showProjectDetails(item) {
    const modal = document.getElementById('portfolioModal');
    const modalBody = modal.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <div class="project-details">
            <h2>${item.title}</h2>
            <img src="${item.image}" alt="${item.title}" class="modal-image">
            <div class="project-info">
                <h3>Project Overview</h3>
                <p>${item.description}</p>
                
                <h3>Challenge</h3>
                <p>${item.details.challenge}</p>
                
                <h3>Solution</h3>
                <p>${item.details.solution}</p>
                
                <h3>Key Features</h3>
                <ul>
                    ${item.details.features.map(feature => `
                        <li>${feature}</li>
                    `).join('')}
                </ul>
                
                <div class="project-links">
                    <a href="${item.demoLink}" target="_blank" class="btn">Live Demo</a>
                    <a href="${item.githubLink}" target="_blank" class="btn">Source Code</a>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
    filterPortfolio();
    initModal();
});

// Add animation on scroll
window.addEventListener('scroll', () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight * 0.8) {
            item.classList.add('animate');
        }
    });
});

// Scroll Animation
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Form Validation
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add your form submission logic here
    alert('Message sent successfully!');
    contactForm.reset();
});

// Skill Animation
const skillBars = document.querySelectorAll('.progress');

function animateSkills() {
    skillBars.forEach(skill => {
        const target = skill.dataset.progress;
        let width = 0;
        const interval = setInterval(() => {
            if (width >= target) {
                clearInterval(interval);
            } else {
                width++;
                skill.style.width = width + '%';
            }
        }, 10);
    });
}

// Trigger skill animation when scrolled into view
const skillsSection = document.querySelector('.skills-container');
let animated = false;

window.addEventListener('scroll', () => {
    if (isInViewport(skillsSection) && !animated) {
        animateSkills();
        animated = true;
    }
});

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

