/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

const productos = [
    { id: 1, nombre: "Polo Algodón Mujer", precio: 49.90, img: "https://picsum.photos/id/20/300/200", destacado: true },
    { id: 2, nombre: "Jeans Hombre Skinny", precio: 89.90, img: "https://picsum.photos/id/26/300/200", destacado: true },
    { id: 3, nombre: "Zapatillas Urbanas", precio: 129.90, img: "https://picsum.photos/id/96/300/200", destacado: true },
    { id: 4, nombre: "Chompa para Niño", precio: 59.90, img: "https://picsum.photos/id/30/300/200", destacado: false },
    { id: 5, nombre: "Bolso de Mano", precio: 79.90, img: "https://picsum.photos/id/82/300/200", destacado: false },
    { id: 6, nombre: "Camisa Formal Hombre", precio: 109.90, img: "https://picsum.photos/id/133/300/200", destacado: true },
    { id: 7, nombre: "Vestido Primavera", precio: 99.90, img: "https://picsum.photos/id/45/300/200", destacado: false }
];

let carrito = [];
let descuentoActivo = false;
let factorDescuento = 1;

function renderCatalogo() {
    const container = document.getElementById("catalogoProductos");
    if(!container) return;
    container.innerHTML = "";
    productos.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${p.img}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <div class="price">S/ ${p.precio.toFixed(2)}</div>
            <button class="btn-agregar" data-id="${p.id}">Agregar al carrito</button>
        `;
        container.appendChild(card);
    });
    
    document.querySelectorAll(".btn-agregar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(btn.dataset.id);
            agregarAlCarrito(id);
        });
    });
}

function renderDestacados() {
    const destacados = productos.filter(p => p.destacado);
    const gridDest = document.getElementById("destacadosGrid");
    if(gridDest){
        gridDest.innerHTML = "";
        destacados.forEach(p => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <img src="${p.img}">
                <h3>${p.nombre}</h3>
                <div class="price">S/ ${p.precio.toFixed(2)}</div>
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