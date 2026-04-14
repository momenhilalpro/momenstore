// ============================================
// home-products.js - منتجات الصفحة الرئيسية
// ============================================

// قائمة المنتجات المعروضة في الصفحة الرئيسية
const homeProductsList = [
        { name: 'مؤمن هلال ال مغربي', price:"لا يقدر بثمن", category: 'الكترونيات', img: 'momen.ggg/momen.jpg', badge: 'مميز', desc: ' طالب لدي المعهد العالي لنظم التجاره الاكترونيه' },

    { name: 'سماعة بلوتوث', price: 250, category: 'الكترونيات', img: 'momen.ggg/blo.jpg', badge: 'خصم', desc: 'صوت محيطي نقي مع تقنية إلغاء الضوضاء النشطة.' },
    { name: 'شاحن Type-C', price: 150, category: 'الكترونيات', img: 'momen.ggg/typec.jpg', badge: 'جديد', desc: 'شاحن سريع يدعم الهواتف الحديثة والأجهزة اللوحية.' },
    { name: 'لاب توب', price: 20000, category: 'الكترونيات', img: 'momen.ggg/labtop.jpg', badge: 'عرض', desc: 'لابتوب قوي للأعمال والتصميم مع بطارية تدوم طويلاً.' },
    { name: 'ساعة ذكية', price: 1500, category: 'الكترونيات', img: 'momen.ggg/Smart.jpg', badge: 'مميز', desc: 'تتبع اللياقة البدنية والإشعارات الذكية طوال اليوم.' },
    { name: 'موبايل', price: 3000, category: 'الكترونيات', img: 'momen.ggg/mobile.jpg', badge: 'متوفر', desc: 'هاتف ذكي بقوة أداء عالية وكاميرا ممتازة.' },
    { name: 'ثلاجة توشيبا', price: 50000, category: 'منزل', img: 'momen.ggg/tosiba.jpg', badge: 'تخفيض', desc: 'ثلاجة عائلية بسعة كبيرة وتصميم أنيق.' },
    { name: 'غسالة أطباق', price: 15000, category: 'منزل', img: 'momen.ggg/IMG_٢٠٢٦٠٣٢٥_٢٣٣٠٠٤.jpg', badge: 'متوفر', desc: 'غسالة أطباق موفرة للطاقة مع وظائف ذكية.' },
    { name: 'بدلة كلاسيك', price: 2000, category: 'أزياء', img: 'momen.ggg/Screenshot_2026-03-25-23-31-28-52.jpg', badge: 'جديد', desc: 'بدلة أنيقة للمناسبات الرسمية والمظهر الاحترافي.' }
];

// ===== دوال التقييم والمفضلة =====
window.rate = function(element, value) {
    const stars = element.parentElement.querySelectorAll('i');
    stars.forEach((star, index) => {
        if (index < value) {
            star.classList.remove('fa-regular', 'far');
            star.classList.add('fa-solid', 'fas');
        } else {
            star.classList.remove('fa-solid', 'fas');
            star.classList.add('fa-regular', 'far');
        }
    });
};

window.toggleFav = function(button) {
    const icon = button.querySelector('i');
    if (!icon) return;
    
    if (icon.classList.contains('fa-solid') || icon.classList.contains('fas')) {
        icon.classList.remove('fa-solid', 'fas');
        icon.classList.add('fa-regular', 'far');
    } else {
        icon.classList.remove('fa-regular', 'far');
        icon.classList.add('fa-solid', 'fas');
    }
    button.classList.toggle('favorite-active');
};

// ===== دالة تنسيق السعر =====
function formatPrice(value) {
    return Number(value).toLocaleString() + ' $';
}

// ===== دالة عرض المنتجات =====
function renderHomeProducts() {
    const homeProductGrid = document.getElementById('homeProductGrid');
    if (!homeProductGrid) return;
    
    homeProductGrid.innerHTML = homeProductsList.map(product => {
        const badgeClass = getBadgeClass(product.badge);
        const escapedName = product.name.replace(/'/g, "\\'");
        
        return `
            <div class="product product-home">
                ${product.badge ? `<span class="badge ${badgeClass}">${product.badge}</span>` : ''}
                <img src="${product.img}" alt="${product.name}" loading="lazy">
                <div class="product-content">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.desc}</p>
                    <div class="product-footer">
                        <span class="price">${formatPrice(product.price)}</span>
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
                        <button class="m" onclick="addToCart('${escapedName}', ${product.price})">أضف للسلة</button>
                        <a class="pr" href="product.html?name=${encodeURIComponent(product.name)}&price=${product.price}&img=${encodeURIComponent(product.img)}">التفاصيل</a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ===== دالة تحديد كلاس الشارة =====
function getBadgeClass(badge) {
    if (!badge) return '';
    const lowerBadge = badge.toLowerCase();
    if (lowerBadge.includes('جديد')) return 'new';
    if (lowerBadge.includes('خصم') || lowerBadge.includes('عرض') || lowerBadge.includes('تخفيض')) return 'discount';
    return '';
}

// ===== تشغيل عند تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', function() {
    renderHomeProducts();
});