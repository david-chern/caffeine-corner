// Checkout Payment Handling JavaScript

// Initialize payment method handlers
function initPaymentHandlers() {
    // Wait a bit for DOM to be fully ready
    setTimeout(() => {
        const paymentMethodSelect = document.getElementById('paymentMethod');
        const placeOrderBtn = document.getElementById('placeOrderBtn');
        
        if (!paymentMethodSelect) {
            console.warn('Payment method select not found, retrying...');
            setTimeout(initPaymentHandlers, 100);
            return;
        }

        // Handle payment method selection
        paymentMethodSelect.addEventListener('change', handlePaymentMethodChange);
        
        // Add input listeners for validation
        const cardInputs = ['cardholderName', 'cardNumber', 'expirationDate', 'cvv', 'billingZip'];
        cardInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('input', validatePaymentForm);
                input.addEventListener('blur', formatCardInput);
            }
        });

        // Initial validation
        validatePaymentForm();
    }, 100);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPaymentHandlers);
} else {
    initPaymentHandlers();
}

// Export for manual initialization if needed
window.initPaymentHandlers = initPaymentHandlers;

// Handle payment method selection change
function handlePaymentMethodChange() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    const cardForm = document.getElementById('cardPaymentForm');
    const paypalForm = document.getElementById('paypalPaymentForm');
    const placeOrderBtn = document.getElementById('placeOrderBtn');

    // Hide all payment forms
    if (cardForm) cardForm.style.display = 'none';
    if (paypalForm) paypalForm.style.display = 'none';

    // Show appropriate form based on selection
    if (paymentMethod === 'credit-card' || paymentMethod === 'debit-card') {
        if (cardForm) {
            cardForm.style.display = 'block';
            // Make card fields required
            setCardFieldsRequired(true);
        }
    } else if (paymentMethod === 'paypal') {
        if (paypalForm) {
            paypalForm.style.display = 'block';
            // PayPal doesn't need card fields
            setCardFieldsRequired(false);
        }
    } else {
        // No payment method selected
        setCardFieldsRequired(false);
    }

    // Validate form
    validatePaymentForm();
}

// Set card fields as required or not
function setCardFieldsRequired(required) {
    const cardFields = ['cardholderName', 'cardNumber', 'expirationDate', 'cvv', 'billingZip'];
    cardFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            if (required) {
                field.setAttribute('required', 'required');
            } else {
                field.removeAttribute('required');
            }
        }
    });
}

// Format card input as user types
function formatCardInput(event) {
    const input = event.target;
    
    if (input.id === 'cardNumber') {
        // Format card number with spaces (e.g., 1234 5678 9012 3456)
        let value = input.value.replace(/\s/g, '');
        value = value.replace(/(.{4})/g, '$1 ').trim();
        input.value = value;
    } else if (input.id === 'expirationDate') {
        // Format expiration date as MM/YY
        let value = input.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        input.value = value;
    }
}

// Validate payment form
function validatePaymentForm() {
    const paymentMethod = document.getElementById('paymentMethod')?.value;
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    
    if (!placeOrderBtn) return;

    let isValid = true;
    let errorMessage = '';

    if (!paymentMethod) {
        isValid = false;
        errorMessage = 'Please select a payment method';
    } else if (paymentMethod === 'credit-card' || paymentMethod === 'debit-card') {
        // Validate card fields
        const cardholderName = document.getElementById('cardholderName')?.value.trim();
        const cardNumber = document.getElementById('cardNumber')?.value.replace(/\s/g, '');
        const expirationDate = document.getElementById('expirationDate')?.value;
        const cvv = document.getElementById('cvv')?.value.trim();
        const billingZip = document.getElementById('billingZip')?.value.trim();

        if (!cardholderName || cardholderName.length < 2) {
            isValid = false;
            errorMessage = 'Please enter cardholder name';
        } else if (!cardNumber || cardNumber.length < 13 || cardNumber.length > 19) {
            isValid = false;
            errorMessage = 'Please enter a valid card number (13-19 digits)';
        } else if (!expirationDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate)) {
            isValid = false;
            errorMessage = 'Please enter a valid expiration date (MM/YY)';
        } else if (!cvv || !/^\d{3,4}$/.test(cvv)) {
            isValid = false;
            errorMessage = 'Please enter a valid CVV (3-4 digits)';
        } else if (!billingZip || !/^\d{5,10}$/.test(billingZip)) {
            isValid = false;
            errorMessage = 'Please enter a valid billing ZIP code';
        } else {
            // Validate expiration date is not in the past
            const [month, year] = expirationDate.split('/');
            const expDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
            const now = new Date();
            if (expDate < now) {
                isValid = false;
                errorMessage = 'Card expiration date cannot be in the past';
            }
        }
    } else if (paymentMethod === 'paypal') {
        // PayPal is always valid (no fields to validate)
        isValid = true;
    }

    // Update button state
    placeOrderBtn.disabled = !isValid;
    
    // Update button text if needed
    if (!isValid && errorMessage) {
        placeOrderBtn.title = errorMessage;
    } else {
        placeOrderBtn.title = '';
    }

    return isValid;
}

// Enhance submitCheckout function to include payment validation
(function() {
    // Wait for cart.js to load and define submitCheckout
    const enhanceSubmitCheckout = () => {
        if (typeof window.submitCheckout === 'function') {
            const originalSubmitCheckout = window.submitCheckout;
            
            window.submitCheckout = async function(event) {
                event.preventDefault();
                
                // Validate payment form before proceeding
                if (!validatePaymentForm()) {
                    const paymentMethod = document.getElementById('paymentMethod')?.value;
                    if (!paymentMethod) {
                        alert('Please select a payment method.');
                    } else {
                        alert('Please complete all required payment information before placing your order.');
                    }
                    return;
                }
                
                if (typeof cart === 'undefined' || cart.length === 0) {
                    alert('Your cart is empty!');
                    return;
                }
                
                const formData = new FormData(event.target);
                const paymentMethod = formData.get('paymentMethod');
                
                // Collect payment details if card payment
                let paymentDetails = null;
                if (paymentMethod === 'credit-card' || paymentMethod === 'debit-card') {
                    paymentDetails = {
                        cardholderName: formData.get('cardholderName'),
                        cardNumber: formData.get('cardNumber')?.replace(/\s/g, '') || '',
                        expirationDate: formData.get('expirationDate'),
                        cvv: formData.get('cvv'),
                        billingZip: formData.get('billingZip')
                    };
                }
                
                // Get checkout data
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
                    subtotal: typeof getCartSubtotal === 'function' ? getCartSubtotal() : 0,
                    shipping: typeof getShippingCost === 'function' ? getShippingCost() : 0,
                    tax: typeof getTax === 'function' ? getTax() : 0,
                    total: typeof getFinalTotal === 'function' ? getFinalTotal() : 0,
                    paymentMethod: paymentMethod,
                    paymentDetails: paymentDetails
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
                        if (typeof saveCart === 'function') saveCart();
                        
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
            };
        } else {
            // Retry after a short delay if cart.js hasn't loaded yet
            setTimeout(enhanceSubmitCheckout, 100);
        }
    };
    
    // Start enhancement when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(enhanceSubmitCheckout, 200); // Give cart.js time to load
        });
    } else {
        setTimeout(enhanceSubmitCheckout, 200);
    }
})();

// Handle PayPal button click
document.addEventListener('DOMContentLoaded', () => {
    const paypalButton = document.getElementById('paypalButton');
    if (paypalButton) {
        paypalButton.addEventListener('click', () => {
            // For now, just validate and proceed with checkout
            // In production, this would redirect to PayPal
            const paymentMethodSelect = document.getElementById('paymentMethod');
            if (paymentMethodSelect && paymentMethodSelect.value === 'paypal') {
                // Trigger form submission
                const checkoutForm = document.getElementById('checkoutForm');
                if (checkoutForm) {
                    checkoutForm.dispatchEvent(new Event('submit'));
                }
            } else {
                alert('Please select PayPal as your payment method first.');
            }
        });
    }
});

