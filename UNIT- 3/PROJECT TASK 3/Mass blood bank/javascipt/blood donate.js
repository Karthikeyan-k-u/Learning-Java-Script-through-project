// File: /Mass blood bank/js/blood donation.js

document.addEventListener('DOMContentLoaded', function() {
    // ==================== USER DROPDOWN MENU ====================
    const userMenu = document.querySelector('.user-menu');
    const userAvatar = document.querySelector('.user-avatar');
    const dropdownContent = document.querySelector('.dropdown-content');

    // Toggle dropdown on avatar click
    if (userAvatar && dropdownContent) {
        userAvatar.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent navigation to login page
            event.stopPropagation(); // Prevent immediate closing by window click
            dropdownContent.classList.toggle('show');
        });
    }

    // Close dropdown when clicking outside
    window.addEventListener('click', function(event) {
        if (userMenu && !userMenu.contains(event.target)) {
            dropdownContent.classList.remove('show');
        }
    });

    // Prevent dropdown from closing when clicking inside it
    if (dropdownContent) {
        dropdownContent.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }

    // ==================== MOBILE MENU (optional) ====================
    // If you decide to add a hamburger button later, uncomment and adapt
    /*
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.classList.add('mobile-menu-toggle');
    mobileMenuToggle.innerHTML = '☰';
    document.querySelector('.header-container').prepend(mobileMenuToggle);

    const navLinks = document.querySelectorAll('.header-container > a');
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.forEach(link => link.classList.toggle('mobile-show'));
    });
    */

    // ==================== SMOOTH SCROLL FOR ANCHOR LINKS (if any) ====================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==================== VIDEO PAUSE WHEN OUT OF VIEW (optional) ====================
    const video = document.querySelector('video');
    if (video) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && !video.paused) {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });
        observer.observe(video);
    }
});