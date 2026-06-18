/* ---- Reset ---- */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

/* ---- Variables ---- */
:root {
    --primary-orange:  #c9a84c;
    --dark-orange:     #a8862a;
    --light-orange:    #e8c97e;
    --bg-dark:         #15110a;
    --text-primary:    #ffffff;
    --text-secondary:  #b0b0b0;
    --accent-glow:     rgba(201,168,76,0.3);
    --ac-gold:         #c9a84c;
    --ac-gold-light:   #e8c97e;
    --ac-gold-dim:     rgba(201,168,76,0.35);
    --ac-accent-light: #f5d77c;
    --ac-accent-dim:   rgba(201,168,76,0.4);
}

/* ---- Base ---- */
html {
    scroll-behavior: smooth;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    height: 100%;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: var(--bg-dark);
    color: var(--text-primary);
    line-height: 1.6;
    opacity: 0;
    overflow-x: hidden;
    overflow-y: visible;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    touch-action: pan-y pinch-zoom;
    transition: opacity 0.4s ease;
    height: 100%;
    min-height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
body.ready { opacity: 1; }

#site-wrap {
    overflow-x: hidden;
    overflow-y: visible;
    position: relative;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-y pinch-zoom;
}

/* ---- Loader ---- */
#page-loader {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background: #0a0806;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    gap: 1.5rem;
    transition: opacity 0.5s ease, visibility 0.5s ease;
    -webkit-transition: opacity 0.5s ease, visibility 0.5s ease;
}
#page-loader.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}
.loader-logo {
    width: clamp(120px, 25vw, 200px);
    height: auto;
    border-radius: 12px;
    -webkit-filter: drop-shadow(0 0 20px rgba(201,168,76,0.4));
    filter: drop-shadow(0 0 20px rgba(201,168,76,0.4));
    -webkit-animation: loaderPulse 1.8s ease-in-out infinite;
    animation: loaderPulse 1.8s ease-in-out infinite;
}
.loader-bar-wrap {
    width: clamp(200px, 40vw, 320px);
    height: 2px;
    background: rgba(201,168,76,0.15);
    border-radius: 2px;
    overflow: hidden;
}
.loader-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, transparent, var(--ac-gold-light), var(--ac-gold), var(--ac-gold-light), transparent);
    background-size: 200% 100%;
    -webkit-animation: shimmer 1.5s ease infinite;
    animation: shimmer 1.5s ease infinite;
    transition: width 0.3s ease;
    -webkit-transition: width 0.3s ease;
    -webkit-box-shadow: 0 0 10px rgba(201,168,76,0.6);
    box-shadow: 0 0 10px rgba(201,168,76,0.6);
}
.loader-text {
    font-family: 'Cinzel', serif;
    font-size: 0.65rem;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: rgba(201,168,76,0.6);
    -webkit-animation: loaderTextFade 1.8s ease-in-out infinite;
    animation: loaderTextFade 1.8s ease-in-out infinite;
}

/* ---- Background Slideshow ---- */
.bg-slideshow {
    position: fixed;
    inset: 0;
    z-index: -3;
    overflow: hidden;
    pointer-events: none;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    will-change: transform;
}
.bg-slide {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 0.9s ease-in-out;
    -webkit-transition: opacity 0.9s ease-in-out;
    -webkit-filter: brightness(0.55) saturate(1.05) contrast(1.02);
    filter: brightness(0.55) saturate(1.05) contrast(1.02);
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    will-change: opacity;
}
.bg-slide.active { opacity: 1; }

.bg-night-overlay {
    position: fixed;
    inset: 0;
    z-index: -2;
    pointer-events: none;
    background: linear-gradient(180deg, rgba(10,8,6,0.65) 0%, rgba(10,8,6,0.45) 35%, rgba(10,8,6,0.65) 100%);
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
}

section, footer { background: transparent !important; }

/* ---- Scroll Progress Bar ---- */
.scroll-progress {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 2px;
    z-index: 100000;
    pointer-events: none;
    background: rgba(255,255,255,0.04);
}
.scroll-progress__bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, transparent, var(--ac-gold-light), var(--ac-gold), var(--ac-gold-light), transparent);
    background-size: 200% 100%;
    -webkit-animation: shimmer 4s ease infinite;
    animation: shimmer 4s ease infinite;
    -webkit-box-shadow: 0 0 14px rgba(201,168,76,0.6);
    box-shadow: 0 0 14px rgba(201,168,76,0.6);
    transition: width 0.12s linear;
    -webkit-transition: width 0.12s linear;
}

/* ---- Navbar ---- */
nav#navbar {
    position: fixed;
    top: 0; width: 100%;
    background: rgba(10,8,6,0.92);
    border-bottom: 1px solid rgba(201,168,76,0.15);
    z-index: 1000;
    padding: 0.7rem 0;
    transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    will-change: transform;
}
nav#navbar.scrolled { padding: 0.5rem 0; -webkit-box-shadow: 0 8px 24px rgba(0,0,0,0.5); box-shadow: 0 8px 24px rgba(0,0,0,0.5); }

.nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-align-items: center;
    align-items: center;
}
.logo-wrap {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    gap: 0.5rem;
}
.logo {
    font-size: 1.4rem;
    font-weight: 800;
    font-family: 'Cinzel', serif;
    background: linear-gradient(135deg, var(--ac-gold), var(--ac-gold-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 1px;
}
.nav-logo-img {
    height: 44px; width: auto;
    object-fit: contain;
    border-radius: 6px;
    -webkit-filter: drop-shadow(0 0 8px rgba(201,168,76,0.35));
    filter: drop-shadow(0 0 8px rgba(201,168,76,0.35));
    vertical-align: middle;
    transition: filter 0.3s;
    -webkit-transition: -webkit-filter 0.3s;
}
.nav-logo-img:hover {
    -webkit-filter: drop-shadow(0 0 14px rgba(201,168,76,0.65));
    filter: drop-shadow(0 0 14px rgba(201,168,76,0.65));
}

.nav-links { display: -webkit-flex; display: flex; gap: 2rem; list-style: none; }
.nav-links a {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.72rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-family: 'Cinzel', serif;
    transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease;
    position: relative;
}
.nav-links a::after {
    content: '';
    position: absolute;
    bottom: -4px; left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    width: 0; height: 1px;
    background: var(--ac-gold);
    transition: width 0.3s ease;
    -webkit-transition: width 0.3s ease;
}
.nav-links a:hover { color: var(--ac-gold-light); }
.nav-links a:hover::after { width: 100%; }

.nav-toggle {
    display: none;
    -webkit-flex-direction: column;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0.4rem;
    position: relative;
    z-index: 1001;
    -webkit-appearance: none;
    appearance: none;
    touch-action: manipulation;
}
.nav-toggle span {
    display: block; width: 24px; height: 2px;
    background: var(--ac-gold); border-radius: 2px;
    transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease;
}
.nav-toggle.open span:nth-child(1) { -webkit-transform: rotate(45deg) translate(5px, 5px); transform: rotate(45deg) translate(5px, 5px); }
.nav-toggle.open span:nth-child(2) { opacity: 0; -webkit-transform: scaleX(0); transform: scaleX(0); }
.nav-toggle.open span:nth-child(3) { -webkit-transform: rotate(-45deg) translate(5px, -5px); transform: rotate(-45deg) translate(5px, -5px); }

/* ---- HUD Dots ---- */
nav.ac-hud {
    position: fixed;
    right: 1.4rem; top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    z-index: 9000;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    gap: 0.7rem;
    pointer-events: auto;
    border: none; background: none; padding: 0;
}
nav.ac-hud a {
    display: block; width: 10px; height: 10px;
    position: relative;
    border-radius: 2px;
    background: rgba(201,168,76,0.25);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    transition: background 0.3s, box-shadow 0.3s;
    -webkit-transition: background 0.3s, -webkit-box-shadow 0.3s;
    color: transparent; font-size: 0; text-decoration: none;
    touch-action: manipulation;
}
nav.ac-hud a::after {
    content: attr(data-label);
    position: absolute;
    right: calc(100% + 14px); top: 50%;
    -webkit-transform: translateY(-50%) rotate(-45deg);
    transform: translateY(-50%) rotate(-45deg);
    font-family: 'Cinzel', serif;
    font-size: 0.58rem; letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--ac-gold-light);
    white-space: nowrap; opacity: 0;
    transition: opacity 0.3s;
    -webkit-transition: opacity 0.3s;
    pointer-events: none;
}
nav.ac-hud a:hover { background: var(--ac-gold-light); -webkit-box-shadow: 0 0 12px var(--ac-gold); box-shadow: 0 0 12px var(--ac-gold); }
nav.ac-hud a:hover::after { opacity: 1; }
nav.ac-hud a.active { background: var(--ac-gold-light); -webkit-box-shadow: 0 0 12px var(--ac-gold), 0 0 24px rgba(201,168,76,0.6); box-shadow: 0 0 12px var(--ac-gold), 0 0 24px rgba(201,168,76,0.6); }

/* ---- Hero ---- */
.hero {
    min-height: 100vh;
    min-height: 100svh;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    text-align: center;
    padding: 5rem 2rem 4.5rem;
    position: relative; overflow: hidden;
}
.hero::after {
    content: ''; position: absolute; inset: 0;
    pointer-events: none; z-index: 0;
    background:
        radial-gradient(ellipse 70% 50% at 50% 35%, rgba(201,168,76,0.08), transparent 60%),
        radial-gradient(ellipse 90% 60% at 50% 110%, rgba(0,0,0,0.85), transparent 70%);
}
.hero-content {
    max-width: 820px;
    -webkit-animation: fadeInUp 1s ease;
    animation: fadeInUp 1s ease;
    position: relative; z-index: 2;
}

.hero-stars { position: absolute; inset: 0; pointer-events: none; z-index: 1; overflow: hidden; }
.hero-stars::before {
    content: ''; position: absolute; top: 0; left: 0; width: 2px; height: 2px;
    background: transparent; border-radius: 50%;
    box-shadow:
        85px 60px 0 rgba(201,168,76,0.28), 210px 35px 0 rgba(255,248,210,0.22),
        340px 95px 0 rgba(201,168,76,0.18), 480px 25px 0 rgba(255,255,200,0.20),
        590px 80px 0 rgba(201,168,76,0.25), 720px 15px 0 rgba(255,248,210,0.18),
        850px 70px 0 rgba(201,168,76,0.20), 95px 170px 0 rgba(255,255,220,0.15),
        280px 155px 0 rgba(201,168,76,0.20), 450px 140px 0 rgba(255,248,210,0.18),
        630px 160px 0 rgba(201,168,76,0.15), 780px 130px 0 rgba(255,255,200,0.20),
        1050px 110px 0 rgba(201,168,76,0.15), 1180px 60px 0 rgba(255,248,210,0.20);
    -webkit-animation: star-twinkle 5s ease-in-out infinite alternate;
    animation: star-twinkle 5s ease-in-out infinite alternate;
}
.hero-stars::after {
    content: ''; position: absolute; top: 0; left: 0; width: 1px; height: 1px;
    background: transparent; border-radius: 50%;
    box-shadow:
        155px 90px 0 rgba(201,168,76,0.20), 320px 50px 0 rgba(255,255,220,0.18),
        510px 110px 0 rgba(201,168,76,0.22), 680px 40px 0 rgba(255,248,210,0.16),
        820px 100px 0 rgba(201,168,76,0.18), 970px 75px 0 rgba(255,255,200,0.20);
    -webkit-animation: star-twinkle 7s ease-in-out infinite alternate-reverse;
    animation: star-twinkle 7s ease-in-out infinite alternate-reverse;
}

.hero-logo-wrap {
    margin-bottom: 1.5rem;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-animation: fadeInUp 0.8s ease both;
    animation: fadeInUp 0.8s ease both;
}
.hero-logo-img {
    width: clamp(360px, 42vw, 560px); height: auto;
    object-fit: contain;
    -webkit-filter: drop-shadow(0 0 28px rgba(201,168,76,0.4)) drop-shadow(0 0 55px rgba(201,168,76,0.12));
    filter: drop-shadow(0 0 28px rgba(201,168,76,0.4)) drop-shadow(0 0 55px rgba(201,168,76,0.12));
    border-radius: 14px;
    transition: filter 0.4s, transform 0.4s;
    -webkit-transition: -webkit-filter 0.4s, -webkit-transform 0.4s;
}
.hero-logo-img:hover {
    -webkit-filter: drop-shadow(0 0 48px rgba(201,168,76,0.7)) drop-shadow(0 0 90px rgba(201,168,76,0.18));
    filter: drop-shadow(0 0 48px rgba(201,168,76,0.7)) drop-shadow(0 0 90px rgba(201,168,76,0.18));
    -webkit-transform: scale(1.04);
    transform: scale(1.04);
}
.hero h1 {
    font-size: clamp(2.2rem, 5vw, 4.5rem);
    font-weight: 900; font-family: 'Cinzel', serif;
    margin-bottom: 1rem; line-height: 1.1; letter-spacing: 3px;
    background: linear-gradient(180deg, #fff 0%, #fff 55%, var(--ac-gold-light) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
.hero p { font-size: 1.05rem; color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.8; }

/* ---- Buttons ---- */
.cta-buttons {
    display: -webkit-flex;
    display: flex;
    gap: 1.2rem;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
}

.btn {
    padding: 0.95rem 2.2rem;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease;
    border: none; cursor: pointer;
    font-size: 0.95rem;
    position: relative; overflow: hidden;
    display: -webkit-inline-flex;
    display: inline-flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    gap: 0.5rem; text-align: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
}
.btn-journey {
    background: linear-gradient(135deg, #1a1508, #2a2010);
    color: var(--ac-gold-light);
    border: 1px solid var(--ac-gold);
    -webkit-box-shadow: 0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,168,76,0.12);
    box-shadow: 0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,168,76,0.12);
    font-family: 'Cinzel', serif;
    font-weight: 700; font-size: 0.95rem;
    letter-spacing: 2.5px; text-transform: uppercase;
    padding: 1.1rem 2.8rem; border-radius: 3px;
    -webkit-clip-path: polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px));
    clip-path: polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px));
}
.btn-journey::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.1), transparent);
    opacity: 0; transition: opacity 0.5s;
    -webkit-transition: opacity 0.5s;
}
.btn-journey:hover {
    background: linear-gradient(135deg, var(--ac-gold), var(--dark-orange));
    color: #0a0806;
    border-color: var(--ac-gold-light);
    -webkit-transform: translateY(-4px) scale(1.04);
    transform: translateY(-4px) scale(1.04);
    -webkit-box-shadow: 0 18px 44px var(--accent-glow);
    box-shadow: 0 18px 44px var(--accent-glow);
}
.btn-journey:hover::before { opacity: 1; }
.btn-journey:active { background: linear-gradient(135deg, var(--ac-gold), var(--dark-orange)); color: #0a0806; -webkit-transform: translateY(-2px); transform: translateY(-2px); }

.btn-mirage {
    position: relative;
    display: -webkit-inline-flex;
    display: inline-flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    gap: 0.35rem; padding: 1.4rem 4rem;
    background: linear-gradient(135deg, #2a2210, #382e14);
    color: var(--ac-gold-light);
    border: 1px solid rgba(201,168,76,0.7);
    font-family: 'Cinzel', serif;
    font-size: 1rem; font-weight: 700;
    letter-spacing: 3.5px; text-transform: uppercase;
    cursor: pointer;
    -webkit-clip-path: polygon(0 14px, 14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px));
    clip-path: polygon(0 14px, 14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px));
    -webkit-box-shadow: 0 0 36px rgba(201,168,76,0.18), 0 18px 44px rgba(0,0,0,0.5);
    box-shadow: 0 0 36px rgba(201,168,76,0.18), 0 18px 44px rgba(0,0,0,0.5);
    transition: all 0.4s ease;
    -webkit-transition: all 0.4s ease;
    overflow: hidden; text-decoration: none;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
}
.btn-mirage .bm-sub { font-size: 0.62rem; letter-spacing: 2.5px; color: rgba(201,168,76,0.7); font-weight: 400; }
.btn-mirage::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.12), transparent);
    -webkit-transform: translateX(-120%);
    transform: translateX(-120%);
    transition: -webkit-transform 0.6s ease;
    transition: transform 0.6s ease;
    -webkit-transition: -webkit-transform 0.6s ease;
}
.btn-mirage:hover {
    background: linear-gradient(135deg, #3a2e16, #4a3c1c);
    border-color: var(--ac-gold-light); color: #fff;
    -webkit-box-shadow: 0 0 52px rgba(201,168,76,0.28), 0 28px 55px rgba(0,0,0,0.6);
    box-shadow: 0 0 52px rgba(201,168,76,0.28), 0 28px 55px rgba(0,0,0,0.6);
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px);
}
.btn-mirage:hover::before { -webkit-transform: translateX(120%); transform: translateX(120%); }
.btn-mirage:hover .bm-sub { color: rgba(255,255,255,0.75); }
.btn-mirage:active { background: linear-gradient(135deg, #3a2e16, #4a3c1c); color: #fff; -webkit-transform: translateY(-2px); transform: translateY(-2px); }
.btn-mirage.btn-quest { border-color: var(--ac-gold); -webkit-box-shadow: 0 0 40px rgba(201,168,76,0.2), 0 18px 44px rgba(0,0,0,0.5); box-shadow: 0 0 40px rgba(201,168,76,0.2), 0 18px 44px rgba(0,0,0,0.5); }
.btn-mirage.btn-quest:hover { background: linear-gradient(135deg, var(--ac-gold), #b8921e); color: #0a0806; }
.btn-mirage.btn-quest:hover .bm-sub { color: rgba(10,8,6,0.65); }
.btn-mirage.btn-quest:active { background: linear-gradient(135deg, var(--ac-gold), #b8921e); color: #0a0806; }

/* ---- Section Shared ---- */
section { padding: 2.5rem 2rem; max-width: 1400px; margin: 0 auto; position: relative; }

.section-title {
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 900; font-family: 'Cinzel', serif;
    margin-bottom: 0.8rem; text-align: center; letter-spacing: 1.5px;
    background: linear-gradient(120deg, var(--ac-gold-light) 0%, var(--ac-gold) 45%, var(--ac-accent-light) 70%, var(--ac-gold-light) 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-animation: titleShift 8s ease-in-out infinite;
    animation: titleShift 8s ease-in-out infinite;
}
.section-subtitle {
    text-align: center; color: var(--text-secondary);
    font-size: 1rem; margin-bottom: 2.5rem;
    max-width: 680px; margin-left: auto; margin-right: auto;
}

.section-divider {
    width: 100%; height: 1px;
    background: linear-gradient(90deg, transparent, var(--ac-gold), transparent);
    margin: 0 auto; max-width: 900px;
    position: relative; opacity: 0.55;
}
.section-divider::after {
    content: '\25C6'; position: absolute; top: 50%; left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: var(--ac-gold); font-size: 0.68rem;
    background: var(--bg-dark); padding: 0 0.8rem; opacity: 0.85;
}

.ac-ornament {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    gap: 0.8rem; padding: 1.4rem 1rem; opacity: 0.55;
}
.ac-ornament__line { flex: 0 1 220px; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.45), transparent); }
.ac-ornament__icon {
    width: 26px; height: 26px;
    display: -webkit-flex; display: flex;
    -webkit-align-items: center; align-items: center;
    -webkit-justify-content: center; justify-content: center;
    color: var(--ac-gold-light);
    -webkit-transform: rotate(45deg); transform: rotate(45deg);
    border: 1px solid rgba(201,168,76,0.4);
    background: rgba(201,168,76,0.05);
}
.ac-ornament__icon::before { content: ''; width: 6px; height: 6px; background: var(--ac-gold-light); -webkit-box-shadow: 0 0 8px var(--ac-gold); box-shadow: 0 0 8px var(--ac-gold); }

.chapter-eyebrow {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    gap: 0.8rem;
    margin: 0 auto 0.8rem;
    font-family: 'Cinzel', serif; font-size: 0.62rem;
    letter-spacing: 6px; text-transform: uppercase;
    color: var(--ac-gold); opacity: 0.85;
}

/* ---- Story Cards ---- */
.story-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 2rem; }

.story-card {
    background: radial-gradient(120% 80% at 0% 0%, rgba(201,168,76,0.06), transparent 55%),
                linear-gradient(135deg, rgba(19,17,9,0.9), rgba(30,26,18,0.9));
    -webkit-backdrop-filter: blur(10px) saturate(130%);
    backdrop-filter: blur(10px) saturate(130%);
    border-radius: 14px; padding: 2rem;
    border: 1px solid rgba(201,168,76,0.16);
    transition: -webkit-transform 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.4s, -webkit-box-shadow 0.45s;
    transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.4s, box-shadow 0.45s;
    position: relative; overflow: hidden;
}
.story-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(201,168,76,0.05), transparent); opacity: 0; transition: opacity 0.4s; -webkit-transition: opacity 0.4s; }
.story-card::after  { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--ac-gold), transparent); opacity: 0; transition: opacity 0.4s; -webkit-transition: opacity 0.4s; }
.story-card:hover { -webkit-transform: translateY(-4px); transform: translateY(-4px); border-color: rgba(201,168,76,0.4); -webkit-box-shadow: 0 18px 40px rgba(0,0,0,0.45), 0 0 38px rgba(201,168,76,0.14); box-shadow: 0 18px 40px rgba(0,0,0,0.45), 0 0 38px rgba(201,168,76,0.14); }
.story-card:hover::before, .story-card:hover::after { opacity: 1; }
.story-card-content { position: relative; z-index: 1; }
.story-icon { width: 56px; height: 56px; margin-bottom: 1.2rem; display: block; fill: var(--ac-gold); -webkit-filter: drop-shadow(0 0 8px rgba(201,168,76,0.4)); filter: drop-shadow(0 0 8px rgba(201,168,76,0.4)); }
.story-card h3 { font-size: 1.3rem; margin-bottom: 0.8rem; color: var(--ac-gold-light); font-family: 'Cinzel', serif; letter-spacing: 1px; }
.story-card p  { color: var(--text-secondary); line-height: 1.75; font-size: 0.92rem; }

/* ---- FAQ ---- */
.faq-container { max-width: 860px; margin: 0 auto; }

.faq-item {
    background: linear-gradient(135deg, rgba(14,12,7,0.85), rgba(19,17,9,0.85));
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-radius: 12px; margin-bottom: 1rem;
    border: 1px solid rgba(201,168,76,0.14);
    overflow: hidden;
    transition: border-color 0.3s, -webkit-box-shadow 0.3s;
    transition: border-color 0.3s, box-shadow 0.3s;
}
.faq-item:hover { border-color: rgba(201,168,76,0.38); -webkit-box-shadow: 0 4px 20px rgba(201,168,76,0.22); box-shadow: 0 4px 20px rgba(201,168,76,0.22); }
.faq-item.active { border-color: rgba(201,168,76,0.38); border-left: 2px solid var(--ac-gold); -webkit-box-shadow: 0 4px 22px rgba(201,168,76,0.25); box-shadow: 0 4px 22px rgba(201,168,76,0.25); }

.faq-question {
    padding: 1.6rem; cursor: pointer;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-align-items: center;
    align-items: center;
    font-weight: 600; font-size: 1rem; font-family: 'Cinzel', serif;
    transition: color 0.3s;
    -webkit-transition: color 0.3s;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
}
.faq-question:hover { color: var(--ac-gold-light); }
.faq-toggle { font-size: 1rem; transition: -webkit-transform 0.3s; transition: transform 0.3s; color: var(--ac-gold); -webkit-flex-shrink: 0; flex-shrink: 0; margin-left: 1rem; }
.faq-item.active .faq-toggle   { -webkit-transform: rotate(180deg); transform: rotate(180deg); }
.faq-item.active .faq-question { color: var(--ac-gold-light); }
.faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.3s, padding 0.3s; -webkit-transition: max-height 0.3s, padding 0.3s; padding: 0 1.6rem; }
.faq-item.active .faq-answer { max-height: 500px; padding: 0 1.6rem 1.6rem; }
.faq-answer p { color: var(--text-secondary); line-height: 1.8; font-size: 0.93rem; }

/* ---- Community ---- */
.community-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin-top: 2rem; }

.community-card {
    background: radial-gradient(120% 80% at 100% 0%, rgba(201,168,76,0.05), transparent 55%),
                linear-gradient(135deg, rgba(14,12,7,0.9), rgba(26,23,16,0.9));
    -webkit-backdrop-filter: blur(10px) saturate(130%);
    backdrop-filter: blur(10px) saturate(130%);
    border-radius: 14px; padding: 2rem 1.6rem; text-align: center;
    border: 1px solid rgba(201,168,76,0.14);
    transition: -webkit-transform 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.4s, -webkit-box-shadow 0.45s;
    transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.4s, box-shadow 0.45s;
    position: relative; overflow: hidden;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-clip-path: polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px));
    clip-path: polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px));
}
.community-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(201,168,76,0.04), transparent); opacity: 0; transition: opacity 0.4s; -webkit-transition: opacity 0.4s; }
.community-card::after  { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--ac-gold), transparent); opacity: 0; transition: opacity 0.4s; -webkit-transition: opacity 0.4s; pointer-events: none; }
.community-card:hover { -webkit-transform: translateY(-8px) scale(1.02); transform: translateY(-8px) scale(1.02); border-color: rgba(201,168,76,0.42); -webkit-box-shadow: 0 18px 44px rgba(0,0,0,0.6), 0 0 32px rgba(201,168,76,0.28); box-shadow: 0 18px 44px rgba(0,0,0,0.6), 0 0 32px rgba(201,168,76,0.28); }
.community-card:hover::before, .community-card:hover::after { opacity: 1; }
.community-content {
    position: relative; z-index: 1;
    display: -webkit-flex; display: flex;
    -webkit-flex-direction: column; flex-direction: column;
    -webkit-align-items: center; align-items: center; flex: 1;
}
.community-icon { width: 72px; height: 72px; margin: 0 auto 1.2rem; display: block; -webkit-filter: drop-shadow(0 0 14px rgba(201,168,76,0.45)); filter: drop-shadow(0 0 14px rgba(201,168,76,0.45)); pointer-events: none; -webkit-user-select: none; user-select: none; -webkit-user-drag: none; }
.community-card h3 { font-size: 1.45rem; margin-bottom: 0.8rem; font-family: 'Cinzel', serif; color: var(--ac-gold-light); letter-spacing: 1px; }
.community-card p  { color: var(--text-secondary); margin-bottom: 1.6rem; flex: 1; font-size: 0.9rem; }

/* ---- Archive Rail ---- */
.ac-rail-section { padding: 4.5rem 0 5rem; position: relative; max-width: 100%; }

.ac-rail-header {
    max-width: 1400px; margin: 0 auto 1.6rem; padding: 0 2rem;
    display: -webkit-flex; display: flex;
    -webkit-align-items: flex-end; align-items: flex-end;
    -webkit-justify-content: space-between; justify-content: space-between;
    gap: 1.5rem; -webkit-flex-wrap: wrap; flex-wrap: wrap;
}
.ac-rail-title {
    font-family: 'Cinzel', serif; font-size: clamp(1.6rem, 3.5vw, 2.6rem);
    font-weight: 900; color: #fff; letter-spacing: 1.5px; line-height: 1.1; margin: 0.3rem 0 0.4rem;
}
.ac-rail-title em { font-style: normal; background: linear-gradient(120deg, var(--ac-gold-light), var(--ac-gold)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.ac-rail-sub { color: var(--text-secondary); font-size: 0.92rem; max-width: 520px; line-height: 1.6; }

.rail-controls { display: -webkit-flex; display: flex; gap: 0.6rem; }
.rail-btn {
    width: 46px; height: 46px; border-radius: 50%;
    background: rgba(201,168,76,0.06);
    border: 1px solid rgba(201,168,76,0.3);
    color: var(--ac-gold-light); font-size: 1.1rem; cursor: pointer;
    display: -webkit-flex; display: flex;
    -webkit-align-items: center; align-items: center;
    -webkit-justify-content: center; justify-content: center;
    transition: -webkit-transform 0.3s cubic-bezier(0.22,1,0.36,1), background 0.3s, border-color 0.3s, opacity 0.3s;
    transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), background 0.3s, border-color 0.3s, opacity 0.3s;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none; appearance: none;
}
.rail-btn:hover { background: rgba(201,168,76,0.18); border-color: var(--ac-gold-light); -webkit-transform: scale(1.08); transform: scale(1.08); }
.rail-btn:disabled { opacity: 0.3; cursor: default; -webkit-transform: none; transform: none; }

.ac-rail-track-wrap { position: relative; padding: 0.4rem 0 1rem; overflow: hidden; }
.ac-rail-track-wrap::before, .ac-rail-track-wrap::after { content: ''; position: absolute; top: 0; bottom: 0; width: 80px; pointer-events: none; z-index: 3; }
.ac-rail-track-wrap::before { left: 0; background: linear-gradient(90deg, var(--bg-dark), transparent); }
.ac-rail-track-wrap::after  { right: 0; background: linear-gradient(-90deg, var(--bg-dark), transparent); }

.ac-rail-track {
    display: -webkit-flex;
    display: flex;
    gap: 1.3rem;
    overflow-x: auto;
    overflow-y: visible;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    -webkit-scroll-snap-type: x mandatory;
    scroll-padding-left: 2rem;
    padding: 0.3rem 2rem 1.2rem;
    scrollbar-width: thin;
    scrollbar-color: rgba(201,168,76,0.3) transparent;
    scroll-behavior: smooth;
    cursor: -webkit-grab; cursor: grab;
    touch-action: pan-x pan-y;
    pointer-events: auto;
    position: relative; z-index: 1;
    will-change: scroll-position;
}
.ac-rail-track::-webkit-scrollbar { height: 4px; }
.ac-rail-track::-webkit-scrollbar-track { background: transparent; }
.ac-rail-track::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 2px; }
.ac-rail-track.is-dragging { cursor: -webkit-grabbing; cursor: grabbing; scroll-behavior: auto; }

.ac-tile {
    -webkit-flex: 0 0 clamp(260px, 28vw, 340px);
    flex: 0 0 clamp(260px, 28vw, 340px);
    scroll-snap-align: start;
    -webkit-scroll-snap-align: start;
    position: relative; aspect-ratio: 4/5;
    border-radius: 16px; overflow: hidden;
    background: linear-gradient(135deg, #14110a, #0a0806);
    border: 1px solid rgba(201,168,76,0.18);
    text-decoration: none; color: inherit;
    transition: -webkit-transform 0.55s cubic-bezier(0.22,1,0.36,1), border-color 0.4s, -webkit-box-shadow 0.55s;
    transition: transform 0.55s cubic-bezier(0.22,1,0.36,1), border-color 0.4s, box-shadow 0.55s;
    isolation: isolate; cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}
.ac-tile__img { position: absolute; inset: 0; background-size: cover; background-position: center; -webkit-transform: scale(1.04); transform: scale(1.04); transition: -webkit-transform 1s cubic-bezier(0.22,1,0.36,1), -webkit-filter 0.5s; transition: transform 1s cubic-bezier(0.22,1,0.36,1), filter 0.5s; -webkit-filter: saturate(0.85) brightness(0.7); filter: saturate(0.85) brightness(0.7); }
.ac-tile__shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,8,6,0) 25%, rgba(10,8,6,0.45) 55%, rgba(10,8,6,0.96) 100%); }
.ac-tile__num { position: absolute; top: 1rem; left: 1rem; font-family: 'Cinzel', serif; font-size: 0.58rem; letter-spacing: 3px; text-transform: uppercase; padding: 0.32rem 0.7rem; background: rgba(10,8,6,0.55); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); border: 1px solid rgba(201,168,76,0.35); color: var(--ac-gold-light); border-radius: 999px; z-index: 2; }
.ac-tile__body { position: absolute; left: 0; right: 0; bottom: 0; padding: 1.4rem 1.4rem 1.5rem; z-index: 2; }
.ac-tile__type { font-family: 'Cinzel', serif; font-size: 0.58rem; letter-spacing: 3px; color: var(--ac-gold); text-transform: uppercase; margin-bottom: 0.45rem; display: block; }
.ac-tile__title { font-family: 'Cinzel', serif; font-size: 1.25rem; line-height: 1.2; color: #fff; margin: 0 0 0.5rem; letter-spacing: 0.5px; }
.ac-tile__desc { color: rgba(255,255,255,0.65); font-size: 0.82rem; line-height: 1.5; max-height: 0; opacity: 0; overflow: hidden; transition: max-height 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.4s, margin 0.55s; -webkit-transition: max-height 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.4s, margin 0.55s; margin-bottom: 0; }
.ac-tile__cta { display: -webkit-inline-flex; display: inline-flex; -webkit-align-items: center; align-items: center; gap: 0.5rem; font-family: 'Cinzel', serif; font-size: 0.62rem; letter-spacing: 2.5px; text-transform: uppercase; color: var(--ac-gold-light); padding: 0.55rem 0.9rem; border: 1px solid rgba(201,168,76,0.4); border-radius: 999px; background: rgba(201,168,76,0.08); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); transition: background 0.3s, border-color 0.3s, -webkit-transform 0.3s; transition: background 0.3s, border-color 0.3s, transform 0.3s; }
.ac-tile__cta::after { content: '\2192'; transition: -webkit-transform 0.3s; transition: transform 0.3s; }
.ac-tile:hover { -webkit-transform: translateY(-6px); transform: translateY(-6px); border-color: rgba(201,168,76,0.5); -webkit-box-shadow: 0 24px 50px rgba(0,0,0,0.55), 0 0 50px rgba(201,168,76,0.16); box-shadow: 0 24px 50px rgba(0,0,0,0.55), 0 0 50px rgba(201,168,76,0.16); }
.ac-tile:hover .ac-tile__img   { -webkit-transform: scale(1.12); transform: scale(1.12); -webkit-filter: saturate(1.05) brightness(0.85); filter: saturate(1.05) brightness(0.85); }
.ac-tile:hover .ac-tile__desc  { max-height: 100px; opacity: 1; margin-bottom: 0.9rem; }
.ac-tile:hover .ac-tile__cta   { background: rgba(201,168,76,0.18); border-color: var(--ac-gold-light); -webkit-transform: translateY(-2px); transform: translateY(-2px); }
.ac-tile:hover .ac-tile__cta::after { -webkit-transform: translateX(4px); transform: translateX(4px); }

/* ---- Team Section ---- */
#team { padding: 3rem 2rem; max-width: 1400px; margin: 0 auto; position: relative; }
#team::before {
    content: ''; display: block;
    width: 160px; height: 1px; margin: 0 auto 3rem;
    background: linear-gradient(90deg, transparent, var(--ac-gold), transparent);
}

.team-lead-card {
    display: -webkit-flex; display: flex;
    -webkit-align-items: center; align-items: center;
    gap: 2.5rem;
    background: linear-gradient(135deg, #0a0806, #141109, #0a0806);
    border: 1px solid rgba(201,168,76,0.4);
    padding: 2.8rem 2.6rem; margin-bottom: 2.5rem;
    position: relative; overflow: hidden;
    -webkit-clip-path: polygon(0 14px, 14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px));
    clip-path: polygon(0 14px, 14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px));
    -webkit-box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 60px rgba(201,168,76,0.1);
    box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 60px rgba(201,168,76,0.1);
}
.team-lead-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--ac-gold), transparent); pointer-events: none; }
.team-lead-card::after  { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--ac-gold), transparent); pointer-events: none; }
.team-lead-stripe { position: absolute; top: 0; left: 0; bottom: 0; width: 3px; background: linear-gradient(180deg, transparent, var(--ac-gold), transparent); pointer-events: none; }

.team-lead-avatar-wrap { -webkit-flex-shrink: 0; flex-shrink: 0; position: relative; z-index: 1; }
.team-lead-avatar {
    width: 96px; height: 96px; border-radius: 50%;
    background: linear-gradient(135deg, var(--ac-gold-light), var(--ac-gold) 55%, var(--dark-orange));
    display: -webkit-flex; display: flex;
    -webkit-align-items: center; align-items: center;
    -webkit-justify-content: center; justify-content: center;
    font-size: 2.4rem; font-weight: 900; font-family: 'Cinzel', serif;
    color: #fff !important; text-shadow: 0 2px 4px rgba(0,0,0,0.45);
    border: 2px solid rgba(201,168,76,0.6);
    -webkit-box-shadow: 0 0 40px rgba(201,168,76,0.3), inset 0 1px 0 rgba(255,255,255,0.22);
    box-shadow: 0 0 40px rgba(201,168,76,0.3), inset 0 1px 0 rgba(255,255,255,0.22);
}
.team-lead-content { flex: 1; position: relative; z-index: 1; }
.team-lead-badge {
    display: -webkit-inline-flex; display: inline-flex;
    -webkit-align-items: center; align-items: center;
    gap: 0.5rem;
    background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.35);
    padding: 0.28rem 0.9rem;
    font-family: 'Cinzel', serif; font-size: 0.62rem; font-weight: 700;
    letter-spacing: 3px; color: var(--ac-gold); text-transform: uppercase;
    margin-bottom: 0.7rem;
    -webkit-clip-path: polygon(0 4px, 4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px));
    clip-path: polygon(0 4px, 4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px));
}
.team-lead-badge::before { content: ''; width: 5px; height: 5px; background: var(--ac-gold); border-radius: 50%; -webkit-animation: pulseDot 1.5s ease infinite; animation: pulseDot 1.5s ease infinite; -webkit-flex-shrink: 0; flex-shrink: 0; }
.team-lead-name { font-family: 'Cinzel', serif; font-size: 2.1rem; font-weight: 900; color: var(--ac-gold-light); letter-spacing: 4px; margin-bottom: 0.8rem; line-height: 1; }
.team-lead-desc { color: var(--text-secondary); font-size: 0.93rem; line-height: 1.8; max-width: 600px; }

.team-contrib-label { display: -webkit-flex; display: flex; -webkit-align-items: center; align-items: center; gap: 1.2rem; margin-bottom: 1.4rem; }
.team-contrib-label .tcl-line { flex: 1; height: 1px; background: rgba(201,168,76,0.18); }
.team-contrib-label .tcl-text { font-family: 'Cinzel', serif; font-size: 0.65rem; letter-spacing: 4.5px; text-transform: uppercase; color: rgba(201,168,76,0.48); white-space: nowrap; }

.team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.1rem; }

.team-card {
    background: linear-gradient(160deg, #0c0a06, #14120a, #0c0a06);
    border: 1px solid rgba(201,168,76,0.18);
    overflow: hidden;
    -webkit-clip-path: polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px));
    clip-path: polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px));
    transition: -webkit-transform 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, -webkit-box-shadow 0.45s;
    transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, box-shadow 0.45s;
    position: relative;
    display: -webkit-flex; display: flex;
    -webkit-flex-direction: column; flex-direction: column;
}
.team-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.45), transparent); pointer-events: none; }
.team-card::after  { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(201,168,76,0.05), transparent); opacity: 0; transition: opacity 0.35s; -webkit-transition: opacity 0.35s; pointer-events: none; }
.team-card:hover { border-color: rgba(201,168,76,0.42); -webkit-transform: translateY(-4px); transform: translateY(-4px); -webkit-box-shadow: 0 16px 36px rgba(0,0,0,0.55), 0 0 28px rgba(201,168,76,0.16); box-shadow: 0 16px 36px rgba(0,0,0,0.55), 0 0 28px rgba(201,168,76,0.16); }
.team-card:hover::after { opacity: 1; }

.team-card-inner { padding: 1.5rem 1.4rem 1.6rem; display: -webkit-flex; display: flex; -webkit-flex-direction: column; flex-direction: column; flex: 1; position: relative; z-index: 1; }
.team-card-top { display: -webkit-flex; display: flex; -webkit-align-items: center; align-items: center; gap: 0.9rem; margin-bottom: 0.9rem; }
.team-card-avatar {
    width: 50px; height: 50px; border-radius: 50%;
    background: linear-gradient(135deg, var(--ac-gold-light), var(--ac-gold) 55%, var(--dark-orange));
    display: -webkit-flex; display: flex;
    -webkit-align-items: center; align-items: center;
    -webkit-justify-content: center; justify-content: center;
    font-size: 1.2rem; font-weight: 900; font-family: 'Cinzel', serif;
    color: #fff !important; text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    border: 1px solid rgba(201,168,76,0.55);
    -webkit-box-shadow: 0 0 16px rgba(201,168,76,0.2), inset 0 1px 0 rgba(255,255,255,0.22);
    box-shadow: 0 0 16px rgba(201,168,76,0.2), inset 0 1px 0 rgba(255,255,255,0.22);
    -webkit-flex-shrink: 0; flex-shrink: 0;
}
.team-card-name { font-family: 'Cinzel', serif; font-size: 0.95rem; font-weight: 700; color: var(--ac-gold-light); letter-spacing: 0.5px; margin: 0 0 0.3rem; line-height: 1.2; }
.team-role {
    display: inline-block;
    background: rgba(201,168,76,0.07); border: 1px solid rgba(201,168,76,0.2);
    color: rgba(201,168,76,0.75); font-size: 0.58rem;
    padding: 0.14rem 0.55rem;
    font-family: 'Cinzel', serif; letter-spacing: 1px; text-transform: uppercase;
    -webkit-clip-path: polygon(0 3px, 3px 0, calc(100% - 3px) 0, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px));
    clip-path: polygon(0 3px, 3px 0, calc(100% - 3px) 0, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px));
}
.team-card p { color: var(--text-secondary); font-size: 0.82rem; line-height: 1.65; flex: 1; }

/* ---- Try the Game Section ---- */
.trygame-section {
    padding: 4rem 2rem 5rem;
    max-width: 1100px;
    margin: 0 auto;
}

.trygame-chamber {
    position: relative;
    background: linear-gradient(160deg, #0c0a06, #141209, #0e0b07);
    border: 1px solid rgba(201,168,76,0.38);
    padding: 3.5rem 3.5rem 3rem;
    -webkit-clip-path: polygon(0 18px, 18px 0, calc(100% - 18px) 0, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0 calc(100% - 18px));
    clip-path: polygon(0 18px, 18px 0, calc(100% - 18px) 0, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0 calc(100% - 18px));
    -webkit-box-shadow: 0 0 80px rgba(201,168,76,0.1), 0 40px 80px rgba(0,0,0,0.65);
    box-shadow: 0 0 80px rgba(201,168,76,0.1), 0 40px 80px rgba(0,0,0,0.65);
    text-align: center;
    overflow: hidden;
}
.trygame-chamber::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--ac-gold), transparent); pointer-events: none; }
.trygame-chamber::after  { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--ac-gold), transparent); pointer-events: none; }

.trygame-corner { position: absolute; width: 28px; height: 28px; border-color: rgba(201,168,76,0.65); border-style: solid; pointer-events: none; z-index: 2; }
.trygame-corner.tl { top: 12px; left: 12px; border-width: 2px 0 0 2px; }
.trygame-corner.tr { top: 12px; right: 12px; border-width: 2px 2px 0 0; }
.trygame-corner.bl { bottom: 12px; left: 12px; border-width: 0 0 2px 2px; }
.trygame-corner.br { bottom: 12px; right: 12px; border-width: 0 2px 2px 0; }

.trygame-ornament {
    display: -webkit-flex; display: flex;
    -webkit-align-items: center; align-items: center;
    -webkit-justify-content: center; justify-content: center;
    gap: 0.6rem; margin-bottom: 1.2rem;
}
.trygame-ornament .tgo-line { -webkit-flex: 0 1 100px; flex: 0 1 100px; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4)); }
.trygame-ornament .tgo-line.r { background: linear-gradient(90deg, rgba(201,168,76,0.4), transparent); }
.trygame-ornament .tgo-gem { color: var(--ac-gold); font-size: 0.52rem; }

.trygame-badge {
    display: -webkit-inline-flex; display: inline-flex;
    -webkit-align-items: center; align-items: center;
    gap: 0.6rem;
    background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.55);
    padding: 0.4rem 1.3rem;
    font-family: 'Cinzel', serif; font-size: 0.65rem; font-weight: 700;
    letter-spacing: 4px; color: var(--ac-accent-light); text-transform: uppercase;
    -webkit-clip-path: polygon(0 4px, 4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px));
    clip-path: polygon(0 4px, 4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px));
    position: relative; z-index: 1;
    -webkit-box-shadow: 0 0 20px rgba(201,168,76,0.2);
    box-shadow: 0 0 20px rgba(201,168,76,0.2);
    margin-bottom: 1rem;
}
.trygame-badge::before {
    content: ''; width: 7px; height: 7px;
    background: var(--ac-accent-light); border-radius: 50%;
    -webkit-animation: pulseDot 1.5s ease infinite; animation: pulseDot 1.5s ease infinite;
    -webkit-flex-shrink: 0; flex-shrink: 0;
    -webkit-box-shadow: 0 0 8px rgba(201,168,76,0.8);
    box-shadow: 0 0 8px rgba(201,168,76,0.8);
}

.trygame-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(2rem, 5vw, 3.6rem);
    font-weight: 900;
    background: linear-gradient(135deg, #fff 20%, var(--ac-gold-light) 55%, var(--ac-gold) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 6px; margin-bottom: 0.4rem; line-height: 1.1;
    position: relative; z-index: 1;
}
.trygame-sub {
    font-family: 'Cinzel', serif;
    font-size: 0.72rem; letter-spacing: 4px;
    color: rgba(201,168,76,0.45); text-transform: uppercase;
    position: relative; z-index: 1;
}

.trygame-desc {
    color: #c0ae88; font-size: 0.97rem;
    max-width: 680px; margin: 0 auto;
    line-height: 1.9; position: relative; z-index: 1;
    padding: 1.2rem 1.4rem;
    background: rgba(201,168,76,0.04);
    border-left: 2px solid rgba(201,168,76,0.35);
    text-align: left;
}

.trygame-features {
    display: -webkit-flex; display: flex;
    -webkit-justify-content: center; justify-content: center;
    -webkit-flex-wrap: wrap; flex-wrap: wrap;
    gap: 1.2rem 2.5rem;
    margin: 2rem auto 2.5rem;
    position: relative; z-index: 1;
}
.tgf-item {
    display: -webkit-flex; display: flex;
    -webkit-align-items: center; align-items: center;
    gap: 0.6rem;
    font-family: 'Cinzel', serif; font-size: 0.72rem;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--ac-gold-light);
}
.tgf-icon { color: var(--ac-gold); font-size: 0.55rem; }

.trygame-btn-wrap { position: relative; z-index: 1; }

/* ---- Trailer ---- */
#trailer { padding: 3rem 2rem; max-width: 1050px; margin: 0 auto; text-align: center; }

.trailer-label {
    display: -webkit-inline-flex; display: inline-flex;
    -webkit-align-items: center; align-items: center;
    gap: 0.6rem;
    background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.3);
    border-radius: 2px; padding: 0.45rem 1.2rem;
    font-size: 0.68rem; font-weight: 700; font-family: 'Cinzel', serif;
    color: var(--ac-gold); letter-spacing: 4px; text-transform: uppercase; margin-bottom: 1.2rem;
}
.trailer-label::before { content: ''; display: inline-block; width: 6px; height: 6px; background: var(--ac-gold); -webkit-clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); -webkit-animation: pulseDot 1.5s ease infinite; animation: pulseDot 1.5s ease infinite; }
.trailer-title { font-size: clamp(2.2rem, 5vw, 4.2rem); font-weight: 900; font-family: 'Cinzel', serif; letter-spacing: 5px; line-height: 1.05; margin-bottom: 0.8rem; background: linear-gradient(135deg, #fff 30%, var(--ac-gold-light)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.trailer-subtitle { color: var(--text-secondary); font-size: 1.05rem; margin-bottom: 2.8rem; }

.trailer-frame-wrap {
    position: relative; border-radius: 2px; padding: 3px;
    background: linear-gradient(135deg, rgba(201,168,76,0.7), rgba(201,168,76,0.05) 50%, rgba(201,168,76,0.7));
    background-size: 300% 300%;
    -webkit-animation: borderShift 5s ease infinite;
    animation: borderShift 5s ease infinite;
    -webkit-box-shadow: 0 36px 70px rgba(0,0,0,0.7), 0 0 70px rgba(201,168,76,0.1);
    box-shadow: 0 36px 70px rgba(0,0,0,0.7), 0 0 70px rgba(201,168,76,0.1);
    -webkit-clip-path: polygon(0 12px, 12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px));
    clip-path: polygon(0 12px, 12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px));
}
.trailer-frame-inner { overflow: hidden; background: #000; position: relative; aspect-ratio: 16/9; border-radius: 2px; }
.trailer-frame-inner iframe { width: 100%; height: 100%; position: absolute; top: 0; left: 0; border: none; display: block; }
.trailer-corner { position: absolute; width: 20px; height: 20px; border-color: var(--ac-gold); border-style: solid; z-index: 2; pointer-events: none; }
.trailer-corner.tl { top: -2px;    left: -2px;   border-width: 2px 0 0 2px; }
.trailer-corner.tr { top: -2px;    right: -2px;  border-width: 2px 2px 0 0; }
.trailer-corner.bl { bottom: -2px; left: -2px;   border-width: 0 0 2px 2px; }
.trailer-corner.br { bottom: -2px; right: -2px;  border-width: 0 2px 2px 0; }

/* ---- Footer ---- */
footer { background: #090806; padding: 3rem 2rem 2rem; text-align: center; border-top: 1px solid rgba(201,168,76,0.12); }
.footer-content { max-width: 1400px; margin: 0 auto; }
.footer-links { display: -webkit-flex; display: flex; -webkit-flex-direction: row; flex-direction: row; -webkit-flex-wrap: wrap; flex-wrap: wrap; gap: 1.6rem; -webkit-justify-content: center; justify-content: center; margin-bottom: 1.6rem; }
.footer-links a { color: var(--text-secondary); text-decoration: none; font-family: 'Cinzel', serif; font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; transition: color 0.3s; -webkit-transition: color 0.3s; touch-action: manipulation; }
.footer-links a:hover { color: var(--ac-gold-light); }
.copyright { color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 0.6rem; }
.developer-credit { font-size: 0.9rem; color: var(--ac-gold); font-weight: 700; font-family: 'Cinzel', serif; letter-spacing: 2px; text-shadow: 0 0 12px rgba(201,168,76,0.3); }

/* ---- Overlays ---- */
.codex-overlay {
    position: fixed; inset: 0; z-index: 9000;
    display: -webkit-flex; display: flex;
    -webkit-align-items: flex-start; align-items: flex-start;
    -webkit-justify-content: center; justify-content: center;
    background: rgba(5,4,2,0.97);
    opacity: 0; pointer-events: none; visibility: hidden;
    transition: opacity 0.45s ease, visibility 0.45s ease;
    -webkit-transition: opacity 0.45s ease, visibility 0.45s ease;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: 2rem 1.5rem;
    overscroll-behavior: contain;
    -webkit-overscroll-behavior: contain;
}
.codex-overlay.open { opacity: 1; pointer-events: all; visibility: visible; }

.codex-panel {
    max-width: 1000px; width: 100%;
    position: relative; padding: 2.8rem 2.8rem 3.5rem;
    background: linear-gradient(160deg, #0e0c07, #14110a, #0e0c07);
    border: 1px solid rgba(201,168,76,0.35);
    margin: 2rem auto;
    -webkit-transform: translateY(35px); transform: translateY(35px);
    transition: -webkit-transform 0.45s ease; transition: transform 0.45s ease;
    -webkit-clip-path: polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px));
    clip-path: polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px));
    -webkit-box-shadow: 0 0 80px rgba(201,168,76,0.12), 0 40px 80px rgba(0,0,0,0.7);
    box-shadow: 0 0 80px rgba(201,168,76,0.12), 0 40px 80px rgba(0,0,0,0.7);
}
.codex-overlay.open .codex-panel { -webkit-transform: translateY(0); transform: translateY(0); }
.codex-panel::before {
    content: ''; position: absolute; inset: 8px;
    border: 1px solid rgba(201,168,76,0.08); pointer-events: none;
    -webkit-clip-path: polygon(0 14px, 14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px));
    clip-path: polygon(0 14px, 14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px));
}

.codex-close-btn {
    position: absolute; top: 1.2rem; right: 1.2rem;
    width: 40px; height: 40px;
    display: -webkit-flex; display: flex;
    -webkit-align-items: center; align-items: center;
    -webkit-justify-content: center; justify-content: center;
    background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.3);
    color: var(--ac-gold); font-size: 1rem; cursor: pointer;
    transition: all 0.3s; -webkit-transition: all 0.3s; z-index: 10;
    -webkit-clip-path: polygon(0 5px, 5px 0, calc(100% - 5px) 0, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 0 calc(100% - 5px));
    clip-path: polygon(0 5px, 5px 0, calc(100% - 5px) 0, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 0 calc(100% - 5px));
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none; appearance: none;
}
.codex-close-btn:hover { background: rgba(201,168,76,0.2); border-color: var(--ac-gold-light); color: #fff; }

.codex-header { text-align: center; margin-bottom: 2.4rem; }
.codex-header-ornament { display: -webkit-flex; display: flex; -webkit-align-items: center; align-items: center; gap: 1rem; margin-bottom: 1rem; }
.codex-header-ornament .cho-line   { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3)); }
.codex-header-ornament .cho-line.r { background: linear-gradient(90deg, rgba(201,168,76,0.3), transparent); }
.codex-header-ornament .cho-diamond { color: var(--ac-gold); font-size: 0.65rem; }

.codex-badge { display: -webkit-inline-flex; display: inline-flex; -webkit-align-items: center; align-items: center; gap: 0.6rem; background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.28); border-radius: 2px; padding: 0.4rem 1.2rem; font-size: 0.66rem; font-weight: 600; font-family: 'Cinzel', serif; color: var(--ac-gold); letter-spacing: 4px; text-transform: uppercase; margin-bottom: 1.2rem; }
.codex-badge::before { content: ''; width: 5px; height: 5px; background: var(--ac-gold); -webkit-clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); }
.codex-main-title { font-family: 'Cinzel', serif; font-size: clamp(1.8rem, 5vw, 3.5rem); font-weight: 900; letter-spacing: 6px; color: var(--ac-gold-light); margin-bottom: 0.5rem; line-height: 1.1; }
.codex-sub-title  { font-family: 'Cinzel', serif; font-size: 0.82rem; letter-spacing: 3px; color: rgba(201,168,76,0.48); text-transform: uppercase; }

.codex-illustration { border: 1px solid rgba(201,168,76,0.2); overflow: hidden; margin-bottom: 2rem; position: relative; background: #0a0806; -webkit-clip-path: polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px)); clip-path: polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px)); }
.codex-illustration img { width: 100%; max-height: 300px; object-fit: cover; display: block; opacity: 0.82; transition: opacity 0.4s, -webkit-transform 0.5s; transition: opacity 0.4s, transform 0.5s; }
.codex-illustration:hover img { opacity: 1; -webkit-transform: scale(1.02); transform: scale(1.02); }
.codex-illustration-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 0.6rem 1.2rem; background: linear-gradient(to top, rgba(10,8,6,0.92), transparent); font-family: 'Cinzel', serif; font-size: 0.68rem; letter-spacing: 2px; color: rgba(201,168,76,0.62); text-transform: uppercase; }

.codex-intro-text { color: #c0b08a; line-height: 1.9; font-size: 0.95rem; margin-bottom: 2rem; padding: 1.2rem 1.4rem; background: rgba(201,168,76,0.05); border-left: 2px solid var(--ac-gold); }
.codex-legend { display: -webkit-flex; display: flex; gap: 1.4rem; -webkit-flex-wrap: wrap; flex-wrap: wrap; margin-bottom: 1.2rem; }
.legend-item { display: -webkit-flex; display: flex; -webkit-align-items: center; align-items: center; gap: 0.5rem; font-size: 0.72rem; font-family: 'Cinzel', serif; color: rgba(201,168,76,0.52); letter-spacing: 1px; }
.legend-item .legend-bar { width: 16px; height: 3px; border-radius: 1px; }

.codex-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; margin-bottom: 2.2rem; }
.codex-table-wrap::-webkit-scrollbar { height: 3px; }
.codex-table-wrap::-webkit-scrollbar-thumb { background: var(--ac-gold-dim); border-radius: 2px; }
.codex-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
.codex-table thead tr { background: rgba(201,168,76,0.09); border-bottom: 1px solid rgba(201,168,76,0.3); }
.codex-table thead th { padding: 1rem 1.2rem; text-align: left; font-family: 'Cinzel', serif; font-size: 0.68rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--ac-gold); }
.codex-table tbody tr { border-bottom: 1px solid rgba(201,168,76,0.065); transition: background 0.2s; -webkit-transition: background 0.2s; }
.codex-table tbody tr:nth-child(even) { background: rgba(201,168,76,0.02); }
.codex-table tbody tr:hover { background: rgba(201,168,76,0.07); }
.codex-table tbody tr.clan-prophet  { background: rgba(201,168,76,0.06); border-left: 2px solid var(--ac-gold); }
.codex-table tbody tr.clan-opponent  { border-left: 2px solid rgba(255,70,40,0.4); }
.codex-table tbody tr.clan-companion { border-left: 2px solid var(--ac-gold-light); }
.codex-table td { padding: 0.9rem 1.2rem; color: #c8b98a; vertical-align: top; line-height: 1.55; }
.codex-table td:first-child { font-family: 'Cinzel', serif; font-weight: 600; color: var(--ac-gold-light); font-size: 0.88rem; }

.clan-tag { display: inline-block; font-size: 0.62rem; padding: 0.08rem 0.5rem; border-radius: 2px; font-family: 'Cinzel', serif; letter-spacing: 0.7px; font-weight: 600; white-space: nowrap; }
.clan-tag.hollow    { background: rgba(201,168,76,0.1);  border: 1px solid rgba(201,168,76,0.22); color: var(--ac-gold); }
.clan-tag.outskirts { background: rgba(140,120,70,0.08); border: 1px solid rgba(140,120,70,0.18); color: #9e8c5a; }

.codex-footnote { padding-top: 1.8rem; border-top: 1px solid rgba(201,168,76,0.1); font-size: 0.8rem; color: rgba(201,168,76,0.36); line-height: 1.7; font-style: italic; }

/* Devlog cards */
.devlog-grid { display: -webkit-flex; display: flex; -webkit-flex-direction: column; flex-direction: column; gap: 20px; }

.devlog-card {
    display: grid; grid-template-columns: 260px 1fr;
    border-radius: 12px; overflow: hidden;
    background: linear-gradient(160deg, #11100a, #191610);
    border: 1px solid rgba(201,168,76,0.18);
    transition: all 0.35s ease; -webkit-transition: all 0.35s ease;
    position: relative; min-height: 160px;
}
.devlog-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--ac-gold), transparent); opacity: 0; transition: opacity 0.35s; -webkit-transition: opacity 0.35s; pointer-events: none; }
.devlog-card:hover { border-color: rgba(201,168,76,0.55); -webkit-transform: translateY(-4px); transform: translateY(-4px); -webkit-box-shadow: 0 18px 44px rgba(0,0,0,0.6), 0 0 28px rgba(201,168,76,0.22); box-shadow: 0 18px 44px rgba(0,0,0,0.6), 0 0 28px rgba(201,168,76,0.22); }
.devlog-card:hover::after { opacity: 1; }

.devlog-img-wrap { position: relative; overflow: hidden; }
.devlog-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; opacity: 0.85; transition: -webkit-transform 0.5s ease, opacity 0.3s ease; transition: transform 0.5s ease, opacity 0.3s ease; }
.devlog-card:hover .devlog-img-wrap img { -webkit-transform: scale(1.06); transform: scale(1.06); opacity: 1; }
.devlog-num-badge { position: absolute; top: 8px; left: 8px; background: rgba(0,0,0,0.7); color: var(--ac-accent-light); padding: 0.28rem 0.7rem; border-radius: 999px; font-size: 0.72rem; font-weight: 700; font-family: 'Cinzel', serif; letter-spacing: 1px; z-index: 2; border: 1px solid rgba(201,168,76,0.3); }

.devlog-card-body { display: -webkit-flex; display: flex; -webkit-flex-direction: column; flex-direction: column; -webkit-justify-content: center; justify-content: center; padding: 1.4rem 1.6rem; gap: 0.3rem; }
.devlog-card-type  { font-family: 'Cinzel', serif; font-size: 0.62rem; letter-spacing: 3px; text-transform: uppercase; color: var(--ac-gold); opacity: 0.85; display: block; }
.devlog-card-title { font-family: 'Cinzel', serif; font-size: 1.15rem; font-weight: 700; color: var(--ac-gold-light); letter-spacing: 0.5px; margin: 0.2rem 0 0.4rem; line-height: 1.2; }
.devlog-card-desc  { font-size: 0.88rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 0.8rem; flex: 1; }

.devlog-open-link { display: -webkit-inline-flex; display: inline-flex; -webkit-align-items: center; align-items: center; gap: 0.4rem; font-family: 'Cinzel', serif; font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; color: var(--ac-gold-light); text-decoration: none; padding: 0.5rem 1rem; border: 1px solid rgba(201,168,76,0.3); border-radius: 999px; background: rgba(201,168,76,0.06); transition: all 0.3s; -webkit-transition: all 0.3s; -webkit-align-self: flex-start; align-self: flex-start; touch-action: manipulation; }
.devlog-open-link::after { content: '\2192'; transition: -webkit-transform 0.3s; transition: transform 0.3s; }
.devlog-open-link:hover { background: rgba(201,168,76,0.18); border-color: var(--ac-gold-light); color: #fff; }
.devlog-open-link:hover::after { -webkit-transform: translateX(4px); transform: translateX(4px); }

/* ---- Scroll Indicator ---- */
.scroll-indicator { position: absolute; bottom: 0.6rem; left: 50%; -webkit-transform: translateX(-50%); transform: translateX(-50%); -webkit-animation: bounce 2s infinite; animation: bounce 2s infinite; transition: opacity 0.3s; -webkit-transition: opacity 0.3s; }
.scroll-indicator span { display: block; width: 22px; height: 36px; border: 1px solid var(--ac-gold); border-radius: 11px; position: relative; }
.scroll-indicator span::before { content: ''; position: absolute; top: 6px; left: 50%; -webkit-transform: translateX(-50%); transform: translateX(-50%); width: 3px; height: 6px; background: var(--ac-gold); border-radius: 2px; -webkit-animation: scrollDot 2s infinite; animation: scrollDot 2s infinite; }

/* Arabic ﷺ symbol */
.ar-saw { font-family: 'Noto Naskh Arabic', 'Amiri', serif; font-weight: 600; display: inline-block; line-height: 1; -webkit-transform: translateY(0.05em); transform: translateY(0.05em); margin: 0 0.1em; color: var(--ac-gold-light); }
em, i, .translit { font-family: 'Noto Serif', 'Inter', serif; font-style: italic; }

/* ---- Fade In ---- */
.fade-in { opacity: 0; -webkit-transform: translateY(14px); transform: translateY(14px); transition: opacity 0.6s ease, -webkit-transform 0.6s ease; transition: opacity 0.6s ease, transform 0.6s ease; }
.fade-in.visible { opacity: 1; -webkit-transform: translateY(0) !important; transform: translateY(0) !important; }
.story-grid     .fade-in.visible:nth-child(2) { transition-delay: 0.08s; }
.story-grid     .fade-in.visible:nth-child(3) { transition-delay: 0.16s; }
.story-grid     .fade-in.visible:nth-child(4) { transition-delay: 0.24s; }
.community-grid .fade-in.visible:nth-child(2) { transition-delay: 0.08s; }
.community-grid .fade-in.visible:nth-child(3) { transition-delay: 0.16s; }
.community-grid .fade-in.visible:nth-child(4) { transition-delay: 0.24s; }
.team-grid .fade-in.visible:nth-child(n+2) { transition-delay: 0.06s; }
.team-grid .fade-in.visible:nth-child(n+4) { transition-delay: 0.12s; }
.team-grid .fade-in.visible:nth-child(n+6) { transition-delay: 0.18s; }

/* ---- Animations ---- */
@keyframes fadeInUp   { from { opacity: 0; -webkit-transform: translateY(30px); transform: translateY(30px); } to { opacity: 1; -webkit-transform: translateY(0); transform: translateY(0); } }
@-webkit-keyframes fadeInUp { from { opacity: 0; -webkit-transform: translateY(30px); } to { opacity: 1; -webkit-transform: translateY(0); } }
@keyframes titleShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
@-webkit-keyframes titleShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
@keyframes shimmer    { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@-webkit-keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes borderShift{ 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
@-webkit-keyframes borderShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
@keyframes pulseDot   { 0%, 100% { opacity: 1; -webkit-transform: scale(1); transform: scale(1); } 50% { opacity: 0.4; -webkit-transform: scale(0.6); transform: scale(0.6); } }
@-webkit-keyframes pulseDot { 0%, 100% { opacity: 1; -webkit-transform: scale(1); } 50% { opacity: 0.4; -webkit-transform: scale(0.6); } }
@keyframes bounce     { 0%, 20%, 50%, 80%, 100% { -webkit-transform: translateX(-50%) translateY(0); transform: translateX(-50%) translateY(0); } 40% { -webkit-transform: translateX(-50%) translateY(-8px); transform: translateX(-50%) translateY(-8px); } 60% { -webkit-transform: translateX(-50%) translateY(-4px); transform: translateX(-50%) translateY(-4px); } }
@-webkit-keyframes bounce { 0%, 20%, 50%, 80%, 100% { -webkit-transform: translateX(-50%) translateY(0); } 40% { -webkit-transform: translateX(-50%) translateY(-8px); } 60% { -webkit-transform: translateX(-50%) translateY(-4px); } }
@keyframes scrollDot  { 0% { opacity: 0; top: 6px; } 50% { opacity: 1; } 100% { opacity: 0; top: 22px; } }
@keyframes star-twinkle { 0% { opacity: 0.4; } 50% { opacity: 0.95; } 100% { opacity: 0.5; } }
@-webkit-keyframes star-twinkle { 0% { opacity: 0.4; } 50% { opacity: 0.95; } 100% { opacity: 0.5; } }
@keyframes loaderPulse { 0%, 100% { -webkit-filter: drop-shadow(0 0 20px rgba(201,168,76,0.4)); filter: drop-shadow(0 0 20px rgba(201,168,76,0.4)); } 50% { -webkit-filter: drop-shadow(0 0 40px rgba(201,168,76,0.7)); filter: drop-shadow(0 0 40px rgba(201,168,76,0.7)); } }
@-webkit-keyframes loaderPulse { 0%, 100% { -webkit-filter: drop-shadow(0 0 20px rgba(201,168,76,0.4)); } 50% { -webkit-filter: drop-shadow(0 0 40px rgba(201,168,76,0.7)); } }
@keyframes loaderTextFade { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
@-webkit-keyframes loaderTextFade { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }

/* ---- Backdrop Support ---- */
@supports (backdrop-filter: blur(1px)) {
    nav#navbar { -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px); background: rgba(10,8,6,0.9); }
}
body.zoom-extreme nav#navbar { -webkit-backdrop-filter: none !important; backdrop-filter: none !important; background: rgba(10,8,6,0.97) !important; }

/* ---- Desktop ---- */
@media (min-width: 1200px) {
    .hero { min-height: 95vh; padding: 4.5rem 2rem 4rem; }
    .hero-logo-img { width: clamp(420px, 38vw, 580px); }
    .hero h1 { font-size: clamp(2.8rem, 4.5vw, 4.5rem); }
    .hero p  { font-size: 1.1rem; margin-bottom: 1.8rem; }
    .team-grid { grid-template-columns: repeat(4, 1fr); }
}
@media (min-width: 821px) {
    html { font-size: 14.5px; }
    section, footer { padding-top: 4rem !important; padding-bottom: 4rem !important; }
    .bg-slide { -webkit-filter: brightness(0.58) saturate(1.05) !important; filter: brightness(0.58) saturate(1.05) !important; }
}

/* ---- Tablet ---- */
@media (max-width: 1024px) {
    .nav-container { padding: 0 1.5rem; }
    .story-grid     { grid-template-columns: repeat(2, 1fr); }
    .community-grid { grid-template-columns: repeat(2, 1fr); }
    .team-grid      { grid-template-columns: repeat(3, 1fr); }
    .devlog-card    { grid-template-columns: 200px 1fr; }
    .trygame-chamber { padding: 2.5rem 2rem; }
}

/* ---- Mobile ---- */
@media (max-width: 768px) {
    html { -webkit-overflow-scrolling: touch; }

    .nav-container { -webkit-flex-direction: row; flex-direction: row; -webkit-flex-wrap: nowrap; flex-wrap: nowrap; -webkit-justify-content: space-between; justify-content: space-between; }
    .nav-toggle    { display: -webkit-flex; display: flex; }

    .nav-links {
        display: -webkit-flex; display: flex;
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        height: 100dvh; height: -webkit-fill-available;
        -webkit-flex-direction: column; flex-direction: column;
        -webkit-justify-content: center; justify-content: center;
        -webkit-align-items: center; align-items: center;
        gap: 0; background: rgba(10,8,6,0.98);
        -webkit-backdrop-filter: none; backdrop-filter: none;
        padding: 0; z-index: 999; overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        opacity: 0; visibility: hidden; pointer-events: none;
        -webkit-transform: translateY(-12px); transform: translateY(-12px);
        transition: opacity 0.38s ease, visibility 0.38s ease, -webkit-transform 0.38s ease;
        transition: opacity 0.38s ease, visibility 0.38s ease, transform 0.38s ease;
    }
    .nav-links.open { opacity: 1; visibility: visible; pointer-events: all; -webkit-transform: translateY(0); transform: translateY(0); }
    .nav-links li   { width: 100%; text-align: center; opacity: 0; -webkit-transform: translateY(14px); transform: translateY(14px); transition: opacity 0.3s ease, -webkit-transform 0.3s ease; transition: opacity 0.3s ease, transform 0.3s ease; }
    .nav-links.open li:nth-child(1) { opacity: 1; -webkit-transform: none; transform: none; transition-delay: 0.08s; }
    .nav-links.open li:nth-child(2) { opacity: 1; -webkit-transform: none; transform: none; transition-delay: 0.14s; }
    .nav-links.open li:nth-child(3) { opacity: 1; -webkit-transform: none; transform: none; transition-delay: 0.20s; }
    .nav-links.open li:nth-child(4) { opacity: 1; -webkit-transform: none; transform: none; transition-delay: 0.26s; }
    .nav-links.open li:nth-child(5) { opacity: 1; -webkit-transform: none; transform: none; transition-delay: 0.32s; }
    .nav-links.open li:nth-child(6) { opacity: 1; -webkit-transform: none; transform: none; transition-delay: 0.38s; }
    .nav-links.open li:nth-child(7) { opacity: 1; -webkit-transform: none; transform: none; transition-delay: 0.44s; }
    .nav-links a { display: block; padding: 1rem 2rem; font-size: 0.9rem; letter-spacing: 3px; border-bottom: 1px solid rgba(201,168,76,0.07); text-align: center; touch-action: manipulation; }
    .nav-links a::after { display: none; }

    nav#navbar { padding: 0.6rem 0; }
    .hero { padding: 7.5rem 1.5rem 3.5rem; min-height: 100svh; }
    .hero h1 { font-size: clamp(1.8rem, 7vw, 3rem); letter-spacing: 1px; }
    .hero-logo-img { width: clamp(240px, 70vw, 340px); }
    section, #team, #trailer { padding: 2.5rem 1.5rem; }
    .cta-buttons { -webkit-flex-direction: column; flex-direction: column; -webkit-align-items: center; align-items: center; }
    .btn { width: 100%; max-width: 340px; -webkit-justify-content: center; justify-content: center; }
    .story-grid, .community-grid { grid-template-columns: 1fr; }
    .team-grid { grid-template-columns: repeat(2, 1fr); }
    .team-lead-card { -webkit-flex-direction: column; flex-direction: column; text-align: center; gap: 1.4rem; padding: 1.8rem 1.5rem; }
    .team-lead-desc { text-align: left; }
    .team-contrib-label .tcl-line { display: none; }
    .community-card, .story-card { padding: 1.8rem 1.4rem; }
    .faq-question { padding: 1.4rem; font-size: 0.92rem; }
    .faq-answer { padding: 0 1.4rem; }
    .faq-item.active .faq-answer { padding: 0 1.4rem 1.4rem; }
    .footer-links { gap: 1rem; }
    .nav-logo-img { height: 28px; }
    .logo { font-size: 1.3rem; }
    .trailer-title { letter-spacing: 2px; }
    .codex-overlay { padding: 0; background: rgba(5,4,2,0.99); }
    .codex-panel { padding: 1.6rem 1rem 2.2rem; margin: 0; border-radius: 0; -webkit-clip-path: none; clip-path: none; }
    .codex-panel::before { display: none; }
    .codex-main-title { font-size: 1.5rem; letter-spacing: 2px; }
    .codex-table { font-size: 0.68rem; }
    .codex-table thead th { font-size: 0.53rem; padding: 0.6rem 0.65rem; }
    .codex-table td { padding: 0.55rem 0.65rem; }
    .codex-close-btn { top: 0.9rem; right: 0.9rem; width: 34px; height: 34px; }
    .ac-rail-header { padding: 0 1.2rem; }
    .ac-rail-track { padding: 0.3rem 1.2rem 1rem !important; scroll-padding-left: 1.2rem; }
    .ac-rail-track-wrap::before, .ac-rail-track-wrap::after { width: 40px; }
    .ac-tile { -webkit-flex: 0 0 75vw; flex: 0 0 75vw; aspect-ratio: 4/5.2; }
    .ac-tile__desc { max-height: 80px; opacity: 1; margin-bottom: 0.9rem; }
    .rail-controls { display: none; }
    .trygame-section   { padding: 2.5rem 1rem; }
    .trygame-chamber   { padding: 2rem 1.2rem 1.8rem; -webkit-clip-path: none; clip-path: none; border-radius: 12px; }
    .trygame-title     { font-size: 1.9rem; letter-spacing: 2px; }
    .trygame-btn-wrap .btn-mirage { width: 100%; }
    .trygame-desc { text-align: left; font-size: 0.9rem; }
    #team::before { margin-bottom: 2.5rem; }
    .story-card, .community-card, .team-card, .faq-item { -webkit-backdrop-filter: none !important; backdrop-filter: none !important; }
    .devlog-card { grid-template-columns: 1fr; }
    .devlog-img-wrap img { max-height: 200px; }
}

@media (max-width: 900px) { nav.ac-hud { display: none; } }

@media (max-width: 640px) {
    .team-lead-card   { padding: 1.6rem 1.2rem; }
    .team-lead-avatar { width: 72px; height: 72px; font-size: 1.8rem; }
    .team-lead-name   { font-size: 1.5rem; }
}

@media (max-width: 480px) {
    .hero h1 { font-size: 1.75rem; letter-spacing: 0.5px; }
    .hero p  { font-size: 0.95rem; }
    .section-title    { font-size: 1.7rem; }
    .section-subtitle { font-size: 0.95rem; }
    .community-icon   { width: 60px; height: 60px; }
    .team-grid { grid-template-columns: 1fr; }
    .btn-journey { font-size: 0.88rem; padding: 1rem 1.8rem; }
    .logo        { font-size: 1.25rem; }
    .nav-links a { font-size: 0.82rem; }
    .footer-links    { gap: 0.9rem; font-size: 0.68rem; }
    .hero-logo-img   { width: 260px; }
    .nav-logo-img    { height: 24px; }
    .trailer-title   { font-size: 1.85rem; letter-spacing: 1px; }
    .trygame-title   { font-size: 1.6rem; letter-spacing: 2px; }
    .trygame-features { gap: 1rem 1.5rem; }
}

@media (max-width: 360px) {
    .hero h1  { font-size: 1.55rem; }
    .section-title { font-size: 1.4rem; }
    .nav-links a   { font-size: 0.78rem; }
}

@media (hover: none) {
    .story-card:hover, .community-card:hover, .team-card:hover { -webkit-transform: none; transform: none; }
    .ac-tile:hover .ac-tile__desc { max-height: 80px; opacity: 1; margin-bottom: 0.9rem; }
}

@media (max-height: 500px) and (orientation: landscape) {
    nav#navbar { padding: 0.45rem 0; }
    .nav-logo-img { height: 24px; }
    .logo { font-size: 1.2rem; }
    .nav-links { max-height: 100dvh; overflow-y: auto; -webkit-overflow-scrolling: touch; -webkit-justify-content: flex-start; justify-content: flex-start; padding-top: 3.5rem; }
    .hero { min-height: 100svh; padding: 5rem 2rem 1.8rem; -webkit-align-items: flex-start; align-items: flex-start; }
    .hero-logo-img { width: clamp(110px, 20vw, 200px); }
    .hero h1 { font-size: clamp(1.5rem, 5vw, 2.4rem); margin-bottom: 0.6rem; }
    .hero p  { font-size: 0.9rem; margin-bottom: 1.2rem; }
    .cta-buttons { -webkit-flex-direction: row; flex-direction: row; -webkit-flex-wrap: wrap; flex-wrap: wrap; -webkit-justify-content: center; justify-content: center; gap: 0.8rem; }
    .btn { width: auto; max-width: none; }
    .btn-journey { padding: 0.8rem 1.6rem; font-size: 0.78rem; }
    .scroll-indicator, .hero-stars { display: none; }
    .story-grid, .community-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
    .team-lead-card { -webkit-flex-direction: column; flex-direction: column; gap: 1rem; }
    .team-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (prefers-reduced-motion: reduce) {
    .bg-slide { transition: none; -webkit-transition: none; }
    .fade-in, .fade-in.visible { transition: none !important; -webkit-transition: none !important; -webkit-transform: none !important; transform: none !important; }
    .section-title { -webkit-animation: none !important; animation: none !important; }
    .hero-stars::before, .hero-stars::after { -webkit-animation: none !important; animation: none !important; opacity: 0.5; }
    .ac-tile, .ac-tile__img, .ac-tile__desc, .ac-tile__cta { transition: none !important; -webkit-transition: none !important; }
    .scroll-progress__bar { -webkit-animation: none !important; animation: none !important; }
    .trailer-frame-wrap { -webkit-animation: none !important; animation: none !important; }
}
