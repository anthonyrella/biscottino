// Basic button functionality for external links
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Add loading state for external links
        if (this.href && (this.href.includes('mailto:') || this.href.includes('instagram'))) {
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 2000);
        }
    });
});

// Logo reveal and navbar background change on scroll
function handleLogoReveal() {
    const heroSection = document.querySelector('.hero');
    const logoImg = document.querySelector('.nav-logo-img');
    const navbar = document.querySelector('.navbar');
    
    if (heroSection && logoImg && navbar) {
        const heroHeight = heroSection.offsetHeight;
        const scrollY = window.scrollY;
        
        // Reveal logo when scrolled past 80% of hero section
        if (scrollY > heroHeight * 0.8) {
            logoImg.classList.add('revealed');
        } else {
            logoImg.classList.remove('revealed');
        }
        
        // Change navbar background when fully past hero section
        if (scrollY > heroHeight) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.2)';
            navbar.style.boxShadow = 'none';
        }
    }
}

// Gallery Slideshow and Lightbox
function initGallery() {
    const track = document.getElementById('slideshow-track');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slides = document.querySelectorAll('.slide-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    
    if (!track || !prevBtn || !nextBtn || !slides.length) return;
    
    let currentIndex = 0;
    const slideWidth = 300; // Width of each slide including gap
    const visibleSlides = Math.floor(track.parentElement.offsetWidth / slideWidth);
    const maxIndex = Math.max(0, slides.length - visibleSlides);
    
    function updateSlideshow() {
        const translateX = -currentIndex * slideWidth;
        track.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
    }
    
    function nextSlide() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlideshow();
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlideshow();
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Initialize
    updateSlideshow();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newVisibleSlides = Math.floor(track.parentElement.offsetWidth / slideWidth);
        const newMaxIndex = Math.max(0, slides.length - newVisibleSlides);
        if (currentIndex > newMaxIndex) {
            currentIndex = newMaxIndex;
        }
        updateSlideshow();
    });

    // Lightbox functionality
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    
    function openLightbox(slideIndex) {
        const img = slides[slideIndex].querySelector('img');
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Lightbox event listeners
    slides.forEach((slide, index) => {
        const img = slide.querySelector('img');
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);

    // Close lightbox when clicking outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });
}

// FAQ Accordion functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const navbar = document.querySelector('.navbar');
    
    // Get navbar height (including padding)
    const getNavbarHeight = () => {
        if (navbar) {
            const navbarStyle = window.getComputedStyle(navbar);
            const navbarHeight = navbar.offsetHeight;
            const navbarPadding = parseInt(navbarStyle.paddingTop) + parseInt(navbarStyle.paddingBottom);
            return navbarHeight + navbarPadding;
        }
        return 0;
    };
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = getNavbarHeight();
                const targetPosition = targetElement.offsetTop - navbarHeight + 31; // Extra 31px buffer
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Biscottino website loaded successfully!');
    
    // Add scroll listener for logo reveal
    window.addEventListener('scroll', handleLogoReveal);
    
    // Check initial scroll position
    handleLogoReveal();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize gallery
    initGallery();
    
    // Initialize FAQ
    initFAQ();
});