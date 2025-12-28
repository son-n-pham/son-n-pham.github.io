export function init() {
    const scrollContainer = document.querySelector('.expertise-scroll');
    const cards = document.querySelectorAll('.expertise-card');

    if (!scrollContainer || cards.length === 0) return;

    const observerOptions = {
        root: scrollContainer,
        rootMargin: '0px -25% 0px -25%', // Trigger when element is in the center 50%
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
        card.addEventListener('click', () => {
             card.classList.toggle('flipped');
        });
    });
}

