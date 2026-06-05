// Portfolio Website JavaScript
// Author: Your Name
// Description: Interactive functionality for computer science portfolio

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeThemeToggle();
    initializeMobileMenu();
    initializeTypingAnimation();
    initializeRoleRotation();
    initializeScrollAnimations();
    initializeExperienceTabs();
    // Contact form replaced with mailto link
    initializeResumeDownload();
    initializeParticles();
    initializeNavbarScrollEffect();
    initializeSmoothScrolling();
    initializeVideoModal();
    initializeMobileOptimizations();
});


// Always Dark Theme
function initializeThemeToggle() {
    // Always set to dark theme
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Typing Animation
function initializeTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    // Updated to reflect actual expertise
    const names = ['Omar Ghoz', 'Data Engineer', 'Full-Stack Developer', 'AI & RAG Builder', 'Automation Expert'];
    let currentIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentName = names[currentIndex];
        
        if (isDeleting) {
            currentText = currentName.substring(0, currentText.length - 1);
            typeSpeed = 50;
        } else {
            currentText = currentName.substring(0, currentText.length + 1);
            typeSpeed = 100;
        }
        
        typingText.textContent = currentText;
        
        if (!isDeleting && currentText === currentName) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % names.length;
            typeSpeed = 500; // Pause before typing next
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing animation after a delay
    setTimeout(type, 1000);
}

// Role Rotation Animation
function initializeRoleRotation() {
    const roleText = document.getElementById('role-text');
    // Updated roles
    const roles = [
        'Data Engineer & Full-Stack Developer',
        'AI & RAG Systems Architect',
        'ETL & Automation Expert',
        'Freelance Software Engineer',
        'IT Student @ Thebes Academy'
    ];
    let currentRole = 0;
    
    function rotateRole() {
        roleText.style.opacity = '0';
        setTimeout(() => {
            currentRole = (currentRole + 1) % roles.length;
            roleText.textContent = roles[currentRole];
            roleText.style.opacity = '1';
        }, 300);
    }
    
    // Rotate every 3 seconds
    setInterval(rotateRole, 3000);
}

// Scroll Animations (Intersection Observer)
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animations for different elements
                if (entry.target.classList.contains('skill-tag')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = delay + 'ms';
                }
                
                if (entry.target.classList.contains('project-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                    entry.target.style.transitionDelay = delay + 'ms';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.skill-tag, .project-card, .experience-item, .about-content > *');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Experience Tabs
function initializeExperienceTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.experience-panel');
    
    if (tabButtons.length === 0 || tabPanels.length === 0) {
        console.error('Experience tabs not found!');
        return;
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            const targetPanel = document.getElementById(targetTab);
            
            if (!targetPanel) {
                console.error(`Target panel "${targetTab}" not found!`);
                return;
            }
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            targetPanel.classList.add('active');
        });
    });
}

// Contact Form - Replaced with mailto link
// function initializeContactForm() - No longer needed

// Resume Download
function initializeResumeDownload() {
    const resumeBtn = document.getElementById('resume-btn');
    
    resumeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Use Omar's actual resume file
        const link = document.createElement('a');
        link.href = 'Omar_Ghoz_Resume.pdf';
        link.download = 'Omar_Ghoz_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show download notification
        showNotification('Resume downloaded successfully!', 'success');
        
        // Add button animation
        resumeBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            resumeBtn.style.transform = 'scale(1)';
        }, 150);
        
        return; // Exit early since we're using the actual PDF file
        
        // Backup text resume content for fallback
        const resumeContent = `
# Omar Ghoz - Back-end Developer & Data Engineer Student

## Contact Information
- Email: omarghoz999@gmail.com
- Phone: +201029522532
- Location: Heliopolis, Cairo, Egypt
- LinkedIn: [LinkedIn Profile]
- GitHub: [GitHub Profile]

## Professional Summary
Motivated Data Science and Engineering student with strong foundation in machine learning, 
data engineering, and full-stack data solutions. Currently interning at Orange Egypt.

## Education
**Bachelor of Science, Computing and Information Sciences**
Egypt University of Informatics | November 2023 - Present
New Administrative Capital, Egypt

**Microsoft Data Engineer Program**
DEPI - Digital Egypt Pioneers Initiative | July 2025 - Present

## Work Experience
**Data Science Intern** | Orange Egypt | September 2025 - Present
- Implemented classical classification problems using ML models
- Developed customer service chatbot with FAQ capabilities
- Applied machine learning to solve telecom business problems

## Technical Skills
- **Programming:** Python, C, C++, SQL, Scala, Java
- **Data Engineering:** Apache Spark, Apache Airflow, ETL Pipelines
- **ML Frameworks:** Scikit-learn, TensorFlow, PyTorch, XGBoost
- **Databases:** PostgreSQL, MySQL, MongoDB
- **Tools:** Git, Docker, ChromaDB, Ollama, Streamlit

## Featured Projects
**Orange Customer Service Chatbot**
- AI-powered assistant with RAG for accurate responses
- Technologies: Streamlit, ChromaDB, Ollama, LangChain

**End-to-End Retail Data Pipeline**
- Complete ETL process with automated visualizations
- Technologies: Apache Airflow, PostgreSQL, Python

**Movie Recommendation System**
- AI-driven recommendations with 20,000+ entries
- Technologies: Scala, Apache Spark, Streamlit

## Languages
- Arabic (Native)
- English (Fluent)
- French (Intermediate)
`;
        
        // Fallback: Create and download text file if PDF fails
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Omar_Ghoz_Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    });
}

// Particles Background
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#64b5f6"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#64b5f6",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Navbar Scroll Effect
function initializeNavbarScrollEffect() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add background blur effect
        if (scrollTop > 50) {
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.background = getComputedStyle(document.documentElement)
                .getPropertyValue('--bg-primary').replace('1)', '0.95)');
        } else {
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.background = getComputedStyle(document.documentElement)
                .getPropertyValue('--bg-primary').replace('1)', '0.95)');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const scrollPosition = window.scrollY + navbarHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                updateActiveNavLink(sectionId);
            }
        });
    });
}

function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + activeId) {
            link.classList.add('active');
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00ff00' : '#00ff00'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Utility Functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Easter Egg: Konami Code
(function() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
                konamiIndex = 0;
                // Add some fun effects
                document.body.style.animation = 'rainbow 2s infinite';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 5000);
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    // Add rainbow animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
})();

// Mobile Optimizations
function initializeMobileOptimizations() {
    // Reduce particle count on mobile for better performance
    if (window.innerWidth <= 768 && typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 30, // Reduced from 80
                    density: {
                        enable: true,
                        value_area: 1200
                    }
                },
                color: {
                    value: "#64b5f6"
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.3 // Reduced opacity
                },
                size: {
                    value: 2, // Smaller particles
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 120, // Shorter lines
                    color: "#64b5f6",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.5, // Slower movement
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: false // Disable hover on mobile
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // Add mobile-specific touch handling
    document.addEventListener('touchstart', function() {
        // Enable active states on touch
    }, {passive: true});
    
    // Optimize scroll performance on mobile
    let ticking = false;
    function updateOnScroll() {
        // Throttled scroll updates for mobile
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }, {passive: true});
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate layouts after orientation change
            if (window.innerWidth > 768) {
                const hamburger = document.getElementById('hamburger');
                const navMenu = document.getElementById('nav-menu');
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        }, 500);
    });
    
    // Improve mobile typography based on device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        document.documentElement.style.setProperty('--font-size-adjust', '1.1');
    }
    
    // Fix mobile viewport height issues (especially iOS Safari)
    function setMobileViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Ensure hero section has proper height
        const hero = document.querySelector('.hero');
        if (hero && window.innerWidth <= 768) {
            const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
            const availableHeight = window.innerHeight - navbarHeight;
            hero.style.minHeight = `${availableHeight}px`;
            
            // Add some top padding to ensure photo is not cut off
            hero.style.paddingTop = `${navbarHeight + 20}px`;
        }
        
        // Fix About section text rendering on mobile
        const aboutSection = document.querySelector('#about');
        const aboutText = document.querySelector('.about-text');
        if (aboutSection && aboutText && window.innerWidth <= 768) {
            // Ensure proper text wrapping and prevent cutoff
            aboutText.style.width = '100%';
            aboutText.style.maxWidth = '100%';
            aboutText.style.overflowWrap = 'break-word';
            aboutText.style.wordWrap = 'break-word';
            
            // Fix code blocks
            const codeBlocks = aboutSection.querySelectorAll('.code-block');
            codeBlocks.forEach(block => {
                block.style.width = '100%';
                block.style.maxWidth = '100%';
                block.style.margin = '0 0 2rem 0';
                
                const codeContent = block.querySelector('.code-content');
                if (codeContent) {
                    codeContent.style.overflowX = 'auto';
                    codeContent.style.wordWrap = 'break-word';
                }
            });
            
            // Fix paragraphs
            const paragraphs = aboutText.querySelectorAll('p');
            paragraphs.forEach(p => {
                p.style.width = '100%';
                p.style.maxWidth = '100%';
                p.style.wordWrap = 'break-word';
                p.style.overflowWrap = 'break-word';
                p.style.hyphens = 'auto';
            });
        }
    }
    
    // Set initial viewport height
    setMobileViewportHeight();
    
    // Update on resize and orientation change
    window.addEventListener('resize', setMobileViewportHeight);
    window.addEventListener('orientationchange', () => {
        setTimeout(setMobileViewportHeight, 500);
    });
}

// Console greeting
console.log(`
%c┌─────────────────────────────────────────────┐
│                                             │
│    Welcome to Omar's portfolio! 👋        │
│    Thanks for checking out the code 🚀     │
│                                             │
│    Built with: HTML5, CSS3, JavaScript     │
│    Focus: Data Engineering, AI, Full-Stack │
│                                             │
│    Status: 3+ Years Freelance Experience    │
│                                             │
│    Let's build something awesome! 📊        │
│                                             │
└─────────────────────────────────────────────┘
`, 'color: #00ff00; font-family: monospace; font-size: 12px;');

console.log('%cData Engineer & Full-Stack Developer 🔬', 'color: #00ff00; font-size: 16px; font-weight: bold;');

// Video Modal Functionality
function initializeVideoModal() {
    const modal = document.getElementById('video-modal');
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeVideoModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeVideoModal();
        }
    });
}

function openVideoModal(videoId) {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById(videoId);
    
    if (!modal || !video) return;
    
    // Hide all videos and info sections first
    const allVideos = modal.querySelectorAll('video');
    const allInfos = modal.querySelectorAll('.video-modal-info');
    
    allVideos.forEach(v => {
        v.style.display = 'none';
        v.pause();
    });
    allInfos.forEach(info => info.style.display = 'none');
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Show and start the selected video
    video.style.display = 'block';
    video.currentTime = 0;
    
    // Auto-play on desktop, require user interaction on mobile
    if (window.innerWidth > 768) {
        video.play().catch(e => {
            // Auto-play failed, that's okay
            console.log('Auto-play prevented:', e);
        });
    } else {
        // On mobile, don't auto-play to save data
        video.controls = true;
    }
    
    // Show corresponding info section
    const infoId = videoId.replace('-video', '-info');
    const infoElement = document.getElementById(infoId);
    if (infoElement) {
        infoElement.style.display = 'block';
    }
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        // Pause all videos
        const allVideos = modal.querySelectorAll('video');
        allVideos.forEach(video => {
            if (video) {
                video.pause();
            }
        });
    }
}