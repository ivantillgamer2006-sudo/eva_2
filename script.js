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

// ========== FUNCIONES DE SEGURIDAD (IA asistida) ==========
// [IA asistida] Función para sanitizar texto (evitar XSS)
function sanitizarTexto(texto) {
    return texto.replace(/[<>]/g, '').trim();
}

// [IA asistida] Función para escapar HTML (seguridad)
function escapeHTML(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// ========== VALIDACIONES AVANZADAS (IA asistida - regex) ==========
// [IA asistida] Validación de email con regex
function validarEmail(email) {
    const emailLimpio = sanitizarTexto(email);
    if (emailLimpio.length === 0) return { valido: false, error: "El email no puede estar vacío" };
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(emailLimpio)) return { valido: false, error: "Email no válido (ej: nombre@dominio.com)" };
    return { valido: true, error: null, valor: emailLimpio };
}

// [IA asistida] Validación de cantidad (entera y positiva)
function validarCantidad(cantidad) {
    const cantidadNum = Number(cantidad);
    if (isNaN(cantidadNum)) return { valido: false, error: "La cantidad debe ser un número" };
    if (!Number.isInteger(cantidadNum)) return { valido: false, error: "La cantidad debe ser un número entero" };
    if (cantidadNum < 1) return { valido: false, error: "La cantidad mínima es 1" };
    if (cantidadNum > 99) return { valido: false, error: "Cantidad máxima 99 unidades" };
    return { valido: true, error: null, valor: cantidadNum };
}

// [IA asistida] Validación de precio (positivo)
function validarPrecio(precio) {
    const precioNum = Number(precio);
    if (isNaN(precioNum)) return { valido: false, error: "El precio debe ser un número" };
    if (precioNum <= 0) return { valido: false, error: "El precio debe ser mayor a 0" };
    if (precioNum > 999999) return { valido: false, error: "Precio muy alto (máx $999.999)" };
    return { valido: true, error: null, valor: precioNum };
}

// ========== FUNCIONES DEL CARRITO (modulares y reutilizables) ==========
// [IA asistida] Agregar item al carrito con validaciones
function agregarAlCarrito(id, nombre, precio, cantidad, color, imagen, email) {
    // Validar precio por seguridad
    const precioValid = validarPrecio(precio);
    if (!precioValid.valido) {
        alert(`❌ Error: ${precioValid.error}`);
        return false;
    }
    
    // Validar cantidad por seguridad
    const cantidadValid = validarCantidad(cantidad);
    if (!cantidadValid.valido) {
        alert(`❌ Error: ${cantidadValid.error}`);
        return false;
    }
    
    // Validar email (opcional para esta función)
    if (email) {
        const emailValid = validarEmail(email);
        if (!emailValid.valido) {
            alert(`❌ Error: ${emailValid.error}`);
            return false;
        }
    }
    
    // Buscar si ya existe producto con mismo id y color
    const existeIndex = carrito.findIndex(item => item.id === id && item.color === color);
    
    if (existeIndex !== -1) {
        carrito[existeIndex].cantidad += cantidadValid.valor;
    } else {
        carrito.push({
            id: id,
            nombre: sanitizarTexto(nombre),
            precio: precioValid.valor,
            cantidad: cantidadValid.valor,
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
    
    return true;
}

// Eliminar item del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carritoPeluches', JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContadorCarrito();
}

// Actualizar cantidad de un item
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

// Calcular total del carrito (usando reduce)
function calcularTotalCarrito() {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
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

// ========== FUNCIONES DE RENDERIZADO (DOM manipulation) ==========
// [IA asistida] Renderizar carrito (usa createElement, seguro contra XSS)
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
    
    cartContainer.innerHTML = '';
    
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
    
    const total = calcularTotalCarrito();
    document.getElementById('totalCarrito').textContent = `$${total.toLocaleString()}`;
}

// Actualizar contador flotante del carrito
function actualizarContadorCarrito() {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const cartCounter = document.getElementById('scene-cart-counter');
    if (cartCounter) {
        cartCounter.innerHTML = `🛒 ${totalItems}`;
    }
}

// Renderizar catálogo de productos
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
    
    document.querySelectorAll('.btn-buy-scene').forEach(btn => {
        btn.removeEventListener('click', handleCatalogoClick);
        btn.addEventListener('click', handleCatalogoClick);
    });
}

// Manejar clic en botón de compra del catálogo
function handleCatalogoClick(e) {
    const btn = e.currentTarget;
    const id = parseInt(btn.getAttribute('data-id'));
    const nombre = btn.getAttribute('data-nombre');
    const precio = parseInt(btn.getAttribute('data-precio'));
    const imagen = btn.getAttribute('data-imagen');
    
    agregarAlCarrito(id, nombre, precio, 1, 'negro', imagen);
    
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

// ========== CARGAR PRODUCTOS EN EL SELECT ==========
function cargarProductosEnSelect() {
    const select = document.getElementById('productoSelect');
    if (!select) return;
    
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    catalogo.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.id;
        option.textContent = `${producto.nombre} - $${producto.precio.toLocaleString()}`;
        option.setAttribute('data-precio', producto.precio);
        option.setAttribute('data-nombre', producto.nombre);
        option.setAttribute('data-imagen', producto.imagen);
        select.appendChild(option);
    });
    
    select.addEventListener('change', (e) => {
        const selectedOption = select.options[select.selectedIndex];
        const precio = selectedOption.getAttribute('data-precio');
        const precioInput = document.getElementById('productoPrecio');
        
        if (precio && select.selectedIndex > 0) {
            precioInput.value = `$${parseInt(precio).toLocaleString()}`;
        } else {
            precioInput.value = '';
        }
        document.getElementById('errorProducto').textContent = '';
    });
}

// ========== CONFIGURACIÓN DEL FORMULARIO ==========
function setupFormulario() {
    const form = document.getElementById('productoForm');
    if (!form) return;
    
    cargarProductosEnSelect();
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const select = document.getElementById('productoSelect');
        const selectedIndex = select.selectedIndex;
        const cantidadRaw = document.getElementById('productoCantidad').value;
        const email = document.getElementById('clienteEmail').value;
        
        // Validar producto seleccionado
        if (selectedIndex === 0 || !select.value) {
            document.getElementById('errorProducto').textContent = 'Por favor, selecciona un peluche del catálogo';
            return;
        } else {
            document.getElementById('errorProducto').textContent = '';
        }
        
        // Validar email
        const emailValid = validarEmail(email);
        document.getElementById('errorEmail').textContent = emailValid.error || '';
        if (!emailValid.valido) return;
        
        // Validar cantidad
        const cantidadValid = validarCantidad(cantidadRaw);
        document.getElementById('errorCantidad').textContent = cantidadValid.error || '';
        if (!cantidadValid.valido) return;
        
        const selectedOption = select.options[selectedIndex];
        const productoId = parseInt(select.value);
        const productoNombre = selectedOption.getAttribute('data-nombre');
        const productoPrecio = parseInt(selectedOption.getAttribute('data-precio'));
        const productoImagen = selectedOption.getAttribute('data-imagen');
        
        agregarAlCarrito(productoId, productoNombre, productoPrecio, cantidadValid.valor, 'negro', productoImagen, emailValid.valor);
        
        select.selectedIndex = 0;
        document.getElementById('productoCantidad').value = 1;
        document.getElementById('productoPrecio').value = '';
        document.getElementById('clienteEmail').value = '';
        
        alert(`🖤 ¡${productoNombre} agregado al carrito! 🖤\nPrecio: $${productoPrecio.toLocaleString()}\nCantidad: ${cantidadValid.valor}\nEmail de confirmación: ${emailValid.valor}`);
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
    const cartDisplay = document.createElement('div');
    cartDisplay.id = 'scene-cart-counter';
    cartDisplay.className = 'floating-cart-badge';
    cartDisplay.innerHTML = `🛒 0`;
    cartDisplay.onclick = () => {
        document.getElementById('carrito').scrollIntoView({ behavior: 'smooth' });
    };
    document.body.appendChild(cartDisplay);
    
    renderizarCatalogo();
    setupFormulario();
    cargarCarritoGuardado();
    
    const vaciarBtn = document.getElementById('vaciarCarritoBtn');
    if (vaciarBtn) {
        vaciarBtn.addEventListener('click', vaciarCarrito);
    }
    
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