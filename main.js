// ننتظر تحميل الصفحة بالكامل
document.addEventListener("DOMContentLoaded", function() {
    const themeBtn = document.getElementById('themeBtn');
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');
    const bars = document.getElementById('bars');
    const menuBars = document.getElementById('menuBars');

    // التحقق من وجود العناصر قبل استخدامها
    if (!themeBtn || !userBtn || !userDropdown || !bars || !menuBars) {
        console.warn('بعض عناصر الواجهة غير موجودة');
        return;
    }

    // زر تغير الاضاءة (Dark Mode)
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
        themeBtn.innerHTML = `<i class="fas fa-sun"></i>`;
    } else {
        themeBtn.innerHTML = `<i class="far fa-moon"></i>`;
    }

    themeBtn.onclick = () => {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            themeBtn.innerHTML = `<i class="fas fa-sun"></i>`;
            localStorage.setItem("theme", "dark");
        } else {
            themeBtn.innerHTML = `<i class="far fa-moon"></i>`;
            localStorage.setItem("theme", "light");
        }
    };

    // دالة إغلاق جميع القوائم المنسدلة
    const closeAllDropdowns = () => {
        if (userDropdown) userDropdown.classList.remove('dropdown-open');
        if (menuBars) menuBars.classList.remove('dropdown-open');
    };

    // فتح/إغلاق قائمة المستخدم
    userBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        // إغلاق قائمة المنيو إذا كانت مفتوحة
        if (menuBars.classList.contains('dropdown-open')) {
            menuBars.classList.remove('dropdown-open');
        }
        userDropdown.classList.toggle('dropdown-open');
    });

    // فتح/إغلاق قائمة الهامبرغر (المنيو)
    bars.addEventListener('click', function(event) {
        event.stopPropagation();
        // إغلاق قائمة المستخدم إذا كانت مفتوحة
        if (userDropdown.classList.contains('dropdown-open')) {
            userDropdown.classList.remove('dropdown-open');
        }
        menuBars.classList.toggle('dropdown-open');
    });

    // إغلاق المنيو عند الضغط على أي رابط داخله
    if (menuBars) {
        const menuLinks = menuBars.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuBars.classList.remove('dropdown-open');
            });
        });
    }

    // إغلاق القوائم عند الضغط خارجها
    document.addEventListener('click', function(event) {
        const isClickInsideUser = userDropdown && userDropdown.contains(event.target);
        const isClickOnUserBtn = userBtn && userBtn.contains(event.target);
        const isClickInsideMenu = menuBars && menuBars.contains(event.target);
        const isClickOnBars = bars && bars.contains(event.target);
        
        if (!isClickInsideUser && !isClickOnUserBtn && !isClickInsideMenu && !isClickOnBars) {
            closeAllDropdowns();
        }
    });

    // إغلاق القوائم عند الضغط على زر Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAllDropdowns();
        }
    });

    // ===== تحسين الـ Responsive للشاشات الصغيرة =====
    function handleResponsive() {
        const isMobile = window.innerWidth <= 768;
        const navbar = document.querySelector('.navbar');
        const menuWrapper = document.querySelector('.menu-wrapper');
        
        if (isMobile) {
            if (navbar) navbar.style.display = 'none';
            if (menuWrapper) menuWrapper.style.display = 'block';
        } else {
            if (navbar) navbar.style.display = 'flex';
            if (menuWrapper) menuWrapper.style.display = 'none';
        }
    }
    
    // تشغيل عند تحميل الصفحة
    handleResponsive();
    
    // تشغيل عند تغيير حجم النافذة
    window.addEventListener('resize', handleResponsive);
});

// ===== دوال التقييم والمفضلة =====
function rate(el, value) {
    if (!el) return;
    const stars = el.parentElement.querySelectorAll('i');
    stars.forEach((star, index) => {
        if (index < value) {
            star.classList.remove('fa-regular', 'far');
            star.classList.add('fa-solid', 'fas');
        } else {
            star.classList.remove('fa-solid', 'fas');
            star.classList.add('fa-regular', 'far');
        }
    });
    
    // عرض رسالة تأكيد
    showToastMessage(`تم التقييم بـ ${value} نجوم ⭐`, 'success');
}

function toggleFav(btn) {
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (!icon) return;
    
    if (icon.classList.contains('fa-solid') || icon.classList.contains('fas')) {
        icon.classList.remove('fa-solid', 'fas');
        icon.classList.add('fa-regular', 'far');
        showToastMessage('تم الإزالة من المفضلة 💔', 'info');
    } else {
        icon.classList.remove('fa-regular', 'far');
        icon.classList.add('fa-solid', 'fas');
        showToastMessage('تمت الإضافة إلى المفضلة ❤️', 'success');
    }
    btn.classList.toggle('favorite-active');
}

// ===== دالة عرض رسائل منبثقة =====
function showToastMessage(message, type = 'success') {
    // البحث عن عنصر toast موجود أو إنشاؤه
    let toast = document.getElementById('customToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'customToast';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: ${type === 'success' ? '#10b981' : '#6366f1'};
            color: white;
            padding: 12px 24px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            direction: rtl;
            font-family: 'Cairo', sans-serif;
        `;
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.style.background = type === 'success' ? '#10b981' : '#6366f1';
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
    }, 2500);
}

// ===== دوال الصفحة الرئيسية =====

// تحميل المنتجات المميزة في الصفحة الرئيسية
function loadFeaturedProducts() {
    const productGrid = document.getElementById('homeProductGrid');
    if (!productGrid) return;

    // منتجات مميزة - استخدم بيانات حقيقية من productsList إذا وجدت
    let featuredProducts = [];
    
    // محاولة جلب المنتجات من productsList إذا كانت موجودة
    if (typeof productsList !== 'undefined' && productsList.length > 0) {
        featuredProducts = productsList.slice(0, 6);
    } else {
        // بيانات افتراضية
        featuredProducts = [
            { name: 'سماعة بلوتوث', price: 250, img: 'momen.ggg/blo.jpg', desc: 'صوت محيطي نقي مع تقنية إلغاء الضوضاء' },
            { name: 'شاحن Type-C', price: 150, img: 'momen.ggg/typec.jpg', desc: 'شاحن سريع يدعم الهواتف الحديثة' },
            { name: 'لاب توب', price: 20000, img: 'momen.ggg/labtop.jpg', desc: 'لابتوب قوي للأعمال والتصميم' },
            { name: 'ساعة ذكية', price: 1500, img: 'momen.ggg/Smart.jpg', desc: 'تتبع اللياقة البدنية والإشعارات الذكية' },
            { name: 'موبايل', price: 3000, img: 'momen.ggg/mobile.jpg', desc: 'هاتف ذكي بقوة أداء عالية' },
            { name: 'ثلاجة توشيبا', price: 50000, img: 'momen.ggg/tosiba.jpg', desc: 'ثلاجة عائلية بسعة كبيرة' }
        ];
    }
    
    productGrid.innerHTML = '';
    featuredProducts.forEach((product, index) => {
        const productCard = createHomeProductCard(product);
        productCard.style.animationDelay = `${index * 0.1}s`;
        productCard.style.animation = 'slideUp 0.6s ease-out backwards';
        productGrid.appendChild(productCard);
    });
}

// إنشاء بطاقة منتج للصفحة الرئيسية
function createHomeProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product';
    
    const priceValue = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
    const formattedPrice = priceValue.toLocaleString() + ' $';
    const productName = product.name || 'منتج';
    const productImg = product.img || 'momen.ggg/M1.jpg';
    const productDesc = product.desc || 'منتج عالي الجودة';
    
    card.innerHTML = `
        ${product.badge ? `<span class="badge ${product.badge === 'جديد' ? 'new' : 'discount'}">${product.badge}</span>` : ''}
        <img src="${productImg}" alt="${productName}" loading="lazy" style="width:100%; height:200px; object-fit:cover;">
        <div class="product-content">
            <h3>${productName}</h3>
            <p class="product-desc">${productDesc}</p>
            <div class="product-footer">
                <span class="price">${formattedPrice}</span>
                <div class="rating">
                    <span onclick="rate(this, 1)"><i class="fa-regular fa-star"></i></span>
                    <span onclick="rate(this, 2)"><i class="fa-regular fa-star"></i></span>
                    <span onclick="rate(this, 3)"><i class="fa-regular fa-star"></i></span>
                    <span onclick="rate(this, 4)"><i class="fa-regular fa-star"></i></span>
                    <span onclick="rate(this, 5)"><i class="fa-regular fa-star"></i></span>
                    <button onclick="toggleFav(this)" title="أضف للمفضلة"><i class="far fa-heart"></i></button>
                </div>
            </div>
            <div class="product-buttons">
                <button class="m" onclick="addToCart('${productName.replace(/'/g, "\\'")}', ${priceValue})">أضف للسلة</button>
                <a class="pr" href="product.html?name=${encodeURIComponent(productName)}&price=${priceValue}&img=${encodeURIComponent(productImg)}">التفاصيل</a>
            </div>
        </div>
    `;
    return card;
}

// دالة البحث في الصفحة الرئيسية
function searchHome() {
    const searchInput = document.getElementById('homeSearch');
    if (!searchInput) return;

    const searchTerm = searchInput.value.trim();
    if (searchTerm === '') {
        showToastMessage('الرجاء إدخال كلمة البحث', 'info');
        return;
    }

    window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
}

// ===== دالة إضافة للسلة محسنة =====
function addToCart(productName, productPrice) {
    if (!productName || !productPrice) {
        showToastMessage('خطأ في بيانات المنتج', 'error');
        return;
    }
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({
            name: productName,
            price: Number(productPrice),
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // تحديث العداد في الهيدر
    updateHeaderCart();
    
    showToastMessage(`✅ تم إضافة ${productName} إلى السلة`, 'success');
}

// تحديث عداد السلة في الهيدر
function updateHeaderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countElement = document.getElementById('cart-count');
    
    if (countElement) {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        countElement.innerText = totalItems;
    }
}

// ===== تهيئة الصفحة الرئيسية =====
document.addEventListener('DOMContentLoaded', function() {
    // تحميل المنتجات المميزة
    loadFeaturedProducts();
    
    // تحديث عداد السلة
    updateHeaderCart();
    
    // إعداد زر البحث
    const homeSearch = document.getElementById('homeSearch');
    if (homeSearch) {
        homeSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchHome();
            }
        });
    }
    
    // إعداد زر البحث
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchHome);
    }
    
    // إضافة أنماط إضافية للـ Responsive
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .product .product-buttons {
                flex-direction: column;
                gap: 8px;
            }
            .product .product-buttons button,
            .product .product-buttons a {
                width: 100%;
                text-align: center;
            }
            .hero-title {
                font-size: 1.5rem !important;
            }
            .hero-subtitle {
                font-size: 0.9rem !important;
            }
        }
        @media (max-width: 480px) {
            .product img {
                height: 180px !important;
            }
            .product-content {
                padding: 10px !important;
            }
            .price {
                font-size: 0.9rem !important;
            }
        }
    `;
    document.head.appendChild(style);
});