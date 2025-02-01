const products = [
    {
        id: 1,
        name: "👼 Boneco Angelical",
        emoji: "👼",
        price: 89.90,
        category: "brinquedos"
    },
    {
        id: 2,
        name: "✨ Doces Celestiais",
        emoji: "🍬",
        price: 12.50,
        category: "doces"
    },
    {
        id: 3,
        name: "⭐ Jogo das Estrelas",
        emoji: "🎮",
        price: 129.90,
        category: "jogos"
    },
    {
        id: 4,
        name: "🌟 Kit Arte Celestial",
        emoji: "🌟",
        price: 45.90,
        category: "brinquedos"
    },
    {
        id: 5,
        name: "💫 Chocolate Divino",
        emoji: "🍫",
        price: 8.90,
        category: "doces"
    },
    {
        id: 6,
        name: "✨100x SHINY POTION✨",
        emoji: "✨",
        price: 3.00,
        category: "anime_fighters"
    },
    {
        id: 7,
        name: "⏳250x SUPER TIME⏳",
        emoji: "⏳",
        price: 7.50,
        category: "anime_fighters"
    },
    {
        id: 8,
        name: "⏳100x SUPER TIME⏳",
        emoji: "⏳",
        price: 3.00,
        category: "anime_fighters"
    },
    {
        id: 9,
        name: "🍀100x SUPER LUCK🍀",
        emoji: "🍀",
        price: 2.00,
        category: "anime_fighters"
    },
    {
        id: 35,
        name: "🏰DUNGEON INSANA🏰",
        emoji: "🏰",
        price: 5.00,
        category: "anime_fighters"
    },
    {
        id: 36,
        name: "✅ PASSE DE ELITE BOOYAH FREE FIRE + BRINDE ✅",
        emoji: "👑",
        price: 8.49,
        category: "free_fire",
        description: `
            🎮 PASSE BOOYAH PREMIUM FREE FIRE - ENTREGA RÁPIDA
            
            📌 ENTREGA VIA ID
            📌 100% SEGURO
            📌 ZERO RISCO DE BAN
            
            🎁 INFORMAÇÕES DE ENTREGA:
            - Após a compra, você deve informar seu ID
            - Não precisa adicionar no jogo
            - Envio automático para o ID
            - Ótimo para revendedores
        `
    }
];

// Adicionar botão do Free Fire antes de configurar os eventos
function initializeCategories() {
    const nav = document.querySelector('nav');
    if (!nav.querySelector('[data-category="free_fire"]')) {
        nav.innerHTML += `
            <button class="category-btn" data-category="free_fire">🔥 Free Fire</button>
        `;
    }
    
    // Configurar os event listeners para todos os botões
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            renderProducts(e.target.dataset.category);
        });
    });
}

let cart = [];

function renderProducts(category = 'todos') {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    const filteredProducts = category === 'todos' 
        ? products 
        : products.filter(p => p.category === category);

    if (category === 'anime_fighters' || category === 'todos') {
        const sections = {
            'BUSTS': filteredProducts.filter(p => p.name.includes('POTION') || p.name.includes('SUPER')),
            'ITENS': filteredProducts.filter(p => p.name.includes('TOKEN') || p.name.includes('SHARD')),
            'ARTEFATOS': filteredProducts.filter(p => p.name.includes('ARTEFATO')),
            'PEDRAS': filteredProducts.filter(p => p.name.includes('PEDRAS')),
            'DESAFIOS': filteredProducts.filter(p => p.name.includes('TRIAL') || p.name.includes('DUNGEON'))
        };

        Object.entries(sections).forEach(([section, items]) => {
            if (items.length > 0) {
                const header = document.createElement('div');
                header.className = 'category-header bounce-in';
                header.innerHTML = `<h2>✨ ${section} ✨</h2>`;
                container.appendChild(header);

                items.forEach(product => {
                    const card = createProductCard(product);
                    container.appendChild(card);
                });
            }
        });
    } else {
        filteredProducts.forEach(product => {
            const card = createProductCard(product);
            container.appendChild(card);
        });
    }
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card bounce-in';
    card.dataset.category = product.category;
    
    let cardContent = `
        <div class="product-emoji wobble">${product.emoji}</div>
        <h3 class="float">${product.name}</h3>
        <div class="product-price">R$ ${product.price.toFixed(2)}</div>
    `;

    if (product.category === 'free_fire') {
        cardContent += `
            <div class="product-description">
                ${product.description.split('\n').map(line => 
                    `<p>${line.trim()}</p>`
                ).join('')}
            </div>
        `;
    }

    cardContent += `
        <button onclick="addToCart(${product.id})" class="category-btn">
            Adicionar ao Carrinho 🛒
        </button>
    `;

    card.innerHTML = cardContent;
    return card;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
    showCartPopup();
    
    // Som de "pop" ao adicionar ao carrinho
    const audio = new Audio('data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=');
    audio.play();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

function showCartPopup() {
    const popup = document.getElementById('cart-popup');
    const overlay = document.getElementById('cart-overlay');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-emoji">${item.emoji}</span>
                <span>${item.name}</span>
            </div>
            <div class="cart-item-price">
                <span>R$ ${item.price.toFixed(2)}</span>
                <button class="remove-item" onclick="removeFromCart(${index})">🗑️</button>
            </div>
        `;
        cartItems.appendChild(itemElement);
    });

    cartTotal.textContent = total.toFixed(2);
    popup.style.display = 'block';
    overlay.style.display = 'block';
    popup.classList.add('bounce-in');
}

function hideCartPopup() {
    const popup = document.getElementById('cart-popup');
    const overlay = document.getElementById('cart-overlay');
    popup.style.display = 'none';
    overlay.style.display = 'none';
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    showCartPopup();
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const items = cart.map(item => item.name).join(', ');
    const message = `Olá! Gostaria de comprar os seguintes itens: ${items}. Total: R$ ${total.toFixed(2)}`;
    const whatsappUrl = `https://wa.me/24981128510?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});

document.getElementById('cart-close').addEventListener('click', hideCartPopup);
document.getElementById('cart-overlay').addEventListener('click', hideCartPopup);
document.getElementById('cart-toggle').addEventListener('click', showCartPopup);

// Inicializar a loja
initializeCategories();
renderProducts(); 