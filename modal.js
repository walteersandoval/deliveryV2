document.addEventListener('DOMContentLoaded', function() {
    const productImageModal = document.getElementById('productImageModal');
    const fullScreenImage = document.getElementById('fullScreenImage');
    const closeModal = document.getElementById('closeModal');

    // Evento para abrir el modal al hacer clic en la imagen del producto
    document.querySelector('.product-list').addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            fullScreenImage.src = e.target.src;
            productImageModal.style.display = 'flex';
        }
    });

    // Evento para cerrar el modal
    closeModal.addEventListener('click', function() {
        productImageModal.style.display = 'none';
    });

    // Evento para cerrar el modal al hacer clic fuera de la imagen
    productImageModal.addEventListener('click', function(e) {
        if (e.target === productImageModal) {
            productImageModal.style.display = 'none';
        }
    });
});
