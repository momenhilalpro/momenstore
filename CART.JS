
//   السله

// مصفوفه لتخزين المتغيرات
      let cart = [];

// دالة الاضافه
   function addToCart(name, price) {
    cart.push({name: name, price: price});
  
// تحديث العدد
document.getElementById("cart-count").innerText = cart.length;
// تحديث عرض السله
updateCartUI();
   }
//    مكان عرض النتج وحساب الاجمالي
function updateCartUI(){
    let cartItems = document.getElementById("cart-items");
     let totel = 0;
    cartItems.innerHTML = "";
// بنلف علي كل منتج في السله
    cart.forEach((item, index) => {
        // جمع الاسعار
        totel += Number( item.price);
        let li = document.createElement("li");
      li.innerHTML =`
      ${item.name} - ${item.price}
      <button onclick ="removeItem(${index})">❌</button>
      `;
        cartItems.appendChild(li);

    });
    console.log("TOTAL =", total);
    // عرض الاجالي النهائي
    document.getElementById("total-price").innerText = total;
}
// حذف عنصر من السله
function removeItem(index){
    cart.splice(index, 1);
  

// تحديث العداد بعد الحذف
    document.getElementById("cart-count").innerText = cart.length;

    updateCartUI();

   
}
 function toggleCart() {
        let cart = document.getElementById("cart-box");

        if (cart.style.display === "block"){
            cart.style.display = "none";
        }else{
            cart.style.display = "block";
        }
    }
function addToCart(productName, productPrice) {
    // 1. جلب السلة الحالية من الذاكرة (لو مفيش، بنعمل مصفوفة فاضية)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // 2. التأكد لو المنتج موجود أصلاً في السلة عشان نزود الكمية بس
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        // 3. لو مش موجود، بنضيفه كمنتج جديد
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    // 4. حفظ السلة "المحدثة" في الذاكرة
    localStorage.setItem('cart', JSON.stringify(cart));

    alert("تم إضافة " + productName + " إلى السلة ✅");
}
function updateHeaderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countElement = document.getElementById('cart-count');
    
    if (countElement) {
        // حساب مجموع الكميات (Quantity) مش بس عدد الأنواع
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        countElement.innerText = totalItems;
    }
}

// تشغيل الدالة أول ما الصفحة تفتح عشان الرقم يظهر صح
window.addEventListener('load', updateHeaderCart);
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // كود الإضافة اللي عملناه قبل كدة ...
    cart.push({ name: productName, price: productPrice, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));

    // السطر السحري: حدث الرقم في الهيدر فوراً
    updateHeaderCart(); 
    
}