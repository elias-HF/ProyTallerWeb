
document.addEventListener("DOMContentLoaded", function () {

    // Inicializar módulos
    iniciarNavegacion();
    iniciarResenas();
    iniciarCarrito();
    iniciarFormularios();

    // Renderizado inicial
    renderCatalogo();
    renderDestacados();
    actualizarCarritoUI();
    renderSugerenciasTabla();
    renderReclamosTabla();

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