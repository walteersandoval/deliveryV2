function displayProducts(products) {
    const productList = document.querySelector(".product-list");
    productList.innerHTML = "";
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" alt="${product.name}">
            <p>${product.description}</p>
            <p>Precio: L${product.price.toFixed(2)}</p>
            <p>Categorías: ${product.categories.join(", ")}</p>
            <button class="add-to-cart">Agregar al Carrito</button>
        `;
        productList.appendChild(productElement);

        const addToCartButton = productElement.querySelector(".add-to-cart");
        addToCartButton.addEventListener("click", () => addToCart(product));
    });
}

function showNotification(message) {
    const notificationContainer = document.getElementById('notification-container');
    notificationContainer.textContent = message;
    notificationContainer.style.display = 'block';

    setTimeout(() => {
        notificationContainer.style.display = 'none';
    }, 3000);
}
