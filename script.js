const products = [
    { id: 1, name: "Plano Aconchego", price: 10, description: "Abraços virtuais, mensagens de bom dia, e carinho diário." },
    { id: 2, name: "Declarações Diárias", price: 15, description: "Declarações personalizadas enviadas por mensagem." },
    { id: 3, name: "Pacote de Amor Completo", price: 50, description: "Surpresas românticas, chamadas e muito mais!" },
];

let cart = [];

function loadProducts() {
    const productSection = document.getElementById("products");
    productSection.innerHTML = "";
    products.forEach((product) => {
        productSection.innerHTML += `
            <div class="product">
                <h2>${product.name}</h2>
                <p>R$${product.price.toFixed(2)}</p>
                <p class="description">${product.description}</p>
                <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            </div>
        `;
    });
}

function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    cartCount.innerText = cart.length;

    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - R$${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart(${index})">&times;</button>
            </div>
        `;
    });

    totalPrice.innerText = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    const cartDetails = document.getElementById("cart-details");
    cartDetails.classList.toggle("show");
}

function checkout() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    const orderSummary = cart
        .map((item) => `${item.name} - R$${item.price.toFixed(2)}`)
        .join("\n");
    const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    const message = `Resumo do Pedido:%0A${orderSummary}%0ATotal: R$${total}`;
    const whatsappNumber = "24981128510";
    const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;

    window.open(whatsappLink, "_blank");

    cart = [];
    updateCart();
    toggleCart();
}

loadProducts();
    
