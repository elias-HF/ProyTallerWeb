
// JavaScript exxclusivo para todo lo relacionado con las reseñas.

function iniciarResenas() {
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
}

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