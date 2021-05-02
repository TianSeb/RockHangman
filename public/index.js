let palabras = [["mother"], ["mama im coming home"], ["stairway to heaven"], ["eyes without a face"]];
let canvas, ctx;

//Variables tamaño texto Canvas.
let width = 50;
let height = 180;

//Variables de Armado Palabra.
let palabraInicio = armarPalabra();
let palabra = palabraInicio.palabra;
let guiones = palabraInicio.guiones
let refresh = guiones.split(" ");
let letrasPalabra = palabra.join(" ").split(" ").join("").length;

// Variables que miden el puntaje.
let errorCount = 0;
let letraCount = 0;
let puntaje = 0;

// Hago un random para escribir la palabra en el Canvas.
function armarPalabra() {
    let armadoPalabra = palabras[Math.floor(Math.random() * palabras.length)].toString().split("");
    let arrayGuiones = [];

    for (let i = 0; i < armadoPalabra.length; i++) {
        if (armadoPalabra[i].match(/\w/)) {
            arrayGuiones.push("_ ");
        }
        else {
            arrayGuiones.push(" ");
        }
    }
    for (let i = 0; i < palabras.length; i++) {
        if (palabras[i].indexOf(armadoPalabra.join("")) > -1) {
            palabras.splice(i, 1);
        }
    }
    return {
        guiones: arrayGuiones.join(""),
        palabra: armadoPalabra
    }
};

//Wait for the HTML to Load

document.addEventListener("DOMContentLoaded", init);
document.addEventListener("keydown", checkPalabra);

// Inicio el canvas con los guiones de la palabra
function init() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    ctx.font = "50px Arial";
    ctx.fillText(guiones, width, height);
    scoreWrite();
}

// Actualizo el puntaje y el texto.
function scoreWrite() {
    ctx.clearRect(0, 0, 900, 220);
    ctx.fillText(refresh.join(" "), width, height);
    ctx.font = "40px Arial";
    ctx.fillText("Puntos " + puntaje, 30, 80);
    ctx.fillText("Errores " + errorCount, 680, 80);
    ctx.font = "50px Arial";
}

//Detecta si la letra pertenece o no a la palabra.
function checkPalabra() {
    let letra = event.key;
    let indices = [];
    let abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    if (abc.includes(letra)) {
        if (palabra.includes(letra) && !refresh.includes(letra)) {
            for (let i = 0; i < palabra.length; i++) {
                if (palabra[i] === letra) {
                    indices.push(i);
                }
            }
            indices.forEach(x => refresh[x] = palabra[x]);
        }
        else {
            errorCount++;
            dibujo(errorCount);
        }
    }
    for (let i = 0; i < indices.length; i++) {
        letraCount++;
    }
    scoreCheck();
}

function scoreCheck() {
    if (errorCount > 5) {
        gameOver();
    }
    else if (letraCount === letrasPalabra) {
        scoreWrite();
        document.removeEventListener("keydown", checkPalabra);
        setTimeout(() => {
            nuevaPalabra();
        }, 1000);
    }
    else {
        scoreWrite();
    }
}

function nuevaPalabra() {
    if (palabras.length < 1) {
        ctx.clearRect(0, 0, 900, 500);
        ctx.font = "100px Arial";
        ctx.fillStyle = "#16CE6E";
        ctx.fillText("YOU WON", 190, 180);
        setTimeout(() => {
            window.location.reload(false);
        }, 3000);
    }
    else {
        puntaje++;
        letraCount = 0;
        palabraInicio = armarPalabra();
        palabra = palabraInicio.palabra;
        guiones = palabraInicio.guiones;
        refresh = guiones.split(" ");
        letrasPalabra = palabra.join(" ").split(" ").join("").length;
        palabra.join(" ").split(" ").join("").length;
        document.addEventListener("keydown", checkPalabra);
        scoreWrite();
    }
}

function gameOver() {
    ctx.clearRect(0, 0, 900, 500);
    ctx.font = "100px Arial";
    ctx.fillStyle = "#FF0000";
    ctx.fillText("GAME OVER", 140, 150);
    setTimeout(() => {
        window.location.reload(false);
    }, 3000);
}

function dibujo(errorCount) {
    base_image = new Image();
    switch (errorCount) {
        case 1: base_image.src = 'img/hang1.png';
            break;
        case 2: base_image.src = 'img/hang2.png';
            break;
        case 3: base_image.src = 'img/hang3.png';
            break;
        case 4: base_image.src = 'img/hang4.png';
            break;
        case 5: base_image.src = 'img/hang5.png';
            break;
        case 6: base_image.src = 'img/hang6.png';
            break;
    }
    base_image.onload = function () {
        ctx.clearRect(0, 0, 480, 50);
        ctx.drawImage(base_image, 280, 220);
    }
}