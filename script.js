/* =====================================================
   The Last Message — Main Script
   ===================================================== */

/* ── Service Worker ── */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/serviceworker.js').catch(function() {});
    });
}

/* ── Zoom extreme class ── */
(function() {
    var vv = window.visualViewport;
    if (!vv) return;
    var zoomTimer = null;

    function checkZoom() {
        var scale = vv.scale;
        if (scale > 2.5 || scale < 0.9) {
            document.body.classList.add('zoom-extreme');
        } else {
            document.body.classList.remove('zoom-extreme');
        }
    }

    vv.addEventListener('resize', function() {
        clearTimeout(zoomTimer);
        zoomTimer = setTimeout(checkZoom, 80);
    });
})();

/* ── Reveal body ── */
function revealBody() {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
}

window.addEventListener('load', function() { setTimeout(revealBody, 80); });
window.addEventListener('pageshow', function(e) { if (e.persisted) revealBody(); });
document.addEventListener('visibilitychange', function() { if (!document.hidden) revealBody(); });
window.addEventListener('focus', revealBody);
window.addEventListener('orientationchange', function() { setTimeout(revealBody, 150); });
setTimeout(revealBody, 2500);

/* ── Re-enable scroll when overlays close via external scroll ── */
window.addEventListener('scroll', function() {
    var navOpen     = document.getElementById('navLinks').classList.contains('open');
    var codexOpen   = document.getElementById('codexOverlay').classList.contains('open');
    var devlogsOpen = document.getElementById('devlogsOverlay').classList.contains('open');
    var popupOpen   = document.getElementById('hsPopup').classList.contains('show');

    if (!navOpen && !codexOpen && !devlogsOpen && !popupOpen) {
        if (document.body.style.overflow === 'hidden') {
            document.body.style.overflow = '';
        }
    }
}, { passive: true });

/* ── Navbar scroll state ── */
var navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ── Mobile nav toggle ── */
var navToggle = document.getElementById('navToggle');
var navLinks  = document.getElementById('navLinks');

function closeNav() {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

navToggle.addEventListener('click', function() {
    var isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    if (window.innerWidth <= 768) {
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }
});

document.querySelectorAll('.nav-link-item').forEach(function(link) {
    link.addEventListener('click', closeNav);
});

document.addEventListener('click', function(e) {
    if (!navbar.contains(e.target)) closeNav();
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) closeNav();
});

/* ── FAQ accordion — one item open at a time ── */
document.querySelectorAll('.faq-item').forEach(function(item) {
    item.querySelector('.faq-question').addEventListener('click', function() {
        var isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(function(f) {
            f.classList.remove('active');
        });
        if (!isActive) item.classList.add('active');
    });
});

/* ── Fade-in on scroll ── */
var fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

var registerFadeIns = function() {
    document.querySelectorAll('.fade-in').forEach(function(el) {
        fadeObserver.observe(el);
    });
};

if ('requestIdleCallback' in window) {
    requestIdleCallback(registerFadeIns);
} else {
    setTimeout(registerFadeIns, 200);
}

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        var href = this.getAttribute('href');
        if (href.length > 1) {
            e.preventDefault();
            var target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ── Hero content fade on scroll, hide scroll indicator ── */
window.addEventListener('scroll', function() {
    var hero = document.querySelector('.hero-content');
    if (hero) hero.style.opacity = Math.max(0, 1 - window.pageYOffset / 600);

    var indicator = document.querySelector('.scroll-indicator');
    if (indicator) indicator.style.opacity = window.scrollY > 100 ? '0' : '1';
}, { passive: true });

/* ── Cursor gold-dust trail (desktop only, throttled) ── */
var trailPending = false;
var MAX_DOTS = 12;
var dotCount  = 0;

document.addEventListener('mousemove', function(e) {
    if (window.innerWidth <= 768 || trailPending || dotCount >= MAX_DOTS) return;

    trailPending = true;
    requestAnimationFrame(function() {
        trailPending = false;
        var dot = document.createElement('div');
        dot.style.cssText =
            'position:fixed;width:4px;height:4px;border-radius:50%;' +
            'background:rgba(201, 168, 76, 0.32);' +
            'left:' + e.clientX + 'px;top:' + e.clientY + 'px;' +
            'pointer-events:none;z-index:9999;' +
            'transition:opacity 0.5s ease,transform 0.5s ease;';
        document.body.appendChild(dot);
        dotCount++;

        requestAnimationFrame(function() {
            dot.style.opacity = '0';
            dot.style.transform = 'scale(3)';
        });

        setTimeout(function() {
            if (dot.parentNode) dot.parentNode.removeChild(dot);
            dotCount--;
        }, 520);
    });
});

/* ── Background slideshow ── */
(function() {
    var slides   = Array.from(document.querySelectorAll('.bg-slide'));
    var sections = ['home', 'trailer', 'story', 'faq', 'community', 'team'];
    var offsets  = [];
    var lastActive = 0;
    var bgLoaded = [true, false, false, false];

    function loadSlide(idx) {
        if (bgLoaded[idx]) return;
        bgLoaded[idx] = true;
        var slide = slides[idx];
        var bg = slide.getAttribute('data-bg');
        if (bg) {
            var img = new Image();
            img.onload = function() {
                slide.style.backgroundImage = "url('" + bg + "')";
            };
            img.onerror = function() {};
            img.src = bg;
        }
    }

    function preloadNext(current) {
        var next = (current + 1) % slides.length;
        loadSlide(next);
    }

    function buildOffsets() {
        offsets = sections
            .map(function(id) { return document.getElementById(id); })
            .filter(Boolean)
            .map(function(el) {
                return el.getBoundingClientRect().top + window.scrollY;
            });
    }

    function slideForScroll() {
        var trigger = window.scrollY + window.innerHeight * 0.3;
        var idx = 0;
        offsets.forEach(function(top, i) {
            if (trigger >= top) {
                idx = Math.min(Math.floor(i * slides.length / sections.length), slides.length - 1);
            }
        });
        return idx;
    }

    function updateSlides() {
        var next = slideForScroll();
        if (next === lastActive) return;
        loadSlide(next);
        preloadNext(next);
        lastActive = next;
        slides.forEach(function(slide, i) {
            slide.classList.toggle('active', i === next);
        });
    }

    slides[0].classList.add('active');
    setTimeout(function() { loadSlide(1); }, 1500);

    window.addEventListener('scroll', updateSlides, { passive: true });
    window.addEventListener('resize', function() { buildOffsets(); updateSlides(); });
    window.addEventListener('load',   function() { buildOffsets(); updateSlides(); });
})();

/* ── Codex overlay ── */
function openCodex() {
    var overlay = document.getElementById('codexOverlay');
    overlay.classList.add('open');
    overlay.scrollTop = 0;
    document.body.style.overflow = 'hidden';
}

function closeCodex() {
    document.getElementById('codexOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

document.getElementById('codexOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeCodex();
});

/* ── Devlogs overlay ── */
function openDevlogs() {
    var overlay = document.getElementById('devlogsOverlay');
    overlay.classList.add('open');
    overlay.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    overlay.querySelectorAll('img[data-src]').forEach(function(img) {
        img.src = img.dataset.src;
        delete img.dataset.src;
    });
}

function closeDevlogs() {
    document.getElementById('devlogsOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

document.getElementById('devlogsOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeDevlogs();
});

/* ── Escape key closes overlays ── */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCodex();
        closeDevlogs();
    }
});

/* ── Home Screen Popup ── */
function dismissHsPopup() {
    var popup = document.getElementById('hsPopup');
    if (popup) {
        popup.style.transition = 'bottom 0.45s cubic-bezier(0.4, 0, 1, 1)';
        popup.classList.remove('show');
    }
}

(function() {
    var ua = navigator.userAgent;
    var platform = null;

    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
        platform = 'ios';
    } else if (/Android/.test(ua)) {
        platform = 'android';
    }

    if (!platform) return;
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) return;
    if (window.navigator.standalone === true) return;

    var popup   = document.getElementById('hsPopup');
    var stepsEl = document.getElementById('hsSteps');
    var descEl  = document.getElementById('hsDesc');

    if (!popup) return;

    if (platform === 'ios') {
        if (descEl) descEl.textContent = 'Install The Last Message for fast, instant access right from your home screen.';
        if (stepsEl) stepsEl.innerHTML =
            '<strong>How to install on iOS:</strong><br>' +
            '1. Tap the <strong>Share</strong> button in Safari<br>' +
            '2. Scroll down and tap <strong>"Add to Home Screen"</strong><br>' +
            '3. Tap <strong>Add</strong> to confirm';
    } else {
        if (descEl) descEl.textContent = 'Install The Last Message for fast, instant access right from your home screen.';
        if (stepsEl) stepsEl.innerHTML =
            '<strong>How to install on Android:</strong><br>' +
            '1. Tap the <strong>Menu</strong> in Chrome<br>' +
            '2. Tap <strong>"Add to Home screen"</strong><br>' +
            '3. Tap <strong>Add</strong> to confirm';
    }

    setTimeout(function() {
        if (popup) {
            popup.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }, 2000);
})();

/* ── Scroll progress bar ── */
(function() {
    var bar = document.getElementById('scrollProgressBar');
    if (!bar) return;

    var ticking = false;

    function update() {
        var h   = document.documentElement;
        var max = (h.scrollHeight - h.clientHeight) || 1;
        var pct = Math.min(100, Math.max(0, (h.scrollTop / max) * 100));
        bar.style.width = pct + '%';
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });

    update();
})();

/* ── Devlog rail: arrows, drag, progress ── */
(function() {
    var track = document.getElementById('railTrack');
    if (!track) return;

    var prev  = document.getElementById('railPrev');
    var next  = document.getElementById('railNext');
    var fill  = document.getElementById('railProgressFill');
    var count = document.getElementById('railProgressCount');
    var cards = track.querySelectorAll('.rail-card');
    var total = cards.length;

    function cardStep() {
        if (cards.length < 2) return track.clientWidth * 0.8;
        return cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
    }

    function pad2(n) { return n < 10 ? '0' + n : '' + n; }

    function update() {
        var max = track.scrollWidth - track.clientWidth;
        var pct = max > 0 ? (track.scrollLeft / max) * 100 : 0;
        if (fill) fill.style.width = Math.max(8, pct) + '%';

        var step = cardStep() || 1;
        var idx  = Math.round(track.scrollLeft / step) + 1;
        if (idx < 1) idx = 1;
        if (idx > total) idx = total;
        if (count) count.textContent = pad2(idx) + ' / ' + pad2(total);

        if (prev) prev.disabled = track.scrollLeft <= 2;
        if (next) next.disabled = track.scrollLeft >= max - 2;
    }

    if (prev) prev.addEventListener('click', function() { track.scrollBy({ left: -cardStep(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function() { track.scrollBy({ left:  cardStep(), behavior: 'smooth' }); });

    track.addEventListener('scroll', function() { requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', update);

    /* Drag to scroll (mouse) */
    var isDown = false;
    var startX = 0;
    var startScroll = 0;

    track.addEventListener('mousedown', function(e) {
        isDown = true;
        track.classList.add('is-dragging');
        startX = e.pageX;
        startScroll = track.scrollLeft;
    });

    window.addEventListener('mouseup', function() {
        isDown = false;
        track.classList.remove('is-dragging');
    });

    window.addEventListener('mousemove', function(e) {
        if (!isDown) return;
        e.preventDefault();
        track.scrollLeft = startScroll - (e.pageX - startX);
    });

    /* Prevent click after drag */
    var clickGuard = 0;
    track.addEventListener('mousemove', function() {
        if (isDown) clickGuard = Date.now();
    });

    track.addEventListener('click', function(e) {
        if (Date.now() - clickGuard < 150) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);

    update();
})();

/* ── AC HUD active section tracking ── */
(function() {
    var dots = document.querySelectorAll('.ac-hud a');
    if (!dots.length) return;

    var ids = Array.prototype.map.call(dots, function(a) {
        return a.getAttribute('href').slice(1);
    });

    var hudSections = ids
        .map(function(id) { return document.getElementById(id); })
        .filter(Boolean);

    function onScroll() {
        var y = window.scrollY + window.innerHeight * 0.35;
        var current = hudSections[0];

        for (var i = 0; i < hudSections.length; i++) {
            if (hudSections[i].offsetTop <= y) current = hudSections[i];
        }

        dots.forEach(function(d) {
            d.classList.toggle('active', d.getAttribute('href') === '#' + current.id);
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
})();

/* ── Generic rail controls (prev/next) for any ac-rail-track ── */
(function() {
    document.querySelectorAll('.ac-rail-prev, .ac-rail-next').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var track = document.getElementById(btn.dataset.target);
            if (!track) return;
            var first = track.querySelector('.ac-tile');
            var step = first
                ? first.getBoundingClientRect().width + 20
                : track.clientWidth * 0.8;
            track.scrollBy({
                left: btn.classList.contains('ac-rail-next') ? step : -step,
                behavior: 'smooth'
            });
        });
    });

    /* Drag to scroll for every ac-rail-track */
    document.querySelectorAll('.ac-rail-track').forEach(function(track) {
        var down = false;
        var sx = 0;
        var ss = 0;
        var moved = 0;

        track.addEventListener('mousedown', function(e) {
            down = true;
            moved = 0;
            sx = e.pageX;
            ss = track.scrollLeft;
            track.classList.add('is-dragging');
        });

        window.addEventListener('mouseup', function() {
            down = false;
            track.classList.remove('is-dragging');
        });

        window.addEventListener('mousemove', function(e) {
            if (!down) return;
            e.preventDefault();
            var dx = e.pageX - sx;
            moved = Math.max(moved, Math.abs(dx));
            track.scrollLeft = ss - dx;
        });

        track.addEventListener('click', function(e) {
            if (moved > 6) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
    });
})();
