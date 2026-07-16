
document.addEventListener("DOMContentLoaded", async function () {

    // Inicializar módulos
    await cargarComponentes();
    
    iniciarNavegacion();
    iniciarResenas();
    iniciarCarrito();
    iniciarFormularios();

    // Renderizado inicial
    renderCatalogo();
    
    document.getElementById("buscarProducto")?.addEventListener("input", () => {renderCatalogo();});
    
    renderDestacados();
    actualizarCarritoUI();
//    renderSugerenciasTabla();
//    renderReclamosTabla();
    console.log("Antes del render");
    console.log("tbody sugerencias:", document.getElementById("sugerenciasBody"));
    console.log("tbody reclamos:", document.getElementById("reclamosBody"));
    console.log("Datos:", sugerencias, reclamos);

    renderSugerenciasTabla();
    renderReclamosTabla();
    
    console.log("Sugerencias cargadas:", sugerencias);
    console.log("Reclamos cargados:", reclamos);

    // Botón para limpiar datos
    document.getElementById("limpiarDatosBtn")?.addEventListener("click", () => {
        if (confirm("¿Estás seguro? Esto borrará todas las sugerencias, reclamos, usuarios y cerrará la sesión.")) {
            localStorage.clear();
            alert("Datos limpiados. La página se recargará.");
            location.reload();
        }
    });

    // Restaurar sesión
    const usuarioGuardado = localStorage.getItem("usuarioActual");
    if (usuarioGuardado) {
        const user = JSON.parse(usuarioGuardado);
        console.log("Sesión restaurada para:", user.nombre);
    }
});