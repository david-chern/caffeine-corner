/**
 * Product Detail Page Handler
 * Fetches and displays product details based on URL parameter
 */

// Product database (matching the products on index.html)
const productsDatabase = {
    'ethiopian-yirgacheffe': {
        id: 'ethiopian-yirgacheffe',
        name: 'Ethiopian Yirgacheffe',
        description: 'A bright and floral coffee with notes of citrus and jasmine. Single-origin beans from Ethiopia. Perfect for those who enjoy light, aromatic coffees with complex flavor profiles.',
        category: 'roasted-coffee',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=800&fit=crop',
        origin: 'Ethiopia',
        roastLevel: 'Light Roast',
        flavorProfile: ['Citrus', 'Jasmine', 'Floral', 'Bright'],
        grindOptions: ['Whole Bean', 'Coarse', 'Medium', 'Fine', 'Espresso'],
        featured: true
    },
    'colombian-supremo': {
        id: 'colombian-supremo',
        name: 'Colombian Supremo',
        description: 'Smooth and well-balanced with notes of caramel and nuts. Medium roast perfection. This coffee offers a delightful balance that appeals to both casual and serious coffee drinkers.',
        category: 'roasted-coffee',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&h=800&fit=crop',
        origin: 'Colombia',
        roastLevel: 'Medium Roast',
        flavorProfile: ['Caramel', 'Nutty', 'Smooth', 'Balanced'],
        grindOptions: ['Whole Bean', 'Medium', 'Fine'],
        featured: true
    },
    'dark-roast-espresso': {
        id: 'dark-roast-espresso',
        name: 'Dark Roast Espresso',
        description: 'Bold and rich with dark chocolate notes. Perfect for espresso lovers. This intense blend delivers a full-bodied experience that will wake up your senses.',
        category: 'roasted-coffee',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=800&fit=crop',
        origin: 'Brazil',
        roastLevel: 'Dark Roast',
        flavorProfile: ['Dark Chocolate', 'Bold', 'Smoky', 'Rich'],
        grindOptions: ['Whole Bean', 'Fine', 'Espresso'],
        featured: true
    },
    'house-blend-premium': {
        id: 'house-blend-premium',
        name: 'House Blend Premium',
        description: 'Our signature blend combining beans from three continents. Smooth and versatile. This is our most popular coffee, carefully crafted to deliver a consistently excellent cup every time.',
        category: 'specialty-blend',
        price: 17.99,
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=800&fit=crop&q=80',
        origin: 'Multi-Origin',
        roastLevel: 'Medium Roast',
        flavorProfile: ['Smooth', 'Balanced', 'Chocolate', 'Caramel'],
        grindOptions: ['Whole Bean', 'Coarse', 'Medium', 'Fine'],
        featured: true
    },
    'costa-rican-tarrazu': {
        id: 'costa-rican-tarrazu',
        name: 'Costa Rican Tarrazu',
        description: 'Clean and bright with honey-like sweetness. Perfect for pour-over brewing. This coffee showcases the pristine growing conditions of Costa Rica\'s Tarrazu region.',
        category: 'roasted-coffee',
        price: 20.99,
        image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800&h=800&fit=crop',
        origin: 'Costa Rica',
        roastLevel: 'Light Roast',
        flavorProfile: ['Honey', 'Bright', 'Clean', 'Sweet'],
        grindOptions: ['Whole Bean', 'Coarse', 'Medium'],
        featured: false
    },
    'guatemalan-green-beans': {
        id: 'guatemalan-green-beans',
        name: 'Guatemalan Green Beans',
        description: 'Raw, unroasted coffee beans for home roasters. High-quality single-origin beans. Roast them yourself to achieve your perfect flavor profile and freshness.',
        category: 'green-coffee',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=800&fit=crop',
        origin: 'Guatemala',
        roastLevel: 'Unroasted',
        flavorProfile: ['Fresh', 'Natural', 'Raw'],
        grindOptions: [],
        featured: false
    },
    'italian-espresso-roast': {
        id: 'italian-espresso-roast',
        name: 'Italian Espresso Roast',
        description: 'Traditional Italian-style espresso roast. Intense and full-bodied. Experience the authentic espresso culture with this classic European-style roast.',
        category: 'roasted-coffee',
        price: 18.49,
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=800&fit=crop&q=80',
        origin: 'Italy',
        roastLevel: 'Dark Roast',
        flavorProfile: ['Intense', 'Full-bodied', 'Bold', 'Creamy'],
        grindOptions: ['Whole Bean', 'Fine', 'Espresso'],
        featured: false
    },
    'energy-boost-drink': {
        id: 'energy-boost-drink',
        name: 'Energy Boost Drink',
        description: 'Natural energy drink with green tea extract and B-vitamins. No artificial sweeteners. Get your energy boost the healthy way with our all-natural formulation.',
        category: 'energy-drink',
        price: 3.99,
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=800&fit=crop&q=80',
        origin: 'Natural',
        roastLevel: null,
        flavorProfile: ['Refreshing', 'Natural', 'Energizing'],
        grindOptions: [],
        featured: false
    },
    'sumatra-mandheling': {
        id: 'sumatra-mandheling',
        name: 'Sumatra Mandheling',
        description: 'Full-bodied and earthy with low acidity. Deep, rich flavors with hints of dark chocolate and spice. Perfect for those who enjoy bold, complex coffees.',
        category: 'roasted-coffee',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=800&fit=crop',
        origin: 'Indonesia',
        roastLevel: 'Dark Roast',
        flavorProfile: ['Earthy', 'Dark Chocolate', 'Spicy', 'Full-bodied'],
        grindOptions: ['Whole Bean', 'Coarse', 'Medium', 'Fine'],
        featured: true
    },
    'kenyan-aa': {
        id: 'kenyan-aa',
        name: 'Kenyan AA',
        description: 'Bright and wine-like with complex berry notes. Highly sought after single-origin coffee. Known for its unique flavor profile and exceptional quality.',
        category: 'roasted-coffee',
        price: 22.99,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=800&fit=crop',
        origin: 'Kenya',
        roastLevel: 'Medium Roast',
        flavorProfile: ['Wine-like', 'Berry', 'Bright', 'Complex'],
        grindOptions: ['Whole Bean', 'Coarse', 'Medium', 'Fine'],
        featured: true
    },
    'hawaiian-kona': {
        id: 'hawaiian-kona',
        name: 'Hawaiian Kona',
        description: 'Smooth and mild with delicate floral notes. One of the world\'s most prized coffees from the slopes of Mauna Loa. Experience luxury in every cup.',
        category: 'roasted-coffee',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=800&fit=crop',
        origin: 'Hawaii',
        roastLevel: 'Medium Roast',
        flavorProfile: ['Smooth', 'Floral', 'Mild', 'Delicate'],
        grindOptions: ['Whole Bean', 'Coarse', 'Medium', 'Fine'],
        featured: true
    },
    'french-vanilla-blend': {
        id: 'french-vanilla-blend',
        name: 'French Vanilla Blend',
        description: 'Smooth medium roast with natural vanilla flavoring. Perfect for those who enjoy flavored coffees. Delightfully aromatic and sweet.',
        category: 'specialty-blend',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=800&fit=crop',
        origin: 'Multi-Origin',
        roastLevel: 'Medium Roast',
        flavorProfile: ['Vanilla', 'Smooth', 'Sweet', 'Creamy'],
        grindOptions: ['Whole Bean', 'Coarse', 'Medium', 'Fine'],
        featured: false
    },
    'hazelnut-creme': {
        id: 'hazelnut-creme',
        name: 'Hazelnut Crème',
        description: 'Rich medium-dark roast with natural hazelnut flavor. A customer favorite for its nutty sweetness. Perfect for dessert coffee or anytime indulgence.',
        category: 'specialty-blend',
        price: 17.49,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=800&fit=crop',
        origin: 'Multi-Origin',
        roastLevel: 'Medium Roast',
        flavorProfile: ['Hazelnut', 'Nutty', 'Sweet', 'Rich'],
        grindOptions: ['Whole Bean', 'Coarse', 'Medium', 'Fine'],
        featured: false
    },
    'decaf-colombian': {
        id: 'decaf-colombian',
        name: 'Decaf Colombian',
        description: 'Smooth and balanced decaffeinated coffee. Swiss water processed to preserve flavor without chemicals. Enjoy great coffee anytime, day or night.',
        category: 'roasted-coffee',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=800&fit=crop',
        origin: 'Colombia',
        roastLevel: 'Medium Roast',
        flavorProfile: ['Smooth', 'Balanced', 'Nutty', 'Mild'],
        grindOptions: ['Whole Bean', 'Coarse', 'Medium', 'Fine'],
        featured: false
    },
    'jamaican-blue-mountain': {
        id: 'jamaican-blue-mountain',
        name: 'Jamaican Blue Mountain',
        description: 'Legendary coffee known for its mild flavor and lack of bitterness. Smooth, sweet, and balanced. Considered one of the finest coffees in the world.',
        category: 'roasted-coffee',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=800&fit=crop',
        origin: 'Jamaica',
        roastLevel: 'Medium Roast',
        flavorProfile: ['Mild', 'Sweet', 'Smooth', 'Balanced'],
        grindOptions: ['Whole Bean', 'Coarse', 'Medium', 'Fine'],
        featured: true
    },
    'peruvian-organic': {
        id: 'peruvian-organic',
        name: 'Peruvian Organic',
        description: 'Certified organic single-origin coffee. Bright acidity with notes of chocolate and nuts. Grown sustainably without pesticides or chemicals.',
        category: 'roasted-coffee',
        price: 19.49,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=800&fit=crop&q=80',
        origin: 'Peru',
        roastLevel: 'Medium Roast',
        flavorProfile: ['Chocolate', 'Nutty', 'Bright', 'Organic'],
        grindOptions: ['Whole Bean', 'Coarse', 'Medium', 'Fine'],
        featured: false
    },
    'espresso-blend-deluxe': {
        id: 'espresso-blend-deluxe',
        name: 'Espresso Blend Deluxe',
        description: 'Our premium espresso blend combining South American and African beans. Perfect for cappuccinos and lattes. Rich, creamy, and full-bodied.',
        category: 'specialty-blend',
        price: 21.99,
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=800&fit=crop',
        origin: 'Multi-Origin',
        roastLevel: 'Dark Roast',
        flavorProfile: ['Bold', 'Creamy', 'Chocolate', 'Smooth'],
        grindOptions: ['Whole Bean', 'Fine', 'Espresso'],
        featured: true
    },
    'vietnamese-robusta': {
        id: 'vietnamese-robusta',
        name: 'Vietnamese Robusta',
        description: 'Strong and bold Vietnamese coffee with traditional dark roast. Perfect for Vietnamese iced coffee. Intense flavor with a bold kick.',
        category: 'roasted-coffee',
        price: 15.99,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=800&fit=crop',
        origin: 'Vietnam',
        roastLevel: 'Dark Roast',
        flavorProfile: ['Bold', 'Strong', 'Smoky', 'Intense'],
        grindOptions: ['Whole Bean', 'Coarse', 'Medium', 'Fine'],
        featured: false
    },
    'breakfast-blend': {
        id: 'breakfast-blend',
        name: 'Breakfast Blend',
        description: 'Light and smooth morning blend. Designed to start your day right with balanced flavor. The perfect way to wake up and energize your morning.',
        category: 'specialty-blend',
        price: 16.49,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=800&fit=crop',
        origin: 'Multi-Origin',
        roastLevel: 'Light Roast',
        flavorProfile: ['Smooth', 'Balanced', 'Bright', 'Light'],
        grindOptions: ['Whole Bean', 'Coarse', 'Medium', 'Fine'],
        featured: false
    },
    'ethiopian-green-beans': {
        id: 'ethiopian-green-beans',
        name: 'Ethiopian Green Beans',
        description: 'Premium unroasted Ethiopian beans for home roasters. Experience the joy of roasting your own coffee and discover your perfect flavor profile.',
        category: 'green-coffee',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=800&fit=crop',
        origin: 'Ethiopia',
        roastLevel: 'Unroasted',
        flavorProfile: ['Fresh', 'Natural', 'Raw'],
        grindOptions: [],
        featured: false
    }
};

// Get product ID from URL
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Load and display product details
function loadProductDetail() {
    const productId = getProductIdFromURL();
    const container = document.getElementById('productDetailContainer');
    
    if (!productId) {
        container.innerHTML = `
            <div class="error-message">
                <h2>Product Not Found</h2>
                <p>No product ID specified. Please select a product from our catalog.</p>
                <a href="index.html#products" class="cta-button">Browse Products</a>
            </div>
        `;
        return;
    }
    
    const product = productsDatabase[productId];
    
    if (!product) {
        container.innerHTML = `
            <div class="error-message">
                <h2>Product Not Found</h2>
                <p>The product you're looking for doesn't exist.</p>
                <a href="index.html#products" class="cta-button">Browse Products</a>
            </div>
        `;
        return;
    }
    
    // Update breadcrumb
    const breadcrumbProduct = document.getElementById('breadcrumbProduct');
    if (breadcrumbProduct) {
        breadcrumbProduct.textContent = product.name;
    }
    
    // Update page title
    document.title = `${product.name} - Caffeine Corner ☕`;
    
    // Render product detail
    container.innerHTML = `
        <div class="product-detail-wrapper">
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}" id="productMainImage">
            </div>
            
            <div class="product-detail-info">
                <div class="product-category-badge">${getCategoryLabel(product.category)}</div>
                <h1 class="product-detail-title">${product.name}</h1>
                
                ${product.origin ? `
                    <div class="product-origin-info">
                        <span class="origin-label">Origin:</span>
                        <span class="origin-value">${product.origin}</span>
                    </div>
                ` : ''}
                
                ${product.roastLevel ? `
                    <div class="product-roast-info">
                        <span class="roast-label">Roast Level:</span>
                        <span class="roast-value">${product.roastLevel}</span>
                    </div>
                ` : ''}
                
                <div class="product-price-large">
                    $${product.price.toFixed(2)}
                </div>
                
                <div class="product-description-full">
                    <h3>Description</h3>
                    <p>${product.description}</p>
                </div>
                
                ${product.flavorProfile && product.flavorProfile.length > 0 ? `
                    <div class="product-flavors">
                        <h3>Flavor Profile</h3>
                        <div class="flavor-tags">
                            ${product.flavorProfile.map(flavor => `<span class="flavor-tag">${flavor}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${product.grindOptions && product.grindOptions.length > 0 ? `
                    <div class="product-grind-options">
                        <h3>Select Grind Option *</h3>
                        <div class="grind-options-selector" id="grindOptionsSelector">
                            ${product.grindOptions.map((grind, index) => `
                                <label class="grind-option-radio">
                                    <input type="radio" name="grindOption" value="${grind}" ${index === 0 ? 'checked' : ''} required>
                                    <span class="grind-option-label">${grind}</span>
                                </label>
                            `).join('')}
                        </div>
                        <p class="grind-note">Please select your preferred grind option</p>
                    </div>
                ` : ''}
                
                <div class="product-actions">
                    <button class="add-to-cart-large" onclick="addToCartFromDetail('${product.id}', '${product.name.replace(/'/g, "\\'")}', ${product.price}, '${product.image}')">
                        Add to Cart
                    </button>
                    <a href="index.html#products" class="back-to-products-btn">← Back to Products</a>
                </div>
            </div>
        </div>
    `;
    
    // Load recommended products after product detail is loaded
    setTimeout(() => {
        loadRecommendedProducts();
    }, 100);
}

// Also ensure recommended products load if product detail doesn't load (error case)
setTimeout(() => {
    const container = document.getElementById('recommendedProducts');
    if (container && container.innerHTML.trim() === '') {
        loadRecommendedProducts();
    }
}, 500);

// Get category label
function getCategoryLabel(category) {
    const labels = {
        'roasted-coffee': 'Roasted Coffee',
        'green-coffee': 'Green Coffee Beans',
        'specialty-blend': 'Specialty Blend',
        'energy-drink': 'Energy Drink'
    };
    return labels[category] || category;
}

// Add to cart from product detail page
function addToCartFromDetail(productId, productName, productPrice, productImage) {
    // Get selected grind option
    const grindOptionInput = document.querySelector('input[name="grindOption"]:checked');
    const grindOption = grindOptionInput ? grindOptionInput.value : null;
    
    // Validate grind option if product has grind options
    const product = productsDatabase[productId];
    if (product && product.grindOptions && product.grindOptions.length > 0 && !grindOption) {
        alert('Please select a grind option before adding to cart.');
        return;
    }
    
    addToCart(productId, productName, productPrice, productImage, grindOption);
}

// Load recommended products (exclude current product)
function loadRecommendedProducts() {
    const currentProductId = getProductIdFromURL();
    const container = document.getElementById('recommendedProducts');
    
    if (!container) {
        console.log('Recommended products container not found');
        return;
    }
    
    // Get all products except current one, prioritize featured
    const recommended = Object.values(productsDatabase)
        .filter(p => p.id !== currentProductId)
        .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        .slice(0, 4); // Show 4 recommended products
    
    console.log('Recommended products:', recommended.length, recommended.map(p => p.name));
    
    if (recommended.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-light);">No other products available at this time.</p>';
        return;
    }
    
    container.innerHTML = recommended.map(product => {
        // Escape single quotes in product name for onclick
        const escapedName = product.name.replace(/'/g, "\\'");
        const escapedImage = product.image.replace(/'/g, "\\'");
        
        return `
        <div class="product-card fade-in">
            <a href="product.html?id=${product.id}" class="product-card-link">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                    ${product.featured ? '<div class="product-badge">Featured</div>' : ''}
                </div>
                <div class="product-card-content">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description.substring(0, 100)}...</p>
                    <div class="product-meta">
                        <span class="product-origin">${product.origin || 'Premium'}</span>
                        <span class="product-roast">${product.roastLevel || getCategoryLabel(product.category)}</span>
                    </div>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                </div>
            </a>
            <button class="product-btn" onclick="event.stopPropagation(); addToCart('${product.id}', '${escapedName}', ${product.price}, '${escapedImage}'); return false;">Add to Cart</button>
        </div>
    `;
    }).join('');
    
    // Trigger fade-in animation for recommended products
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    container.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadProductDetail();
        // loadRecommendedProducts is called after product detail loads (via setTimeout in loadProductDetail)
    });
} else {
    loadProductDetail();
    // loadRecommendedProducts is called after product detail loads (via setTimeout in loadProductDetail)
}

// Expose functions globally
window.addToCartFromDetail = addToCartFromDetail;
window.loadRecommendedProducts = loadRecommendedProducts;

