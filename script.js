document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking links
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.textContent = '☰';
            });
        });
    }

    // --- Hero Animation (Ember Particles) ---
    const initEmbers = () => {
        const container = document.getElementById('hero-animation');
        if (!container) return;

        const createEmber = () => {
            const ember = document.createElement('div');
            ember.classList.add('ember');
            
            // Randomize position and animation properties
            const startX = Math.random() * 100;
            const size = 2 + Math.random() * 4;
            const duration = 3 + Math.random() * 4;
            const delay = Math.random() * 5;
            
            ember.style.left = `${startX}%`;
            ember.style.width = `${size}px`;
            ember.style.height = `${size}px`;
            ember.style.animationDuration = `${duration}s`;
            ember.style.animationDelay = `${delay}s`;
            
            container.appendChild(ember);
            
            // Cleanup
            setTimeout(() => {
                ember.remove();
            }, (duration + delay) * 1000);
        };

        // Create embers periodically
        setInterval(createEmber, 300);
        
        // Initial set
        for(let i=0; i<15; i++) createEmber();
    };
    
    initEmbers();

    // --- FAQ Accordion ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const isOpen = btn.classList.contains('active');
            
            // Close all others
            faqQuestions.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.classList.remove('active');
                    otherBtn.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current
            btn.classList.toggle('active');
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // --- Modal System ---
    const modalButtons = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('[data-modal-close]');
    
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId + '-modal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent body scroll
        }
    };

    const closeModal = (modal) => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    };

    modalButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-modal-target');
            openModal(targetId);
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // --- Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.step-card, .gallery-item, .testimonial-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});