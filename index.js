/**
 * MD. Tanvir Sheikh - AI Engineer Portfolio
 * Interactivity Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    initAccordion();
    initMetricObserver();
    initSmoothScrolling();
    initProjectCollapsible();
});

/**
 * 1. Smooth scrolling for anchors
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initProjectCollapsible() {
    document.querySelectorAll('.project-expand-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.getElementById(btn.dataset.target);
            if (!target) return;

            const isOpen = btn.classList.toggle('active');
            target.style.maxHeight = isOpen ? `${target.scrollHeight}px` : null;
            btn.innerHTML = isOpen
                ? 'Hide Details <i class="ph ph-caret-up"></i>'
                : 'View Details <i class="ph ph-caret-down"></i>';
        });
    });
}

/**
 * 2. FAQ Accordion Panels (V2 Layout)
 */
function initAccordion() {
    const faqItems = document.querySelectorAll('.faq-item-v2');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger-v2');
        const content = item.querySelector('.faq-content-v2');

        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Collapse all other FAQ items for a clean single-open accordion effect
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-content-v2').style.maxHeight = null;
                }
            });

            if (isActive) {
                item.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                item.classList.add('active');
                // Calculate dynamic content scrollHeight for smooth expand
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

/**
 * 3. Animate SVG Circular Progress Ring on Viewport Intersection
 */
function initMetricObserver() {
    const metricCircle = document.querySelector('.metric-progress-circle');
    
    if (!metricCircle) return;
    
    // Set initial stroke-dashoffset to hide circle
    metricCircle.style.strokeDashoffset = "377";
    metricCircle.style.transition = "stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)";

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate progress circle to 100% (offset 0)
                metricCircle.style.strokeDashoffset = "0";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.metric-circle-wrapper'));
}
