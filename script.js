// service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/serviceworker.js').catch(function () {});
    });
}

// zoom detection
(function () {
    var vv = window.visualViewport;
    if (!vv) return;
    var timer = null;
    function check() {
        var s = vv.scale;
        document.body.classList.toggle('zoom-extreme', s > 2.5 || s < 0.9);
    }
    vv.addEventListener('resize', function () {
        clearTimeout(timer);
        timer = setTimeout(check, 80);
    });
})();

// body reveal
function revealBody() {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity   = '1';
}
window.addEventListener('load',             function () { setTimeout(revealBody, 80); });
window.addEventListener('pageshow',         function (e) { if (e.persisted) revealBody(); });
document.addEventListener('visibilitychange', function () { if (!document.hidden) revealBody(); });
window.addEventListener('focus',            revealBody);
window.addEventListener('orientationchange', function () { setTimeout(revealBody, 150); });
setTimeout(revealBody, 2500);

// navbar scroll style
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// navbar toggle
var navToggle = document.getElementById('navToggle');
var navLinks  = document.getElementById('navLinks');

function closeNav() {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    // no body overflow manipulation here — avoids Android scroll freeze
}

navToggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    // nav uses position:fixed so body overflow isn't needed
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

// faq accordion
document.querySelectorAll('.faq-item').forEach(function (item) {
    item.querySelector('.faq-question').addEventListener('click', function () {
        var wasActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(function (f) { f.classList.remove('active'); });
        if (!wasActive) item.classList.add('active');
    });
});

// fade-in observer
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

if ('requestIdleCallback' in window) {
    requestIdleCallback(registerFadeIns);
} else {
    setTimeout(registerFadeIns, 200);
}

// smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href.length > 1) {
            e.preventDefault();
            var target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// hero fade on scroll + scroll indicator
window.addEventListener('scroll', function () {
    var hero = document.querySelector('.hero-content');
    if (hero) hero.style.opacity = Math.max(0, 1 - window.pageYOffset / 600);
    var indicator = document.querySelector('.scroll-indicator');
    if (indicator) indicator.style.opacity = window.scrollY > 100 ? '0' : '1';
}, { passive: true });

// cursor gold dust trail (desktop only)
var trailPending = false;
var dotCount     = 0;
var MAX_DOTS     = 12;
document.addEventListener('mousemove', function (e) {
    if (window.innerWidth <= 768 || trailPending || dotCount >= MAX_DOTS) return;
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
        requestAnimationFrame(function () { dot.style.opacity = '0'; dot.style.transform = 'scale(3)'; });
        setTimeout(function () {
            if (dot.parentNode) dot.parentNode.removeChild(dot);
            dotCount--;
        }, 520);
    });
});

// background slideshow — preload all images immediately for smooth transitions
(function () {
    var slides  = Array.from(document.querySelectorAll('.bg-slide'));
    var loaded  = slides.map(function (s, i) { return i === 0; });
    var sections = ['home', 'trailer', 'story', 'faq', 'community', 'team'];
    var offsets  = [];
    var current  = 0;

    function load(idx) {
        if (loaded[idx]) return;
        loaded[idx] = true;
        var bg = slides[idx].getAttribute('data-bg');
        if (!bg) return;
        var img = new Image();
        img.onload  = function () { slides[idx].style.backgroundImage = "url('" + bg + "')"; };
        img.onerror = function () {};
        img.src = bg;
    }

    // preload all on idle
    function preloadAll() {
        slides.forEach(function (_, i) { if (i > 0) load(i); });
    }

    if ('requestIdleCallback' in window) {
        requestIdleCallback(preloadAll, { timeout: 3000 });
    } else {
        setTimeout(preloadAll, 1200);
    }

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
        load(next);
        current = next;
        slides.forEach(function (s, i) { s.classList.toggle('active', i === next); });
    }

    slides[0].classList.add('active');

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', function () { buildOffsets(); update(); });
    window.addEventListener('load',   function () { buildOffsets(); update(); });
})();

// codex overlay
function openCodex() {
    var overlay = document.getElementById('codexOverlay');
    overlay.classList.add('open');
    overlay.scrollTop = 0;
    // no body overflow manipulation — overlay is position:fixed, handles its own scroll
}

function closeCodex() {
    document.getElementById('codexOverlay').classList.remove('open');
}

document.getElementById('codexOverlay').addEventListener('click', function (e) {
    if (e.target === this) closeCodex();
});

// devlogs overlay
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

// keyboard close
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeCodex(); closeDevlogs(); }
});

// home screen popup
function dismissHsPopup() {
    var popup = document.getElementById('hsPopup');
    if (popup) {
        popup.style.transition = 'bottom 0.45s cubic-bezier(0.4,0,1,1)';
        popup.classList.remove('show');
    }
}

(function () {
    var ua       = navigator.userAgent;
    var platform = null;
    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) platform = 'ios';
    else if (/Android/.test(ua))                          platform = 'android';

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

    // show after delay — no body overflow lock (causes Android freeze)
    setTimeout(function () {
        if (popup) popup.classList.add('show');
    }, 2000);
})();

// scroll progress bar
(function () {
    var bar = document.getElementById('scrollProgressBar');
    if (!bar) return;
    var ticking = false;
    function update() {
        var h   = document.documentElement;
        var max = (h.scrollHeight - h.clientHeight) || 1;
        bar.style.width = Math.min(100, Math.max(0, (h.scrollTop / max) * 100)) + '%';
        ticking = false;
    }
    window.addEventListener('scroll', function () {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
})();

// archive rail — drag and arrow buttons
(function () {
    // arrow buttons for any ac-rail-track
    document.querySelectorAll('.ac-rail-prev, .ac-rail-next').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var track = document.getElementById(btn.dataset.target);
            if (!track) return;
            var first = track.querySelector('.ac-tile');
            var step  = first ? first.getBoundingClientRect().width + 20 : track.clientWidth * 0.8;
            track.scrollBy({ left: btn.classList.contains('ac-rail-next') ? step : -step, behavior: 'smooth' });
        });
    });

    // drag-to-scroll for every ac-rail-track
    document.querySelectorAll('.ac-rail-track').forEach(function (track) {
        var down = false, sx = 0, ss = 0, moved = 0;

        track.addEventListener('mousedown', function (e) {
            down = true; moved = 0; sx = e.pageX; ss = track.scrollLeft;
            track.classList.add('is-dragging');
        });

        window.addEventListener('mouseup', function () {
            down = false;
            track.classList.remove('is-dragging');
        });

        window.addEventListener('mousemove', function (e) {
            if (!down) return;
            e.preventDefault();
            var dx = e.pageX - sx;
            moved = Math.max(moved, Math.abs(dx));
            track.scrollLeft = ss - dx;
        });

        track.addEventListener('click', function (e) {
            if (moved > 6) { e.preventDefault(); e.stopPropagation(); }
        }, true);
    });
})();

// hud active section dots
(function () {
    var dots = document.querySelectorAll('nav.ac-hud a');
    if (!dots.length) return;
    var ids      = Array.prototype.map.call(dots, function (a) { return a.getAttribute('href').slice(1); });
    var sections = ids.map(function (id) { return document.getElementById(id); }).filter(Boolean);

    function onScroll() {
        var y       = window.scrollY + window.innerHeight * 0.35;
        var current = sections[0];
        for (var i = 0; i < sections.length; i++) {
            if (sections[i] && sections[i].offsetTop <= y) current = sections[i];
        }
        dots.forEach(function (d) {
            d.classList.toggle('active', d.getAttribute('href') === '#' + (current && current.id));
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
})();
