let cartTotal = 0;
const productSubtotals = new Map();
let cartItemCount = 0;

function addToCart(product) {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");
    const cartCountElement = document.getElementById("cart-count");

    const cartItem = document.createElement("li");
    cartItem.classList.add("cart-item");

    const uniqueClass = `product-${Date.now()}`;
    cartItem.classList.add(uniqueClass);

    cartItem.innerHTML = `
        ${product.name} - L${product.price.toFixed(2)}
        <button class="remove-from-cart" data-unique-class="${uniqueClass}">Eliminar</button>
        <select class="quantity-select">Cant
            <option value="1">Cantidad 1</option>
            <option value="2">Cantidad 2</option>
            <option value="3">Cantidad 3</option>
            <option value="4">Cantidad 4</option>
            <option value="5">Cantidad 5</option>
            <option value="6">Cantidad 6</option>
            <option value="7">Cantidad 7</option>
            <option value="8">Cantidad 8</option>
            <option value="9">Cantidad 9</option>
            <option value="10">Cantidad 10</option>
        </select>
        <span class="subtotal">Total por productos:  L${product.price.toFixed(2)}</span>
    `;
    cartItems.appendChild(cartItem);

    const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
    removeFromCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const uniqueClass = button.getAttribute("data-unique-class");
            removeFromCart(uniqueClass);
        });
    });

    const quantitySelect = cartItem.querySelector(".quantity-select");
    quantitySelect.addEventListener("change", () => updateCartItemTotal(cartItem, product.price, quantitySelect));

    cartTotal += product.price;
    totalElement.textContent = `Total: L${cartTotal.toFixed(2)}`;

    productSubtotals.set(uniqueClass, product.price);
    updateCartSubtotal();

    showNotification(`"${product.name}" ha sido agregado al carrito.`);
    cartItemCount++;
    cartCountElement.textContent = cartItemCount;
}

function removeFromCart(uniqueClass) {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");
    const cartSubtotalElement = document.getElementById("cart-subtotal");
    const cartCountElement = document.getElementById("cart-count");

    const cartItemToRemove = document.querySelector(`.cart-item.${uniqueClass}`);
    if (cartItemToRemove) {
        const removedPrice = productSubtotals.get(uniqueClass);

        cartTotal -= removedPrice;
        totalElement.textContent = `Total: L${cartTotal.toFixed(2)}`;

        productSubtotals.delete(uniqueClass);
        cartItemToRemove.remove();

        if (cartItems.children.length === 0) {
            cartTotal = 0;
            totalElement.textContent = `Total: L${cartTotal.toFixed(2)}`;
            cartSubtotalElement.textContent = `Subtotal: L${cartTotal.toFixed(2)}`;
        } else {
            updateCartSubtotal();
        }

        cartItemCount--;
        cartCountElement.textContent = cartItemCount;
    }
}

function updateCartSubtotal() {
    const cartSubtotalElement = document.getElementById("cart-subtotal");
    const deliveryFeeElement = document.getElementById("delivery-fee");
    const totalElement = document.getElementById("cart-total");

    let cartSubtotal = 0;
    productSubtotals.forEach(subtotal => {
        cartSubtotal += subtotal;
    });

    cartSubtotalElement.textContent = `Subtotal: L${cartSubtotal.toFixed(2)}`;
    const deliveryFee = parseFloat(deliveryFeeElement.textContent.replace("Tarifa de entrega: L", ""));
    cartTotal = cartSubtotal + deliveryFee;
    totalElement.textContent = `Total: L ${cartTotal.toFixed(2)}`;
}

function updateCartItemTotal(cartItem, productPrice, quantitySelect) {
    const quantity = parseInt(quantitySelect.value, 10);
    const subtotal = quantity * productPrice;

    cartItem.querySelector(".subtotal").textContent = `L ${subtotal.toFixed(2)}`;
    const uniqueClass = cartItem.classList[1];
    productSubtotals.set(uniqueClass, subtotal);

    updateCartSubtotal();
}

function toggleCart() {
    const cart = document.querySelector(".cart");
    if (cart.style.display === "block") {
        cart.style.display = "none";
    } else {
        cart.style.display = "block";
    }
}
