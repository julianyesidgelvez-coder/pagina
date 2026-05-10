/**
 * FUCOVI — Main JavaScript
 * Handles: scroll snapping, intersection observer animations,
 * counter animations, progress bar, and keyboard navigation.
 */

(function() {
    'use strict';

    // ============================================================
    // DOM Elements
    // ============================================================
    const sections = document.querySelectorAll('.section');
    const navDots = document.querySelectorAll('.nav-dot');
    const progressBar = document.querySelector('.progress-bar');
    const statNumbers = document.querySelectorAll('.stat-number');

    // ============================================================
    // Intersection Observer for Section Animations
    // ============================================================
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                updateActiveNav(entry.target.id);
                animateCountersIfVisible(entry.target);
            }
        });
    }, {
        threshold: 0.35,
        rootMargin: '0px 0px -10% 0px'
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ============================================================
    // Navigation Dots and Top Tabs Active State
    // ============================================================
    const topNavTabs = document.querySelectorAll('.top-nav-tab');

    function updateActiveNav(sectionId) {
        navDots.forEach(dot => {
            dot.classList.toggle('active', dot.dataset.section === sectionId);
        });
        topNavTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.section === sectionId);
        });
    }

    // ============================================================
    // Progress Bar
    // ============================================================
    function updateProgressBar() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateProgressBar();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // ============================================================
    // Animated Counters
    // ============================================================
    const animatedCounters = new Set();

    function animateCountersIfVisible(section) {
        const counters = section.querySelectorAll('.stat-number[data-target]');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target, 10);
            if (animatedCounters.has(counter)) return;
            animatedCounters.add(counter);
            animateCounter(counter, target, 1500);
        });
    }

    function animateCounter(element, target, duration) {
        const startTime = performance.now();
        const startValue = 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutQuart(progress);
            const current = Math.round(startValue + (target - startValue) * eased);
            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    function easeOutQuart(x) {
        return 1 - Math.pow(1 - x, 4);
    }

    // ============================================================
    // Keyboard Navigation (Arrow keys)
    // ============================================================
    const sectionIds = Array.from(sections).map(s => s.id);

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;

        const scrollPos = window.scrollY + window.innerHeight / 2;
        let currentIndex = 0;

        for (let i = 0; i < sections.length; i++) {
            const rect = sections[i].getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            if (sectionCenter >= 0) {
                currentIndex = i;
                break;
            }
        }

        let nextIndex = currentIndex;
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            nextIndex = currentIndex + 1;
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            nextIndex = currentIndex - 1;
        }

        if (nextIndex !== currentIndex) {
            e.preventDefault();
            sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
        }
    });

    // ============================================================
    // Smooth scroll for nav dots and scroll indicator
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ============================================================
    // Parallax effect for hero circuit lines (subtle)
    // ============================================================
    const heroSection = document.querySelector('.section-hero');
    const circuitLines = document.querySelector('.circuit-lines');

    if (heroSection && circuitLines && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', () => {
            const rect = heroSection.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
                const offset = window.scrollY * 0.15;
                circuitLines.style.transform = `translateY(${offset}px)`;
            }
        }, { passive: true });
    }

    // ============================================================
    // Initialize first section as visible on load
    // ============================================================
    const firstSection = document.querySelector('.section');
    if (firstSection) {
        const rect = firstSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            firstSection.classList.add('visible');
            updateActiveNav(firstSection.id);
        }
    }

    // ============================================================
    // Subtle cursor glow (desktop only)
    // ============================================================
    if (!window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const glow = document.createElement('div');
        glow.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,0.03)0%,transparent70%);transform:translate(-50%,-50%);transition:opacity 0.3s;opacity:0;';
        document.body.appendChild(glow);

        let glowX = 0, glowY = 0, mouseX = -999, mouseY = -999;
        let glowActive = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            glow.style.opacity = '1';
            glowActive = true;
        });

        document.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
            glowActive = false;
        });

        function updateGlow() {
            if (glowActive) {
                glowX += (mouseX - glowX) * 0.08;
                glowY += (mouseY - glowY) * 0.08;
                glow.style.left = glowX + 'px';
                glow.style.top = glowY + 'px';
            }
            requestAnimationFrame(updateGlow);
        }
        requestAnimationFrame(updateGlow);
    }

    // ============================================================
    // Smooth section-aware scroll with wheel
    // ============================================================
    let isScrolling = false;
    let scrollTimeout;

    window.addEventListener('wheel', () => {
        isScrolling = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => { isScrolling = false; }, 150);
    }, { passive: true });

})();
