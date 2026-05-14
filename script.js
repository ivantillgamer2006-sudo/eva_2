// ========== EVA 2 - TIENDA DE PELUCHES MYSPACE ==========
// ========== CON CARRITO FUNCIONAL, VALIDACIONES Y DOM MANIPULATION ==========

// ========== DATOS INICIALES ==========
// [IA asistida] Estructura de objetos para productos y carrito
let catalogo = [
    { id: 1, nombre: "✖ Cachorro Emo ✖", precio: 19990, imagen: "images/sad_puppy.jpeg", color: "negro" },
    { id: 2, nombre: "♠ Conejo Dark Rabbit ♠", precio: 16500, imagen: "images/goth_bunny.jpeg", color: "negro" },
    { id: 3, nombre: "☆ Unicornio Zombie ☆", precio: 24990, imagen: "images/zombie_uni.jpeg", color: "morado" },
    { id: 4, nombre: "✖ Unicornio Tiburon ✖", precio: 21300, imagen: "images/shark_uni.jpeg", color: "negro" }
];

let carrito = []; // Array de objetos { id, nombre, precio, cantidad, color, imagen }

// ========== FUNCIONES MODULARES ==========

// [IA asistida] Función para sanitizar texto (evitar XSS)
function sanitizarTexto(texto) {
    return texto.replace(/[<>]/g, '').trim();
}

// Validaciones del formulario
function validarNombre(nombre) {
    const nombreLimpio = sanitizarTexto(nombre);
    if (nombreLimpio.length === 0) return { valido: false, error: "El nombre no puede estar vacío" };
    if (nombreLimpio.length < 3) return { valido: false, error: "El nombre debe tener al menos 3 caracteres" };
    // Solo letras, números, espacios y caracteres emo permitidos
    const regex = /^[a-zA-ZáéíóúñÑ0-9\s✖♠☆✰☠♥★]+$/;
    if (!regex.test(nombreLimpio)) return { valido: false, error: "Caracteres no válidos en el nombre" };
    return { valido: true, error: null, valor: nombreLimpio };
}

function validarPrecio(precio) {
    const precioNum = Number(precio);
    if (isNaN(precioNum)) return { valido: false, error: "El precio debe ser un número" };
    if (precioNum <= 0) return { valido: false, error: "El precio debe ser mayor a 0" };
    if (precioNum > 999999) return { valido: false, error: "Precio muy alto (máx $999.999)" };
    return { valido: true, error: null, valor: precioNum };
}

function validarCantidad(cantidad) {
    const cantidadNum = Number(cantidad);
    if (isNaN(cantidadNum)) return { valido: false, error: "La cantidad debe ser un número" };
    if (!Number.isInteger(cantidadNum)) return { valido: false, error: "La cantidad debe ser un número entero" };
    if (cantidadNum < 1) return { valido: false, error: "La cantidad mínima es 1" };
    if (cantidadNum > 99) return { valido: false, error: "Cantidad máxima 99 unidades" };
    return { valido: true, error: null, valor: cantidadNum };
}

// [IA asistida] Función para agregar item al carrito
function agregarAlCarrito(id, nombre, precio, cantidad, color, imagen) {
    // Buscar si ya existe producto con mismo id y color
    const existeIndex = carrito.findIndex(item => item.id === id && item.color === color);
    
    if (existeIndex !== -1) {
        // Actualizar cantidad
        carrito[existeIndex].cantidad += cantidad;
    } else {
        // Agregar nuevo item
        carrito.push({
            id: id,
            nombre: sanitizarTexto(nombre),
            precio: precio,
            cantidad: cantidad,
            color: color,
            imagen: imagen
        });
    }
    
    // Guardar en localStorage
    localStorage.setItem('carritoPeluches', JSON.stringify(carrito));
    
    // Actualizar UI
    renderizarCarrito();
    actualizarContadorCarrito();
    
    // Animación
    const cartDisplay = document.getElementById('scene-cart-counter');
    if (cartDisplay) cartDisplay.classList.add('cart-pulse');
    setTimeout(() => {
        if (cartDisplay) cartDisplay.classList.remove('cart-pulse');
    }, 300);
}

// Función para eliminar item del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carritoPeluches', JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContadorCarrito();
}

// Función para actualizar cantidad de un item
function actualizarCantidadItem(index, nuevaCantidad) {
    if (nuevaCantidad < 1) {
        eliminarDelCarrito(index);
        return;
    }
    if (nuevaCantidad > 99) nuevaCantidad = 99;
    carrito[index].cantidad = nuevaCantidad;
    localStorage.setItem('carritoPeluches', JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContadorCarrito();
}

// Función para calcular el total del carrito
function calcularTotalCarrito() {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

// [IA asistida] Función para renderizar el carrito en el DOM (usa createElement, seguridad)
function renderizarCarrito() {
    const cartContainer = document.getElementById('cartContainer');
    if (!cartContainer) return;
    
    if (carrito.length === 0) {
        cartContainer.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-heart-broken"></i> El carrito está vacío... agreguemos peluches <i class="fas fa-heart-broken"></i>
            </div>
        `;
        document.getElementById('totalCarrito').textContent = `$${0}`;
        return;
    }
    
    // Limpiar contenedor
    cartContainer.innerHTML = '';
    
    // Renderizar cada item usando createElement (seguro contra XSS)
    carrito.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        
        const subtotal = item.precio * item.cantidad;
        
        itemDiv.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${escapeHTML(item.nombre)} ${item.color !== 'negro' ? `(${item.color})` : ''}</div>
                <div class="cart-item-price">$${item.precio.toLocaleString()} c/u</div>
            </div>
            <div class="cart-item-quantity">
                <button onclick="actualizarCantidadItem(${index}, ${item.cantidad - 1})">-</button>
                <span>${item.cantidad}</span>
                <button onclick="actualizarCantidadItem(${index}, ${item.cantidad + 1})">+</button>
            </div>
            <div class="cart-item-subtotal">$${subtotal.toLocaleString()}</div>
            <button class="delete-item" onclick="eliminarDelCarrito(${index})"><i class="fas fa-trash-alt"></i></button>
        `;
        
        cartContainer.appendChild(itemDiv);
    });
    
    // Actualizar total
    const total = calcularTotalCarrito();
    document.getElementById('totalCarrito').textContent = `$${total.toLocaleString()}`;
}

// Función auxiliar para escapar HTML (seguridad)
function escapeHTML(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Actualizar el contador flotante del carrito
function actualizarContadorCarrito() {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const cartCounter = document.getElementById('scene-cart-counter');
    if (cartCounter) {
        cartCounter.innerHTML = `🛒 ${totalItems}`;
    }
}

// Vaciar carrito completo
function vaciarCarrito() {
    if (confirm('¿RAWR! ¿Seguro que quieres vaciar todo tu carrito?')) {
        carrito = [];
        localStorage.setItem('carritoPeluches', JSON.stringify(carrito));
        renderizarCarrito();
        actualizarContadorCarrito();
    }
}

// Renderizar el catálogo de productos
function renderizarCatalogo() {
    const catalogoContainer = document.getElementById('catalogoProductos');
    if (!catalogoContainer) return;
    
    catalogoContainer.innerHTML = '';
    
    catalogo.forEach(producto => {
        const card = document.createElement('article');
        card.className = 'product-card-scene';
        card.innerHTML = `
            <div class="product-image-scene">
                <img src="${producto.imagen}" alt="${escapeHTML(producto.nombre)}" loading="lazy">
                <div class="hover-glow"></div>
            </div>
            <div class="product-info-scene">
                <h3>${escapeHTML(producto.nombre)}</h3>
                <p class="desc-scene">${producto.id === 1 ? 'Su carita triste dan ganas de abrazarlo X3' : producto.id === 2 ? 'abrazos desde el lado oscuro' : producto.id === 3 ? 'Cuidado que muerde DX' : 'suave pero peligroso :3'}</p>
                <div class="price-scene">$${producto.precio.toLocaleString()}</div>
                <button class="btn-buy-scene" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}" data-imagen="${producto.imagen}">🖤 COMPRAR 🖤</button>
            </div>
        `;
        catalogoContainer.appendChild(card);
    });
    
    // Agregar event listeners a los botones del catálogo
    document.querySelectorAll('.btn-buy-scene').forEach(btn => {
        btn.removeEventListener('click', handleCatalogoClick);
        btn.addEventListener('click', handleCatalogoClick);
    });
}

function handleCatalogoClick(e) {
    const btn = e.currentTarget;
    const id = parseInt(btn.getAttribute('data-id'));
    const nombre = btn.getAttribute('data-nombre');
    const precio = parseInt(btn.getAttribute('data-precio'));
    const imagen = btn.getAttribute('data-imagen');
    
    agregarAlCarrito(id, nombre, precio, 1, 'negro', imagen);
    
    // Alerta estilo MySpace
    const notif = document.createElement('div');
    notif.className = 'myspace-notification';
    notif.innerHTML = `🖤 ¡${nombre} agregado al carrito! 🖤`;
    notif.style.position = 'fixed';
    notif.style.bottom = '80px';
    notif.style.right = '20px';
    notif.style.backgroundColor = '#ff1493';
    notif.style.color = 'black';
    notif.style.padding = '8px 15px';
    notif.style.borderRadius = '30px';
    notif.style.fontFamily = "'Press Start 2P', monospace";
    notif.style.fontSize = '0.6rem';
    notif.style.zIndex = '999';
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
}

// ========== CONFIGURACIÓN DEL FORMULARIO ==========
function setupFormulario() {
    const form = document.getElementById('productoForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener valores
        const nombreRaw = document.getElementById('productoNombre').value;
        const precioRaw = document.getElementById('productoPrecio').value;
        const cantidadRaw = document.getElementById('productoCantidad').value;
        const color = document.getElementById('productoColor').value;
        
        // Validaciones
        const nombreValid = validarNombre(nombreRaw);
        const precioValid = validarPrecio(precioRaw);
        const cantidadValid = validarCantidad(cantidadRaw);
        
        // Mostrar errores
        document.getElementById('errorNombre').textContent = nombreValid.error || '';
        document.getElementById('errorPrecio').textContent = precioValid.error || '';
        document.getElementById('errorCantidad').textContent = cantidadValid.error || '';
        
        if (!nombreValid.valido || !precioValid.valido || !cantidadValid.valido) {
            return;
        }
        
        // Crear nuevo producto (id temporal)
        const nuevoId = Date.now();
        const nuevaImagen = "https://placekitten.com/400/400"; // Imagen por defecto
        
        // Agregar al carrito directamente
        agregarAlCarrito(nuevoId, nombreValid.valor, precioValid.valor, cantidadValid.valor, color, nuevaImagen);
        
        // Limpiar formulario
        form.reset();
        document.getElementById('productoCantidad').value = 1;
        
        // Mostrar notificación de éxito
        alert(`🖤 ¡${nombreValid.valor} agregado al carrito! 🖤\nPrecio: $${precioValid.valor.toLocaleString()}\nCantidad: ${cantidadValid.valor}`);
    });
}

// ========== CARGAR DATOS GUARDADOS ==========
function cargarCarritoGuardado() {
    const guardado = localStorage.getItem('carritoPeluches');
    if (guardado) {
        try {
            carrito = JSON.parse(guardado);
        } catch(e) {
            carrito = [];
        }
    }
    renderizarCarrito();
    actualizarContadorCarrito();
}

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', () => {
    // Configurar carrito flotante
    const cartDisplay = document.createElement('div');
    cartDisplay.id = 'scene-cart-counter';
    cartDisplay.className = 'floating-cart-badge';
    cartDisplay.innerHTML = `🛒 0`;
    cartDisplay.onclick = () => {
        document.getElementById('carrito').scrollIntoView({ behavior: 'smooth' });
    };
    document.body.appendChild(cartDisplay);
    
    // Inicializar todo
    renderizarCatalogo();
    setupFormulario();
    cargarCarritoGuardado();
    
    // Botón vaciar carrito
    const vaciarBtn = document.getElementById('vaciarCarritoBtn');
    if (vaciarBtn) {
        vaciarBtn.addEventListener('click', vaciarCarrito);
    }
    
    // Configurar reproductor de audio
    let audioPlayer = document.getElementById('sceneAudio');
    if (audioPlayer) {
        audioPlayer.volume = 0.5;
        const volumeSlider = document.getElementById('volumeSlider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                audioPlayer.volume = e.target.value / 100;
                const volIcon = document.getElementById('volIcon');
                if (volIcon) {
                    if (audioPlayer.volume === 0) volIcon.className = 'fas fa-volume-mute';
                    else if (audioPlayer.volume < 0.5) volIcon.className = 'fas fa-volume-down';
                    else volIcon.className = 'fas fa-volume-up';
                }
            });
        }
    }
    
    // Contact form demo
    const contactForm = document.querySelector('.contact-form-scene');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = contactForm.querySelector('input[name="name"]');
            alert(`✖ hell yeah ✖ ${nameInput.value || 'desconocidx'}! tu mensaje ha sido enviado a la bandeja de MySpace.`);
            contactForm.reset();
        });
    }
});

// ========== FUNCIONES GLOBALES PARA EL REPRODUCTOR ==========
function playMusic() {
    const audio = document.getElementById('sceneAudio');
    if (audio) audio.play();
}

function pauseMusic() {
    const audio = document.getElementById('sceneAudio');
    if (audio) audio.pause();
}

function stopMusic() {
    const audio = document.getElementById('sceneAudio');
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}

function activarMusica() {
    const audio = document.getElementById('sceneAudio');
    if (audio) {
        audio.play().catch(() => alert('⚠️ Haz clic en el botón PLAY del reproductor ⚠️'));
    }
}

console.log('☆ EVA 2 - MySpace Scene Plushies con Carrito Funcional ☆');