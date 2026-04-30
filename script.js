/* ============================================================
   DOCE SABOR — script.js
   Funcionalidades:
   - Navbar scroll
   - Menu mobile (hamburguer)
   - Aba de Sabores (tabs)
   - Carrinho de compras (sidebar + badge + localStorage)
   - Carrossel de depoimentos
   - Animações de entrada por scroll (IntersectionObserver)
   - Botão WhatsApp flutuante
   - Botão de fechar / abrir carrinho
============================================================ */

'use strict';

/* ─────────────────────────────────────────────
   DADOS DOS SABORES
───────────────────────────────────────────── */
const SABORES = [
  {
    id: 'morango-limao',
    nome: 'Morango com Limão',
    descricao: 'A doçura vibrante do morango equilibrada com o frescor cítrico do limão siciliano. Perfeita para começar o dia com energia.',
    emoji: '🍓🍋',
    cor: '#c0392b',
    corClara: '#f9e5e3',
    preco: 28.90,
    nota: '★★★★★',
    tags: ['Mais Vendida', 'Clássica'],
  },
  {
    id: 'manga-maracuja',
    nome: 'Manga com Maracujá',
    descricao: 'A polpa dourada da manga encontra a acidez tropical do maracujá. Uma explosão de sabores que transporta você para o verão.',
    emoji: '🥭🌸',
    cor: '#e67e22',
    corClara: '#fef3e2',
    preco: 30.90,
    nota: '★★★★★',
    tags: ['Tropical', 'Favorita'],
  },
  {
    id: 'abacaxi-gengibre',
    nome: 'Abacaxi com Gengibre',
    descricao: 'A suavidade do abacaxi maduro com o toque picante e quente do gengibre fresco. Uma combinação surpreendente e sofisticada.',
    emoji: '🍍🫚',
    cor: '#27ae60',
    corClara: '#e8f8f0',
    preco: 30.90,
    nota: '★★★★★',
    tags: ['Gourmet', 'Novidade'],
  },
];

/* ─────────────────────────────────────────────
   ESTADO DO CARRINHO
───────────────────────────────────────────── */
let cart = JSON.parse(localStorage.getItem('doce-sabor-cart') || '[]');

function saveCart() {
  localStorage.setItem('doce-sabor-cart', JSON.stringify(cart));
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.preco * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

/* ─────────────────────────────────────────────
   NAVBAR — scroll e hamburguer
───────────────────────────────────────────── */
function initNavbar() {
  const navbar       = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu   = document.getElementById('mobileMenu');
  const mobileLinks  = document.querySelectorAll('.mobile-link');

  // Scroll: adiciona classe .scrolled
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Hamburguer
  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburgerBtn.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Fechar menu ao clicar em link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ─────────────────────────────────────────────
   SEÇÃO DE SABORES — construção dinâmica e tabs
───────────────────────────────────────────── */
function buildSaboresSection() {
  // Encontra o container placeholder inserido no HTML
  const section = document.getElementById('sabores');
  if (!section) return;

  // Monta o HTML da seção
  section.innerHTML = `
    <div class="section-container">
      <div class="section-header">
        <span class="section-eyebrow">Escolha o seu preferido</span>
        <h2 class="section-title">Nossos <em>Sabores</em></h2>
      </div>

      <!-- Tabs de navegação -->
      <div class="sabores__tabs" role="tablist" aria-label="Sabores disponíveis">
        ${SABORES.map((s, i) => `
          <button
            class="sabores__tab${i === 0 ? ' sabores__tab--active' : ''}"
            role="tab"
            aria-selected="${i === 0}"
            aria-controls="painel-${s.id}"
            data-tab="${s.id}"
          >
            <span class="sabores__tab-emoji">${s.emoji}</span>
            <span class="sabores__tab-nome">${s.nome}</span>
          </button>
        `).join('')}
      </div>

      <!-- Painéis de conteúdo -->
      <div class="sabores__paineis">
        ${SABORES.map((s, i) => `
          <div
            class="sabores__painel${i === 0 ? ' sabores__painel--active' : ''}"
            id="painel-${s.id}"
            role="tabpanel"
            data-painel="${s.id}"
            style="--sabor-cor: ${s.cor}; --sabor-cor-clara: ${s.corClara};"
          >
            <div class="sabores__painel-visual">
              <div class="sabores__painel-emoji-bg" style="background:${s.corClara};">
                <span class="sabores__painel-emoji">${s.emoji}</span>
              </div>
              <div class="sabores__painel-badge">${s.nota}</div>
            </div>

            <div class="sabores__painel-info">
              <div class="sabores__painel-tags">
                ${s.tags.map(t => `<span class="sabores__tag">${t}</span>`).join('')}
              </div>
              <h3 class="sabores__painel-nome">${s.nome}</h3>
              <p class="sabores__painel-desc">${s.descricao}</p>
              <div class="sabores__painel-footer">
                <span class="sabores__painel-preco">R$ ${s.preco.toFixed(2).replace('.', ',')}</span>
                <div class="sabores__qty-wrap">
                  <button class="sabores__qty-btn" data-action="dec" data-id="${s.id}" aria-label="Diminuir quantidade">−</button>
                  <span class="sabores__qty-val" id="qty-${s.id}">1</span>
                  <button class="sabores__qty-btn" data-action="inc" data-id="${s.id}" aria-label="Aumentar quantidade">+</button>
                </div>
                <button class="btn btn--primary sabores__add-btn" data-id="${s.id}" data-nome="${s.nome}" data-preco="${s.preco}" aria-label="Adicionar ${s.nome} ao carrinho">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M6 2a1 1 0 0 0 0 2h1.22l.4 2H4a1 1 0 0 0-.98 1.2l2 9A1 1 0 0 0 6 17h12a1 1 0 0 0 .98-.8l2-9A1 1 0 0 0 20 6h-3.62l-.4-2H18a1 1 0 0 0 0-2H6zm2.82 4h6.36l.4 2H8.42l.4-2zM7.7 10h8.6l-1.56 7H9.26L7.7 10zM9 19a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Eventos das tabs
  const tabs    = section.querySelectorAll('.sabores__tab');
  const paineis = section.querySelectorAll('.sabores__painel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const alvo = tab.dataset.tab;

      tabs.forEach(t => { t.classList.remove('sabores__tab--active'); t.setAttribute('aria-selected', 'false'); });
      paineis.forEach(p => p.classList.remove('sabores__painel--active'));

      tab.classList.add('sabores__tab--active');
      tab.setAttribute('aria-selected', 'true');
      section.querySelector(`[data-painel="${alvo}"]`).classList.add('sabores__painel--active');
    });
  });

  // Eventos de quantidade (+ / -)
  section.addEventListener('click', e => {
    const btn = e.target.closest('.sabores__qty-btn');
    if (!btn) return;
    const id      = btn.dataset.id;
    const display = document.getElementById(`qty-${id}`);
    let val = parseInt(display.textContent, 10);
    if (btn.dataset.action === 'inc') val = Math.min(val + 1, 20);
    if (btn.dataset.action === 'dec') val = Math.max(val - 1, 1);
    display.textContent = val;
  });

  // Evento de "Adicionar ao Carrinho"
  section.addEventListener('click', e => {
    const btn = e.target.closest('.sabores__add-btn');
    if (!btn) return;
    const id    = btn.dataset.id;
    const nome  = btn.dataset.nome;
    const preco = parseFloat(btn.dataset.preco);
    const qty   = parseInt(document.getElementById(`qty-${id}`).textContent, 10);
    addToCart({ id, nome, preco, qty });
    animateAddBtn(btn);
  });
}

/* ─────────────────────────────────────────────
   CARRINHO — construção do sidebar
───────────────────────────────────────────── */
function buildCartSidebar() {
  // Cria o overlay e o sidebar dinamicamente
  const overlay = document.createElement('div');
  overlay.className = 'cart-overlay';
  overlay.id = 'cartOverlay';

  const sidebar = document.createElement('aside');
  sidebar.className = 'cart-sidebar';
  sidebar.id = 'cartSidebar';
  sidebar.setAttribute('aria-label', 'Carrinho de compras');
  sidebar.innerHTML = `
    <div class="cart-sidebar__header">
      <h3 class="cart-sidebar__title">🛒 Seu Carrinho</h3>
      <button class="cart-sidebar__close" id="cartCloseBtn" aria-label="Fechar carrinho">✕</button>
    </div>
    <div class="cart-sidebar__body" id="cartBody">
      <!-- itens renderizados via JS -->
    </div>
    <div class="cart-sidebar__footer" id="cartFooter">
      <!-- total e CTA renderizados via JS -->
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(sidebar);

  // Fechar ao clicar no overlay ou no X
  overlay.addEventListener('click', closeCart);
  document.getElementById('cartCloseBtn').addEventListener('click', closeCart);
}

function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCart();
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ─────────────────────────────────────────────
   CARRINHO — lógica
───────────────────────────────────────────── */
function addToCart({ id, nome, preco, qty }) {
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty = Math.min(existing.qty + qty, 20);
  } else {
    cart.push({ id, nome, preco, qty });
  }
  saveCart();
  updateCartBadge();
  renderCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartBadge();
  renderCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, Math.min(20, item.qty + delta));
  saveCart();
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });
}

function renderCart() {
  const body   = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  if (!body || !footer) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <span class="cart-empty__icon">🫙</span>
        <p>Seu carrinho está vazio.</p>
        <small>Adicione algum sabor delicioso!</small>
      </div>
    `;
    footer.innerHTML = '';
    return;
  }

  // Itens
  body.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item__info">
        <span class="cart-item__nome">${item.nome}</span>
        <span class="cart-item__preco-unit">R$ ${item.preco.toFixed(2).replace('.', ',')} / un.</span>
      </div>
      <div class="cart-item__controls">
        <button class="cart-qty-btn" data-action="dec" data-id="${item.id}" aria-label="Diminuir">−</button>
        <span class="cart-qty-val">${item.qty}</span>
        <button class="cart-qty-btn" data-action="inc" data-id="${item.id}" aria-label="Aumentar">+</button>
        <button class="cart-remove-btn" data-id="${item.id}" aria-label="Remover item">🗑</button>
      </div>
      <span class="cart-item__subtotal">R$ ${(item.preco * item.qty).toFixed(2).replace('.', ',')}</span>
    </div>
  `).join('');

  // Total e botão de envio
  const total = getCartTotal();
  const msg   = buildWhatsappMsg();
  footer.innerHTML = `
    <div class="cart-total">
      <span>Total</span>
      <strong>R$ ${total.toFixed(2).replace('.', ',')}</strong>
    </div>
    <a href="${msg}" target="_blank" rel="noopener noreferrer" class="btn btn--primary cart-checkout-btn">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.847L.057 23.857a.5.5 0 0 0 .609.61l6.098-1.598A11.947 11.947 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.944 9.944 0 0 1-5.176-1.452l-.371-.22-3.845 1.008 1.025-3.739-.242-.385A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
      Finalizar pelo WhatsApp
    </a>
    <button class="cart-clear-btn" id="cartClearBtn">Limpar carrinho</button>
  `;

  // Eventos dos itens
  body.addEventListener('click', handleCartItemClick);
  document.getElementById('cartClearBtn')?.addEventListener('click', () => {
    cart = [];
    saveCart();
    updateCartBadge();
    renderCart();
  });
}

function handleCartItemClick(e) {
  const qtyBtn    = e.target.closest('.cart-qty-btn');
  const removeBtn = e.target.closest('.cart-remove-btn');

  if (qtyBtn) {
    const id     = qtyBtn.dataset.id;
    const action = qtyBtn.dataset.action;
    changeQty(id, action === 'inc' ? 1 : -1);
  }

  if (removeBtn) {
    removeFromCart(removeBtn.dataset.id);
  }
}

/* ─────────────────────────────────────────────
   WHATSAPP — monta mensagem com o carrinho
───────────────────────────────────────────── */
function buildWhatsappMsg() {
  const number = '5561998647768';
  let texto = 'Olá! Gostaria de fazer um pedido de geleias Doce Sabor 🍓\n\n*Meu pedido:*\n';

  cart.forEach(item => {
    texto += `• ${item.qty}x ${item.nome} — R$ ${(item.preco * item.qty).toFixed(2).replace('.', ',')}\n`;
  });

  texto += `\n*Total: R$ ${getCartTotal().toFixed(2).replace('.', ',')}*\n\nAguardo confirmação! 😊`;

  return `https://wa.me/${number}?text=${encodeURIComponent(texto)}`;
}

/* ─────────────────────────────────────────────
   BOTÃO CARRINHO NA NAVBAR
───────────────────────────────────────────── */
function injectCartButton() {
  // Insere botão de carrinho na navbar (desktop e mobile)
  const navLinks = document.querySelector('.navbar__links');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navLinks) {
    const cartBtn = document.createElement('button');
    cartBtn.className = 'navbar__cart-btn';
    cartBtn.setAttribute('aria-label', 'Abrir carrinho');
    cartBtn.innerHTML = `
      🛒
      <span class="cart-badge" style="display:none;">0</span>
    `;
    cartBtn.addEventListener('click', openCart);
    navLinks.insertBefore(cartBtn, navLinks.querySelector('.navbar__cta-btn'));
  }

  // Hamburguer também
  if (mobileMenu) {
    const cartBtnMobile = document.createElement('button');
    cartBtnMobile.className = 'navbar__cart-btn navbar__cart-btn--mobile mobile-link';
    cartBtnMobile.innerHTML = `🛒 Ver Carrinho <span class="cart-badge" style="display:none;">0</span>`;
    cartBtnMobile.addEventListener('click', () => {
      document.getElementById('mobileMenu').classList.remove('open');
      document.getElementById('hamburgerBtn').classList.remove('active');
      document.body.style.overflow = '';
      openCart();
    });
    mobileMenu.appendChild(cartBtnMobile);
  }

  // Botão flutuante carrinho (mobile)
  const cartFloat = document.createElement('button');
  cartFloat.className = 'cart-float';
  cartFloat.id = 'cartFloat';
  cartFloat.setAttribute('aria-label', 'Abrir carrinho');
  cartFloat.innerHTML = `
    🛒
    <span class="cart-badge" style="display:none;">0</span>
  `;
  cartFloat.addEventListener('click', openCart);
  document.body.appendChild(cartFloat);
}

/* ─────────────────────────────────────────────
   FEEDBACK VISUAL — botão "Adicionar"
───────────────────────────────────────────── */
function animateAddBtn(btn) {
  const original = btn.innerHTML;
  btn.innerHTML = '✓ Adicionado!';
  btn.style.background = '#27ae60';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.disabled = false;
  }, 1600);
}

/* ─────────────────────────────────────────────
   CARROSSEL DE DEPOIMENTOS
───────────────────────────────────────────── */
function initTestimonials() {
  const track    = document.getElementById('testimonialsTrack');
  const prevBtn  = document.getElementById('testimonialPrev');
  const nextBtn  = document.getElementById('testimonialNext');
  const dotsWrap = document.getElementById('testimonialDots');
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  let current = 0;
  let perView = getPerView();
  let total   = Math.ceil(cards.length / perView);

  // Cria dots
  function buildDots() {
    dotsWrap.innerHTML = '';
    total = Math.ceil(cards.length / perView);
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = `testimonials__dot${i === 0 ? ' active' : ''}`;
      dot.setAttribute('aria-label', `Depoimento ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function getPerView() {
    if (window.innerWidth >= 960) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, total - 1));
    const cardWidth = track.querySelector('.testimonial-card').offsetWidth + 24; // gap
    track.style.transform = `translateX(-${current * perView * cardWidth}px)`;
    dotsWrap.querySelectorAll('.testimonials__dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Auto-play
  let autoplay = setInterval(() => goTo((current + 1) % total), 5000);
  track.addEventListener('mouseenter', () => clearInterval(autoplay));
  track.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goTo((current + 1) % total), 5000);
  });

  // Swipe touch
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) goTo(delta > 0 ? current + 1 : current - 1);
  });

  // Recalcula ao redimensionar
  window.addEventListener('resize', () => {
    const newPer = getPerView();
    if (newPer !== perView) {
      perView = newPer;
      current = 0;
      buildDots();
      goTo(0);
    }
  }, { passive: true });

  buildDots();
}

/* ─────────────────────────────────────────────
   ANIMAÇÕES DE ENTRADA (IntersectionObserver)
───────────────────────────────────────────── */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────
   BOTÃO FLUTUANTE WHATSAPP
───────────────────────────────────────────── */
function initWhatsappFloat() {
  const floatBtn = document.getElementById('whatsappFloat');
  if (!floatBtn) return;

  window.addEventListener('scroll', () => {
    floatBtn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });
}

/* ─────────────────────────────────────────────
   LINKS WHATSAPP — atualiza com mensagem do carrinho
───────────────────────────────────────────── */
function updateWhatsappLinks() {
  // Os botões CTA fixos apontam para msg genérica; só o checkout usa o carrinho
  // Se quiser, pode estender aqui para sincronizar outros botões também
}

/* ─────────────────────────────────────────────
   INIT GERAL
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  buildSaboresSection();   // Constrói seção de sabores dinamicamente
  buildCartSidebar();      // Cria sidebar do carrinho no DOM
  injectCartButton();      // Injeta botão de carrinho na navbar
  updateCartBadge();       // Sincroniza badge com localStorage
  initTestimonials();
  initScrollAnimations();
  initWhatsappFloat();
  updateWhatsappLinks();
});
