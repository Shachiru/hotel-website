// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Smooth scrolling
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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    }
});

// Active nav link update
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

// Initialize Map
function initMap() {
    // Coordinates for a beautiful beachfront location (Miami Beach example)
    const hotelLocation = [25.7907, -80.1300];

    const map = L.map('map').setView(hotelLocation, 15);

    // Use a beautiful tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Custom hotel marker
    const hotelIcon = L.divIcon({
        className: 'custom-hotel-marker',
        html: `
            <div style="
                background: linear-gradient(135deg, #0C1F3F 0%, #5C8A89 100%);
                width: 45px;
                height: 45px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 5px 15px rgba(12, 31, 63, 0.4);
                border: 3px solid #D8C4A2;
            ">
                <span style="
                    transform: rotate(45deg);
                    color: #F8F7F3;
                    font-weight: bold;
                    font-size: 18px;
                ">🏨</span>
            </div>
        `,
        iconSize: [45, 45],
        iconAnchor: [22, 45],
        popupAnchor: [0, -45]
    });

    const marker = L.marker(hotelLocation, { icon: hotelIcon }).addTo(map);

    marker.bindPopup(`
        <div style="text-align: center; font-family: 'Playfair Display', serif;">
            <h5 style="color: #0C1F3F; margin-bottom: 10px; font-weight: 600;">Hotel Royale</h5>
            <p style="margin: 0; color: #5C8A89; font-weight: 500;">Luxury Beachside Escape</p>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #1E1E1E;">Click for directions</p>
        </div>
    `).openPopup();

    // Add a subtle animation effect
    setTimeout(() => {
        map.flyTo(hotelLocation, 16, {
            animate: true,
            duration: 2
        });
    }, 1000);

    // Add click event to marker for directions
    marker.on('click', function() {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${hotelLocation[0]},${hotelLocation[1]}`;
        window.open(url, '_blank');
    });
}

// Initialize map when the section comes into view
const mapSection = document.getElementById('map-section');
const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initMap();
            mapObserver.unobserve(entry.target);
        }
    });
});

mapObserver.observe(mapSection);

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Simple form validation and success message
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

// Add some interactive animations for room cards
document.querySelectorAll('.room-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});