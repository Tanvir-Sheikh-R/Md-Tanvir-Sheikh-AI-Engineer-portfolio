/**
 * MD. Tanvir Sheikh - AI Engineer Portfolio
 * Interactivity Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    initAccordion();
    initMetricObserver();
    initRagVisualizer();
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

/**
 * 4. Interactive RAG / LangGraph Pipeline Node Simulator
 */
function initRagVisualizer() {
    const runBtn = document.getElementById('runRagBtn');
    const progressLine = document.getElementById('ragProgress');
    const logs = document.getElementById('ragLog');

    const nodes = {
        n1: document.getElementById('node1'),
        n2: document.getElementById('node2'),
        n3: document.getElementById('node3')
    };

    const labels = {
        l1: document.getElementById('nodeVal1'),
        l2: document.getElementById('nodeVal2'),
        l3: document.getElementById('nodeVal3')
    };

    if (!runBtn) return;

    let isRunning = false;

    runBtn.addEventListener('click', () => {
        if (isRunning) return;
        isRunning = true;
        runBtn.disabled = true;
        runBtn.innerText = "Processing...";

        // Reset visual state
        progressLine.style.height = "0%";
        Object.values(nodes).forEach(n => n.style.backgroundColor = '');
        Object.values(labels).forEach(l => {
            l.innerText = "Idle";
            l.style.color = "";
        });

        // Step 1: Query Router
        setTimeout(() => {
            nodes.n1.style.backgroundColor = 'rgba(37, 99, 235, 0.15)';
            nodes.n1.style.borderColor = 'var(--accent-color)';
            labels.l1.innerText = "Routing query...";
            labels.l1.style.color = "var(--accent-color)";
            logs.innerText = "Routing user query via semantic classifier graph edge...";
            progressLine.style.height = "16%";
        }, 300);

        // Step 2: Transition to Vector Db Ingestion
        setTimeout(() => {
            nodes.n1.style.backgroundColor = '';
            nodes.n1.style.borderColor = '';
            labels.l1.innerText = "Routed (RAG)";
            labels.l1.style.color = "#81C784";
            
            nodes.n2.style.backgroundColor = 'rgba(37, 99, 235, 0.15)';
            nodes.n2.style.borderColor = 'var(--accent-color)';
            labels.l2.innerText = "Searching vectors...";
            labels.l2.style.color = "var(--accent-color)";
            logs.innerText = "Ingesting ChromaDB persistent index with MMR vector embeddings...";
            progressLine.style.height = "50%";
        }, 1800);

        // Step 3: Transition to Verification Judge Evaluator
        setTimeout(() => {
            nodes.n2.style.backgroundColor = '';
            nodes.n2.style.borderColor = '';
            labels.l2.innerText = "Retrieved Context";
            labels.l2.style.color = "#81C784";
            
            nodes.n3.style.backgroundColor = 'rgba(37, 99, 235, 0.15)';
            nodes.n3.style.borderColor = 'var(--accent-color)';
            labels.l3.innerText = "Judging response...";
            labels.l3.style.color = "var(--accent-color)";
            logs.innerText = "Invoking LLM-as-Judge structured outputs evaluator validation...";
            progressLine.style.height = "84%";
        }, 3300);

        // Final Step: Complete response returned
        setTimeout(() => {
            nodes.n3.style.backgroundColor = '';
            nodes.n3.style.borderColor = '';
            labels.l3.innerText = "Verified & Passed";
            labels.l3.style.color = "#81C784";
            
            logs.innerText = "RAG flow validated successfully. Final tokens streamed to output.";
            progressLine.style.height = "100%";
            
            runBtn.disabled = false;
            runBtn.innerText = "Run Agent Flow";
            isRunning = false;
        }, 4800);
    });
}

/**
 * 5. Collapsible Project CV Bullet Points
 */
function initProjectCollapsible() {
    const expandBtns = document.querySelectorAll('.project-expand-btn');
    expandBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const target = document.getElementById(targetId);
            if (!target) return;
            
            const isActive = btn.classList.contains('active');
            
            if (isActive) {
                btn.classList.remove('active');
                target.style.maxHeight = null;
                btn.innerHTML = `View CV Details <i class="ph ph-caret-down"></i>`;
            } else {
                btn.classList.add('active');
                target.style.maxHeight = target.scrollHeight + 'px';
                // Adjust card/accordion height if nested (our cards are standalone, so this works perfectly)
                btn.innerHTML = `Hide CV Details <i class="ph ph-caret-up"></i>`;
            }
        });
    });
}
