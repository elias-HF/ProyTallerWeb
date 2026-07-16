
// Carga automáticamente el encabezado y el pie de página.
async function cargarComponentes() {
    try {
        const header = document.getElementById("header");

        if (header) {
            const respuesta = await fetch("componentes/header.html");
            if (!respuesta.ok) {throw new Error("No se pudo cargar header");}
            header.innerHTML = await respuesta.text();
        }

        const footer = document.getElementById("footer");
        if (footer) {
            const respuesta = await fetch("componentes/footer.html");
            if (!respuesta.ok) { throw new Error("No se pudo cargar footer");}
            footer.innerHTML = await respuesta.text();
        }
        console.log("Componentes cargados correctamente");
    } 
    catch(error) {console.error("Error cargando componentes:", error);}
}