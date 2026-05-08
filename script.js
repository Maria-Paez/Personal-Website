// Futuristic Game Menu Interface - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const mainContainer = document.querySelector('.main-container');
    const contentSections = document.querySelector('.content-sections');
    const menuItems = document.querySelectorAll('.menu-item');
    const backToMenuBtn = document.querySelector('.back-to-menu');
    const menuVideo = document.querySelector('.background-video-menu');
    const sectionsVideo = document.querySelector('.background-video-sections');

    function crossfadeVideos(progress) {
        if (menuVideo) menuVideo.classList.add('active');
        if (sectionsVideo) sectionsVideo.classList.add('active');
        if (menuVideo) menuVideo.style.opacity = 1 - progress;
        if (sectionsVideo) sectionsVideo.style.opacity = progress;
    }

    function updateVideoOnScroll() {
        if (!contentSections) return;
        const rect = contentSections.getBoundingClientRect();
        const progress = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight * 0.8), 0), 1);
        crossfadeVideos(progress);
    }

    function updateBackToMenu() {
        if (!backToMenuBtn || !mainContainer) return;
        const visible = window.scrollY > mainContainer.offsetHeight * 0.25;
        backToMenuBtn.classList.toggle('visible', visible);
    }

    if (backToMenuBtn) {
        backToMenuBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    window.addEventListener('scroll', function() {
        updateVideoOnScroll();
        updateBackToMenu();
    });
    window.addEventListener('resize', function() {
        updateVideoOnScroll();
        updateBackToMenu();
    });
    updateVideoOnScroll();
    updateBackToMenu();

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            if (name && email && message) {
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }


    const holoElements = document.querySelectorAll('.hologram, .hud-box, .geometric-shape');
    holoElements.forEach(el => {
        el.addEventListener('mouseenter', function() { this.style.filter = 'brightness(1.2)'; });
        el.addEventListener('mouseleave', function() { this.style.filter = 'brightness(1)'; });
    });

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    document.querySelectorAll('.edu-card, .exp-card, .act-card, .award-card, .portfolio-card, .blog-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    animateTitles();
});

function animateTitles() {
    const title = document.querySelector('.main-title');
    if (!title) return;
    const text = title.textContent;
    title.textContent = '';
    title.style.animation = 'none';
    let index = 0;
    const interval = setInterval(() => {
        if (index < text.length) {
            title.textContent += text[index];
            index++;
        } else {
            clearInterval(interval);
            title.style.animation = 'titleGlow 3s ease-in-out infinite';
        }
    }, 50);
}

document.addEventListener('mousemove', function(e) {
    const glow = document.createElement('div');
    glow.style.position = 'fixed';
    glow.style.width = '20px';
    glow.style.height = '20px';
    glow.style.borderRadius = '50%';
    glow.style.background = 'radial-gradient(circle, rgba(0,212,255,0.5) 0%, transparent 70%)';
    glow.style.pointerEvents = 'none';
    glow.style.left = e.clientX - 10 + 'px';
    glow.style.top = e.clientY - 10 + 'px';
    glow.style.zIndex = '-1';
    glow.style.animation = 'fadeOut 0.5s ease forwards';
    document.body.appendChild(glow);
    setTimeout(() => glow.remove(), 500);
});

const styleTag = document.createElement('style');
styleTag.textContent = `@keyframes fadeOut { 0% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(0); } }`;
document.head.appendChild(styleTag);
