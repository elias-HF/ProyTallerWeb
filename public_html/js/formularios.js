
// JavaScript exclusivo para todo lo relacionado con el carrito de compras.

function iniciarFormularios(){
    renderSugerenciasTabla();
    renderReclamosTabla();
    
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
            console.log("Usuarios guardados:", usuarios);
            localStorage.setItem("textilnova_usuarios", JSON.stringify(usuarios));
            console.log("LocalStorage:", localStorage.getItem("textilnova_usuarios"));
            
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
}

