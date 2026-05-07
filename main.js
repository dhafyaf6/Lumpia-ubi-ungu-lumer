/* ========================================
   UBI UNGU LUMER - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ----------------------------------------
    // Navbar Scroll Effect
    // ----------------------------------------
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ----------------------------------------
    // Reveal on Scroll Animation
    // ----------------------------------------
    const reveals = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // ----------------------------------------
    // Smooth Scroll for Anchor Links
    // ----------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });

    // ----------------------------------------
    // Button Ripple Effect
    // ----------------------------------------
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.5);
                border-radius: 50%;
                width: 100px;
                height: 100px;
                transform: translate(-50%, -50%) scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ----------------------------------------
    // Parallax Effect on Mouse Move
    // ----------------------------------------
    const blobs = document.querySelectorAll('.blob');
    
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 10;
            const currentTransform = getComputedStyle(blob).transform;
            blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // ----------------------------------------
    // Counter Animation
    // ----------------------------------------
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start counter when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });

    // ----------------------------------------
    // Mobile Menu Toggle (if needed)
    // ----------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // ----------------------------------------
    // Lazy Load Images
    // ----------------------------------------
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));

    // ----------------------------------------
    // Toast Notification
    // ----------------------------------------
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-white font-semibold z-50 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Make showToast globally available
    window.showToast = showToast;
});
