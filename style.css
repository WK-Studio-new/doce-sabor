/* ============================================================
   DOCE SABOR — GELEIAS ARTESANAIS
   style.css
   Mobile-first | Rústico sofisticado | Vinho + Bege + Dourado
============================================================ */

/* ─────────────────────────────────────────────
   1. CUSTOM PROPERTIES (variáveis CSS)
───────────────────────────────────────────── */
:root {
  /* Cores principais */
  --wine:        #7A1C2E;
  --wine-dark:   #4a1018;
  --wine-light:  #a0273f;
  --beige:       #F5E6D3;
  --beige-dark:  #e8d0b5;
  --beige-light: #fdf5eb;
  --gold:        #C9A66B;
  --gold-dark:   #a8854d;
  --gold-light:  #dfc28e;

  /* Neutros */
  --white:    #ffffff;
  --text-dark:#2b1a0e;
  --text-mid: #5c3d2e;
  --text-soft:#8b6a52;

  /* Tipografia */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-script:  'Dancing Script', cursive;
  --font-body:    'Lato', sans-serif;

  /* Espaçamentos */
  --space-xs:  0.5rem;
  --space-sm:  1rem;
  --space-md:  2rem;
  --space-lg:  4rem;
  --space-xl:  7rem;

  /* Raios */
  --radius-sm: 6px;
  --radius-md: 14px;
  --radius-lg: 28px;
  --radius-xl: 56px;

  /* Transições */
  --transition: 0.3s ease;
  --transition-slow: 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  /* Sombras */
  --shadow-sm: 0 2px 8px rgba(122,28,46,.10);
  --shadow-md: 0 8px 32px rgba(122,28,46,.15);
  --shadow-lg: 0 20px 60px rgba(122,28,46,.20);
}

/* ─────────────────────────────────────────────
   2. RESET & BASE
───────────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: var(--font-body);
  background-color: var(--beige-light);
  color: var(--text-dark);
  line-height: 1.7;
  overflow-x: hidden;
}

img, svg { display: block; max-width: 100%; }
a { text-decoration: none; color: inherit; }
button { cursor: pointer; border: none; background: none; font-family: inherit; }
ul, ol { list-style: none; }

/* ─────────────────────────────────────────────
   3. TIPOGRAFIA GLOBAL
───────────────────────────────────────────── */
h1, h2, h3, h4 {
  font-family: var(--font-display);
  line-height: 1.2;
  color: var(--wine-dark);
}

em {
  font-style: italic;
  color: var(--wine);
}

p { color: var(--text-mid); }

/* ─────────────────────────────────────────────
   4. UTILITÁRIOS
───────────────────────────────────────────── */
.section-container {
  width: 100%;
  max-width: 1140px;
  margin-inline: auto;
  padding-inline: 1.25rem;
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-md);
}

.section-eyebrow {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold-dark);
  margin-bottom: 0.75rem;
}

.section-eyebrow--light { color: var(--gold-light); }

.section-title {
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  margin-top: 0.25rem;
}

/* ─────────────────────────────────────────────
   5. BOTÕES
───────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.8rem;
  border-radius: var(--radius-xl);
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.03em;
  transition: transform var(--transition), box-shadow var(--transition), background var(--transition);
  cursor: pointer;
}

.btn--primary {
  background: var(--wine);
  color: var(--white);
  box-shadow: 0 4px 20px rgba(122,28,46,.35);
}

.btn--primary:hover {
  background: var(--wine-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(122,28,46,.45);
}

.btn--primary:active { transform: translateY(0); }

.btn--large {
  padding: 1.1rem 2.4rem;
  font-size: 1.1rem;
}

.btn__icon { flex-shrink: 0; }

/* ─────────────────────────────────────────────
   6. NAVBAR
───────────────────────────────────────────── */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  background: transparent;
  transition: background var(--transition), box-shadow var(--transition);
}

.navbar.scrolled {
  background: rgba(245,230,211,.97);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 16px rgba(122,28,46,.10);
}

.navbar__inner {
  max-width: 1140px;
  margin-inline: auto;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.navbar__logo {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
}

.navbar__logo-script {
  font-family: var(--font-script);
  font-size: 1.8rem;
  color: var(--wine);
  line-height: 1;
}

.navbar__logo-serif {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--gold-dark);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* Links desktop */
.navbar__links {
  display: none;
  align-items: center;
  gap: 2rem;
}

.navbar__links a {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--text-dark);
  transition: color var(--transition);
}

.navbar__links a:hover { color: var(--wine); }

.navbar__cta-btn {
  background: var(--wine);
  color: var(--white) !important;
  padding: 0.5rem 1.3rem;
  border-radius: var(--radius-xl);
  transition: background var(--transition), transform var(--transition) !important;
}

.navbar__cta-btn:hover {
  background: var(--wine-dark) !important;
  transform: translateY(-1px);
}

/* Hamburguer */
.navbar__hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
  z-index: 110;
}

.navbar__hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--wine);
  border-radius: 2px;
  transition: transform var(--transition), opacity var(--transition);
}

.navbar__hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.navbar__hamburger.active span:nth-child(2) { opacity: 0; }
.navbar__hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Menu mobile */
.navbar__mobile-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--beige);
  position: fixed;
  inset: 0;
  z-index: 105;
  justify-content: center;
  transform: translateX(100%);
  transition: transform var(--transition-slow);
}

.navbar__mobile-menu.open { transform: translateX(0); }

.mobile-link {
  font-family: var(--font-display);
  font-size: 1.8rem;
  color: var(--text-dark);
  font-weight: 700;
  transition: color var(--transition);
}

.mobile-link:hover { color: var(--wine); }

.mobile-link--cta {
  color: var(--wine);
  border: 2px solid var(--wine);
  padding: 0.6rem 2rem;
  border-radius: var(--radius-xl);
  font-size: 1.2rem;
  margin-top: 1rem;
}

/* Desktop: mostrar links, esconder hamburguer */
@media (min-width: 768px) {
  .navbar__links  { display: flex; }
  .navbar__hamburger { display: none; }
  .navbar__mobile-menu { display: none !important; }
}

/* ─────────────────────────────────────────────
   7. HERO
───────────────────────────────────────────── */
.hero {
  position: relative;
  min-height: 100svh;
  background: linear-gradient(145deg, var(--beige) 0%, var(--beige-light) 60%, #f9efe4 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding-top: 80px;
}

/* Textura de fundo (ruído sutil) */
.hero__bg-texture {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");
  pointer-events: none;
}

/* Círculos decorativos */
.hero__bg-circle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.hero__bg-circle--1 {
  width: 520px; height: 520px;
  background: radial-gradient(circle, rgba(122,28,46,.08) 0%, transparent 70%);
  top: -100px; right: -80px;
}

.hero__bg-circle--2 {
  width: 320px; height: 320px;
  background: radial-gradient(circle, rgba(201,166,107,.12) 0%, transparent 70%);
  bottom: 40px; left: -60px;
}

/* Layout interno */
.hero__content {
  position: relative;
  z-index: 2;
  max-width: 1140px;
  margin-inline: auto;
  padding: var(--space-lg) 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

/* Texto */
.hero__text {
  text-align: center;
  max-width: 640px;
}

.hero__eyebrow {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold-dark);
  margin-bottom: 1rem;
}

.hero__title {
  font-size: clamp(2rem, 6vw, 3.4rem);
  margin-bottom: 1.25rem;
  color: var(--wine-dark);
}

.hero__subtitle {
  font-size: 1.05rem;
  color: var(--text-mid);
  margin-bottom: 1.8rem;
  line-height: 1.75;
}

.hero__cta {
  margin-bottom: 1.5rem;
  font-size: 1rem;
  padding: 1rem 2rem;
}

/* Selos */
.hero__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.badge {
  background: rgba(122,28,46,.08);
  border: 1px solid rgba(122,28,46,.15);
  color: var(--wine);
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-xl);
}

/* Visual / pote */
.hero__visual {
  position: relative;
  display: flex;
  justify-content: center;
}

.hero__jar-wrapper {
  position: relative;
  width: 260px;
}

.hero__jar-svg {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 20px 40px rgba(122,28,46,.25));
  animation: jarFloat 4s ease-in-out infinite;
}

@keyframes jarFloat {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}

.hero__jar-glow {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 60%, rgba(201,166,107,.25) 0%, transparent 65%);
  z-index: -1;
  transform: scale(1.2);
}

/* Scroll hint */
.hero__scroll-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-soft);
  opacity: 0.7;
}

.hero__scroll-arrow {
  width: 18px; height: 18px;
  border-right: 2px solid var(--text-soft);
  border-bottom: 2px solid var(--text-soft);
  transform: rotate(45deg);
  animation: scrollBounce 1.8s ease-in-out infinite;
}

@keyframes scrollBounce {
  0%, 100% { transform: rotate(45deg) translateY(0); }
  50%       { transform: rotate(45deg) translateY(5px); }
}

/* Desktop: lado a lado */
@media (min-width: 768px) {
  .hero__content {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--space-lg);
  }
  .hero__text { text-align: left; }
  .hero__badges { justify-content: flex-start; }
  .hero__jar-wrapper { width: 320px; }
}

/* ─────────────────────────────────────────────
   8. BENEFÍCIOS
───────────────────────────────────────────── */
.benefits {
  padding: var(--space-xl) 0;
  background: var(--white);
  position: relative;
}

.benefits::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--wine), var(--gold), var(--wine));
}

.benefits__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1rem;
}

@media (min-width: 480px)  { .benefits__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 900px)  { .benefits__grid { grid-template-columns: repeat(4,1fr); } }

/* Cartão de benefício */
.benefit-card {
  background: var(--beige-light);
  border: 1px solid var(--beige-dark);
  border-radius: var(--radius-md);
  padding: 1.75rem 1.5rem;
  text-align: center;
  transition: transform var(--transition), box-shadow var(--transition);
}

.benefit-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-md);
}

.benefit-card__icon-wrap {
  width: 70px; height: 70px;
  margin: 0 auto 1.2rem;
}

.benefit-card__icon-wrap svg {
  width: 100%; height: 100%;
}

.benefit-card__title {
  font-size: 1.05rem;
  margin-bottom: 0.6rem;
  color: var(--wine-dark);
}

.benefit-card__text {
  font-size: 0.9rem;
  color: var(--text-soft);
  line-height: 1.65;
}

/* ─────────────────────────────────────────────
   9. SOBRE O PRODUTO
───────────────────────────────────────────── */
.about {
  padding: var(--space-xl) 0;
  background: var(--beige);
  position: relative;
  overflow: hidden;
}

.about__bg-decor {
  position: absolute;
  top: -120px; right: -120px;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,166,107,.12) 0%, transparent 70%);
  pointer-events: none;
}

.about__inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  align-items: center;
}

/* Visual (círculos e cards flutuantes) */
.about__visual {
  position: relative;
  width: 260px; height: 260px;
  flex-shrink: 0;
}

.about__visual-ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px dashed var(--gold);
  opacity: 0.4;
  animation: ringRotate 20s linear infinite;
}

.about__visual-ring--outer {
  inset: 0;
}

.about__visual-ring--inner {
  inset: 30px;
  animation-direction: reverse;
  animation-duration: 14s;
}

@keyframes ringRotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.about__visual-card {
  position: absolute;
  background: var(--wine);
  color: var(--white);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  text-align: center;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}

.about__visual-card--2 {
  top: 5%; left: 60%;
  background: var(--gold-dark);
  transform: none;
}

.about__visual-card--3 {
  top: 70%; left: 5%;
  background: var(--wine-dark);
  transform: none;
}

.about__visual-number {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1;
}

.about__visual-label {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.85;
}

/* Texto */
.about__text p {
  font-size: 1rem;
  margin-bottom: 1.2rem;
  max-width: 540px;
}

.about__pillars {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.about__pillar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(122,28,46,.07);
  border: 1px solid rgba(122,28,46,.12);
  color: var(--wine-dark);
  font-size: 0.88rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-xl);
}

.about__pillar-icon { font-size: 1rem; }

@media (min-width: 900px) {
  .about__inner { flex-direction: row; align-items: center; }
  .about__text { flex: 1; }
}

/* ─────────────────────────────────────────────
   10. USOS / SUGESTÕES DE CONSUMO
───────────────────────────────────────────── */
.uses {
  padding: var(--space-xl) 0;
  background: var(--white);
}

.uses__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-top: 1rem;
}

@media (min-width: 768px) {
  .uses__grid { grid-template-columns: repeat(4, 1fr); }
}

.use-card {
  background: var(--beige-light);
  border: 1px solid var(--beige-dark);
  border-radius: var(--radius-md);
  padding: 2rem 1.25rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: transform var(--transition), box-shadow var(--transition);
}

.use-card::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--wine), var(--gold));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition);
}

.use-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
.use-card:hover::after { transform: scaleX(1); }

.use-card__emoji {
  font-size: 2.8rem;
  margin-bottom: 1rem;
  display: block;
  line-height: 1;
}

.use-card h3 {
  font-size: 1rem;
  margin-bottom: 0.6rem;
  color: var(--wine-dark);
}

.use-card p {
  font-size: 0.85rem;
  color: var(--text-soft);
  line-height: 1.6;
}

/* ─────────────────────────────────────────────
   11. DEPOIMENTOS
───────────────────────────────────────────── */
.testimonials {
  padding: var(--space-xl) 0;
  background: var(--beige);
}

.testimonials__track-wrapper {
  overflow: hidden;
  margin-top: 1.5rem;
  border-radius: var(--radius-md);
}

.testimonials__track {
  display: flex;
  gap: 1.5rem;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.testimonial-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--beige-dark);
  flex: 0 0 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

@media (min-width: 640px)  { .testimonial-card { flex: 0 0 calc(50% - 0.75rem); } }
@media (min-width: 960px)  { .testimonial-card { flex: 0 0 calc(33.333% - 1rem); } }

.testimonial-card__stars {
  color: var(--gold);
  font-size: 1rem;
  letter-spacing: 0.1em;
}

.testimonial-card blockquote {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 0.98rem;
  color: var(--text-dark);
  line-height: 1.7;
  flex: 1;
}

.testimonial-card footer {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding-top: 1rem;
  border-top: 1px solid var(--beige-dark);
}

.testimonial-card__avatar {
  width: 42px; height: 42px;
  border-radius: 50%;
  background: var(--wine);
  color: var(--white);
  font-size: 0.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.testimonial-card footer strong {
  display: block;
  font-size: 0.9rem;
  color: var(--text-dark);
}

.testimonial-card footer span {
  font-size: 0.78rem;
  color: var(--text-soft);
}

/* Controles */
.testimonials__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.testimonials__btn {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--wine);
  color: var(--white);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition), transform var(--transition);
  box-shadow: var(--shadow-sm);
}

.testimonials__btn:hover { background: var(--wine-dark); transform: scale(1.08); }
.testimonials__btn:disabled { background: var(--beige-dark); cursor: default; transform: none; }

.testimonials__dots {
  display: flex;
  gap: 0.5rem;
}

.testimonials__dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--beige-dark);
  border: none;
  transition: background var(--transition), transform var(--transition);
  cursor: pointer;
}

.testimonials__dot.active {
  background: var(--wine);
  transform: scale(1.3);
}

/* ─────────────────────────────────────────────
   12. FRASE DESTAQUE / BRAND QUOTE
───────────────────────────────────────────── */
.brand-quote {
  background: var(--wine);
  padding: var(--space-xl) 1.25rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.brand-quote::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='1' fill='%23C9A66B' opacity='.2'/%3E%3C/svg%3E");
}

.brand-quote__inner {
  position: relative;
  max-width: 700px;
  margin-inline: auto;
}

.brand-quote__ornament {
  font-family: var(--font-display);
  font-size: 5rem;
  color: var(--gold);
  opacity: 0.4;
  line-height: 1;
  display: block;
  margin-bottom: -2.5rem;
}

.brand-quote__ornament--left { text-align: left; }
.brand-quote__ornament--right { text-align: right; margin-top: -2.5rem; margin-bottom: 0; }

.brand-quote__text {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 4vw, 2.2rem);
  color: var(--beige-light);
  line-height: 1.4;
}

.brand-quote__text em {
  color: var(--gold-light);
  font-style: italic;
}

.brand-quote__sig {
  display: block;
  margin-top: 1.5rem;
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0.8;
}

/* ─────────────────────────────────────────────
   13. CTA FINAL
───────────────────────────────────────────── */
.cta-section {
  padding: var(--space-xl) 1.25rem;
  background: linear-gradient(145deg, var(--beige-light), var(--beige));
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -200px; left: 50%;
  transform: translateX(-50%);
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(122,28,46,.06) 0%, transparent 70%);
  pointer-events: none;
}

.cta-section__inner {
  position: relative;
  max-width: 600px;
  margin-inline: auto;
}

.cta-section__title {
  font-size: clamp(2rem, 5vw, 3rem);
  margin: 0.75rem 0 1rem;
}

.cta-section__subtitle {
  font-size: 1rem;
  color: var(--text-soft);
  margin-bottom: 2rem;
}

.cta-section__phone {
  margin-top: 1.25rem;
  font-size: 0.9rem;
  color: var(--text-soft);
}

/* ─────────────────────────────────────────────
   14. FOOTER
───────────────────────────────────────────── */
.footer {
  background: var(--wine-dark);
  padding: var(--space-md) 1.25rem;
  text-align: center;
}

.footer__inner {
  max-width: 1140px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.footer__logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer__logo-script {
  font-family: var(--font-script);
  font-size: 2rem;
  color: var(--gold-light);
  line-height: 1;
}

.footer__logo-serif {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--beige);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.footer__tagline {
  font-size: 0.82rem;
  color: rgba(245,230,211,.6);
  margin-top: 0.4rem;
  font-style: italic;
}

.footer__social {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer__instagram {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--gold-light);
  font-size: 0.9rem;
  font-weight: 700;
  transition: color var(--transition);
}

.footer__instagram:hover { color: var(--white); }

.footer__copy {
  font-size: 0.75rem;
  color: rgba(245,230,211,.4);
  margin-top: 0.25rem;
}

/* ─────────────────────────────────────────────
   15. BOTÃO FLUTUANTE WHATSAPP
───────────────────────────────────────────── */
.whatsapp-float {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 58px; height: 58px;
  border-radius: 50%;
  background: #25D366;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(37,211,102,.45);
  z-index: 200;
  transition: transform var(--transition), box-shadow var(--transition);
  opacity: 0;
  pointer-events: none;
}

.whatsapp-float.visible {
  opacity: 1;
  pointer-events: auto;
}

.whatsapp-float:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 28px rgba(37,211,102,.55);
}

.whatsapp-float__tooltip {
  position: absolute;
  right: calc(100% + 10px);
  white-space: nowrap;
  background: var(--text-dark);
  color: var(--white);
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.35rem 0.7rem;
  border-radius: var(--radius-sm);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition);
}

.whatsapp-float:hover .whatsapp-float__tooltip { opacity: 1; }

/* ─────────────────────────────────────────────
   22. CARRINHO DE COMPRAS
───────────────────────────────────────────── */

/* Botão do carrinho no navbar */
.navbar__cart-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: var(--wine-dark);
  transition: var(--transition);
  background: transparent;
  border: none;
  cursor: pointer;
}

.navbar__cart-btn:hover {
  background: rgba(122, 28, 46, 0.08);
  color: var(--wine);
}

.cart-btn__badge {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: var(--wine);
  color: var(--white);
  font-size: 0.7rem;
  font-weight: 700;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Botão flutuante do carrinho */
.cart-float {
  position: fixed;
  bottom: 90px;
  right: 20px;
  z-index: 998;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: var(--wine);
  color: var(--white);
  border-radius: 50%;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
  border: none;
  cursor: pointer;
}

.cart-float:hover {
  background: var(--wine-dark);
  transform: scale(1.1);
}

.cart-float__badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  background: var(--gold);
  color: var(--wine-dark);
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-float__tooltip {
  position: absolute;
  right: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
  background: var(--wine-dark);
  color: var(--white);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition);
}

.cart-float:hover .cart-float__tooltip {
  opacity: 1;
  visibility: visible;
}

/* Overlay do carrinho */
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition);
}

.cart-overlay.open {
  opacity: 1;
  visibility: visible;
}

/* Modal do carrinho */
.cart-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 420px;
  background: var(--beige-light);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
}

.cart-modal.open {
  transform: translateX(0);
}

.cart-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  background: var(--wine);
  color: var(--white);
}

.cart-modal__header h3 {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--white);
  margin: 0;
}

.cart-modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: var(--white);
  cursor: pointer;
  transition: var(--transition);
}

.cart-modal__close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.cart-modal__body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

/* Carrinho vazio */
.cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-soft);
}

.cart-empty svg {
  margin-bottom: 1rem;
  opacity: 0.4;
}

.cart-empty p {
  font-size: 1.1rem;
  color: var(--text-mid);
  margin-bottom: 0.5rem;
}

.cart-empty span {
  font-size: 0.9rem;
}

/* Itens do carrinho */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.cart-item__info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.cart-item__emoji {
  font-size: 1.75rem;
}

.cart-item__name {
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--wine-dark);
  margin: 0 0 0.25rem;
}

.cart-item__price {
  font-size: 0.875rem;
  color: var(--text-soft);
}

.cart-item__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-item__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--beige);
  border: none;
  border-radius: 50%;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--wine-dark);
  cursor: pointer;
  transition: var(--transition);
}

.cart-item__btn:hover {
  background: var(--wine);
  color: var(--white);
}

.cart-item__qty {
  min-width: 32px;
  text-align: center;
  font-weight: 700;
  color: var(--text-dark);
}

.cart-item__remove {
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  color: var(--text-soft);
  cursor: pointer;
  transition: var(--transition);
}

.cart-item__remove:hover {
  color: #e74c3c;
}

/* Footer do modal */
.cart-modal__footer {
  padding: 1.25rem 1.5rem;
  background: var(--white);
  border-top: 1px solid var(--beige-dark);
}

.cart-total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: var(--text-dark);
}

.cart-total__value {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--wine);
}

.cart-checkout {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: var(--wine);
  color: var(--white);
  border: none;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);
}

.cart-checkout:hover:not(:disabled) {
  background: var(--wine-dark);
}

.cart-checkout:disabled,
.cart-checkout.disabled {
  background: var(--beige-dark);
  cursor: not-allowed;
  opacity: 0.7;
}

/* Notificação de adição */
.cart-notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: var(--wine-dark);
  color: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  z-index: 2000;
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.cart-notification.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

.cart-notification__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: #2ecc71;
  border-radius: 50%;
  font-size: 0.8rem;
}

.cart-notification__text {
  font-size: 0.95rem;
}

/* Responsivo */
@media (max-width: 640px) {
  .cart-float {
    bottom: 80px;
    right: 16px;
    width: 50px;
    height: 50px;
  }

  .cart-float svg {
    width: 22px;
    height: 22px;
  }

  .cart-modal {
    max-width: 100%;
  }
}

/* ─────────────────────────────────────────────
   23. SEÇÃO DE PRODUTOS
───────────────────────────────────────────── */
.products {
  padding: var(--space-xl) 0;
  background: var(--beige-light);
}

.products__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.product-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--wine), var(--gold));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

.product-card:hover::before {
  transform: scaleX(1);
}

.product-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.product-card__emoji {
  font-size: 3rem;
  line-height: 1;
}

.product-card__badge {
  background: var(--gold);
  color: var(--wine-dark);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-card__title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  color: var(--wine-dark);
  margin: 0 0 0.75rem;
}

.product-card__desc {
  font-size: 0.95rem;
  color: var(--text-soft);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.product-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--beige-dark);
}

.product-card__price {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--wine);
}

.product-card__btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: var(--wine);
  color: var(--white);
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.product-card__btn:hover {
  background: var(--wine-dark);
  transform: scale(1.05);
}

.product-card__btn svg {
  flex-shrink: 0;
}

/* Responsivo produtos */
@media (max-width: 640px) {
  .products__grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .product-card {
    padding: 1.5rem;
  }
}

/* ─────────────────────────────────────────────
   16. ANIMAÇÕES DE ENTRADA (scroll)
───────────────────────────────────────────── */
[data-animate] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

[data-animate].in-view {
  opacity: 1;
  transform: translateY(0);
}

/* Delay em cascata para filhos de grids */
.benefits__grid [data-animate]:nth-child(2) { transition-delay: 0.1s; }
.benefits__grid [data-animate]:nth-child(3) { transition-delay: 0.2s; }
.benefits__grid [data-animate]:nth-child(4) { transition-delay: 0.3s; }

.uses__grid [data-animate]:nth-child(2) { transition-delay: 0.1s; }
.uses__grid [data-animate]:nth-child(3) { transition-delay: 0.2s; }
.uses__grid [data-animate]:nth-child(4) { transition-delay: 0.3s; }
