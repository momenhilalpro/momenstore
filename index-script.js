// ============================================================================== 
// PRODUCT DATA - Initialize with sample products from your store
// ============================================================================== 

const productsData = [
    {
        id: 1,
        title: "ساعه سمارة",
        price: 249.99,
        originalPrice: 349.99,
        image: "momen.ggg/Smart.jpg",
        category: "electronics",
        rating: 4.5,
        reviews: 245,
        badge: "sale",
        description: "Advanced smartwatch with health tracking, notifications, and long battery life."
    },
    {
        id: 2,
        title: "Professional Laptop",
        price: 899.99,
        originalPrice: 1199.99,
        image: "momen.ggg/labtop.jpg",
        category: "electronics",
        rating: 4.8,
        reviews: 156,
        badge: "sale",
        description: "High-performance laptop perfect for professionals and content creators."
    },
    {
        id: 3,
        title: "Latest Mobile Phone",
        price: 599.99,
        originalPrice: 799.99,
        image: "momen.ggg/mobile.jpg",
        category: "mobile",
        rating: 4.6,
        reviews: 389,
        badge: "sale",
        description: "Cutting-edge smartphone with powerful processor and amazing camera."
    },
    {
        id: 4,
        title: "Premium Headphones",
        price: 179.99,
        originalPrice: 249.99,
        image: "momen.ggg/Smart.jpg",
        category: "accessories",
        rating: 4.4,
        reviews: 512,
        badge: "sale",
        description: "Wireless headphones with noise cancellation and premium sound quality."
    },
    {
        id: 5,
        title: "Type-C Charger",
        price: 29.99,
        originalPrice: 49.99,
        image: "momen.ggg/typec.jpg",
        category: "accessories",
        rating: 4.3,
        reviews: 678,
        badge: "sale",
        description: "Fast charging USB-C charger compatible with all modern devices."
    },
    {
        id: 6,
        title: "Smart Device Hub",
        price: 89.99,
        originalPrice: 129.99,
        image: "momen.ggg/smart1.jpg",
        category: "electronics",
        rating: 4.2,
        reviews: 234,
        badge: "new",
        description: "Control all your smart home devices from one central hub."
    },
    {
        id: 7,
        title: "Modern Lifestyle Product",
        price: 49.99,
        originalPrice: 79.99,
        image: "momen.ggg/tosiba.jpg",
        category: "lifestyle",
        rating: 4.1,
        reviews: 123,
        badge: "sale",
        description: "Premium quality lifestyle product for everyday use."
    },
    {
        id: 8,
        title: "Latest Store Collection",
        price: 199.99,
        originalPrice: 299.99,
        image: "momen.ggg/store1.jpg",
        category: "lifestyle",
        rating: 4.7,
        reviews: 456,
        badge: "new",
        description: "Exclusive collection from Momen Hilal store featuring premium items."
    },
    {
        id: 9,
        title: "Electronic Gadget",
        price: 79.99,
        originalPrice: 119.99,
        image: "momen.ggg/fier.jpg",
        category: "electronics",
        rating: 4.0,
        reviews: 189,
        badge: "sale",
        description: "Innovative electronic gadget with modern features and sleek design."
    },
    {
        id: 10,
        title: "Professional Equipment",
        price: 349.99,
        originalPrice: 499.99,
        image: "momen.ggg/blo.jpg",
        category: "electronics",
        rating: 4.9,
        reviews: 234,
        badge: "sale",
        description: "Professional-grade equipment for serious enthusiasts and experts."
    },
    {
        id: 11,
        title: "M1 Processor Device",
        price: 999.99,
        originalPrice: 1299.99,
        image: "momen.ggg/M1.jpg",
        category: "electronics",
        rating: 4.8,
        reviews: 567,
        badge: "new",
        description: "Lightning-fast device powered by advanced M1 processor technology."
    },
    {
        id: 12,
        title: "Portable Accessory",
        price: 34.99,
        originalPrice: 54.99,
        image: "momen.ggg/IMG_٢٠٢٦٠٣٢٥_٢٣٣٠٠٤.jpg",
        category: "accessories",
        rating: 4.2,
        reviews: 345,
        badge: "sale",
        description: "Compact and portable accessory perfect for on-the-go lifestyle."
    }
];

// ============================================================================== 
// GLOBAL STATE MANAGEMENT
// ============================================================================== 

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';
let currentModalProduct = null;
let currentQuantity = 1;

// ============================================================================== 
// INITIALIZATION
// ============================================================================== 

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Theme
    initializeTheme();
    
    // UI Setup
    setupHeaderInteractions();
    setupMobileMenu();
    setupProductDetails();
    
    // Data & Content
    renderProducts('all');
    renderBestsellers();
    updateCartCount();
    
    // Event Listeners
    setupEventListeners();
    
    // Animations
    setupScrollAnimations();
}

// ============================================================================== 
// زر الاضاءه
// ============================================================================== 

function initializeTheme() {
    const themeBtn = document.getElementById('themeBtn');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
    
    themeBtn.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const themeBtn = document.getElementById('themeBtn');
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
}

// ============================================================================== 
// ايقونة المستخدم
// ============================================================================== 

function setupHeaderInteractions() {
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');
    
    userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('dropdown-open');
    });
    
    document.addEventListener('click', (e) => {
        if (!userDropdown.contains(e.target) && !userBtn.contains(e.target)) {
            userDropdown.classList.remove('dropdown-open');
        }
    });
    
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.getElementById('searchInput');
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Logged out successfully', 'success');
    });
}

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (!searchTerm) {
        renderProducts('all');
        return;
    }
    
    const filteredProducts = productsData.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    renderSearchResults(filteredProducts);
}

function renderSearchResults(products) {
    if (products.length === 0) {
        document.getElementById('productsGrid').innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i style="font-size: 48px; color: var(--text-light); margin-bottom: 16px;"></i>
                <h3 style="color: var(--text-light);">No products found</h3>
            </div>
        `;
        return;
    }
    
    renderProducts('all', products);
}

// ============================================================================== 
// MOBILE MENU
// ============================================================================== 

function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
}

// ============================================================================== 
// PRODUCT RENDERING
// ============================================================================== 

function renderProducts(filter = 'all', productsToRender = null) {
    const grid = document.getElementById('productsGrid');
    currentFilter = filter;
    
    let filtered = productsToRender || productsData;
    
    if (filter !== 'all') {
        filtered = filtered.filter(product => {
            if (filter === 'sale') return product.badge === 'sale';
            if (filter === 'new') return product.badge === 'new';
            return product.category === filter;
        });
    }
    
    grid.innerHTML = filtered.map(product => createProductCard(product)).join('');
    
    // Add event listeners to new cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.btn-add-cart') && !e.target.closest('.btn-wishlist')) {
                openProductModal(card.dataset.productId);
            }
        });
    });
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target?.classList.add('active');
}

function createProductCard(product) {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const stars = createStars(product.rating);
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><rect fill=%22%23f0f0f0%22 width=%22200%22 height=%22200%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22Arial%22 font-size=%2216%22 fill=%22%23999%22>Product Image</text></svg>'">
                ${product.badge ? `<span class="product-badge ${product.badge === 'new' ? 'new' : ''}">${product.badge.toUpperCase()}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-rating">
                    <span class="stars">${stars}</span>
                    <span class="review-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                    <span class="discount-badge">-${discount}%</span>
                </div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                        <i class="fa-solid fa-cart-plus"></i>
                        Add
                    </button>
                    <button class="btn-wishlist" onclick="event.stopPropagation(); addToWishlist(${product.id})">
                        <i class="fa-solid fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============================================================================== 
// BESTSELLERS CAROUSEL
// ============================================================================== 

function renderBestsellers() {
    const carousel = document.getElementById('bestsellersCarousel');
    const bestsellers = productsData.filter(p => p.rating >= 4.5).slice(0, 8);
    
    carousel.innerHTML = bestsellers.map(product => `
        <div class="bestseller-card">
            <div class="bestseller-image">
                <img src="${product.image}" alt="${product.title}" 
                     onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><rect fill=%22%23f0f0f0%22 width=%22120%22 height=%22120%22/></svg>'">
                ${product.badge ? `<span class="bestseller-badge">#${product.id}</span>` : ''}
            </div>
            <div class="bestseller-info">
                <h4 class="bestseller-title">${product.title}</h4>
                <div class="bestseller-price">
                    <span class="bestseller-current-price">$${product.price.toFixed(2)}</span>
                    <span class="bestseller-original-price">$${product.originalPrice.toFixed(2)}</span>
                </div>
                <div class="bestseller-action">
                    <button class="bestseller-btn-primary" onclick="addToCart(${product.id})">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                    <button class="bestseller-btn-secondary" onclick="openProductModal(${product.id})">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================================================== 
// PRODUCT MODAL
// ============================================================================== 

function setupProductDetails() {
    // Modal close button
    document.getElementById('productModal').addEventListener('click', (e) => {
        if (e.target.id === 'productModal') {
            closeModal();
        }
    });
}

function openProductModal(productId) {
    const product = productsData.find(p => p.id === parseInt(productId));
    if (!product) return;
    
    currentModalProduct = product;
    currentQuantity = 1;
    
    const modal = document.getElementById('productModal');
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalRating').innerHTML = createStars(product.rating);
    document.getElementById('modalReviews').textContent = `${product.reviews} reviews`;
    document.getElementById('modalPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('modalOriginalPrice').textContent = `$${product.originalPrice.toFixed(2)}`;
    document.getElementById('modalDiscount').textContent = `-${discount}%`;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('quantityInput').value = 1;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ============================================================================== 
// MODAL QUANTITY SELECTOR
// ============================================================================== 

function increaseQuantity() {
    currentQuantity++;
    document.getElementById('quantityInput').value = currentQuantity;
}

function decreaseQuantity() {
    if (currentQuantity > 1) {
        currentQuantity--;
        document.getElementById('quantityInput').value = currentQuantity;
    }
}

function addToCartFromModal() {
    if (currentModalProduct) {
        addToCart(currentModalProduct.id, currentQuantity);
        closeModal();
    }
}

// ============================================================================== 
// CART MANAGEMENT
// ============================================================================== 

function addToCart(productId, quantity = 1) {
    const product = productsData.find(p => p.id === parseInt(productId));
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === parseInt(productId));
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartCount();
    showToast(`${product.title} added to cart!`, 'success');
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// ============================================================================== 
// CATEGORY FILTERING
// ============================================================================== 

function filterByCategory(category) {
    renderProducts(category);
    document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
}

// ============================================================================== 
// WISHLIST
// ============================================================================== 

function addToWishlist(productId) {
    const product = productsData.find(p => p.id === parseInt(productId));
    if (!product) return;
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    if (!wishlist.find(item => item.id === parseInt(productId))) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        showToast(`${product.title} added to wishlist!`, 'success');
    } else {
        showToast('Already in wishlist', 'info');
    }
}

// ============================================================================== 
// NEWSLETTER SUBSCRIPTION
// ============================================================================== 

function setupEventListeners() {
    document.getElementById('newsletterForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        if (email) {
            showToast('Thanks for subscribing!', 'success');
            e.target.reset();
        }
    });
    
    // Scroll to top button
    window.addEventListener('scroll', updateScrollToTopButton);
}

function updateScrollToTopButton() {
    const btn = document.getElementById('scrollToTop');
    if (window.scrollY > 300) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================================== 
// COUNTDOWN TIMER
// ============================================================================== 

// function startCountdown() {
//     const hours = document.getElementById('hours');
//     const minutes = document.getElementById('minutes');
//     const seconds = document.getElementById('seconds');
    
//     const updateCountdown = () => {
//         let h = parseInt(hours.textContent);
//         let m = parseInt(minutes.textContent);
//         let s = parseInt(seconds.textContent);
        
//         if (s > 0) {
//             s--;
//         } else if (m > 0) {
//             s = 59;
//             m--;
//         } else if (h > 0) {
//             m = 59;
//             s = 59;
//             h--;
//         } else {
//             h = 23;
//             m = 59;
//             s = 59;
//         }
        
//         hours.textContent = String(h).padStart(2, '0');
//         minutes.textContent = String(m).padStart(2, '0');
//         seconds.textContent = String(s).padStart(2, '0');
//     };
    
//     setInterval(updateCountdown, 1000);
// }

// startCountdown();

// ============================================================================== 
// UI UTILITIES
// ============================================================================== 

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    if (type === 'info') icon = 'fa-info-circle';
    
    toast.querySelector('i').className = `fa-solid ${icon}`;
    toastMessage.textContent = message;
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

function createStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rating)) {
            stars += '<i class="fa-solid fa-star"></i>';
        } else if (i < rating) {
            stars += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else {
            stars += '<i class="fa-regular fa-star"></i>';
        }
    }
    return stars;
}

// ============================================================================== 
// SCROLL ANIMATIONS
// ============================================================================== 

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.category-card, .product-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// ============================================================================== 
// SMOOTH SCROLLING FOR ANCHORS
// ============================================================================== 

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================================================== 
// PERFORMANCE: Lazy Loading Images
// ============================================================================== 

if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                imgObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imgObserver.observe(img);
    });
}

console.log('🚀 Momen Hilal Store - Premium E-commerce Platform Loaded!');
console.log('📊 Total Products:', productsData.length);
console.log('🛒 Cart Items:', cart.length);
