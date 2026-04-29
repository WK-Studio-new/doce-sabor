/* =============================================
   GELEIAS DA VOVÓ — SCRIPT
   Funcionalidades: Carrinho, LocalStorage, WhatsApp
   ============================================= */

// ─────────────────────────────────────────────
// CONFIGURAÇÕES
// ─────────────────────────────────────────────

const WHATSAPP_NUMBER = '5571999999999'; // Substitua pelo número real (com DDI e DDD, sem espaços ou sinais)

const PRODUCTS = [
  { id: 'morango',       name: 'Geleia de Morango',        emoji: '🍓', price: 35 },
  { id: 'manga',         name: 'Geleia de Manga',           emoji: '🥭', price: 35 },
  { id: 'maracuja',      name: 'Geleia de Maracujá',        emoji: '🍈', price: 35 },
  { id: 'goiaba',        name: 'Geleia de Goiaba',          emoji: '🍑', price: 35 },
  { id: 'frutasvermelhas', name: 'Frutas Vermelhas',        emoji: '🫐', price: 35 },
];

// ─────────────────────────────────────────────
// ESTADO DO CARRINHO
// ─────────────────────────────────────────────

let cart = loadCart();

// ─────────────────────────────────────────────
// INICIALIZAÇÃO
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderCart();
  createOverlay();
});

// ─────────────────────────────────────────────
// RENDERIZAÇÃO DOS PRODUTOS
// ─────────────────────────────────────────────

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(p => `
    <div class="product-card" id="card-${p.id}">
      <div class="product-card__emoji">${p.emoji}</div>
      <div class="product-card__name">${p.name}</div>
      <div class="product-card__weight">Pote 250g</div>
      <div class="product-card__price">R$ ${p.price}</div>

      <div class="qty-control" id="qty-${p.id}" style="display:none">
        <button class="qty-control__btn" onclick="changeQty('${p.id}', -1)" aria-label="Diminuir">−</button>
        <span class="qty-control__num" id="qty-num-${p.id}">1</span>
        <button class="qty-control__btn" onclick="changeQty('${p.id}', 1)" aria-label="Aumentar">+</button>
      </div>

      <button class="btn btn--outline" id="btn-${p.id}" onclick="addToCart('${p.id}', '${p.name}', ${p.price}, '${p.emoji}')">
        + Adicionar
      </button>
    </div>
  `).join('');

  // Sincronizar estado visual com carrinho já existente
  cart.forEach(item => {
    if (item.id !== 'kit-degustacao') {
      updateProductCardUI(item.id, item.qty);
    }
  });
}

// ─────────────────────────────────────────────
// GERENCIAMENTO DO CARRINHO
// ─────────────────────────────────────────────

/**
 * Adiciona item ao carrinho (chamado pelo botão do card e pelo kit)
 */
function addToCart(idOrName, priceOrName, priceOrUndefined, emoji) {
  // Suporte às duas assinaturas:
  // addToCart('Kit Degustação', 99)           ← do HTML inline (kit)
  // addToCart(id, name, price, emoji)          ← do JS (produtos)

  let item;

  if (priceOrUndefined === undefined) {
    // Kit chamado do HTML: addToCart('Kit Degustação', 99)
    const kitName  = idOrName;
    const kitPrice = priceOrName;
    item = {
      id:    'kit-degustacao',
      name:  kitName,
      price: kitPrice,
      emoji: '🎁',
      qty:   1,
    };
  } else {
    // Produto: addToCart(id, name, price, emoji)
    item = {
      id:    idOrName,
      name:  priceOrName,
      price: priceOrUndefined,
      emoji: emoji,
      qty:   1,
    };
  }

  const existing = cart.find(c => c.id === item.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push(item);
  }

  if (item.id !== 'kit-degustacao') {
    const inCart = cart.find(c => c.id === item.id);
    updateProductCardUI(item.id, inCart.qty);
  }

  saveCart();
  renderCart();
  showToast(`${item.emoji} ${item.name} adicionado!`);
  animateFab();
}

/**
 * Altera quantidade via controle do card de produto
 */
function changeQty(id, delta) {
  const cartItem = cart.find(c => c.id === id);
  if (!cartItem) return;

  cartItem.qty += delta;

  if (cartItem.qty <= 0) {
    cart = cart.filter(c => c.id !== id);
    updateProductCardUI(id, 0);
  } else {
    updateProductCardUI(id, cartItem.qty);
  }

  saveCart();
  renderCart();
}

/**
 * Altera quantidade via carrinho lateral
 */
function changeCartQty(id, delta) {
  const cartItem = cart.find(c => c.id === id);
  if (!cartItem) return;

  cartItem.qty += delta;

  if (cartItem.qty <= 0) {
    removeFromCart(id);
    return;
  }

  if (id !== 'kit-degustacao') {
    updateProductCardUI(id, cartItem.qty);
  }

  saveCart();
  renderCart();
}

/**
 * Remove item completamente
 */
function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);

  if (id !== 'kit-degustacao') {
    updateProductCardUI(id, 0);
  }

  saveCart();
  renderCart();
}

// ─────────────────────────────────────────────
// RENDERIZAÇÃO DO CARRINHO LATERAL
// ─────────────────────────────────────────────

function renderCart() {
  const list      = document.getElementById('cart-list');
  const empty     = document.getElementById('cart-empty');
  const footer    = document.getElementById('cart-footer');
  const totalEl   = document.getElementById('cart-total');
  const countEl   = document.getElementById('cart-count');

  if (!list) return;

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  // Atualizar badge do FAB
  if (countEl) {
    countEl.textContent = totalItems;
    countEl.style.display = totalItems > 0 ? 'flex' : 'none';
  }

  if (cart.length === 0) {
    list.innerHTML   = '';
    empty.style.display  = 'block';
    footer.style.display = 'none';
    return;
  }

  empty.style.display  = 'none';
  footer.style.display = 'block';

  list.innerHTML = cart.map(item => `
    <li class="cart__item">
      <span class="cart__item-emoji">${item.emoji}</span>
      <div class="cart__item-info">
        <div class="cart__item-name">${item.name}</div>
        <div class="cart__item-price">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</div>
      </div>
      <div class="cart__item-controls">
        <button class="cart__item-btn cart__item-btn--dec" onclick="changeCartQty('${item.id}', -1)" aria-label="Diminuir">−</button>
        <span class="cart__item-qty">${item.qty}</span>
        <button class="cart__item-btn cart__item-btn--inc" onclick="changeCartQty('${item.id}', 1)" aria-label="Aumentar">+</button>
        <button class="cart__item-btn cart__item-btn--del" onclick="removeFromCart('${item.id}')" aria-label="Remover">🗑</button>
      </div>
    </li>
  `).join('');

  totalEl.textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
}

// ─────────────────────────────────────────────
// UI DO CARD DE PRODUTO
// ─────────────────────────────────────────────

function updateProductCardUI(id, qty) {
  const btn    = document.getElementById(`btn-${id}`);
  const qtyCtrl = document.getElementById(`qty-${id}`);
  const qtyNum  = document.getElementById(`qty-num-${id}`);

  if (!btn || !qtyCtrl) return;

  if (qty <= 0) {
    btn.style.display     = 'block';
    qtyCtrl.style.display = 'none';
  } else {
    btn.style.display     = 'none';
    qtyCtrl.style.display = 'flex';
    if (qtyNum) qtyNum.textContent = qty;
  }
}

// ─────────────────────────────────────────────
// WHATSAPP
// ─────────────────────────────────────────────

function finalizeOrder() {
  if (cart.length === 0) {
    showToast('⚠️ Seu carrinho está vazio!');
    return;
  }

  const lines = cart.map(item =>
    `• ${item.name} — ${item.qty} unidade${item.qty > 1 ? 's' : ''}`
  );

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalStr = total.toFixed(2).replace('.', ',');

  const message = [
    'Olá! Quero fazer um pedido de Geleias Artesanais:',
    '',
    ...lines,
    '',
    `Total estimado: R$ ${totalStr}`,
    '',
    'Gostaria de confirmar disponibilidade e entrega. 🍓',
  ].join('\n');

  const encoded = encodeURIComponent(message);
  const url     = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

  window.open(url, '_blank');
}

// ─────────────────────────────────────────────
// CARRINHO — ABRIR / FECHAR
// ─────────────────────────────────────────────

function toggleCart() {
  const cart    = document.getElementById('cart');
  const overlay = document.getElementById('cart-overlay');
  const isOpen  = cart.classList.toggle('is-open');

  if (overlay) {
    overlay.classList.toggle('is-visible', isOpen);
  }

  document.getElementById('cart-toggle').textContent = isOpen ? '✕' : '✕';
}

function createOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'cart-overlay';
  overlay.id        = 'cart-overlay';
  overlay.addEventListener('click', closeCart);
  document.body.appendChild(overlay);
}

function closeCart() {
  document.getElementById('cart').classList.remove('is-open');
  const overlay = document.getElementById('cart-overlay');
  if (overlay) overlay.classList.remove('is-visible');
}

// Botão fechar do carrinho
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('cart-toggle');
  if (toggle) toggle.addEventListener('click', closeCart);
});

// ─────────────────────────────────────────────
// LOCALSTORAGE
// ─────────────────────────────────────────────

function saveCart() {
  try {
    localStorage.setItem('geleias_cart', JSON.stringify(cart));
  } catch (e) {
    console.warn('Não foi possível salvar o carrinho:', e);
  }
}

function loadCart() {
  try {
    const saved = localStorage.getItem('geleias_cart');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

// ─────────────────────────────────────────────
// TOAST NOTIFICATION
// ─────────────────────────────────────────────

let toastTimeout;

function showToast(message) {
  let toast = document.getElementById('toast');

  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ─────────────────────────────────────────────
// ANIMAÇÃO DO FAB
// ─────────────────────────────────────────────

function animateFab() {
  const fab = document.getElementById('cart-fab');
  if (!fab) return;
  fab.style.animation = 'none';
  // Forçar reflow
  void fab.offsetWidth;
  fab.style.animation = 'cartBounce 0.4s ease';
}

// ─────────────────────────────────────────────
// SMOOTH SCROLL para botão CTA do Hero
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const heroCta = document.querySelector('.hero__cta');
  if (heroCta) {
    heroCta.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('produtos');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});
