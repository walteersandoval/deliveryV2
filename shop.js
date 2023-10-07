let currentCategory = "all";
let orderNumber = 0;

document.addEventListener("DOMContentLoaded", function () {
    initializeShop();
});

function initializeShop() {
    const sendCartButton = document.getElementById("send-cart");
    const toggleCartButton = document.getElementById("toggle-cart");
    const categoryFilterSelect = document.getElementById("category-filter");
    const productSearchInput = document.getElementById("product-search");

    displayProducts(productData);
    updateCartSubtotal();

    sendCartButton.addEventListener("click", sendCartToWhatsApp);
    toggleCartButton.addEventListener("click", toggleCart);
    categoryFilterSelect.addEventListener("change", filterProductsByCategory);
    productSearchInput.addEventListener("input", searchProducts);
}

function filterProductsByCategory() {
    const categoryFilterSelect = document.getElementById("category-filter");

    const selectedCategory = categoryFilterSelect.value;

    if (selectedCategory === "all") {
        displayProducts(productData);
    } else {
        const filteredProducts = productData.filter(product => product.categories.includes(selectedCategory));
        displayProducts(filteredProducts);
    }
    currentCategory = selectedCategory;
}

function searchProducts() {
    const productSearchInput = document.getElementById("product-search");
    const searchTerm = productSearchInput.value.toLowerCase();
    let filteredProducts = productData;

    if (currentCategory !== "all") {
        filteredProducts = productData.filter(product => product.categories.includes(currentCategory));
    }

    filteredProducts = filteredProducts.filter(product => {
        return product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
    });
    displayProducts(filteredProducts);
}

function sendCartToWhatsApp() {
    const whatsappNumber = "50494895988";
    const deliveryFeeElement = document.getElementById("delivery-fee");
    const deliveryAddress = document.getElementById("delivery-address").value;
    const userName = document.getElementById("user-name").value;
    const userPhone = document.getElementById("user-phone").value;
    const deliveryMethod = document.getElementById("delivery-method").value;
    const paymentMethod = document.getElementById("payment-method").value;

    if (!deliveryAddress || !userName || !userPhone) {
        alert("Por favor, complete la dirección, el nombre y el número de teléfono antes de enviar el pedido.");
        return;
    }

    const items = Array.from(document.getElementById("cart-items").children).map(item => {
        const productName = item.textContent.split("-")[0].trim();
        const quantity = parseInt(item.querySelector(".quantity-select").value, 10);
        return `${quantity}x ${productName}`;
    }).join("\n");

    const subtotal = cartTotal.toFixed(2);
    const deliveryFee = parseFloat(deliveryFeeElement.textContent.replace("Tarifa de entrega: L", ""));
    const total = (cartTotal + deliveryFee).toFixed(2);

    const currentTime = new Date();
    const formattedTime = `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`;

    const orderMessage = `-----------------------------------
✏ Verifique el pedido a continuación:
Pedido ${orderNumber} - Wookcom Shop
--------------------------------------

*${items}*
----------------------------------

Subtotal: L${subtotal}
Tarifa de entrega: L${deliveryFee}
Total: *L${total}*

----------------------------------

⏰ Tiempo promedio de entrega: 30 Para 60 Minutos

🤩 ${userName}
📱 ${userPhone}

🏠 ${deliveryAddress} - Choluteca / Choluteca 

💳 Método de pago: ${paymentMethod}
🛵 Método de entrega: ${deliveryMethod}

Pedido generado por Wookcom Ordering (Delivery) En ${formattedTime}`;

    const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(orderMessage)}`;
    window.location.href = whatsappLink;
}
