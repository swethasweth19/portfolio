/**
 * V Swetha Portfolio — Interactive Behaviors
 * Optimized for snappy interaction and high performance
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const bars = hamburgerBtn.querySelectorAll('.bar');
            if (navMenu.classList.contains('open')) {
                bars[0].style.transform = 'translateY(7px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    const bars = hamburgerBtn.querySelectorAll('.bar');
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            });
        });
    }

    // 2. Navbar Scrolled State
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // 3. Situation & Engineering Solution Deep-Dive Toggle (Case Studies)
    const deepdiveToggles = document.querySelectorAll('.deepdive-toggle');

    deepdiveToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            const content = toggle.nextElementSibling;

            // Toggle active state
            toggle.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                content.classList.add('open');
            } else {
                content.classList.remove('open');
            }
        });
    });

    // 4. Subtle Slide-up Fade-in on Scroll (Intersection Observer API - Prompt 3)
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '100px 0px',
            threshold: 0.05
        };

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-on-scroll');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animTargets = document.querySelectorAll('.timeline-item, .project-card, .credential-card, .achievement-feature-card, .skill-category-card');
        animTargets.forEach(el => {
            scrollObserver.observe(el);
        });
    }

    // 5. Interactive Lightbox Modal for Real Photos
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxBackdrop = document.getElementById('lightboxBackdrop');
    const photoThumbnails = document.querySelectorAll('.photo-thumbnail');

    if (lightboxModal && lightboxImg && lightboxCaption) {
        photoThumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const src = thumb.getAttribute('data-src');
                const caption = thumb.getAttribute('data-caption') || '';
                lightboxImg.src = src;
                lightboxCaption.textContent = caption;
                lightboxModal.classList.add('active');
                lightboxModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            lightboxModal.classList.remove('active');
            lightboxModal.setAttribute('aria-hidden', 'true');
            lightboxImg.src = '';
            document.body.style.overflow = '';
        };

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // 6. Copy Email to Clipboard with Toast Notification
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const toast = document.getElementById('toastMessage');

    if (copyEmailBtn && toast) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = 'swethasweth1923@gmail.com';
            try {
                await navigator.clipboard.writeText(email);
                showToast('Email address copied to clipboard!');
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast('Email address copied to clipboard!');
            }
        });
    }

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2600);
    }
});
