/**
 * Cart Management System
 * Handles cart operations using localStorage and API integration
 */

// Cart data structure: Array of { id, name, price, image, quantity }
let cart = [];

// Initialize cart from localStorage or empty array
function initCart() {
    const savedCart = localStorage.getItem('caffeineCornerCart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            console.error('Error parsing cart from localStorage:', e);
            cart = [];
        }
    }
    updateCartUI();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('caffeineCornerCart', JSON.stringify(cart));
    updateCartUI();
}

// Update cart badge in navbar
function updateCartUI() {
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Add item to cart
function addToCart(productId, productName, productPrice, productImage, grindOption = null) {
    // For items with same ID and grind option, increase quantity
    // Otherwise, add as new item
    const existingItem = cart.find(item => 
        item.id === productId && item.grindOption === grindOption
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            image: productImage,
            quantity: 1,
            grindOption: grindOption || null
        });
    }
    
    saveCart();
    
    // Show feedback
    const grindText = grindOption ? ` (${grindOption})` : '';
    showCartNotification(`${productName}${grindText} added to cart!`);
    
    // Optional: Sync with backend if user is logged in
    syncCartToBackend();
}

// Remove item from cart by index (handles items with same product but different grind)
function removeFromCartByIndex(index) {
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        saveCart();
        renderCartPage(); // If on cart page, re-render
    }
}

// Remove item from cart (for backwards compatibility)
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex >= 0) {
        removeFromCartByIndex(itemIndex);
    }
}

// Update item quantity in cart by index
function updateCartQuantityByIndex(index, newQuantity) {
    if (index >= 0 && index < cart.length) {
        if (newQuantity <= 0) {
            removeFromCartByIndex(index);
        } else {
            cart[index].quantity = parseInt(newQuantity);
            saveCart();
            renderCartPage(); // If on cart page, re-render
        }
    }
}

// Update item quantity in cart (for backwards compatibility - updates first match)
function updateCartQuantity(productId, newQuantity) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex >= 0) {
        updateCartQuantityByIndex(itemIndex, newQuantity);
    }
}

// Get cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart subtotal
function getCartSubtotal() {
    return getCartTotal();
}

// Get shipping cost (free over $50, otherwise $5.99)
function getShippingCost() {
    const subtotal = getCartSubtotal();
    return subtotal >= 50 ? 0 : 5.99;
}

// Get tax (10% of subtotal + shipping)
function getTax() {
    const subtotal = getCartSubtotal();
    const shipping = getShippingCost();
    return (subtotal + shipping) * 0.1;
}

// Get final total
function getFinalTotal() {
    return getCartSubtotal() + getShippingCost() + getTax();
}

// Show notification
function showCartNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #6f4e37;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Sync cart to backend (if user is logged in)
async function syncCartToBackend() {
    // This can be implemented when user authentication is added
    // For now, cart is stored in localStorage only
}

// Render cart page
function renderCartPage() {
    const cartContainer = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Add some delicious coffee to your cart!</p>
                <a href="index.html" class="cta-button">Continue Shopping</a>
            </div>
        `;
        if (cartSummary) cartSummary.innerHTML = '';
        return;
    }
    
    // Render cart items (use index to handle items with same product but different grind)
    cartContainer.innerHTML = cart.map((item, index) => {
        const uniqueId = `${item.id}-${index}`;
        return `
        <div class="cart-item" data-id="${uniqueId}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                ${item.grindOption ? `<p class="cart-item-grind">Grind: <strong>${item.grindOption}</strong></p>` : ''}
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateCartQuantityByIndex(${index}, ${item.quantity - 1})">-</button>
                <input type="number" value="${item.quantity}" min="1" 
                       onchange="updateCartQuantityByIndex(${index}, parseInt(this.value))">
                <button class="quantity-btn" onclick="updateCartQuantityByIndex(${index}, ${item.quantity + 1})">+</button>
            </div>
            <div class="cart-item-total">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
            <button class="remove-btn" onclick="removeFromCartByIndex(${index})" title="Remove item">
                ✕
            </button>
        </div>
    `;
    }).join('');
    
    // Render cart summary
    if (cartSummary) {
        const subtotal = getCartSubtotal();
        const shipping = getShippingCost();
        const tax = getTax();
        const total = getFinalTotal();
        
        // Free shipping message
        const freeShippingThreshold = 50;
        const amountNeeded = freeShippingThreshold - subtotal;
        const freeShippingMessage = shipping === 0 
            ? '<div class="free-shipping-badge">✓ You qualify for FREE shipping!</div>'
            : `<div class="shipping-progress">Add $${amountNeeded.toFixed(2)} more for FREE shipping!</div>`;
        
        cartSummary.innerHTML = `
            ${freeShippingMessage}
            <div class="cart-summary-item">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="cart-summary-item">
                <span>Shipping:</span>
                <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
            </div>
            <div class="cart-summary-item">
                <span>Tax:</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="cart-summary-total">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <a href="checkout.html" class="checkout-btn">Proceed to Checkout</a>
        `;
    }
}

// Render checkout page
function renderCheckoutPage() {
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutSummary = document.getElementById('checkoutSummary');
    
    if (!checkoutItems) return;
    
    if (cart.length === 0) {
        checkoutItems.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <a href="index.html" class="cta-button">Continue Shopping</a>
            </div>
        `;
        return;
    }
    
    // Render checkout items
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="checkout-item-details">
                <h4>${item.name}</h4>
                ${item.grindOption ? `<p class="checkout-grind">Grind: <strong>${item.grindOption}</strong></p>` : ''}
                <p>Quantity: ${item.quantity} × $${item.price.toFixed(2)}</p>
            </div>
            <div class="checkout-item-total">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    `).join('');
    
    // Render checkout summary
    if (checkoutSummary) {
        const subtotal = getCartSubtotal();
        const shipping = getShippingCost();
        const tax = getTax();
        const total = getFinalTotal();
        
        // Free shipping message
        const freeShippingThreshold = 50;
        const amountNeeded = freeShippingThreshold - subtotal;
        const freeShippingMessage = shipping === 0 
            ? '<div class="free-shipping-badge">✓ You qualify for FREE shipping!</div>'
            : `<div class="shipping-progress">Add $${amountNeeded.toFixed(2)} more for FREE shipping!</div>`;
        
        checkoutSummary.innerHTML = `
            ${freeShippingMessage}
            <div class="checkout-summary-item">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="checkout-summary-item">
                <span>Shipping:</span>
                <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
            </div>
            <div class="checkout-summary-item">
                <span>Tax:</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="checkout-summary-total">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
        `;
    }
}

// Submit checkout
async function submitCheckout(event) {
    event.preventDefault();
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const formData = new FormData(event.target);
    const checkoutData = {
        customerInfo: {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            street: formData.get('street'),
            city: formData.get('city'),
            state: formData.get('state'),
            zipCode: formData.get('zipCode'),
            country: formData.get('country') || 'USA'
        },
        items: cart.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            grindOption: item.grindOption || null
        })),
        subtotal: getCartSubtotal(),
        shipping: getShippingCost(),
        tax: getTax(),
        total: getFinalTotal(),
        paymentMethod: formData.get('paymentMethod')
    };
    
    try {
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(checkoutData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            // Clear cart
            cart = [];
            saveCart();
            
            // Redirect to success page or show success message
            alert(`Order placed successfully! Order ID: ${result.orderId}`);
            window.location.href = 'index.html';
        } else {
            alert(`Error: ${result.message || 'Failed to place order'}`);
        }
    } catch (error) {
        console.error('Checkout error:', error);
        alert('An error occurred while placing your order. Please try again.');
    }
}

// Initialize cart when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCart);
} else {
    initCart();
}

// Expose functions to global scope for onclick handlers
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.removeFromCartByIndex = removeFromCartByIndex;
window.updateCartQuantity = updateCartQuantity;
window.updateCartQuantityByIndex = updateCartQuantityByIndex;
window.submitCheckout = submitCheckout;
window.renderCartPage = renderCartPage;
window.renderCheckoutPage = renderCheckoutPage;
window.getCartTotal = getCartTotal;

