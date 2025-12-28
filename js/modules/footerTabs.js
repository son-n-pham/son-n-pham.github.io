export const initFooterTabs = () => {
    const tabs = document.querySelectorAll('.footer-tab');
    const sections = document.querySelectorAll('.footer__section');
    const footerContent = document.querySelector('.footer__content');
    
    // If no tabs found (e.g. not generated), do nothing
    if (!tabs.length) return;

    const targets = ['weather', 'music', 'timezone'];

    const switchTab = (targetId) => {
        // Update Tabs
        tabs.forEach(tab => {
            if (tab.dataset.target === targetId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Update Sections
        sections.forEach(sec => {
            if (sec.id === `footer-${targetId}`) {
                sec.classList.add('active');
            } else {
                sec.classList.remove('active');
            }
        });
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.target);
        });
    });

    // Swipe Support for Footer
    let touchStartX = 0;
    let touchEndX = 0;
    
    footerContent.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    footerContent.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleFooterSwipe();
    }, { passive: true });

    const handleFooterSwipe = () => {
        if (window.innerWidth > 768) return; // Disable on desktop
        
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            // Find current active index
            let currentIndex = -1;
             tabs.forEach((tab, index) => {
                if (tab.classList.contains('active')) currentIndex = index;
            });
            
            if (currentIndex === -1) currentIndex = 0; // Default fallback

            if (diff > 0) { // Swipe Left -> Next
                const nextIndex = (currentIndex + 1) % targets.length;
                switchTab(targets[nextIndex]);
            } else { // Swipe Right -> Prev
                const prevIndex = (currentIndex - 1 + targets.length) % targets.length;
                switchTab(targets[prevIndex]);
            }
        }
    }
};
