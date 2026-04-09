function displayOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItems = document.getElementById('orderItems');
    let total = 0;

    if (cart.length === 0) {
        orderItems.innerHTML = '<p style="text-align: center; color: var(--text-muted);">السلة فارغة</p>';
        return;
    }

    orderItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * (item.quantity || 1);
        total += itemTotal;
        return `
            <div class="order-item">
                <div>
                    <div style="font-weight: 500; color: var(--text-dark);">${item.name}</div>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">× ${item.quantity || 1}</span>
                </div>
                <div style="font-weight: 700; color: var(--primary-color);">${itemTotal} $</div>
            </div>
        `;
    }).join('');

    document.getElementById('subtotal').innerText = total + ' $';
    document.getElementById('totalAmount').innerText = total + ' $';
}

function startTimer() {
    let timeLeft = 600;
    const timerDisplay = document.getElementById('timerDisplay');

    setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = 
            (minutes < 10 ? '0' : '') + minutes + ':' + 
            (seconds < 10 ? '0' : '') + seconds;

        if (timeLeft > 0) {
            timeLeft--;
        } else {
            timeLeft = 600;
        }
    }, 1000);
}

document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = document.getElementById('totalAmount').innerText;

    let message = `*🛒 طلب شراء جديد من متجر مومن هلال*\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━\n`;
    message += `*👤 بيانات العميل:*\n`;
    message += `الاسم: ${firstName} ${lastName}\n`;
    message += `الهاتف: ${phone}\n`;
    message += `العنوان: ${address}\n\n`;
    message += `*💳 طريقة الدفع:* ${paymentMethod}\n\n`;
    message += `*📦 المنتجات:*\n`;
    cart.forEach(item => {
        message += `• ${item.name} × ${item.quantity || 1} = ${item.price * (item.quantity || 1)} $\n`;
    });
    message += `━━━━━━━━━━━━━━━━━━━\n`;
    message += `*💰 الإجمالي النهائي: ${total}*\n`;

    window.open(`https://wa.me/201096429739?text=${encodeURIComponent(message)}`, '_blank');
    localStorage.removeItem('cart');

    setTimeout(() => {
        document.getElementById('checkoutForm').reset();
        window.location.href = 'products.html';
    }, 2000);
});

window.addEventListener('DOMContentLoaded', () => {
    displayOrderSummary();
    startTimer();
});