// ============================================================
// CONFIG GLOBAL
// ============================================================

const CONFIG = {
  whatsapp: {
    phone: "5561998647768",
    message: "Olá! Gostaria de fazer um pedido de geleias artesanais 🍓"
  }
};

// ============================================================
// PRODUTOS (CATÁLOGO DE GELEIAS)
// ============================================================

const PRODUCTS = [
  {
    id: 1,
    name: "Geleia de Morango",
    flavor: "morango",
    price: 25.00,
    description: "Feita com morangos frescos selecionados, textura cremosa e sabor autêntico.",
    emoji: "🍓",
    badge: "Mais Vendida"
  },
  {
    id: 2,
    name: "Geleia de Jabuticaba",
    flavor: "jabuticaba",
    price: 28.00,
    description: "Fruta típica do cerrado brasileiro, sabor intenso e levemente adstringente.",
    emoji: "🫐",
    badge: "Premium"
  },
  {
    id: 3,
    name: "Geleia de Maracujá",
    flavor: "maracujá",
    price: 25.00,
    description: "Azedinha e refrescante, perfeita para queijos e sobremesas.",
    emoji: "🍋",
    badge: null
  },
  {
    id: 4,
    name: "Geleia de Goiaba",
    flavor: "goiaba",
    price: 23.00,
    description: "Sabor tradicional brasileiro, rica em vitamina C e aroma irresistível.",
    emoji: "🍎",
    badge: null
  },
  {
    id: 5,
    name: "Geleia de Amora",
    flavor: "amora",
    price: 27.00,
    description: "Cor intensa e sabor delicado, excelente com queijos brancos.",
    emoji: "🫐",
    badge: "Premium"
  },
  {
    id: 6,
    name: "Geleia de Frutas Vermelhas",
    flavor: "frutas-vermelhas",
    price: 30.00,
    description: "Combinação de morango, amora e framboesa em uma única geleia.",
    emoji: "🍒",
    badge: "Especial"
  }
];

// ============================================================
// CARRINHO DE COMPRAS
// ============================================================

let cart = [];

// Carregar carrinho do localStorage
function loadCart() {
  const saved = localStorage.getItem("doceSaborCart");
  if (saved) {
    cart = JSON.parse(saved);
  }
  updateCartUI();
}

// Salvar carrinho no localStorage
function saveCart() {
  localStorage.setItem("doceSaborCart", JSON.stringify(cart));
}

// Adicionar item ao carrinho
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  showCartNotification(product.name);
}

// Remover item do carrinho
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

// Atualizar quantidade
function updateQuantity(productId, delta) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
    updateCartUI();
  }
}

// Calcular total do carrinho
function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Contagem de itens
function getCartCount() {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

// Gerar mensagem do WhatsApp com o pedido
function generateOrderMessage() {
  if (cart.length === 0) return null;

  let message = "Olá! Gostaria de fazer o seguinte pedido:%0A%0A";
  
  cart.forEach(item => {
    message += `• ${item.name} (x${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}%0A`;
  });

  message += `%0A*Total: R$ ${getCartTotal().toFixed(2).replace('.', ',')}*%0A%0AObrigado!`;

  return message;
}

// Mostrar notificação de adição ao carrinho
function showCartNotification(productName) {
  // Remover notificação anterior se existir
  const existing = document.querySelector(".cart-notification");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  notification.className = "cart-notification";
  notification.innerHTML = `
    <span class="cart-notification__icon">✓</span>
    <span class="cart-notification__text">${productName} adicionada ao carrinho!</span>
  `;

  document.body.appendChild(notification);

  // Animar entrada
  setTimeout(() => notification.classList.add("show"), 10);

  // Remover após 3 segundos
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Atualizar UI do carrinho
function updateCartUI() {
  const count = getCartCount();
  const total = getCartTotal();

  // Atualizar botão flutuante do carrinho
  const cartBtn = document.getElementById("cartBtn");
  if (cartBtn) {
    const badge = cartBtn.querySelector(".cart-btn__badge");
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? "flex" : "none";
    }
  }

  // Atualizar badge no navbar (se existir)
  const navBadge = document.getElementById("cartNavBadge");
  if (navBadge) {
    navBadge.textContent = count;
    navBadge.style.display = count > 0 ? "flex" : "none";
  }

  // Atualizar modal do carrinho
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartEmpty = document.getElementById("cartEmpty");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (cartItems && cartTotal && cartEmpty && checkoutBtn) {
    if (cart.length === 0) {
      cartEmpty.style.display = "block";
      cartItems.innerHTML = "";
      cartTotal.textContent = "R$ 0,00";
      checkoutBtn.disabled = true;
      checkoutBtn.classList.add("disabled");
    } else {
      cartEmpty.style.display = "none";
      cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
          <div class="cart-item__info">
            <span class="cart-item__emoji">${item.emoji}</span>
            <div>
              <h4 class="cart-item__name">${item.name}</h4>
              <span class="cart-item__price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
          <div class="cart-item__actions">
            <button class="cart-item__btn" onclick="updateQuantity(${item.id}, -1)" aria-label="Diminuir">−</button>
            <span class="cart-item__qty">${item.quantity}</span>
            <button class="cart-item__btn" onclick="updateQuantity(${item.id}, 1)" aria-label="Aumentar">+</button>
            <button class="cart-item__remove" onclick="removeFromCart(${item.id})" aria-label="Remover">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
              </svg>
            </button>
          </div>
        </div>
      `).join("");
      cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
      checkoutBtn.disabled = false;
      checkoutBtn.classList.remove("disabled");
    }
  }
}

// Abrir/fechar modal do carrinho
function toggleCart() {
  const modal = document.getElementById("cartModal");
  const overlay = document.getElementById("cartOverlay");
  
  if (modal && overlay) {
    const isOpen = modal.classList.contains("open");
    
    if (isOpen) {
      modal.classList.remove("open");
      overlay.classList.remove("open");
      document.body.classList.remove("no-scroll");
    } else {
      modal.classList.add("open");
      overlay.classList.add("open");
      document.body.classList.add("no-scroll");
    }
  }
}

// Finalizar pedido via WhatsApp
function checkout() {
  if (cart.length === 0) return;

  const message = generateOrderMessage();
  const { phone } = CONFIG.whatsapp;
  const url = `https://wa.me/${phone}?text=${message}`;
  
  window.open(url, "_blank");
}

// Limpar carrinho
function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
}

// Inicializar carrinho
loadCart();

// ============================================================
// RENDERIZAR PRODUTOS
// ============================================================

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(product => `
    <article class="product-card" data-animate>
      <div class="product-card__header">
        <span class="product-card__emoji">${product.emoji}</span>
        ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
      </div>
      <h3 class="product-card__title">${product.name}</h3>
      <p class="product-card__desc">${product.description}</p>
      <div class="product-card__footer">
        <span class="product-card__price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
        <button class="product-card__btn" onclick="addToCart(${product.id})">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
          </svg>
          Adicionar
        </button>
      </div>
    </article>
  `).join("");
}

// Renderizar produtos ao carregar
document.addEventListener("DOMContentLoaded", renderProducts);

// ============================================================
// NAVBAR SCROLL
// ============================================================

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ============================================================
// MENU MOBILE
// ============================================================

const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("active");
  mobileMenu.classList.toggle("open");
  document.body.classList.toggle("no-scroll");
});

mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    hamburgerBtn.classList.remove("active");
    mobileMenu.classList.remove("open");
    document.body.classList.remove("no-scroll");
  });
});

// ============================================================
// SCROLL REVEAL (IntersectionObserver)
// ============================================================

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target); // performance
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll("[data-animate]").forEach(el => {
  observer.observe(el);
});

// ============================================================
// WHATSAPP LINK DINÂMICO
// ============================================================

function generateWhatsAppLink() {
  const { phone, message } = CONFIG.whatsapp;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// aplica em todos os botões
document.querySelectorAll("#heroWhatsappBtn, #ctaWhatsappBtn, #whatsappFloat")
  .forEach(btn => {
    btn.href = generateWhatsAppLink();
  });

// ============================================================
// BOTÃO WHATSAPP FLOAT (aparece depois de scroll)
// ============================================================

const whatsappFloat = document.getElementById("whatsappFloat");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    whatsappFloat.classList.add("visible");
  } else {
    whatsappFloat.classList.remove("visible");
  }
});

// ============================================================
// CARROSSEL DE DEPOIMENTOS
// ============================================================

const track = document.getElementById("testimonialsTrack");
const prevBtn = document.getElementById("testimonialPrev");
const nextBtn = document.getElementById("testimonialNext");
const dotsContainer = document.getElementById("testimonialDots");

const cards = document.querySelectorAll(".testimonial-card");

let index = 0;

// cálculo dinâmico (responsivo)
function getVisibleCards() {
  if (window.innerWidth >= 960) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

// criar dots
function createDots() {
  dotsContainer.innerHTML = "";
  const total = cards.length - getVisibleCards() + 1;

  for (let i = 0; i < total; i++) {
    const dot = document.createElement("button");
    dot.classList.add("testimonials__dot");

    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      index = i;
      updateCarousel();
    });

    dotsContainer.appendChild(dot);
  }
}

// atualizar posição
function updateCarousel() {
  const cardWidth = cards[0].offsetWidth + 24; // gap
  track.style.transform = `translateX(-${index * cardWidth}px)`;

  // atualizar dots
  document.querySelectorAll(".testimonials__dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  // limites botões
  const maxIndex = cards.length - getVisibleCards();

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index >= maxIndex;
}

// botões
prevBtn.addEventListener("click", () => {
  index--;
  updateCarousel();
});

nextBtn.addEventListener("click", () => {
  index++;
  updateCarousel();
});

// swipe mobile
let startX = 0;

track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      nextBtn.click();
    } else {
      prevBtn.click();
    }
  }
});

// resize handler
window.addEventListener("resize", () => {
  index = 0;
  createDots();
  updateCarousel();
});

// init
createDots();
updateCarousel();

// ============================================================
// MELHORIA DE PERFORMANCE (throttle scroll)
// ============================================================

function throttle(fn, wait) {
  let time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  };
}

// aplica throttle no scroll pesado
window.addEventListener("scroll", throttle(() => {
  // já usado para float + navbar
}, 100));
