
// Actualizar info de los productos con imagenes apropiadas
const productos = [
    { id: 1, nombre: "Polo Algodón Mujer", precio: 49.90, img: "Recursos/RopaAlgodonMujer.jpg", destacado: true },
    { id: 2, nombre: "Jeans Hombre Skinny", precio: 89.90, img: "Recursos/JeansHombreSkinny.jpg", destacado: true },
    { id: 3, nombre: "Zapatillas Urbanas", precio: 129.90, img: "Recursos/ZapatillasUrbanas.jpg", destacado: true },
    { id: 4, nombre: "Chompa para Niño", precio: 59.90, img: "Recursos/ChompaNino.jpg", destacado: false },
    { id: 5, nombre: "Bolso de Mano", precio: 79.90, img: "Recursos/BolsoMano.jpg", destacado: false },
    { id: 6, nombre: "Camisa Formal Hombre", precio: 109.90, img: "Recursos/CamisaFormalHombre.jpg", destacado: true },
    { id: 7, nombre: "Vestido Primavera", precio: 99.90, img: "Recursos/VestidoPrimavera.jpg", destacado: false }
];

let resenas = JSON.parse(localStorage.getItem("textilnova_resenas")) || {};

let carrito = [];
let descuentoActivo = false;
let factorDescuento = 1;

function generarEstrellas(cantidad) {
    let html = "";
    for(let i = 1; i <= 5; i++) {
        html += `<span class="star-icon${i <= cantidad ? " filled" : ""}">★</span>`;
    }
    return html;
}

function calcularPromedio(productId) {
    if(!resenas[productId] || resenas[productId].length === 0) return 0;
    const suma = resenas[productId].reduce((acc, r) => acc + r.calificacion, 0);
    return (suma / resenas[productId].length).toFixed(1);
}

function renderCatalogo() {
    const container = document.getElementById("catalogoProductos");
    if(!container) return;
    container.innerHTML = "";
    productos.forEach(p => {
        const promedio = calcularPromedio(p.id);
        const cantidadResenas = resenas[p.id] ? resenas[p.id].length : 0;
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${p.img}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <div class="price">S/ ${p.precio.toFixed(2)}</div>
            <div class="rating-section">
                <div class="stars-display">${generarEstrellas(Math.round(promedio))}</div>
                <span class="rating-text">${promedio > 0 ? promedio : 'Sin calificar'} (${cantidadResenas} ${cantidadResenas === 1 ? 'reseña' : 'reseñas'})</span>
            </div>
            <button class="btn-agregar" data-id="${p.id}">Agregar al carrito</button>
            <button class="btn-resenas" data-id="${p.id}" data-nombre="${p.nombre}">Ver reseñas</button>
        `;
        container.appendChild(card);
    });
    
    document.querySelectorAll(".btn-agregar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(btn.dataset.id);
            agregarAlCarrito(id);
        });
    });
    
    document.querySelectorAll(".btn-resenas").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(btn.dataset.id);
            const nombre = btn.dataset.nombre;
            abrirModalResenas(id, nombre);
        });
    });
}

function renderDestacados() {
    const destacados = productos.filter(p => p.destacado);
    const gridDest = document.getElementById("destacadosGrid");
    if(gridDest){
        gridDest.innerHTML = "";
        destacados.forEach(p => {
            const promedio = calcularPromedio(p.id);
            const cantidadResenas = resenas[p.id] ? resenas[p.id].length : 0;
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <img src="${p.img}">
                <h3>${p.nombre}</h3>
                <div class="price">S/ ${p.precio.toFixed(2)}</div>
                <div class="rating-section">
                    <div class="stars-display">${generarEstrellas(Math.round(promedio))}</div>
                    <span class="rating-text">${promedio > 0 ? promedio : 'Sin calificar'} (${cantidadResenas})</span>
                </div>
                <button class="btn-agregar-dest" data-id="${p.id}">Comprar</button>
            `;
            gridDest.appendChild(card);
        });
        document.querySelectorAll(".btn-agregar-dest").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = parseInt(btn.dataset.id);
                agregarAlCarrito(id);
                mostrarMensaje("Producto agregado al carrito 🛒", "exito");
            });
        });
    }
}

function agregarAlCarrito(id) {
    const prod = productos.find(p => p.id === id);
    if(prod){
        const existente = carrito.find(item => item.id === id);
        if(existente){
            existente.cantidad++;
        } else {
            carrito.push({ id: prod.id, nombre: prod.nombre, precio: prod.precio, cantidad: 1 });
        }
        actualizarCarritoUI();
    }
}

function actualizarCarritoUI() {
    const cartList = document.getElementById("cartList");
    const cartTotalSpan = document.getElementById("cartTotal");
    if(!cartList) return;
    if(carrito.length === 0){
        cartList.innerHTML = "<li>Carrito vacío</li>";
        cartTotalSpan.innerText = "0.00";
        return;
    }
    let total = 0;
    cartList.innerHTML = "";
    carrito.forEach((item, idx) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        const li = document.createElement("li");
        li.style.marginBottom = "8px";
        li.innerHTML = `${item.nombre} x ${item.cantidad} - S/ ${subtotal.toFixed(2)} 
            <button style="margin-left:10px; background:#aaa; border:none; border-radius:20px; padding:2px 8px;" 
                    class="eliminar-item" data-idx="${idx}">❌</button>`;
        cartList.appendChild(li);
    });
    const totalConDescuento = total * factorDescuento;
    cartTotalSpan.innerText = totalConDescuento.toFixed(2);
    
    document.querySelectorAll(".eliminar-item").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idx = parseInt(btn.dataset.idx);
            carrito.splice(idx, 1);
            actualizarCarritoUI();
        });
    });
}

function aplicarDescuento(codigo) {
    if(codigo === "DESC10") {
        factorDescuento = 0.9;
        descuentoActivo = true;
        mostrarMensaje("✓ Código DESC10 aplicado. ¡10% de descuento!", "exito");
        actualizarCarritoUI();
    } else if(codigo === "") {
        factorDescuento = 1;
        descuentoActivo = false;
        actualizarCarritoUI();
    } else {
        mostrarMensaje("Código no válido", "error");
    }
}

let sugerencias = JSON.parse(localStorage.getItem("textilnova_sugerencias")) || [];
let reclamos = JSON.parse(localStorage.getItem("textilnova_reclamos")) || [];
let usuarios = JSON.parse(localStorage.getItem("textilnova_usuarios")) || [];

const avatares = ['👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓', '👨‍🚀', '👩‍🚀', '👨‍🎨', '👩‍🎨'];

function obtenerAvatarAleatorio() {
    return avatares[Math.floor(Math.random() * avatares.length)];
}

function abrirModalResenas(productId, productName) {
    document.getElementById("productoNombreModal").textContent = productName;
    document.getElementById("resCalificacion").value = 0;
    document.getElementById("resNombre").value = "";
    document.getElementById("resComentario").value = "";
    
    // Limpiar estrellas
    document.querySelectorAll(".stars-input .star").forEach(s => s.classList.remove("active"));
    
    renderResenas(productId);
    document.getElementById("reseniasModal").style.display = "flex";
    document.getElementById("enviarResenaBtn").dataset.productId = productId;
}

function cerrarModalResenas() {
    document.getElementById("reseniasModal").style.display = "none";
}

function renderResenas(productId) {
    const lista = document.getElementById("reseniasLista");
    const productResenas = resenas[productId] || [];
    
    if(productResenas.length === 0) {
        lista.innerHTML = "<p class='sin-resenas'>No hay reseñas aún. ¡Sé el primero en comentar!</p>";
        return;
    }
    
    lista.innerHTML = "";
    productResenas.slice().reverse().forEach(resena => {
        const resenaDiv = document.createElement("div");
        resenaDiv.className = "resena-item";
        resenaDiv.innerHTML = `
            <div class="resena-header">
                <span class="resena-avatar">${resena.avatar}</span>
                <div class="resena-info">
                    <strong>${escapeHtml(resena.nombre)}</strong>
                    <div class="resena-stars">${generarEstrellas(resena.calificacion)}</div>
                </div>
            </div>
            <p class="resena-comentario">${escapeHtml(resena.comentario)}</p>
        `;
        lista.appendChild(resenaDiv);
    });
}

function agregarResena(productId) {
    const nombre = document.getElementById("resNombre").value.trim();
    const calificacion = parseInt(document.getElementById("resCalificacion").value);
    const comentario = document.getElementById("resComentario").value.trim();
    
    if(!nombre) {
        alert("Por favor ingresa tu nombre");
        return;
    }
    if(calificacion === 0) {
        alert("Por favor selecciona una calificación");
        return;
    }
    if(!comentario) {
        alert("Por favor escribe tu comentario");
        return;
    }
    
    if(!resenas[productId]) resenas[productId] = [];
    
    resenas[productId].push({
        nombre,
        calificacion,
        comentario,
        avatar: obtenerAvatarAleatorio(),
        fecha: new Date().toLocaleDateString('es-PE')
    });
    
    localStorage.setItem("textilnova_resenas", JSON.stringify(resenas));
    renderResenas(productId);
    renderCatalogo();
    
    document.getElementById("resNombre").value = "";
    document.getElementById("resCalificacion").value = 0;
    document.getElementById("resComentario").value = "";
    document.querySelectorAll(".stars-input .star").forEach(s => s.classList.remove("active"));
    
    alert("¡Gracias por tu reseña!");
}

function renderSugerenciasTabla() {
    const tbody = document.getElementById("sugerenciasBody");
    if(!tbody) return;
    tbody.innerHTML = "";
    sugerencias.slice().reverse().forEach(sug => {
        const row = `<tr><td>${escapeHtml(sug.nombre)}</td><td>${escapeHtml(sug.email)}</td><td>${escapeHtml(sug.mensaje)}</td></tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

function renderReclamosTabla() {
    const tbody = document.getElementById("reclamosBody");
    if(!tbody) return;
    tbody.innerHTML = "";
    reclamos.slice().reverse().forEach(rec => {
        const row = `<tr><td>${escapeHtml(rec.documento)}</td><td>${escapeHtml(rec.nombre)}</td><td>${escapeHtml(rec.detalle)}</td><td>${escapeHtml(rec.contacto)}</td></tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

function escapeHtml(str) {
    if(!str) return "";
    return str.replace(/[&<>]/g, function(m) {
        if(m === '&') return '&amp;';
        if(m === '<') return '&lt;';
        if(m === '>') return '&gt;';
        return m;
    });
}

function mostrarMensaje(msg, tipo) {
    const cartMessage = document.getElementById("cartMessage");
    if(cartMessage) {
        cartMessage.innerHTML = `<div class="mensaje-${tipo}">${msg}</div>`;
        setTimeout(() => { cartMessage.innerHTML = ""; }, 3000);
    }
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.classList.remove('active-section'));
    const activeSec = document.getElementById(sectionId);
    if(activeSec) activeSec.classList.add('active-section');
    
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const linkSection = link.dataset.section;
        if(linkSection === sectionId) link.classList.add('active');
        else link.classList.remove('active');
    });
    
    localStorage.setItem("currentSection", sectionId);
}

document.addEventListener("DOMContentLoaded", function() {

   // Modal de reseñas
    document.getElementById("cerrarModal")?.addEventListener("click", cerrarModalResenas);
    document.getElementById("reseniasModal")?.addEventListener("click", (e) => {
        if(e.target.id === "reseniasModal") cerrarModalResenas();
    });
    
    // Seleccionar estrellas
    document.querySelectorAll(".stars-input .star").forEach(star => {
        star.addEventListener("click", () => {
            const value = parseInt(star.dataset.value);
            document.getElementById("resCalificacion").value = value;
            document.querySelectorAll(".stars-input .star").forEach((s, idx) => {
                if(idx + 1 <= value) s.classList.add("active");
                else s.classList.remove("active");
            });
        });
        star.addEventListener("mouseover", () => {
            const value = parseInt(star.dataset.value);
            document.querySelectorAll(".stars-input .star").forEach((s, idx) => {
                if(idx + 1 <= value) s.style.color = "#FFD700";
                else s.style.color = "#ccc";
            });
        });
    });
    
    document.getElementById("starsInput")?.addEventListener("mouseout", () => {
        document.querySelectorAll(".stars-input .star").forEach((s, idx) => {
            const currentValue = parseInt(document.getElementById("resCalificacion").value);
            if(idx + 1 <= currentValue) s.style.color = "#FFD700";
            else s.style.color = "#ccc";
        });
    });
    
    document.getElementById("enviarResenaBtn")?.addEventListener("click", function() {
        const productId = parseInt(this.dataset.productId);
        agregarResena(productId);
    });
    
document.getElementById("limpiarDatosBtn")?.addEventListener("click", () => {
    if(confirm("¿Estás seguro? Esto borrará todas las sugerencias, reclamos, usuarios y cerrará la sesión.")) {
        localStorage.clear();
        alert("Datos limpiados. La página se recargará.");
        location.reload();
    }
});
    
    renderCatalogo();
    renderDestacados();
    actualizarCarritoUI();
    renderSugerenciasTabla();
    renderReclamosTabla();
    
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sec = link.dataset.section;
            if(sec) showSection(sec);
        });
    });
    
    document.getElementById("verProductosBtn")?.addEventListener("click", () => {
        showSection("productos");
    });
    document.getElementById("verRegistroBtnHome")?.addEventListener("click", () => {
        showSection("registro");
    });
    
    const menuToggle = document.getElementById("menuToggle");
    const navLinksUl = document.getElementById("navLinks");
    menuToggle?.addEventListener("click", () => {
        navLinksUl.classList.toggle("show");
    });
    
    document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sec = link.dataset.section;
            if(sec) showSection(sec);
        });
    });
    
    document.getElementById("formSugerencia")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("sugNombre").value.trim();
        const email = document.getElementById("sugEmail").value.trim();
        const mensaje = document.getElementById("sugMensaje").value.trim();
        if(nombre && email && mensaje){
            sugerencias.unshift({ nombre, email, mensaje });
            localStorage.setItem("textilnova_sugerencias", JSON.stringify(sugerencias));
            renderSugerenciasTabla();
            document.getElementById("formSugerencia").reset();
            alert("¡Gracias por tu sugerencia!");
        } else alert("Completa todos los campos");
    });
    
    document.getElementById("formReclamacion")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const documento = document.getElementById("recDoc").value.trim();
        const nombre = document.getElementById("recNombre").value.trim();
        const detalle = document.getElementById("recDetalle").value.trim();
        const contacto = document.getElementById("recContacto").value.trim() || "No especificado";
        if(documento && nombre && detalle){
            reclamos.unshift({ documento, nombre, detalle, contacto });
            localStorage.setItem("textilnova_reclamos", JSON.stringify(reclamos));
            renderReclamosTabla();
            document.getElementById("formReclamacion").reset();
            alert("Reclamación registrada");
        } else alert("Complete los campos obligatorios");
    });
    
    document.getElementById("formContactoRapido")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("contNombre").value;
        const email = document.getElementById("contEmail").value;
        const msg = document.getElementById("contMsg").value;
        if(nombre && email && msg){
            const msgDiv = document.getElementById("contactoMsg");
            msgDiv.innerHTML = "<div class='mensaje-exito'>✅ Mensaje enviado, te responderemos pronto.</div>";
            document.getElementById("formContactoRapido").reset();
            setTimeout(() => { msgDiv.innerHTML = ""; }, 3000);
        } else alert("Complete todos los campos");
    });
    
    document.getElementById("aplicarDescuentoBtn")?.addEventListener("click", () => {
        const codigo = document.getElementById("codigoDescuento").value.trim();
        aplicarDescuento(codigo);
    });
    
    document.getElementById("checkoutBtn")?.addEventListener("click", () => {
        if(carrito.length === 0){
            mostrarMensaje("⚠️ Agrega productos antes de finalizar.", "error");
        } else {
            mostrarMensaje("🎉 ¡Compra realizada con éxito! Gracias por confiar en TextilNova", "exito");
            carrito = [];
            factorDescuento = 1;
            descuentoActivo = false;
            document.getElementById("codigoDescuento").value = "";
            actualizarCarritoUI();
        }
    });
    
    document.getElementById("formRegistro")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("regNombre").value.trim();
        const apellidoP = document.getElementById("regApellidoP").value.trim();
        const apellidoM = document.getElementById("regApellidoM").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value;
        const confirmPassword = document.getElementById("regConfirmPassword").value;
        const numDoc = document.getElementById("regNumDoc").value.trim();
        const celular = document.getElementById("regCelular").value.trim();
        const genero = document.querySelector('input[name="genero"]:checked')?.value;
        
        if(password !== confirmPassword) {
            document.getElementById("registroMsg").innerHTML = "<div class='mensaje-error'>Las contraseñas no coinciden</div>";
            return;
        }
        
        if(nombre && apellidoP && email && password && numDoc) {
            const existe = usuarios.find(u => u.email === email);
            if(existe) {
                document.getElementById("registroMsg").innerHTML = "<div class='mensaje-error'>El correo ya está registrado</div>";
                return;
            }
            usuarios.push({ nombre, apellidoP, apellidoM, email, password, numDoc, celular, genero });
            localStorage.setItem("textilnova_usuarios", JSON.stringify(usuarios));
            document.getElementById("registroMsg").innerHTML = "<div class='mensaje-exito'>✅ Registro exitoso. Ahora puedes iniciar sesión.</div>";
            document.getElementById("formRegistro").reset();
            setTimeout(() => showSection("login"), 2000);
        } else {
            document.getElementById("registroMsg").innerHTML = "<div class='mensaje-error'>Complete los campos obligatorios</div>";
        }
    });
    
    document.getElementById("formLogin")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        const recordar = document.getElementById("recordarCheck").checked;
        
        const usuario = usuarios.find(u => u.email === email && u.password === password);
        if(usuario) {
            document.getElementById("loginMsg").innerHTML = "<div class='mensaje-exito'>✅ ¡Bienvenido " + usuario.nombre + "!</div>";
            if(recordar) {
                localStorage.setItem("usuarioActual", JSON.stringify({ email: usuario.email, nombre: usuario.nombre }));
            }
            document.getElementById("formLogin").reset();
            setTimeout(() => showSection("home"), 1500);
        } else {
            document.getElementById("loginMsg").innerHTML = "<div class='mensaje-error'>Usuario o contraseña incorrectos</div>";
        }
    });
    
    document.getElementById("olvidePassword")?.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Por favor contacte con soporte@textilnova.pe para recuperar su contraseña.");
    });
    
    const lastSection = localStorage.getItem("currentSection");
    if(lastSection && document.getElementById(lastSection)) showSection(lastSection);
    else showSection("home");
    
    const usuarioGuardado = localStorage.getItem("usuarioActual");
    if(usuarioGuardado) {
        const user = JSON.parse(usuarioGuardado);
        console.log("Sesión restaurada para:", user.nombre);
    }
});

//modo oscuro
let toggle=document.getElementById("toggle");
let labelDarkMode=document.getElementById("labelDarkMode");
//guardamos el modo oscuro en localStorage para mantener la preferencia del usuario
const darkModeGuardado = localStorage.getItem("darkMode") === "true";

if(darkModeGuardado && toggle && labelDarkMode){
    toggle.checked = true;
    document.body.classList.add("dark-mode");
    labelDarkMode.innerHTML='<i class="fa-solid fa-sun"></i>';
    labelDarkMode.style.color="#c7a55b";

}

toggle.addEventListener("change",(event)=>{
    let checked=event.target.checked;
    document.body.classList.toggle("dark-mode");

    //guardamos el estado en el LocalStorage
    localStorage.setItem("darkMode", checked);

    if(checked==true){
        labelDarkMode.innerHTML='<i class="fa-solid fa-sun"></i>';
        labelDarkMode.style.color="#c7a55b";
    }else{
        labelDarkMode.innerHTML='<i class="fa-solid fa-moon"></i>';
        labelDarkMode.style.color="#053B05";
    }
})