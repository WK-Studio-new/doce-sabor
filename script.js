/* ========================================
   DOCE SABOR - Geleias Artesanais
   Script.js
   ======================================== */

// ----- Configuração -----
// Número do WhatsApp (substitua pelo número real)
const WHATSAPP_NUMERO = '5511999999999';

// ----- Dados dos Produtos ----- 
const produtos = [
    {
        id: 'morango',
        nome: 'Geleia de Morango',
        descricao: 'Frutas frescas selecionadas',
        preco: 35,
        cor: '#c62828',
        icon: 'fa-strawberry'
    },
    {
        id: 'manga',
        nome: 'Geleia de Manga',
        descricao: 'Manga madura e doce',
        preco: 35,
        cor: '#e65100',
        icon: 'fa-lemon'
    },
    {
        id: 'maracuja',
        nome: 'Geleia de Maracujá',
        descricao: 'Polpa natural ácida',
        preco: 35,
        cor: '#f57f17',
        icon: 'fa-lemon'
    },
    {
        id: 'goiaba',
        nome: 'Geleia de Goiaba',
        descricao: 'Fruta vermelha intensa',
        preco: 35,
        cor: '#ad1457',
        icon: 'fa-peach'
    },
    {
        id: 'frutas-vermelhas',
        nome: 'Geleia de Frutas Vermelhas',
        descricao: 'Mistura de frutas silvestres',
        preco: 35,
        cor: '#6a1b9a',
        icon: 'fa-harvest'
    }
];

const kit = {
    id: 'kit-degustacao',
    nome: 'Kit Degustação',
    descricao: '3 potes de 250g com sabores à sua escolha',
    preco: 99,
    cor: '#8b4513',
    icon: 'fa-gift'
};

// ----- Estado do Carrinho -----
let carrinho = [];

// ----- Inicialização -----
document.addEventListener('DOMContentLoaded', () => {
    carregarCarrinho();
    renderizarProdutos();
    configurarEventos();
});

// ----- Renderizar Produtos -----
function renderizarProdutos() {
    const grid = document.getElementById('productsGrid');
    
    grid.innerHTML = produtos.map(produto => `
        <div class="product-card" data-flavor="${produto.id}">
            <div class="product-image">
                <i class="fas ${produto.icon}"></i>
            </div>
            <div class="product-info">
                <h3 class="product-name">${produto.nome}</h3>
                <p class="product-description">${produto.descricao}</p>
                <div class="product-footer">
                    <span class="product-price">R$ ${produto.preco.toFixed(2)}</span>
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="diminuirQuantidade('${produto.id}')">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-value" id="qty-${produto.id}">${obterQuantidade(produto.id)}</span>
                        <button class="quantity-btn" onclick="aumentarQuantidade('${produto.id}')">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button class="btn btn-add" style="width: 100%; margin-top: 15px;" onclick="adicionarProduto('${produto.id}')">
                    <i class="fas fa-cart-plus"></i>
                    Adicionar ao carrinho
                </button>
            </div>
        </div>
    `).join('');
}

// ----- Funções do Carrinho -----
function adicionarProduto(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;
    
    const itemExistente = carrinho.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1
        });
    }
    
    salvarCarrinho();
    atualizarInterface();
    abrirCarrinho();
}

function adicionarKit() {
    const itemExistente = carrinho.find(item => item.id === kit.id);
    
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            id: kit.id,
            nome: kit.nome,
            preco: kit.preco,
            quantidade: 1
        });
    }
    
    salvarCarrinho();
    atualizarInterface();
    abrirCarrinho();
}

function removerItem(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    salvarCarrinho();
    atualizarInterface();
}

function aumentarQuantidadeItem(id) {
    const item = carrinho.find(item => item.id === id);
    if (item) {
        item.quantidade += 1;
        salvarCarrinho();
        atualizarInterface();
    }
}

function diminuirQuantidadeItem(id) {
    const item = carrinho.find(item => item.id === id);
    if (item) {
        if (item.quantidade > 1) {
            item.quantidade -= 1;
        } else {
            removerItem(id);
            return;
        }
        salvarCarrinho();
        atualizarInterface();
    }
}

function obterQuantidade(id) {
    const item = carrinho.find(item => item.id === id);
    return item ? item.quantidade : 0;
}

function aumentarQuantidade(id) {
    adicionarProduto(id);
}

function diminuirQuantidade(id) {
    const item = carrinho.find(item => item.id === id);
    if (item) {
        if (item.quantidade > 1) {
            item.quantidade -= 1;
        } else {
            removerItem(id);
            return;
        }
        salvarCarrinho();
        atualizarInterface();
    }
}

// ----- Cálculos -----
function calcularTotal() {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

function obterQuantidadeTotal() {
    return carrinho.reduce((total, item) => total + item.quantidade, 0);
}

// ----- Interface -----
function atualizarInterface() {
    atualizarContador();
    renderizarItensCarrinho();
    atualizarTotal();
    verificarBotaoCheckout();
}

function atualizarContador() {
    const contador = document.getElementById('cartCount');
    const total = obterQuantidadeTotal();
    contador.textContent = total;
    contador.style.display = total > 0 ? 'flex' : 'none';
}

function renderizarItensCarrinho() {
    const container = document.getElementById('cartItems');
    
    if (carrinho.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-basket"></i>
                <p>Seu carrinho está vazio</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = carrinho.map(item => {
        const produto = produtos.find(p => p.id === item.id) || kit;
        const cor = produto.cor || '#8b4513';
        
        return `
            <div class="cart-item">
                <div class="cart-item-image" style="background: ${cor}20;">
                    <i class="fas ${produto.icon}" style="color: ${cor};"></i>
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.nome}</div>
                    <div class="cart-item-price">R$ ${item.preco.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button onclick="diminuirQuantidadeItem('${item.id}')">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span>${item.quantidade}</span>
                        <button onclick="aumentarQuantidadeItem('${item.id}')">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removerItem('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');
}

function atualizarTotal() {
    const total = calcularTotal();
    document.getElementById('cartTotal').textContent = `R$ ${total.toFixed(2)}`;
}

function verificarBotaoCheckout() {
    const botao = document.getElementById('checkoutBtn');
    botao.disabled = carrinho.length === 0;
}

// ----- Persistência -----
function salvarCarrinho() {
    localStorage.setItem('doceSaborCarrinho', JSON.stringify(carrinho));
}

function carregarCarrinho() {
    const salvo = localStorage.getItem('doceSaborCarrinho');
    if (salvo) {
        carrinho = JSON.parse(salvo);
        atualizarInterface();
    }
}

// ----- WhatsApp -----
function finalizarPedido() {
    if (carrinho.length === 0) return;
    
    const total = calcularTotal();
    let mensagem = `Olá! Quero fazer um pedido:%0A%0A`;
    
    carrinho.forEach(item => {
        mensagem += `• ${item.nome} — ${item.quantidade} ${item.quantidade === 1 ? 'unidade' : 'unidades'}%0A`;
    });
    
    mensagem += `%0ATotal estimado: R$ ${total.toFixed(2)}%0A%0AGostaria de confirmar disponibilidade e entrega.`;
    
    const urlWhatsApp = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensagem}`;
    
    window.open(urlWhatsApp, '_blank');
}

// ----- Eventos do Carrinho -----
function configurarEventos() {
    const toggle = document.getElementById('cartToggle');
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    const close = document.getElementById('cartClose');
    
    toggle.addEventListener('click', () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    });
    
    close.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
}

function abrirCarrinho() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    sidebar.classList.add('active');
    overlay.classList.add('active');
}
