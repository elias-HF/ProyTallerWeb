
// JavaScript exclusivo para la información.

// Usado por 'reseñas'.
let resenas = JSON.parse(localStorage.getItem("textilnova_resenas")) || {};

// Usado por 'carrito' y 'factorDescuento'.
let carrito = [];
let descuentoActivo = false;
let factorDescuento = 1;

// Usado por 'reclamos' y 'sugerencias'.
let sugerencias = JSON.parse(localStorage.getItem("textilnova_sugerencias")) || [];
let reclamos = JSON.parse(localStorage.getItem("textilnova_reclamos")) || [];

// Usado por 'usuarios'.
let usuarios = JSON.parse(localStorage.getItem("textilnova_usuarios")) || [];

const productos = [
    { id: 1, nombre: "Polo Algodón Mujer", precio: 49.90, img: "recursos/RopaAlgodonMujer.jpg", destacado: true },
    { id: 2, nombre: "Jeans Hombre Skinny", precio: 89.90, img: "recursos/JeansHombreSkinny.jpg", destacado: true },
    { id: 3, nombre: "Zapatillas Urbanas", precio: 129.90, img: "recursos/ZapatillasUrbanas.jpg", destacado: true },
    { id: 4, nombre: "Chompa para Niño", precio: 59.90, img: "recursos/ChompaNino.jpg", destacado: false },
    { id: 5, nombre: "Bolso de Mano", precio: 79.90, img: "recursos/BolsoMano.jpg", destacado: false },
    { id: 6, nombre: "Camisa Formal Hombre", precio: 109.90, img: "recursos/CamisaFormalHombre.jpg", destacado: true },
    { id: 7, nombre: "Vestido Primavera", precio: 99.90, img: "recursos/VestidoPrimavera.jpg", destacado: false },
    
    // Nuevos productos agregados al catálogo.
    { id: 8, nombre: "Polo Deportivo Dry Fit", precio: 59.90, img: "Recursos/PoloDeportiva.jpg", destacado: true },
    { id: 9, nombre: "Casaca Jean Unisex", precio: 149.90, img: "Recursos/CasacaJean.jpg", destacado: true },
    { id: 10, nombre: "Pantalón Jogger", precio: 94.90, img: "Recursos/Jogger.jpg", destacado: false },
    { id: 11, nombre: "Blusa Elegante", precio: 89.90, img: "Recursos/BlusaElegante.jpg", destacado: false },
    { id: 12, nombre: "Casaca Impermeable", precio: 179.90, img: "Recursos/CasacaImpermeable.jpg", destacado: true },
    { id: 13, nombre: "Polo Oversize Unisex", precio: 69.90, img: "Recursos/PoloOversize.jpg", destacado: true },
    { id: 14, nombre: "Camisa Casual Cuadros", precio: 99.90, img: "Recursos/CamisaCuadros.jpg", destacado: false },
    { id: 15, nombre: "Jeans Mom Fit Mujer", precio: 99.90, img: "Recursos/JeansMomFit.jpg", destacado: false },
    { id: 16, nombre: "Chaleco Acolchado", precio: 129.90, img: "Recursos/ChalecoAcolchado.jpg", destacado: false },
    { id: 17, nombre: "Polera con Capucha", precio: 109.90, img: "Recursos/PoleraCapucha.jpg", destacado: true },
    { id: 18, nombre: "Conjunto Deportivo", precio: 159.90, img: "Recursos/ConjuntoDeportivo.jpg", destacado: true },
    { id: 19, nombre: "Pijama de Algodón", precio: 84.90, img: "Recursos/PijamaAlgodon.jpg", destacado: false },
    { id: 20, nombre: "Casaca Cortaviento", precio: 169.90, img: "Recursos/CasacaCortaviento.jpg", destacado: true }
];

const avatares = ['👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓', '👨‍🚀', '👩‍🚀', '👨‍🎨', '👩‍🎨'];