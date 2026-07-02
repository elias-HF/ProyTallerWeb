
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
    { id: 1, nombre: "Polo Algodón Mujer", precio: 49.90, img: "Recursos/RopaAlgodonMujer.jpg", destacado: true },
    { id: 2, nombre: "Jeans Hombre Skinny", precio: 89.90, img: "Recursos/JeansHombreSkinny.jpg", destacado: true },
    { id: 3, nombre: "Zapatillas Urbanas", precio: 129.90, img: "Recursos/ZapatillasUrbanas.jpg", destacado: true },
    { id: 4, nombre: "Chompa para Niño", precio: 59.90, img: "Recursos/ChompaNino.jpg", destacado: false },
    { id: 5, nombre: "Bolso de Mano", precio: 79.90, img: "Recursos/BolsoMano.jpg", destacado: false },
    { id: 6, nombre: "Camisa Formal Hombre", precio: 109.90, img: "Recursos/CamisaFormalHombre.jpg", destacado: true },
    { id: 7, nombre: "Vestido Primavera", precio: 99.90, img: "Recursos/VestidoPrimavera.jpg", destacado: false }
];

const avatares = ['👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓', '👨‍🚀', '👩‍🚀', '👨‍🎨', '👩‍🎨'];