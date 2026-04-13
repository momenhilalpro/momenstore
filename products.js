const productsList = [
    { name: 'سماعة بلوتوث', price: 250, category: 'الكترونيات', img: 'momen.ggg/blo.jpg', badge: 'خصم', desc: 'صوت محيطي نقي مع تقنية إلغاء الضوضاء النشطة.' },
    { name: 'شاحن Type-C', price: 150, category: 'الكترونيات', img: 'momen.ggg/typec.jpg', badge: 'جديد', desc: 'شاحن سريع يدعم الهواتف الحديثة والأجهزة اللوحية.' },
    { name: 'لاب توب', price: 20000, category: 'الكترونيات', img: 'momen.ggg/labtop.jpg', badge: 'عرض', desc: 'لابتوب قوي للأعمال والتصميم مع بطارية تدوم طويلاً.' },
    { name: 'ساعة ذكية', price: 1500, category: 'الكترونيات', img: 'momen.ggg/Smart.jpg', badge: 'مميز', desc: 'تتبع اللياقة البدنية والإشعارات الذكية طوال اليوم.' },
    { name: 'موبايل', price: 3000, category: 'الكترونيات', img: 'momen.ggg/mobile.jpg', badge: 'متوفر', desc: 'هاتف ذكي بقوة أداء عالية وكاميرا ممتازة.' },
    { name: 'ثلاجة توشيبا', price: 50000, category: 'منزل', img: 'momen.ggg/tosiba.jpg', badge: 'تخفيض', desc: 'ثلاجة عائلية بسعة كبيرة وتصميم أنيق.' },
    { name: 'غسالة أطباق', price: 15000, category: 'منزل', img: 'momen.ggg/IMG_٢٠٢٦٠٣٢٥_٢٣٣٠٠٤.jpg', badge: 'متوفر', desc: 'غسالة أطباق موفرة للطاقة مع وظائف ذكية.' },
    { name: 'بدلة كلاسيك', price: 2000, category: 'أزياء', img: 'momen.ggg/Screenshot_2026-03-25-23-31-28-52.jpg', badge: 'جديد', desc: 'بدلة أنيقة للمناسبات الرسمية والمظهر الاحترافي.' },
    { name: 'ساعه سمارة', price: 500, category: 'أزياء', img: 'momen.ggg/smart1.jpg', badge: 'عرض', desc: 'ساعة تصميمها عصري وتدعم الوظائف الذكية الأساسية.' },
    { name: 'ساعه سمارة', price: 500, category: 'أزياء', img: 'momen.ggg/smart1.jpg', badge: 'عرض', desc: 'ساعة تصميمها عصري وتدعم الوظائف الذكية الأساسية.' }
];

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('productSearch');
const categorySelect = document.getElementById('productCategory');
const sortSelect = document.getElementById('productSort');
const productCount = document.getElementById('productCount');

function formatPrice(value) {
    return value.toLocaleString() + ' $';
}

function renderProducts(list) {
    if (!productGrid) return;
    productGrid.innerHTML = list.map(product => {
        return `
            <div class="product">
                ${product.badge ? `<span class="badge ${product.badge.toLowerCase().includes('جديد') ? 'new' : product.badge.toLowerCase().includes('خصم') || product.badge.toLowerCase().includes('عرض') ? 'discount' : ''}">` + product.badge + `</span>` : ''}
                <img src="${product.img}" alt="${product.name}" loading="lazy">
                <div class="product-content">
                    <h3>${product.name}</h3>
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
                        <button class="m" onclick="addToCart('${product.name.replace(/'/g, "\\'")}', ${product.price})">أضف للسلة</button>
                        <a class="pr" href="product.html?name=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}&img=${encodeURIComponent(product.img)}">التفاصيل</a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function applyProductsFilter() {
    const searchValue = searchInput?.value.trim().toLowerCase() || '';
    const categoryValue = categorySelect?.value || 'all';
    const sortValue = sortSelect?.value || 'default';

    let filtered = productsList.filter(product => {
        const matchesName = product.name.toLowerCase().includes(searchValue) || product.desc.toLowerCase().includes(searchValue);
        const matchesCategory = categoryValue === 'all' || product.category === categoryValue;
        return matchesName && matchesCategory;
    });

    if (sortValue === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    }

    renderProducts(filtered);
}

window.addEventListener('DOMContentLoaded', function() {
    renderProducts(productsList);
    if (searchInput) searchInput.addEventListener('input', applyProductsFilter);
    if (categorySelect) categorySelect.addEventListener('change', applyProductsFilter);
    if (sortSelect) sortSelect.addEventListener('change', applyProductsFilter);
});