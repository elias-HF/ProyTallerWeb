
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
            carrito.push({id: prod.id, nombre: prod.nombre, precio: prod.precio, img: prod.img, cantidad: 1});
        }
        actualizarCarritoUI();
    }
}

function actualizarCarritoUI() {
    const cartList = document.getElementById("cartList");
    const cartTotalSpan = document.getElementById("cartTotal");
    const contador = document.getElementById("contadorCarrito");

    if(!cartList) return;
    cartList.innerHTML = "";
    if(carrito.length===0){
        cartList.innerHTML=`
            <div class="carrito-vacio">
                <h3>🛒 Tu carrito está vacío</h3>
                <p>Agrega productos del catálogo.</p>
            </div>
        `;

        cartTotalSpan.innerText="0.00";
        if(contador)contador.innerText="0";
        return;
    }

    let total=0;
    let cantidadTotal=0;

    carrito.forEach((item,idx)=>{
        cantidadTotal+=item.cantidad;
        const subtotal=item.precio*item.cantidad;
        total+=subtotal;
        const card=document.createElement("div");
        card.className="cart-card";
        
        card.innerHTML=`
            <img src="${item.img}" class="cart-img">
            <div class="cart-info">
                <h3>${item.nombre}</h3>
                <p>Precio: <strong>S/ ${item.precio.toFixed(2)}</strong></p>
                <div class="cantidad">
                    <button class="menos" data-idx="${idx}">−</button>
                    <span>${item.cantidad}</span>
                    <button class="mas" data-idx="${idx}">+</button>
                </div>
                <p class="subtotal"> Subtotal: S/ ${subtotal.toFixed(2)} </p>
            </div>

            <button class="eliminar-item" data-idx="${idx}"> 🗑️</button>
        `;

        cartList.appendChild(card);
    });

    cartTotalSpan.innerText=(total*factorDescuento).toFixed(2);
    if(contador){contador.innerText=cantidadTotal;}
    
    agregarEventosCarrito();
}

function agregarEventosCarrito(){
    document.querySelectorAll(".mas").forEach(btn=>{
        btn.onclick=()=>{
            carrito[btn.dataset.idx].cantidad++;
            actualizarCarritoUI();
        };
    });

    document.querySelectorAll(".menos").forEach(btn=>{
        btn.onclick=()=>{
            const item=carrito[btn.dataset.idx];
            item.cantidad--;

            if(item.cantidad<=0){carrito.splice(btn.dataset.idx,1);}
            actualizarCarritoUI();
        };
    });

    document.querySelectorAll(".eliminar-item").forEach(btn=>{
        btn.onclick=()=>{
            carrito.splice(btn.dataset.idx,1);
            actualizarCarritoUI();
        };
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