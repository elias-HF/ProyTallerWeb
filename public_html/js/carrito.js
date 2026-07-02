
// JavaScript exclusivo para todo lo relacionado con el carrito de compras.

function iniciarCarrito() {
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