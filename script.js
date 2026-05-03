/* ============================================================
   DOCE SABOR — script.js
   Funcionalidades:
   - Navbar scroll
   - Menu mobile
   - Seção de sabores com cards
   - Carrinho lateral (drawer)
   - Carrossel de depoimentos
   - Animações de entrada por scroll
   - Botão flutuante WhatsApp
   - CTA: gera mensagem WhatsApp com itens do carrinho
============================================================ */

'use strict';

/* ─────────────────────────────────────────────
   CATÁLOGO DE SABORES
   Adicione ou edite sabores aqui.
───────────────────────────────────────────── */
const FLAVORS = [
  {
    id: 'morango-limao',
    name: 'Morango com Limão',
    emoji: '🍓',
    accent: '#c0392b',
    accentBg: '#fff0ef',
    price: 35.00,
    description: 'Morango fresco com toque cítrico de limão siciliano em uma receita zero açúcar, zero glúten, zero lactose e sem conservantes.',
    tags: ['Zero açúcar', 'Sem glúten'],
  },
  {
    id: 'manga-maracuja',
    name: 'Manga com Maracujá',
    emoji: '🥭',
    accent: '#e67e22',
    accentBg: '#fff8ed',
    price: 35.00,
    description: 'Manga cremosa com maracujá tropical, baixa em calorias e feita para preservar os nutrientes naturais da fruta.',
    tags: ['Zero lactose', '19 cal/colher'],
  },
  {
    id: 'abacaxi-gengibre',
    name: 'Abacaxi com Gengibre',
    emoji: '🍍',
    accent: '#27ae60',
    accentBg: '#f0fff6',
    price: 35.00,
    description: 'Abacaxi com gengibre em uma combinação leve, sem açúcar e testada por nutrólogos.',
    tags: ['Sem conservantes', 'Aprovada'],
  },
];

/* ─────────────────────────────────────────────
   ESTADO DO CARRINHO
───────────────────────────────────────────── */
// Cada item: { id, name, emoji, price, qty }
let cart = [];

/* ─────────────────────────────────────────────
   UTILITÁRIOS
───────────────────────────────────────────── */

/** Formata número como moeda brasileira */
function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/** Cria e injeta os cards de sabores na seção #sabores */
function renderFlavorCards() {
  const grid = document.getElementById('flavorsGrid');
  if (!grid) return;

  grid.innerHTML = FLAVORS.map(flavor => `
    <article
      class="flavor-card"
      data-animate
      style="--flavor-accent:${flavor.accent}; --flavor-bg:${flavor.accentBg};"
    >
      <div class="flavor-card__top">
        <span class="flavor-card__emoji">${flavor.emoji}</span>
        <div class="flavor-card__tags">
          ${flavor.tags.map(t => `<span class="flavor-card__tag">${t}</span>`).join('')}
        </div>
      </div>
      <h3 class="flavor-card__name">${flavor.name}</h3>
      <p class="flavor-card__desc">${flavor.description}</p>
      <div class="flavor-card__footer">
        <span class="flavor-card__price">${formatBRL(flavor.price)}</span>
        <button
          class="btn btn--flavor-add"
          data-flavor-id="${flavor.id}"
          aria-label="Adicionar ${flavor.name} ao carrinho"
        >
          + Adicionar
        </button>
      </div>
    </article>
  `).join('');

  // Registra eventos dos botões de adicionar
  grid.querySelectorAll('[data-flavor-id]').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.flavorId));
  });

  observeAnimations();
}

/* ─────────────────────────────────────────────
   LÓGICA DO CARRINHO
───────────────────────────────────────────── */

/** Adiciona 1 unidade de um sabor ao carrinho */
function addToCart(flavorId) {
  const flavor = FLAVORS.find(f => f.id === flavorId);
  if (!flavor) return;

  const existing = cart.find(item => item.id === flavorId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: flavor.id, name: flavor.name, emoji: flavor.emoji, price: flavor.price, qty: 1 });
  }

  updateCartUI();
  openCart();
  animateCartBadge();
  showToast(`${flavor.emoji} ${flavor.name} adicionado ao carrinho!`);
}

/** Remove unidades do carrinho (delta positivo = adiciona, negativo = remove) */
function changeQty(flavorId, delta) {
  const idx = cart.findIndex(item => item.id === flavorId);
  if (idx === -1) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  updateCartUI();
}

/** Limpa o carrinho por completo */
function clearCart() {
  cart = [];
  updateCartUI();
}

/** Calcula total do carrinho */
function cartTotal() {
  return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
}

/** Atualiza toda a UI do carrinho */
function updateCartUI() {
  const totalQty    = cart.reduce((a, i) => a + i.qty, 0);
  const badge       = document.getElementById('cartBadge');
  const badgeMobile = document.getElementById('cartBadgeMobile');
  const list        = document.getElementById('cartList');
  const totalEl     = document.getElementById('cartTotal');
  const emptyMsg    = document.getElementById('cartEmpty');
  const checkoutBtn = document.getElementById('cartCheckoutBtn');

  // Badges
  [badge, badgeMobile].forEach(b => {
    if (!b) return;
    b.textContent = totalQty;
    b.classList.toggle('hidden', totalQty === 0);
  });

  // Lista de itens
  if (list) {
    list.innerHTML = cart.map(item => `
      <li class="cart-item">
        <span class="cart-item__emoji">${item.emoji}</span>
        <div class="cart-item__info">
          <span class="cart-item__name">${item.name}</span>
          <span class="cart-item__unit">${formatBRL(item.price)} / un.</span>
        </div>
        <div class="cart-item__qty-controls">
          <button class="cart-qty-btn" data-id="${item.id}" data-delta="-1" aria-label="Remover 1">−</button>
          <span class="cart-item__qty">${item.qty}</span>
          <button class="cart-qty-btn" data-id="${item.id}" data-delta="1"  aria-label="Adicionar 1">+</button>
        </div>
        <span class="cart-item__subtotal">${formatBRL(item.price * item.qty)}</span>
      </li>
    `).join('');

    list.querySelectorAll('.cart-qty-btn').forEach(btn => {
      btn.addEventListener('click', () => changeQty(btn.dataset.id, parseInt(btn.dataset.delta, 10)));
    });
  }

  if (emptyMsg)    emptyMsg.classList.toggle('hidden', cart.length > 0);
  if (list)        list.classList.toggle('hidden', cart.length === 0);
  if (totalEl)     totalEl.textContent = formatBRL(cartTotal());
  if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;
}

/** Abre o drawer do carrinho */
function openCart() {
  const drawer  = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer)  drawer.classList.add('open');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/** Fecha o drawer do carrinho */
function closeCart() {
  const drawer  = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer)  drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/** Anima o badge (pulso) */
function animateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  badge.classList.remove('pulse');
  void badge.offsetWidth; // reflow
  badge.classList.add('pulse');
}

/** Gera mensagem de WhatsApp com os itens do carrinho */
function buildWhatsAppMessage() {
  if (cart.length === 0) return '';
  const lines = cart.map(
    item => `• ${item.qty}x ${item.emoji} ${item.name} — ${formatBRL(item.price * item.qty)}`
  );
  const msg = [
    'Olá! Gostaria de fazer um pedido de geleias Doce Sabor 🍓',
    '',
    ...lines,
    '',
    `*Total: ${formatBRL(cartTotal())}*`,
    '',
    'Poderia confirmar disponibilidade e forma de entrega? 😊',
  ].join('\n');
  return encodeURIComponent(msg);
}

/* ─────────────────────────────────────────────
   INJEÇÃO DO DRAWER DO CARRINHO
───────────────────────────────────────────── */
function injectCartDrawer() {
  const drawerHTML = `
    <div class="cart-overlay" id="cartOverlay" aria-hidden="true"></div>

    <aside class="cart-drawer" id="cartDrawer" role="dialog" aria-modal="true" aria-label="Carrinho de compras">
      <div class="cart-drawer__header">
        <h2 class="cart-drawer__title">🛒 Meu Carrinho</h2>
        <button class="cart-drawer__close" id="cartClose" aria-label="Fechar carrinho">✕</button>
      </div>
      <div class="cart-drawer__body">
        <p class="cart-empty-msg" id="cartEmpty">Seu carrinho está vazio.<br/>Escolha um sabor acima! 🍓</p>
        <ul class="cart-list hidden" id="cartList"></ul>
      </div>
      <div class="cart-drawer__footer">
        <div class="cart-total-row">
          <span>Total</span>
          <strong id="cartTotal">R$ 0,00</strong>
        </div>
        <a
          href="#"
          class="btn btn--primary btn--large cart-checkout-btn"
          id="cartCheckoutBtn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.847L.057 23.857a.5.5 0 0 0 .609.61l6.098-1.598A11.947 11.947 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.176-1.452l-.371-.22-3.845 1.008 1.025-3.739-.242-.385A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
          Pedir pelo WhatsApp
        </a>
        <button class="cart-clear-btn" id="cartClearBtn">Limpar carrinho</button>
      </div>
    </aside>
  `;

  document.body.insertAdjacentHTML('beforeend', drawerHTML);

  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('cartClearBtn').addEventListener('click', clearCart);

  document.getElementById('cartCheckoutBtn').addEventListener('click', function (e) {
    if (cart.length === 0) { e.preventDefault(); return; }
    const msg = buildWhatsAppMessage();
    this.href = `https://wa.me/5561998647768?text=${msg}`;
  });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });
}

/* ─────────────────────────────────────────────
   INJEÇÃO DA SEÇÃO DE SABORES NO DOM
───────────────────────────────────────────── */
function injectFlavorsSection() {
  const anchor = document.getElementById('sobre');
  if (!anchor) return;

  const sectionHTML = `
    <section class="flavors" id="sabores">
      <div class="section-container">
        <div class="section-header">
          <span class="section-eyebrow">Escolha o seu favorito</span>
          <h2 class="section-title">Nossos Sabores<br/><em>Artesanais</em></h2>
          <p class="flavors__subtitle">
            Cada geleia é zero açúcar, zero glúten, zero lactose, sem conservantes e feita com frutas selecionadas.
            Adicione ao carrinho e finalize seu pedido pelo WhatsApp!
          </p>
        </div>
        <div class="flavors__grid" id="flavorsGrid"></div>
      </div>
    </section>
  `;

  anchor.insertAdjacentHTML('beforebegin', sectionHTML);
}

/* ─────────────────────────────────────────────
   BOTÃO DO CARRINHO NA NAVBAR
───────────────────────────────────────────── */
function injectCartButton() {
  const navLinks = document.querySelector('.navbar__links');
  if (navLinks) {
    const ctaLink = navLinks.querySelector('.navbar__cta-btn');
    const cartButtonHTML = `
      <button class="navbar__cart-btn" id="navCartBtn" aria-label="Abrir carrinho">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             width="22" height="22">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <span class="cart-badge hidden" id="cartBadge">0</span>
      </button>
    `;
    if (ctaLink) {
      ctaLink.insertAdjacentHTML('beforebegin', cartButtonHTML);
    } else {
      navLinks.insertAdjacentHTML('beforeend', cartButtonHTML);
    }
    document.getElementById('navCartBtn').addEventListener('click', openCart);
  }

  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    const mobileCtaLink = mobileMenu.querySelector('.mobile-link--cta');
    const mobileCartButtonHTML = `
      <button class="mobile-link mobile-cart-btn" id="mobileCartBtn" aria-label="Abrir carrinho">
        🛒 Carrinho
        <span class="cart-badge-mobile hidden" id="cartBadgeMobile">0</span>
      </button>
    `;
    if (mobileCtaLink) {
      mobileCtaLink.insertAdjacentHTML('beforebegin', mobileCartButtonHTML);
    } else {
      mobileMenu.insertAdjacentHTML('beforeend', mobileCartButtonHTML);
    }
    document.getElementById('mobileCartBtn').addEventListener('click', () => {
      closeMobileMenu();
      setTimeout(openCart, 300);
    });
  }
}

/* ─────────────────────────────────────────────
   LINK "SABORES" NA NAVBAR
───────────────────────────────────────────── */
function addFlavorsNavLink() {
  const navLinks   = document.querySelector('.navbar__links');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navLinks) {
    const a = document.createElement('a');
    a.href = '#sabores';
    a.textContent = 'Sabores';
    const benefitsLink = navLinks.querySelector('a[href="#beneficios"]');
    if (benefitsLink) {
      benefitsLink.insertAdjacentElement('afterend', a);
    } else {
      navLinks.insertAdjacentElement('afterbegin', a);
    }
  }
  if (mobileMenu) {
    const a = document.createElement('a');
    a.href = '#sabores';
    a.className = 'mobile-link';
    a.textContent = 'Sabores';
    const benefitsLink = mobileMenu.querySelector('a[href="#beneficios"]');
    if (benefitsLink) {
      benefitsLink.insertAdjacentElement('afterend', a);
    } else {
      mobileMenu.insertAdjacentElement('afterbegin', a);
    }
  }
}

/* ─────────────────────────────────────────────
   TOAST DE CONFIRMAÇÃO
───────────────────────────────────────────── */
function injectToastContainer() {
  const div = document.createElement('div');
  div.id = 'toastContainer';
  div.className = 'toast-container';
  document.body.appendChild(div);
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('toast--show'));
  setTimeout(() => {
    toast.classList.remove('toast--show');
    toast.addEventListener('transitionend', () => toast.remove());
  }, 2500);
}

/* ─────────────────────────────────────────────
   NAVBAR SCROLL
───────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ─────────────────────────────────────────────
   MENU MOBILE
───────────────────────────────────────────── */
function closeMobileMenu() {
  document.getElementById('hamburgerBtn')?.classList.remove('active');
  document.getElementById('mobileMenu')?.classList.remove('open');
  document.body.style.overflow = '';
}

function initMobileMenu() {
  const btn  = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.contains('open');
    if (open) {
      closeMobileMenu();
    } else {
      btn.classList.add('active');
      menu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMobileMenu));
}

/* ─────────────────────────────────────────────
   BOTÃO FLUTUANTE WHATSAPP
───────────────────────────────────────────── */
function initWhatsappFloat() {
  const floatBtn = document.getElementById('whatsappFloat');
  if (!floatBtn) return;
  const onScroll = () => floatBtn.classList.toggle('visible', window.scrollY > 300);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ─────────────────────────────────────────────
   CARROSSEL DE DEPOIMENTOS
───────────────────────────────────────────── */
function initTestimonialsCarousel() {
  const track    = document.getElementById('testimonialsTrack');
  const prevBtn  = document.getElementById('testimonialPrev');
  const nextBtn  = document.getElementById('testimonialNext');
  const dotsWrap = document.getElementById('testimonialDots');
  if (!track || !prevBtn || !nextBtn) return;

  const cards  = Array.from(track.children);
  const total  = cards.length;
  let current  = 0;
  let autoTimer = null;

  function visibleCount() {
    if (window.innerWidth >= 960) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }

  function maxIndex() { return Math.max(0, total - visibleCount()); }

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    for (let i = 0; i <= maxIndex(); i++) {
      const dot = document.createElement('button');
      dot.className = 'testimonials__dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Depoimento ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    dotsWrap?.querySelectorAll('.testimonials__dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, maxIndex()));
    const cardWidth = track.children[0].offsetWidth + 24; // card + gap
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= maxIndex();
    updateDots();
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => goTo(current >= maxIndex() ? 0 : current + 1), 5000);
  }

  function stopAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }

  prevBtn.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  nextBtn.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

  // Swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { stopAuto(); goTo(diff > 0 ? current + 1 : current - 1); startAuto(); }
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { buildDots(); goTo(Math.min(current, maxIndex())); }, 200);
  });

  buildDots();
  goTo(0);
  startAuto();
}

/* ─────────────────────────────────────────────
   ANIMAÇÕES DE ENTRADA (IntersectionObserver)
───────────────────────────────────────────── */
function observeAnimations() {
  const targets = document.querySelectorAll('[data-animate]:not(.in-view)');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────
   SMOOTH SCROLL
───────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ─────────────────────────────────────────────
   INICIALIZAÇÃO PRINCIPAL
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Injeta estrutura dinâmica
  injectFlavorsSection();
  injectCartDrawer();
  injectCartButton();
  injectToastContainer();
  addFlavorsNavLink();

  // 2. Renderiza cards de sabores
  renderFlavorCards();

  // 3. UI global
  initNavbar();
  initMobileMenu();
  initWhatsappFloat();
  initTestimonialsCarousel();
  observeAnimations();
  initSmoothScroll();

  // 4. Estado inicial do carrinho
  updateCartUI();
});
