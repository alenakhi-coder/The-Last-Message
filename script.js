
// =========================================================
// THE LAST MESSAGE — script.js
// =========================================================

// ---- Service Worker (PWA) ----
// FIX: safer registration with proper error handling to prevent PWA freeze
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/serviceworker.js')
            .then(function (reg) {
                // Service worker registered successfully
                console.log('SW registered:', reg.scope);
            })
            .catch(function (err) {
                // Fail silently — page still works without SW
                console.log('SW registration skipped:', err.message);
            });
    });
}

// ---- Zoom detection (no body overflow changes) ----
(function () {
    var vv = window.visualViewport;
    if (!vv) return;
    var timer = null;

    function checkZoom() {
        var scale = vv.scale;
        document.body.classList.toggle('zoom-extreme', scale > 2.5 || scale < 0.9);
    }

    vv.addEventListener('resize', function () {
        clearTimeout(timer);
        timer = setTimeout(checkZoom, 80);
    });
})();

// ---- Body reveal ----
// FIX: reveal as early as possible to prevent "frozen" appearance
function revealBody() {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
}

// Reveal on DOMContentLoaded first (fastest)
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(revealBody, 60);
});

// Additional safety nets
window.addEventListener('load',              function () { setTimeout(revealBody, 80); });
window.addEventListener('pageshow',          function (e) { if (e.persisted) revealBody(); });
document.addEventListener('visibilitychange', function () { if (!document.hidden) revealBody(); });
window.addEventListener('focus', revealBody);
window.addEventListener('orientationchange', function () { setTimeout(revealBody, 150); });

// Final fallback — if nothing fires, reveal after 1.5s
setTimeout(revealBody, 1500);

// ---- Navbar scroll style ----
var navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ---- Navbar mobile toggle ----
var navToggle = document.getElementById('navToggle');
var navLinks  = document.getElementById('navLinks');

function closeNav() {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
}

navToggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close nav when any link is clicked
document.querySelectorAll('.nav-link-item').forEach(function (link) {
    link.addEventListener('click', closeNav);
});

// Close nav when clicking outside
document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target)) closeNav();
});

// Close nav on resize to desktop
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) closeNav();
});

// ---- FAQ accordion ----
document.querySelectorAll('.faq-item').forEach(function (item) {
    item.querySelector('.faq-question').addEventListener('click', function () {
        var wasActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(function (f) {
            f.classList.remove('active');
        });
        if (!wasActive) item.classList.add('active');
    });
});

// ---- Fade-in on scroll (IntersectionObserver) ----
var fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

function registerFadeIns() {
    document.querySelectorAll('.fade-in').forEach(function (el) {
        fadeObserver.observe(el);
    });
}

if ('requestIdleCallback' in window) {
    requestIdleCallback(registerFadeIns);
} else {
    setTimeout(registerFadeIns, 200);
}

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href && href.length > 1) {
            e.preventDefault();
            var target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ---- Hero content fade on scroll + scroll indicator ----
window.addEventListener('scroll', function () {
    var hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.opacity = Math.max(0, 1 - window.pageYOffset / 600);
    }

    var indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
        indicator.style.opacity = window.scrollY > 100 ? '0' : '1';
    }
}, { passive: true });

// ---- Cursor gold dust trail (desktop only, throttled) ----
var trailPending = false;
var dotCount     = 0;
var MAX_DOTS     = 12;

document.addEventListener('mousemove', function (e) {
    if (window.innerWidth <= 768) return;
    if (trailPending || dotCount >= MAX_DOTS) return;

    trailPending = true;
    requestAnimationFrame(function () {
        trailPending = false;

        var dot = document.createElement('div');
        dot.style.cssText =
            'position:fixed;width:4px;height:4px;border-radius:50%;' +
            'background:rgba(201,168,76,0.32);left:' + e.clientX + 'px;top:' + e.clientY + 'px;' +
            'pointer-events:none;z-index:9999;transition:opacity 0.5s ease,transform 0.5s ease;';

        document.body.appendChild(dot);
        dotCount++;

        requestAnimationFrame(function () {
            dot.style.opacity = '0';
            dot.style.transform = 'scale(3)';
        });

        setTimeout(function () {
            if (dot.parentNode) dot.parentNode.removeChild(dot);
            dotCount--;
        }, 520);
    });
});

// ---- Background slideshow ----
(function () {
    var slides   = Array.from(document.querySelectorAll('.bg-slide'));
    var loaded   = slides.map(function (_, i) { return i === 0; });
    var sections = ['home', 'trailer', 'story', 'faq', 'community', 'team'];
    var offsets  = [];
    var current  = 0;

    // Load a slide's background image
    function loadSlide(idx) {
        if (loaded[idx]) return;
        loaded[idx] = true;

        var bg = slides[idx].getAttribute('data-bg');
        if (!bg) return;

        var img = new Image();
        img.onload  = function () { slides[idx].style.backgroundImage = "url('" + bg + "')"; };
        img.onerror = function () {};
        img.src = bg;
    }

    // Preload all slides when the browser is idle
    function preloadAll() {
        slides.forEach(function (_, i) { if (i > 0) loadSlide(i); });
    }

    if ('requestIdleCallback' in window) {
        requestIdleCallback(preloadAll, { timeout: 3000 });
    } else {
        setTimeout(preloadAll, 1200);
    }

    // Calculate section offsets
    function buildOffsets() {
        offsets = sections
            .map(function (id) { return document.getElementById(id); })
            .filter(Boolean)
            .map(function (el) { return el.getBoundingClientRect().top + window.scrollY; });
    }

    // Determine which slide to show based on scroll position
    function indexFor() {
        var trigger = window.scrollY + window.innerHeight * 0.3;
        var idx = 0;
        offsets.forEach(function (top, i) {
            if (trigger >= top) {
                idx = Math.min(Math.floor(i * slides.length / sections.length), slides.length - 1);
            }
        });
        return idx;
    }

    // Switch to correct slide
    function update() {
        var next = indexFor();
        if (next === current) return;

        loadSlide(next);
        current = next;
        slides.forEach(function (s, i) {
            s.classList.toggle('active', i === next);
        });
    }

    slides[0].classList.add('active');

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', function () { buildOffsets(); update(); });
    window.addEventListener('load',   function () { buildOffsets(); update(); });
})();

// ---- Codex overlay ----
function openCodex() {
    var overlay = document.getElementById('codexOverlay');
    overlay.classList.add('open');
    overlay.scrollTop = 0;
}

function closeCodex() {
    document.getElementById('codexOverlay').classList.remove('open');
}

document.getElementById('codexOverlay').addEventListener('click', function (e) {
    if (e.target === this) closeCodex();
});

// ---- Devlogs overlay ----
function openDevlogs() {
    var overlay = document.getElementById('devlogsOverlay');
    overlay.classList.add('open');
    overlay.scrollTop = 0;
}

function closeDevlogs() {
    document.getElementById('devlogsOverlay').classList.remove('open');
}

document.getElementById('devlogsOverlay').addEventListener('click', function (e) {
    if (e.target === this) closeDevlogs();
});

// Close overlays with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeCodex();
        closeDevlogs();
    }
});

// ---- Home screen PWA popup ----
function dismissHsPopup() {
    var popup = document.getElementById('hsPopup');
    if (!popup) return;
    popup.style.transition = 'bottom 0.45s cubic-bezier(0.4, 0, 1, 1)';
    popup.classList.remove('show');

    // Remember dismissal so it doesn't show again this session
    try { sessionStorage.setItem('hs_dismissed', '1'); } catch (e) {}
}

(function () {
    // Don't show if dismissed this session
    try { if (sessionStorage.getItem('hs_dismissed')) return; } catch (e) {}

    var ua       = navigator.userAgent;
    var platform = null;

    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) platform = 'ios';
    else if (/Android/.test(ua))                          platform = 'android';

    // Only show on mobile and only if not already installed as PWA
    if (!platform) return;
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) return;
    if (window.navigator.standalone === true) return;

    var popup   = document.getElementById('hsPopup');
    var stepsEl = document.getElementById('hsSteps');
    var descEl  = document.getElementById('hsDesc');
    if (!popup) return;

    if (platform === 'ios') {
        if (descEl)  descEl.textContent = 'Install The Last Message for fast, instant access right from your home screen.';
        if (stepsEl) stepsEl.innerHTML  =
            '<strong>How to install on iOS:</strong><br>' +
            '1. Tap the <strong>Share</strong> button in Safari<br>' +
            '2. Scroll down and tap <strong>"Add to Home Screen"</strong><br>' +
            '3. Tap <strong>Add</strong> to confirm';
    } else {
        if (descEl)  descEl.textContent = 'Install The Last Message for fast, instant access right from your home screen.';
        if (stepsEl) stepsEl.innerHTML  =
            '<strong>How to install on Android:</strong><br>' +
            '1. Tap the <strong>Menu</strong> in Chrome<br>' +
            '2. Tap <strong>"Add to Home screen"</strong><br>' +
            '3. Tap <strong>Add</strong> to confirm';
    }

    // Show popup after a short delay
    setTimeout(function () {
        if (popup) popup.classList.add('show');
    }, 3000);
})();

// ---- Scroll progress bar ----
(function () {
    var bar     = document.getElementById('scrollProgressBar');
    if (!bar) return;
    var ticking = false;

    function updateBar() {
        var h   = document.documentElement;
        var max = (h.scrollHeight - h.clientHeight) || 1;
        var pct = Math.min(100, Math.max(0, (h.scrollTop / max) * 100));
        bar.style.width = pct + '%';
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(updateBar);
            ticking = true;
        }
    }, { passive: true });

    updateBar();
})();

// ---- Archive rail — arrow buttons & drag to scroll ----
(function () {
    // Arrow button navigation
    document.querySelectorAll('.ac-rail-prev, .ac-rail-next').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var track = document.getElementById(btn.dataset.target);
            if (!track) return;

            var firstTile = track.querySelector('.ac-tile');
            var step = firstTile
                ? firstTile.getBoundingClientRect().width + 20
                : track.clientWidth * 0.8;

            track.scrollBy({
                left: btn.classList.contains('ac-rail-next') ? step : -step,
                behavior: 'smooth'
            });
        });
    });

    // Mouse drag to scroll for every rail track
    document.querySelectorAll('.ac-rail-track').forEach(function (track) {
        var isDown   = false;
        var startX   = 0;
        var startLeft = 0;
        var moved    = 0;

        track.addEventListener('mousedown', function (e) {
            isDown    = true;
            moved     = 0;
            startX    = e.pageX;
            startLeft = track.scrollLeft;
            track.classList.add('is-dragging');
        });

        window.addEventListener('mouseup', function () {
            isDown = false;
            track.classList.remove('is-dragging');
        });

        window.addEventListener('mousemove', function (e) {
            if (!isDown) return;
            // Only use e.preventDefault when actively dragging the rail
            // to avoid blocking other page scroll behavior
            var dx = e.pageX - startX;
            moved = Math.max(moved, Math.abs(dx));
            track.scrollLeft = startLeft - dx;
        });

        // Prevent click-through after dragging
        track.addEventListener('click', function (e) {
            if (moved > 6) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
    });
})();

// ---- HUD side nav — highlight active section ----
(function () {
    var dots = document.querySelectorAll('nav.ac-hud a');
    if (!dots.length) return;

    var ids      = Array.prototype.map.call(dots, function (a) { return a.getAttribute('href').slice(1); });
    var sections = ids.map(function (id) { return document.getElementById(id); }).filter(Boolean);

    function highlightActive() {
        var y       = window.scrollY + window.innerHeight * 0.35;
        var current = sections[0];

        for (var i = 0; i < sections.length; i++) {
            if (sections[i] && sections[i].offsetTop <= y) {
                current = sections[i];
            }
        }

        dots.forEach(function (dot) {
            dot.classList.toggle('active', dot.getAttribute('href') === '#' + (current && current.id));
        });
    }

    window.addEventListener('scroll', highlightActive, { passive: true });
    window.addEventListener('resize', highlightActive);
    highlightActive();
})();

