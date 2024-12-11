
// Array de productos 
const productos = [
    { id: 1, nombre: 'Taza Artesanal Frutilla', precio: 350, imagen: './imagenes/cutecup.jpg', descripcion: 'Una taza única y colorida.' },
    { id: 2, nombre: 'Taza Gato Fondo', precio: 250, imagen: './imagenes/taza1.jpg', descripcion: 'Ideal para los amantes de los gatos.' },
    { id: 3, nombre: 'Plato Artesanal Panadería', precio: 780, imagen: './imagenes/plato.jpg', descripcion: 'Perfecto para tus comidas.' },
    { id: 4, nombre: 'Taza Gato Café', precio: 420, imagen: './imagenes/taza2.jpg', descripcion: 'Divertida para tus momentos de café.' },
    { id: 5, nombre: 'Taza Artesanal Totoro', precio: 630, imagen: './imagenes/tazatotoro.jpg', descripcion: 'Ideal para los fans de Totoro.' },
    { id: 6, nombre: 'Plato Artesanal Desayuno', precio: 880, imagen: './imagenes/plato2.jpg', descripcion: 'Perfecto para tus desayunos.' }
];

// Función para mostrar los productos en la página
function mostrarProductos() {
    const productosContainer = document.getElementById('productos-container');
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="card-price">$${producto.precio}</p>
            <div class="button-container">
                <button class="btn-fill" onclick="toggleDescripcion(this, '${producto.descripcion}')">Descripción</button>
                <button class="btn-cart" onclick="añadirAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio});">
                    <i class="fas fa-shopping-cart"></i>
                </button>
            </div>
            <div class="descripcion" style="display: none;"></div>
        `;
        
        productosContainer.appendChild(card);
    });
}

// Función para mostrar la descripción del producto
function toggleDescripcion(button, descripcion) {
    const card = button.closest('.card');
    const descripcionDiv = card.querySelector('.descripcion');

    if (descripcionDiv.style.display === 'none' || descripcionDiv.style.display === '') {
        descripcionDiv.style.display = 'block';
        descripcionDiv.innerHTML = descripcion;
        card.style.height = 'auto';
    } else {
        descripcionDiv.style.display = 'none';
        card.style.height = '';
    }
}

// Función para añadir productos al carrito
function añadirAlCarrito(id, nombre, precio) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad += 1; // Incrementar cantidad
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${nombre} ha sido añadido al carrito!`);
    mostrarCarrito(); // Muestra el carrito después de añadir el producto
}

// Función para mostrar el carrito
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const container = document.getElementById('carrito-container');
    container.innerHTML = ''; // Limpia el contenedor antes de mostrar el carrito

    carrito.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <h4>${item.nombre}</h4>
            <p>Precio: $${item.precio}</p>
            <p>Cantidad: <input type="number" value="${item.cantidad}" onchange="actualizarCantidad('${item.id}', this.value);"></p>
            <button onclick="eliminarDelCarrito('${item.id}');">Eliminar</button>
        `;
        container.appendChild(itemDiv);
    });

    // Mostrar el total del carrito
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const totalDiv = document.getElementById('total-container');
    totalDiv.innerHTML = `Total: $${total}`;
}

// Función para actualizar la cantidad de un producto en el carrito de productos
function actualizarCantidad(id, cantidad) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.cantidad = parseInt(cantidad);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito(); // Actualizar vista del carrito
    }
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.id !== parseInt(id));
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito(); // Actualiza la vista del carrito después de eliminar
}

// Cargar productos y carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    mostrarCarrito(); // Mostrar el carrito si tiene productos guardados
});

// Función para verificar si todos los campos del formulario están completos
function verificarFormulario(event) {
    event.preventDefault(); // Evita el envío del formulario
    const formulario = document.getElementById('contacto-form');
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (nombre === '' || email === '' || mensaje === '') {
        alert('Por favor, completa todos los campos del formulario.');
    } else {
        alert('Todos los campos están completos.');
        formulario.submit(); // Envía el formulario si todo está completo
    }
}

// Agrega un evento al formulario para verificar cuando se intenta enviar el formulario
document.getElementById('contacto-form').addEventListener('submit', verificarFormulario);





