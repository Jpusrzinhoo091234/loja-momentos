
let cart = [];
let total = 0;

function getPrice(planId) {
    const select = document.getElementById(planId);
    return parseFloat(select.value);
}

function addToCart(planName, price) {
    cart.push({ name: planName, price: price });
    total += price;
    updateCart();
    saveCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `<p>${item.name} - R$${item.price.toFixed(2)}</p>`;
        cartItems.appendChild(itemElement);
    });
    totalPrice.innerText = total.toFixed(2);
    document.getElementById('cart').classList.add('show');
}

function showCart() {
    document.getElementById('cart-details').classList.add('show');
}

function closeCart() {
    document.getElementById('cart-details').classList.remove('show');
}

function checkout() {
    let message = 'Resumo do Pedido:\n';
    cart.forEach(item => {
        message += `${item.name} - R$${item.price.toFixed(2)}\n`;
    });
    message += `Total: R$${total.toFixed(2)}`;

    const whatsappLink = `https://api.whatsapp.com/send?phone=24981128510&text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');

    cart = [];
    total = 0;
    updateCart();
    closeCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        total = cart.reduce((sum, item) => sum + item.price, 0);
        updateCart();
    }
}

window.onload = loadCart;
