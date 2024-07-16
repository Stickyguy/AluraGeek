document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartUI();

    document.getElementById('checkout-form').addEventListener('submit', function(event) {
        event.preventDefault();
        validateForm();
    });
});

function addToCart(product, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ product, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('carrito-items');
    const totalElement = document.getElementById('total');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        const text = document.createTextNode(` ${item.product} - $${item.price.toFixed(2)}`);
        li.appendChild(text);
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.onclick = () => removeFromCart(index);
        li.appendChild(removeButton);
        cartItems.appendChild(li);
        total += item.price;
    });
    totalElement.textContent = total.toFixed(2);
}

function checkout() {
    document.getElementById('checkout-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('checkout-modal').style.display = 'none';
}

function validateForm() {
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const edad = document.getElementById('edad').value;
    const identificacion = document.getElementById('identificacion').files[0];

    if (edad < 18) {
        alert('Debes ser mayor de 18 años.');
        return;
    }

    if (!identificacion) {
        alert('Debes subir una foto de tu identificación.');
        return;
    }

    // Aquí puedes agregar el código para enviar los datos a una API si es necesario

    alert('Formulario enviado correctamente');
    localStorage.removeItem('cart');
    updateCartUI();
    closeModal();
}
