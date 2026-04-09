// ننتظر تحميل الصفحة بالكامل
document.addEventListener("DOMContentLoaded", function() {
    const themeBtn = document.getElementById('themeBtn');
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');
    const bars = document.getElementById('bars');
    const menuBars = document.getElementById('menuBars');

    // زر تغير الاضاءة
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
        themeBtn.innerHTML = `<i class="far fas fa-sun"></i>`;
    }

    themeBtn.onclick = () => {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            themeBtn.innerHTML = `<i class="far fas fa-sun"></i>`;
            localStorage.setItem("theme", "dark");
        } else {
            themeBtn.innerHTML = `<i class="far fa-moon"></i>`;
            localStorage.setItem("theme", "light");
        }
    };

    const closeDropdowns = () => {
        userDropdown.classList.remove('dropdown-open');
        menuBars.classList.remove('dropdown-open');
    };

    userBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        if (menuBars.classList.contains('dropdown-open')) {
            menuBars.classList.remove('dropdown-open');
        }
        userDropdown.classList.toggle('dropdown-open');
    });

    bars.addEventListener('click', function(event) {
        event.stopPropagation();
        if (userDropdown.classList.contains('dropdown-open')) {
            userDropdown.classList.remove('dropdown-open');
        }
        menuBars.classList.toggle('dropdown-open');
    });

    document.addEventListener('click', function(event) {
        if (!userDropdown.contains(event.target) && !userBtn.contains(event.target) && !menuBars.contains(event.target) && !bars.contains(event.target)) {
            closeDropdowns();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeDropdowns();
        }
    });
});

function rate(el, value) {
    const stars = el.parentElement.querySelectorAll('i');
    stars.forEach((star, index) => {
        if (index < value) {
            star.classList.replace('fa-regular', 'fa-solid');
        } else {
            star.classList.replace('fa-solid', 'fa-regular');
        }
    });
}

function toggleFav(btn) {
    const icon = btn.querySelector('i');
    if (!icon) return;
    if (icon.classList.contains('fa-solid') || icon.classList.contains('fas')) {
        icon.classList.remove('fa-solid', 'fas');
        icon.classList.add('fa-regular', 'far');
    } else {
        icon.classList.remove('fa-regular', 'far');
        icon.classList.add('fa-solid', 'fas');
    }
    btn.classList.toggle('favorite-active');
}

// ===== HOME PAGE FUNCTIONS =====

// Load featured products on home page
function loadFeaturedProducts() {
    const productGrid = document.getElementById('homeProductGrid');
    if (!productGrid) return;

    // Sample featured products - replace with your actual product data
    const featuredProducts = [
        {
            id: 1,
            name: "منتج مميز فاخر",
            price: 199.99,
            originalPrice: 299.99,
            image: "momen.ggg/M1.jpg",
            rating: 4.5,
            reviews: 125,
            discount: 33
        },
        {
            id: 2,
            name: "منتج بجودة عالية",
            price: 149.99,
            originalPrice: 249.99,
            image: "momen.ggg/M1.jpg",
            rating: 4.8,
            reviews: 89,
            discount: 40
        },
        {
            id: 3,
            name: "منتج خاص مختار",
            price: 179.99,
            originalPrice: 279.99,
            image: "momen.ggg/M1.jpg",
            rating: 4.3,
            reviews: 156,
            discount: 35
        },
        {
            id: 4,
            name: "منتج موصى به",
            price: 219.99,
            originalPrice: 319.99,
            image: "momen.ggg/M1.jpg",
            rating: 4.7,
            reviews: 203,
            discount: 31
        },
        {
            id: 5,
            name: "منتج سوبر مميز",
            price: 169.99,
            originalPrice: 269.99,
            image: "momen.ggg/M1.jpg",
            rating: 4.6,
            reviews: 178,
            discount: 37
        },
        {
            id: 6,
            name: "منتج الاختيار الأول",
            price: 189.99,
            originalPrice: 289.99,
            image: "momen.ggg/M1.jpg",
            rating: 4.9,
            reviews: 241,
            discount: 34
        }
    ];

    productGrid.innerHTML = '';
    featuredProducts.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.animationDelay = `${index * 0.1}s`;
        productCard.style.animation = 'slideUp 0.6s ease-out backwards';
        productGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Create star rating HTML
    const stars = Array(5).fill(0).map((_, i) => 
        `<i class="fa-${i < Math.floor(product.rating) ? 'solid' : 'regular'} fa-star"></i>`
    ).join('');
    
    card.innerHTML = `
        <div class="product-image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-overlay">
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fa-solid fa-shopping-cart"></i>
                    <span>أضف للسلة</span>
                </button>
            </div>
            <div class="discount-badge">
                <span>-${product.discount}%</span>
            </div>
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">
                <div class="stars">
                    ${stars}
                </div>
                <span class="rating-count">(${product.reviews})</span>
            </div>
            <div class="product-price">
                <span class="current-price">${product.price.toFixed(2)} ر.س</span>
                <span class="original-price">${product.originalPrice.toFixed(2)}</span>
            </div>
        </div>
    `;
    return card;
}

// Home page search function
function searchHome() {
    const searchInput = document.getElementById('homeSearch');
    if (!searchInput) return;

    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
        alert('الرجاء إدخال كلمة البحث');
        return;
    }

    // Redirect to products page with search query
    window.location.href = `product.html?search=${encodeURIComponent(searchTerm)}`;
}

// Initialize home page
document.addEventListener('DOMContentLoaded', function() {
    // Load featured products
    loadFeaturedProducts();

    // Setup search input
    const homeSearch = document.getElementById('homeSearch');
    if (homeSearch) {
        homeSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchHome();
            }
        });
    }
});

