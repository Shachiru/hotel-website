// Preloader functionality
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Smooth scrolling for anchor links
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

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const button = this.querySelector('.btn-contact');
    const originalText = button.textContent;

    button.textContent = 'Sending...';
    button.disabled = true;

    setTimeout(() => {
        button.textContent = 'Message Sent!';
        button.style.background = '#28a745';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#d4af37';
            button.disabled = false;
            this.reset();
        }, 2000);
    }, 1000);
});

// Room card hover effects
document.querySelectorAll('.room-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced Hero Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('heroCarousel');
    const heroContent = document.querySelector('.hero-content');

    if (carousel && heroContent) {
        // Add smooth transitions and blur effects
        carousel.addEventListener('slide.bs.carousel', function(e) {
            // Add blur effect to outgoing slide
            const activeItem = carousel.querySelector('.carousel-item.active');
            if (activeItem) {
                activeItem.style.filter = 'blur(3px)';
                activeItem.style.transform = 'scale(1.05)';
                activeItem.style.transition = 'all 0.8s ease-in-out';
            }

            // Slightly fade the hero content during transition
            heroContent.style.opacity = '0.7';
            heroContent.style.transform = 'translate(-50%, -50%) scale(0.98)';
            heroContent.style.transition = 'all 0.4s ease';
        });

        carousel.addEventListener('slid.bs.carousel', function(e) {
            // Remove blur effect from new active slide
            const activeItem = carousel.querySelector('.carousel-item.active');
            if (activeItem) {
                activeItem.style.filter = 'blur(0px)';
                activeItem.style.transform = 'scale(1)';
                activeItem.style.transition = 'all 0.8s ease-in-out';
            }

            // Restore hero content
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translate(-50%, -50%) scale(1)';
            heroContent.style.transition = 'all 0.4s ease';
        });

        // Pause carousel on hover for better user experience
        carousel.addEventListener('mouseenter', function() {
            if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
                const carouselInstance = bootstrap.Carousel.getInstance(carousel);
                if (carouselInstance) {
                    carouselInstance.pause();
                }
            }
        });

        carousel.addEventListener('mouseleave', function() {
            if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
                const carouselInstance = bootstrap.Carousel.getInstance(carousel);
                if (carouselInstance) {
                    carouselInstance.cycle();
                }
            }
        });

        // Add keyboard navigation for accessibility
        carousel.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
                    const carouselInstance = bootstrap.Carousel.getInstance(carousel);
                    if (carouselInstance) {
                        carouselInstance.prev();
                    }
                }
            } else if (e.key === 'ArrowRight') {
                if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
                    const carouselInstance = bootstrap.Carousel.getInstance(carousel);
                    if (carouselInstance) {
                        carouselInstance.next();
                    }
                }
            }
        });

        // Add swipe support for mobile devices
        let startX = 0;
        let endX = 0;

        carousel.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;

            if (Math.abs(diff) > swipeThreshold) {
                if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
                    const carouselInstance = bootstrap.Carousel.getInstance(carousel);
                    if (carouselInstance) {
                        if (diff > 0) {
                            carouselInstance.next();
                        } else {
                            carouselInstance.prev();
                        }
                    }
                }
            }
        }

        // Auto-play control based on page visibility
        let autoPlayPaused = false;

        document.addEventListener('visibilitychange', function() {
            if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
                const carouselInstance = bootstrap.Carousel.getInstance(carousel);
                if (carouselInstance) {
                    if (document.hidden) {
                        carouselInstance.pause();
                        autoPlayPaused = true;
                    } else if (autoPlayPaused) {
                        carouselInstance.cycle();
                        autoPlayPaused = false;
                    }
                }
            }
        });

        // Optimize performance by reducing transitions when not visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target === carousel) {
                    if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
                        const carouselInstance = bootstrap.Carousel.getInstance(carousel);
                        if (carouselInstance) {
                            if (entry.isIntersecting) {
                                carouselInstance.cycle();
                            } else {
                                carouselInstance.pause();
                            }
                        }
                    }
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(carousel);
    }
});

document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = icon.getAttribute('aria-label');
        const url = {
            'Facebook': 'https://facebook.com/hotelroyale',
            'Instagram': 'https://instagram.com/hotelroyale',
            'Twitter': 'https://twitter.com/hotelroyale'
        }[platform];
        if (url) window.open(url, '_blank');
    });
});