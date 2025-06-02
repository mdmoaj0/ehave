// Product Tab Switching
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    let isMobileMenuOpen = false;

    // Function to check if we're on mobile
    function isMobileDevice() {
        return window.innerWidth <= 768;
    }

    if (mobileMenuButton && navMenu && header) {
        mobileMenuButton.addEventListener('click', function() {
            // Only handle mobile menu on mobile devices
            if (!isMobileDevice()) {
                return;
            }
            
            isMobileMenuOpen = !isMobileMenuOpen;
            
            if (isMobileMenuOpen) {
                // Add class to nav menu for styling
                navMenu.classList.add('mobile-open');
                navMenu.style.display = 'flex';
                
                // Add class to header for fixed positioning
                header.classList.add('menu-open');
                
                // Change button icon
                mobileMenuButton.innerHTML = '✕';
                
                // Add backdrop
                const backdrop = document.createElement('div');
                backdrop.className = 'mobile-menu-backdrop';
                document.body.appendChild(backdrop);
                
                // Prevent body scroll
                document.body.style.overflow = 'hidden';
                
                backdrop.addEventListener('click', closeMobileMenu);
            } else {
                closeMobileMenu();
            }
        });

        function closeMobileMenu() {
            // Remove classes and styles
            navMenu.classList.remove('mobile-open');
            
            // Only hide nav menu on mobile
            if (isMobileDevice()) {
                navMenu.style.display = 'none';
            } else {
                navMenu.style.display = 'flex';
            }
            
            header.classList.remove('menu-open');
            
            // Reset button icon
            mobileMenuButton.innerHTML = '☰';
            isMobileMenuOpen = false;
            
            // Remove backdrop
            const backdrop = document.querySelector('.mobile-menu-backdrop');
            if (backdrop) {
                backdrop.remove();
            }
            
            // Restore body scroll
            document.body.style.overflow = '';
        }

        // Close mobile menu when nav link is clicked (only on mobile)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (isMobileDevice() && isMobileMenuOpen) {
                    closeMobileMenu();
                }
            });
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                // Desktop mode - ensure nav menu is visible and clean up mobile menu
                if (isMobileMenuOpen) {
                    closeMobileMenu();
                }
                navMenu.style.display = 'flex';
                navMenu.classList.remove('mobile-open');
                header.classList.remove('menu-open');
                document.body.style.overflow = '';
                
                // Remove any leftover backdrop
                const backdrop = document.querySelector('.mobile-menu-backdrop');
                if (backdrop) {
                    backdrop.remove();
                }
            } else {
                // Mobile mode - hide nav menu unless mobile menu is open
                if (!isMobileMenuOpen) {
                    navMenu.style.display = 'none';
                }
            }
        });

        // Close mobile menu on escape key (only on mobile)
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMobileMenuOpen && isMobileDevice()) {
                closeMobileMenu();
            }
        });

        // Initialize proper display state based on screen size
        function initializeNavMenu() {
            if (isMobileDevice()) {
                navMenu.style.display = 'none';
            } else {
                navMenu.style.display = 'flex';
                navMenu.classList.remove('mobile-open');
                header.classList.remove('menu-open');
            }
        }

        // Initialize on page load
        initializeNavMenu();
    }

    const tabButtons = document.querySelectorAll('.tab-button');
    const productDetails = document.querySelector('.product-details');
    
    // Product data for different tabs
    const productData = {
        'AI Headhunter': {
            title: 'AI Headhunter',
            description: 'The AI recruiting engine built for headhunters. A streamlined process that makes recruitment faster and more effective.',
            features: [
                'Automatically discover and shortlist top-fit candidates using AI-driven search.',
                'Rank candidates based on resume-job fit, skills match, and contextual insights.',
                'Seamlessly push qualified candidates into your hiring pipeline.'
            ],
            buttonText: 'Learn More About AI Headhunter'
        },
        'MegaTeam': {
            title: 'MegaTeam',
            description: 'FDA-cleared digital therapeutics platform for ADHD assessment and treatment. Evidence-based interventions delivered through engaging game mechanics.',
            features: [
                'Clinically validated ADHD assessment tools with proven efficacy.',
                'Game-based interventions that improve attention and cognitive function.',
                'Real-time progress tracking and personalized treatment plans.'
            ],
            buttonText: 'Learn More About MegaTeam'
        },
        'Nina Reflex': {
            title: 'Nina Reflex',
            description: 'Advanced cognitive assessment platform utilizing eye-tracking and machine learning to evaluate neurological conditions.',
            features: [
                'Non-invasive eye-tracking technology for cognitive assessment.',
                'Machine learning algorithms for accurate diagnosis support.',
                'Rapid assessment protocols for clinical and research applications.'
            ],
            buttonText: 'Learn More About Nina Reflex'
        },
        'CHAT': {
            title: 'CHAT',
            description: 'Conversational AI platform designed for healthcare applications, providing intelligent patient interactions and support.',
            features: [
                'Natural language processing for healthcare conversations.',
                'HIPAA-compliant patient interaction management.',
                'Integration with existing healthcare information systems.'
            ],
            buttonText: 'Learn More About CHAT'
        }
    };
    
    // Handle tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the product name from button text
            const productName = this.textContent.trim();
            const data = productData[productName];
            
            if (data) {
                // Update product details
                productDetails.innerHTML = `
                    <h3>${data.title}</h3>
                    <p>${data.description}</p>
                    
                    <div class="features">
                        <h4>Key Features</h4>
                        <ul>
                            ${data.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <button class="learn-more-btn">${data.buttonText} <span class="arrow">→</span></button>
                `;
            }
        });
    });
    
    // Chat functionality
    const chatInput = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    
    // Predefined responses for the IR chatbot
    const chatResponses = {
        'filing': 'Ehave\'s latest SEC filing is the 20-F Annual Report, submitted on May 5, 2025. You can view the full filing in our investor center.',
        'stock': 'Ehave (EHVVF) is currently trading at +0.0023 (1.86%). Our current market cap is $42.7M.',
        'otc': 'Ehave is currently listed as OTC Tier: Current. This status reflects our compliance with all required filings and disclosures.',
        'earnings': 'Our Q1 2025 financial results were reported on April 15, 2025. You can find detailed information in our investor center.',
        'products': 'Ehave offers AI Headhunter, MegaTeam, Nina Reflex, and CHAT platforms. We also have AI BioLab and AI HealthOps in development.',
        'leadership': 'Ehave is currently assembling a focused leadership team. Updates will be announced soon.',
        'contact': 'You can reach us at contact@ehave.com or visit our office at 100 2nd St., Suite 2000, St. Petersburg, FL 33701.'
    };
    
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.innerHTML = `<p>${content}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function handleChatSubmit() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, true);
        
        // Clear input
        chatInput.value = '';
        
        // Generate bot response
        setTimeout(() => {
            let response = "I'm here to help with investor information. You can ask me about SEC filings, stock performance, our products, or contact information.";
            
            const lowerMessage = message.toLowerCase();
            
            // Check for keywords and provide appropriate responses
            if (lowerMessage.includes('filing') || lowerMessage.includes('sec') || lowerMessage.includes('20-f')) {
                response = chatResponses.filing;
            } else if (lowerMessage.includes('stock') || lowerMessage.includes('price') || lowerMessage.includes('trading')) {
                response = chatResponses.stock;
            } else if (lowerMessage.includes('otc') || lowerMessage.includes('tier')) {
                response = chatResponses.otc;
            } else if (lowerMessage.includes('earnings') || lowerMessage.includes('financial') || lowerMessage.includes('results')) {
                response = chatResponses.earnings;
            } else if (lowerMessage.includes('product') || lowerMessage.includes('platform') || lowerMessage.includes('ai')) {
                response = chatResponses.products;
            } else if (lowerMessage.includes('leadership') || lowerMessage.includes('team') || lowerMessage.includes('management')) {
                response = chatResponses.leadership;
            } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
                response = chatResponses.contact;
            }
            
            addMessage(response);
        }, 1000);
    }
    
    // Chat event listeners
    sendBtn.addEventListener('click', handleChatSubmit);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleChatSubmit();
        }
    });
    
    // Smooth scrolling for navigation links
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
    
    // Email subscription form
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const emailInput = document.querySelector('.signup-form input[type="email"]');
    
    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', function() {
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate subscription
            alert('Thank you for subscribing! You will receive investor updates directly to your inbox.');
            emailInput.value = '';
        });
        
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeBtn.click();
            }
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add loading animation for buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Animate timeline items on scroll
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
    
    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // Observe pipeline items
    document.querySelectorAll('.pipeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});

// Add button loading styles
const style = document.createElement('style');
style.textContent = `
    .loading {
        position: relative;
        color: transparent !important;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;
document.head.appendChild(style); 