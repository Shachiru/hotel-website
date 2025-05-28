class LuxuryGallerySlideshow {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.gallery-slide');
        this.thumbnails = document.querySelectorAll('.gallery-thumb');
        this.totalSlides = this.slides.length;
        this.isPlaying = true;
        this.autoPlayInterval = null;
        this.progressBar = document.getElementById('galleryProgress');

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startAutoPlay();
        this.updateProgress();
    }

    setupEventListeners() {
        document.getElementById('prevBtn').addEventListener('click', () => this.prevSlide());
        document.getElementById('nextBtn').addEventListener('click', () => this.nextSlide());

        this.thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => this.goToSlide(index));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key === ' ') {
                e.preventDefault();
                this.toggleAutoPlay();
            }
        });

        let startX = 0;
        let endX = 0;

        document.querySelector('.gallery-slideshow').addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        document.querySelector('.gallery-slideshow').addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });

        document.querySelector('.gallery-slideshow').addEventListener('mouseenter', () => {
            if (this.isPlaying) this.pauseAutoPlay();
        });

        document.querySelector('.gallery-slideshow').addEventListener('mouseleave', () => {
            if (this.isPlaying) this.startAutoPlay();
        });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }

    goToSlide(index) {
        // Remove active class from current slide and thumbnail
        this.slides[this.currentSlide].classList.remove('active');
        this.thumbnails[this.currentSlide].classList.remove('active');

        this.currentSlide = index;

        this.slides[this.currentSlide].classList.add('active');
        this.thumbnails[this.currentSlide].classList.add('active');

        this.updateProgress();

        if (this.isPlaying) {
            this.resetAutoPlay();
        }
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resetAutoPlay() {
        this.pauseAutoPlay();
        this.startAutoPlay();
    }

    toggleAutoPlay() {
        this.isPlaying = !this.isPlaying;

        if (this.isPlaying) {
            this.startAutoPlay();
        } else {
            this.pauseAutoPlay();
        }
    }

    updateProgress() {
        const progressWidth = ((this.currentSlide + 1) / this.totalSlides) * 100;
        this.progressBar.style.width = `${progressWidth}%`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new LuxuryGallerySlideshow();
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.target.id === 'gallery') {
            if (entry.isIntersecting) {
                // Gallery is visible, ensure auto-play is active
                console.log('Gallery section is visible');
            } else {
                // Gallery is not visible, could pause for performance
                console.log('Gallery section is not visible');
            }
        }
    });
}, {
    threshold: 0.1
});

document.addEventListener('DOMContentLoaded', function () {
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
        observer.observe(gallerySection);
    }
});