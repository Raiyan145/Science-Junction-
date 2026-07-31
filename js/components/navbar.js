// js/components/navbar.js
export function initNavbar() {
    const header = document.getElementById('site-header');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow/background if not at top
        if (currentScroll > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Smart hide/show based on scroll direction
        if (currentScroll > scrollThreshold) {
            if (currentScroll > lastScroll && !header.classList.contains('nav-hidden')) {
                // Scrolling down - hide header
                header.classList.add('nav-hidden');
            } else if (currentScroll < lastScroll && header.classList.contains('nav-hidden')) {
                // Scrolling up - show header
                header.classList.remove('nav-hidden');
            }
        }
        
        lastScroll = currentScroll;
    }, { passive: true }); // Passive listener for better scroll performance
}
