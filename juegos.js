import { crearGlobos, moverGlobo } from './sumarNati.js';
export { jugarNivelFuncion };
function jugarNivelFuncion(nivel) {
    // Verifica si el nivel anterior está desbloqueado
    if (nivel === 1 || (nivel === 2 && nivel1Completado) || (nivel === 3 && nivel2Completado)) {
        alert(`¡Has completado el Nivel ${nivel}!`);
        // Desbloquea el siguiente nivel
        if (nivel === 1) {
            console.log(`jugarNivelFuncion llamada para Nivel ${nivel}`);
            document.getElementById('nivel2').querySelector('.play-button').removeAttribute('disabled');
            nivel1Completado = true;

            document.getElementById(`jugarNivel${nivel}`).style.display = 'none';

            // Muestra la pantalla inicial
            document.getElementById('container').style.display = 'block';
            const nivel1 = document.getElementById("nivel1");
            nivel1.style.display = "inline-block";
            const nivel2 = document.getElementById("nivel2");
            nivel2.style.display = "inline-block";
            const nivel3 = document.getElementById("nivel3");
            nivel3.style.display = "inline-block";

        } else if (nivel === 2) {
            console.log(`jugarNivelFuncion llamada para Nivel ${nivel}`);
            document.getElementById('nivel3').querySelector('.play-button').removeAttribute('disabled');
            nivel2Completado = true;
        }
    } else {
        console.log(`jugarNivelFuncion llamada para Nivel ${nivel}`);
        alert(`Debes completar el Nivel ${nivel - 1} antes de desbloquear el Nivel ${nivel}.`);
    }
}


let nivel1Completado = false;
let nivel2Completado = false;

let nivel1Activo = false;


document.addEventListener('DOMContentLoaded', function () {
    // Iniciamos con los niveles sin completar y la puntuación a cero.


    // Llamamos a los botones
    const playButton1 = document.getElementById("play-button1");
    const playButton2 = document.getElementById("play-button2");
    const playButton3 = document.getElementById("play-button3");

    // Al pulsar cada botón se crea una nueva pantalla
    playButton1.addEventListener("click", function () {
        crearNuevaPantalla(1);
    });

    playButton2.addEventListener("click", function () {
        crearNuevaPantalla(2);
    });

    playButton3.addEventListener("click", function () {
        crearNuevaPantalla(3);
    });
});

// Para crear una nueva pantalla.
function crearNuevaPantalla(number) {
    // Desactivamos la vista de cada nivel hasta que pasemos el anterior.
    const nivel1 = document.getElementById("nivel1");
    nivel1.style.display = "none";
    const nivel2 = document.getElementById("nivel2");
    nivel2.style.display = "none";
    const nivel3 = document.getElementById("nivel3");
    nivel3.style.display = "none";

    // Creamos un nuevo div para almacenar y un botón para manejarlo
    const divJugarNivel = document.createElement('div');
    divJugarNivel.id = `jugarNivel${number}`;

    const botonResultado = document.createElement('button');
    botonResultado.id = "botonResultado";
    botonResultado.textContent = "Jugar";

    // Según el número pasado por parámetro creamos la operativa
    switch (number) {
        case 1:
            // Input para introducir los datos y botón para iniciar el juego
            const resultadoInput1 = document.createElement("input");
            resultadoInput1.type = "number";
            resultadoInput1.min = 1;
            resultadoInput1.max = 999;
            resultadoInput1.placeholder = "1-999";
            resultadoInput1.id = "resultadoInput";
            // Comprobamos si el valor introducido es un número válido
            divJugarNivel.appendChild(resultadoInput1);
            divJugarNivel.appendChild(botonResultado);
            resultadoInput1.addEventListener("input", function () {
                const maxValue = 999;
                if (parseInt(resultadoInput1.value) > maxValue) {
                    resultadoInput1.value = maxValue; // Si es mayor a 999, ajustamos el valor
                }
            });

            if (isNaN(resultadoInput1.value)) {
                alert("El valor introducido no es un número válido.");
            } else {
                // Operativa al pulsar el botón
                botonResultado.addEventListener("click", function () {
                    // Eliminamos el input y el botón de la pantalla
                    divJugarNivel.innerHTML = "";
                    // Iniciamos el juego pasando por parámetro el valor que queremos 
                    // como resultado y el input donde se realiza la operativa del juego
                    crearGlobos(resultadoInput1, divJugarNivel);
                });
            }
            break;

        case 2:
            // Lógica para el nivel 2
            divJugarNivel.appendChild(botonResultado);
            break;

        case 3:
            // Lógica para el nivel 3
            const resultadoInput3 = document.createElement("input");
            resultadoInput3.id = "resultadoInput";
            resultadoInput3.placeholder = "Tabla del 1, 2, 3... o todas";
            divJugarNivel.appendChild(resultadoInput3);
            divJugarNivel.appendChild(botonResultado);
            break;

        default:
            // Lógica para otros niveles si es necesario
            break;
    }

    // Añadimos el div de juego al div contenedor.
    document.querySelector(".container").appendChild(divJugarNivel);
}


