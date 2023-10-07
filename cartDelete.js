document.addEventListener("DOMContentLoaded", function () {
  // Obtener una referencia al botón "Limpiar Carrito"
  const clearCartButton = document.getElementById("clear-cart");

  // Agregar un evento de clic al botón
  clearCartButton.addEventListener("click", function () {
    // Obtener una referencia a la lista de elementos del carrito
    const cartItemsList = document.getElementById("cart-items");

    // Limpiar la lista de elementos del carrito (eliminar todos los elementos hijos)
    while (cartItemsList.firstChild) {
      cartItemsList.removeChild(cartItemsList.firstChild);
    }

    // Actualizar el contador de carrito a 0
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = "0";

    // Restablecer el subtotal y el total del carrito
    const cartSubtotal = document.getElementById("cart-subtotal");
    const cartTotal = document.getElementById("cart-total");
    cartSubtotal.textContent = "Subtotal: L0.00";
    cartTotal.textContent = "Total: L0.00";
  });
});
