// Loading screen
(function () {
    var loader    = document.getElementById('page-loader');
    var loaderBar = document.getElementById('loaderBar');
    var loaderTxt = document.getElementById('loaderText');
    var dismissed = false;

    var messages = ['Loading ...', 'Preparing history...', 'Almost ready...'];
    var msgIdx   = 0;
    var msgTimer = setInterval(function () {
        msgIdx = (msgIdx + 1) % messages.length;
        if (loaderTxt) loaderTxt.textContent = messages[msgIdx];
    }, 900);

    function animateBar(to, duration) {
        var start = null;
        var from  = parseFloat(loaderBar.style.width) || 0;
        function step(ts) {
            if (!start) start = ts;
            var pct = Math.min((ts - start) / duration, 1);
            loaderBar.style.width = (from + (to - from) * pct) + '%';
            if (pct < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    animateBar(40, 400);

    function hideLoader() {
        if (dismissed) return;
        dismissed = true;
        clearInterval(msgTimer);
        animateBar(100, 250);
        setTimeout(function () {
            if (loader) {
                loader.classList.add('hidden');
                setTimeout(function () {
                    if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
                }, 600);
            }
            document.body.classList.add('ready');
        }, 300);
    }

    if (document.readyState === 'complete') {
        animateBar(90, 300);
        setTimeout(hideLoader, 200);
    } else {
        window.addEventListener('load', function () {
            animateBar(90, 300);
            setTimeout(hideLoader, 200);
        });
    }

    var heroImg = document.querySelector('.hero-logo-img');
    if (heroImg) {
        if (heroImg.complete) {
            animateBar(70, 200);
        } else {
            heroImg.addEventListener('load',  function () { animateBar(70, 200); });
            heroImg.addEventListener('error', function () { animateBar(70, 200); });
        }
    }

    // Fallback kill switch
    setTimeout(hideLoader, 4000);
})();


// Zoom detection (for navbar blur fix on extreme zoom)
(function () {
    var vv = window.visualViewport;
    if (!vv) return;
    var timer;
    vv.addEventListener('resize', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            document.body.classList.toggle('zoom-extreme', vv.scale > 2.5 || vv.scale < 0.9);
        }, 80);
    });
})();


// Navbar scroll style
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });


// Navbar mobile menu
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

document.querySelectorAll('.nav-link-item').forEach(function (link) {
    link.addEventListener('click', closeNav);
});

document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target)) closeNav();
});

window.addEventListener('resize', function () {
    if (window.innerWidth > 768) closeNav();
});


// FAQ accordion
document.querySelectorAll('.faq-item').forEach(function (item) {
    item.querySelector('.faq-question').addEventListener('click', function () {
        var wasActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(function (f) { f.classList.remove('active'); });
        if (!wasActive) item.classList.add('active');
    });
});


// Fade-in on scroll
var fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

function registerFadeIns() {
    document.querySelectorAll('.fade-in').forEach(function (el) { fadeObserver.observe(el); });
}

if ('requestIdleCallback' in window) requestIdleCallback(registerFadeIns);
else setTimeout(registerFadeIns, 200);


// Smooth scroll for anchor links
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


// Hero fade + scroll indicator hide
window.addEventListener('scroll', function () {
    var hero = document.querySelector('.hero-content');
    if (hero) hero.style.opacity = Math.max(0, 1 - window.pageYOffset / 600);
    var indicator = document.querySelector('.scroll-indicator');
    if (indicator) indicator.style.opacity = window.scrollY > 100 ? '0' : '1';
}, { passive: true });


// Gold dust cursor trail (desktop only)
var trailPending = false;
var dotCount = 0;
var MAX_DOTS = 12;

document.addEventListener('mousemove', function (e) {
    if (window.innerWidth <= 768 || trailPending || dotCount >= MAX_DOTS) return;
    trailPending = true;
    requestAnimationFrame(function () {
        trailPending = false;
        var dot = document.createElement('div');
        dot.style.cssText = 'position:fixed;width:4px;height:4px;border-radius:50%;background:rgba(201,168,76,0.32);left:' + e.clientX + 'px;top:' + e.clientY + 'px;pointer-events:none;z-index:9999;transition:opacity 0.5s ease,transform 0.5s ease;';
        document.body.appendChild(dot);
        dotCount++;
        requestAnimationFrame(function () { dot.style.opacity = '0'; dot.style.transform = 'scale(3)'; });
        setTimeout(function () { if (dot.parentNode) dot.parentNode.removeChild(dot); dotCount--; }, 520);
    });
});


// Background slideshow
(function () {
    var slides   = Array.from(document.querySelectorAll('.bg-slide'));
    var loaded   = slides.map(function (_, i) { return i === 0; });
    var sections = ['home', 'trailer', 'story', 'faq', 'community', 'team'];
    var offsets  = [];
    var current  = 0;

    function loadSlide(idx) {
        if (loaded[idx]) return;
        loaded[idx] = true;
        var bg = slides[idx].getAttribute('data-bg');
        if (!bg) return;
        var img = new Image();
        img.onload = function () { slides[idx].style.backgroundImage = "url('" + bg + "')"; };
        img.src = bg;
    }

    function preloadAll() { slides.forEach(function (_, i) { if (i > 0) loadSlide(i); }); }
    if ('requestIdleCallback' in window) requestIdleCallback(preloadAll, { timeout: 3000 });
    else setTimeout(preloadAll, 1200);

    function buildOffsets() {
        offsets = sections
            .map(function (id) { return document.getElementById(id); })
            .filter(Boolean)
            .map(function (el) { return el.getBoundingClientRect().top + window.scrollY; });
    }

    function indexFor() {
        var trigger = window.scrollY + window.innerHeight * 0.3;
        var idx = 0;
        offsets.forEach(function (top, i) {
            if (trigger >= top) idx = Math.min(Math.floor(i * slides.length / sections.length), slides.length - 1);
        });
        return idx;
    }

    function update() {
        var next = indexFor();
        if (next === current) return;
        loadSlide(next);
        current = next;
        slides.forEach(function (s, i) { s.classList.toggle('active', i === next); });
    }

    slides[0].classList.add('active');
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', function () { buildOffsets(); update(); });
    window.addEventListener('load',   function () { buildOffsets(); update(); });
})();


// Codex overlay open/close
function openCodex() {
    var o = document.getElementById('codexOverlay');
    o.classList.add('open');
    o.scrollTop = 0;
}
function closeCodex() {
    document.getElementById('codexOverlay').classList.remove('open');
}
document.getElementById('codexOverlay').addEventListener('click', function (e) {
    if (e.target === this) closeCodex();
});


// Devlogs overlay open/close
function openDevlogs() {
    var o = document.getElementById('devlogsOverlay');
    o.classList.add('open');
    o.scrollTop = 0;
}
function closeDevlogs() {
    document.getElementById('devlogsOverlay').classList.remove('open');
}
document.getElementById('devlogsOverlay').addEventListener('click', function (e) {
    if (e.target === this) closeDevlogs();
});

// Escape key closes any open overlay
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeCodex(); closeDevlogs(); }
});


// Scroll progress bar
(function () {
    var bar = document.getElementById('scrollProgressBar');
    if (!bar) return;
    var ticking = false;
    function update() {
        var h = document.documentElement;
        var pct = (h.scrollTop / ((h.scrollHeight - h.clientHeight) || 1)) * 100;
        bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
        ticking = false;
    }
    window.addEventListener('scroll', function () {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
})();


// Archive rail — arrow buttons + drag to scroll
(function () {
    // Arrow buttons
    document.querySelectorAll('.ac-rail-prev, .ac-rail-next').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var track = document.getElementById(btn.dataset.target);
            if (!track) return;
            var first = track.querySelector('.ac-tile');
            var step  = first ? first.getBoundingClientRect().width + 20 : track.clientWidth * 0.8;
            track.scrollBy({ left: btn.classList.contains('ac-rail-next') ? step : -step, behavior: 'smooth' });
        });
    });

    // Drag to scroll
    document.querySelectorAll('.ac-rail-track').forEach(function (track) {
        var isDown   = false;
        var startX   = 0;
        var startLeft = 0;
        var moved    = 0;
        var THRESHOLD = 8;

        track.addEventListener('mousedown', function (e) {
            if (e.button !== 0) return;
            isDown    = true;
            moved     = 0;
            startX    = e.pageX;
            startLeft = track.scrollLeft;
            track.classList.add('is-dragging');
            e.preventDefault();
        });

        window.addEventListener('mousemove', function (e) {
            if (!isDown) return;
            var dx = e.pageX - startX;
            moved = Math.abs(dx);
            track.scrollLeft = startLeft - dx;
        }, { passive: true });

        window.addEventListener('mouseup', function () {
            isDown = false;
            track.classList.remove('is-dragging');
        });

        track.addEventListener('click', function (e) {
            if (moved > THRESHOLD) {
                e.preventDefault();
                e.stopPropagation();
            }
            moved = 0;
        }, true);
    });
})();


// HUD side nav — highlight active section
(function () {
    var dots = document.querySelectorAll('nav.ac-hud a');
    if (!dots.length) return;

    var ids = Array.prototype.map.call(dots, function (a) { return a.getAttribute('href').slice(1); });
    var sections = ids.map(function (id) { return document.getElementById(id); }).filter(Boolean);

    function highlight() {
        var y = window.scrollY + window.innerHeight * 0.35;
        var current = sections[0];
        for (var i = 0; i < sections.length; i++) {
            if (sections[i] && sections[i].offsetTop <= y) current = sections[i];
        }
        dots.forEach(function (d) {
            d.classList.toggle('active', d.getAttribute('href') === '#' + (current && current.id));
        });
    }

    window.addEventListener('scroll', highlight, { passive: true });
    window.addEventListener('resize', highlight);
    highlight();
})();
