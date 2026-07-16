
// JavaScript exclusivo para las funciones del catálogo del proyecto.

function renderCatalogo() {
    const container = document.getElementById("catalogoProductos");
    if (!container) return;

    container.innerHTML = "";

    // Texto del buscador
    const textoBusqueda = document.getElementById("buscarProducto")?.value.toLowerCase() || "";

    // Filtrar productos
    const productosFiltrados = productos.filter(p =>p.nombre.toLowerCase().includes(textoBusqueda));

    // Mostrar solo los filtrados
    productosFiltrados.forEach(p => {
        const promedio = calcularPromedio(p.id);
        const cantidadResenas = resenas[p.id] ? resenas[p.id].length : 0;

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${p.img}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>

            <div class="price">
                S/ ${p.precio.toFixed(2)}
            </div>

            <div class="rating-section">
                <div class="stars-display">
                    ${generarEstrellas(Math.round(promedio))}
                </div>

                <span class="rating-text">
                    ${promedio > 0 ? promedio : "Sin calificar"}
                    (${cantidadResenas} ${cantidadResenas === 1 ? "reseña" : "reseñas"})
                </span>
            </div>

            <button class="btn-agregar" data-id="${p.id}">
                Agregar al carrito
            </button>

            <button class="btn-resenas"
                    data-id="${p.id}"
                    data-nombre="${p.nombre}">
                Ver reseñas
            </button>
        `;
        container.appendChild(card);
    });

    document.querySelectorAll(".btn-agregar").forEach(btn => {
        btn.onclick = () => {agregarAlCarrito(parseInt(btn.dataset.id));};
    });

    document.querySelectorAll(".btn-resenas").forEach(btn => {
        btn.onclick = () => {
            abrirModalResenas(
                parseInt(btn.dataset.id),
                btn.dataset.nombre
            );
        };
    });
}

function renderDestacados() {
    const container = document.getElementById("destacadosGrid");
    if (!container) return;

    container.innerHTML = "";

    // Mostrar los primeros 4 productos
    productos.slice(0, 4).forEach(p => {
        const promedio = calcularPromedio(p.id);
        const cantidadResenas = resenas[p.id] ? resenas[p.id].length : 0;

        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${p.img}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>

            <div class="price">
                S/ ${p.precio.toFixed(2)}
            </div>

            <div class="rating-section">
                <div class="stars-display">
                    ${generarEstrellas(Math.round(promedio))}
                </div>

                <span class="rating-text">
                    ${promedio > 0 ? promedio : "Sin calificar"}
                    (${cantidadResenas} ${cantidadResenas === 1 ? "reseña" : "reseñas"})
                </span>
            </div>

            <button class="btn-agregar" data-id="${p.id}">
                Agregar al carrito
            </button>
        `;
        container.appendChild(card);
    });

    container.querySelectorAll(".btn-agregar").forEach(btn => {btn.onclick = () => agregarAlCarrito(parseInt(btn.dataset.id));});
}