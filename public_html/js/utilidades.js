
// JavaScript exclusivo para las funciones reutilizables usadas en el proyecto.

function renderSugerenciasTabla() {
    const tbody = document.getElementById("sugerenciasBody");
    if (!tbody)
        return;
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

function obtenerAvatarAleatorio() {
    return avatares[Math.floor(Math.random() * avatares.length)];
}

function mostrarMensaje(msg, tipo) {
    const cartMessage = document.getElementById("cartMessage");
    if(cartMessage) {
        cartMessage.innerHTML = `<div class="mensaje-${tipo}">${msg}</div>`;
        setTimeout(() => { cartMessage.innerHTML = ""; }, 3000);
    }
}