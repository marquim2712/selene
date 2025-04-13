document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const menuLinks = document.querySelectorAll('.nav a');

    function closeMenu() {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    // Toggle menu
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a link
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            closeMenu();
            
            // Smooth scroll to section after menu closes
            setTimeout(() => {
                const section = document.querySelector(href);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });

    // Prevent clicks inside nav from closing the menu
    nav.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Close menu on resize (if switching to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // Close menu on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        if (Math.abs(currentScroll - lastScroll) > 50) {
            closeMenu();
        }
        lastScroll = currentScroll;
    });
}); 