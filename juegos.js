document.addEventListener('DOMContentLoaded', (event) => {
    var musica = document.getElementById("musicaJuegos");
    musica.play().catch(error => {
        console.log("La reproducción automática fue bloqueada por el navegador.");
    });
});


import { crearGlobos, moverGlobo } from './sumarNati.js';
export { jugarNivelFuncion };
import { operativaCandados } from './candadosSergio.js';

//Adaptar el tamaño del input de resultado
//Regular centrado de pantalla de juego
//Regular espacio entre input y botón de juego


function jugarNivelFuncion(nivel) {
    // Verifica si el nivel anterior está desbloqueado

    if (nivel === 1 || (nivel === 2 && nivel1Completado) || (nivel === 3 && nivel2Completado)) {

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
            document.getElementById('container').style.display = 'block';
            const nivel1 = document.getElementById("nivel1");
            nivel1.style.display = "inline-block";
            const nivel2 = document.getElementById("nivel2");
            nivel2.style.display = "inline-block";
            const nivel3 = document.getElementById("nivel3");
            nivel3.style.display = "inline-block";

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
    document.getElementById('nivel3').querySelector('.play-button').removeAttribute('disabled');
    document.getElementById('nivel2').querySelector('.play-button').removeAttribute('disabled');
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
    divJugarNivel.className = "jugarNivel";

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
            const ayuda1 = document.createElement("div");
            ayuda1.className = "ayuda1";
            ayuda1.style.backgroundImage = "url('/img/profesor.png')";
            ayuda1.style.width = "250px";
            ayuda1.style.height = "250px";
            

            //Se crea el selector para las operaciones 
            const operacion = document.createElement("select");
            operacion.className = "operacion";
            operacion.id = "operacion";

            const option1 = document.createElement("option");
            option1.value = "+";
            option1.text = "Suma";
            option1.id = "option1";

            const option2 = document.createElement("option");
            option2.value = "-";
            option2.text = "Resta";
            option2.id = "option2";

            operacion.appendChild(option1);
            operacion.appendChild(option2);

            divJugarNivel.appendChild(operacion);
            divJugarNivel.appendChild(ayuda1);
            divJugarNivel.appendChild(resultadoInput1);
            divJugarNivel.appendChild(botonResultado);
            const mensajeEmergente1 = document.createElement('div');
            mensajeEmergente1.id = 'mensajeEmergente1';
            mensajeEmergente1.style.padding = '5px';
            mensajeEmergente1.textContent = 'Selecciona un resultado y pulsa jugar para realizar la suma o resta según corresponda. Pincha un globo y luego su pareja, si aciertas explotarán, ¡Mucha Suerte!';
            mensajeEmergente1.style.position = 'absolute';
            mensajeEmergente1.style.marginTop = '50px';
            mensajeEmergente1.style.display = 'none';
            mensajeEmergente1.style.zIndex = '1000';
            mensajeEmergente1.style.backgroundColor = 'black';
            mensajeEmergente1.style.color = 'white';
            mensajeEmergente1.style.borderRadius = '50px';
            document.body.appendChild(mensajeEmergente1);
            ayuda1.addEventListener('click', function () {
                mensajeEmergente1.style.left = '55%';
                mensajeEmergente1.style.top = '30%';
                mensajeEmergente1.style.transform = 'translate(-50%, -50%)';
                mensajeEmergente1.style.display = 'block';
            });
    
            // Opcional: escuchar clics fuera del mensaje para cerrarlo
            document.addEventListener('click', function (event) {
                if (event.target !== ayuda1 && event.target !== mensajeEmergente1) {
                    mensajeEmergente1.style.display = 'none';
                }
            })
            
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
                    const valorOperacion = operacion.value;
                    // Iniciamos el juego pasando por parámetro el valor que queremos 
                    // como resultado y el input donde se realiza la operativa del juego
                    crearGlobos(resultadoInput1, divJugarNivel, valorOperacion);
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
            resultadoInput3.id = `resultadoInput3`;
            resultadoInput3.placeholder = "Tabla del 1, 2, 3...";
            const ayuda = document.createElement("div");
            ayuda.className = "ayuda3";
            ayuda.style.backgroundImage = "url('/img/profesora.png')";
            ayuda.style.width = "250px";
            ayuda.style.height = "250px";
            divJugarNivel.appendChild(resultadoInput3);
            divJugarNivel.appendChild(ayuda); // Añade la capa ayuda3 al divJugarNivel
            divJugarNivel.appendChild(botonResultado);
            const mensajeEmergente = document.createElement('div');
            mensajeEmergente.id = 'mensajeEmergente';
            mensajeEmergente.textContent = 'Hola, este juego te ayudará a practicar las tablas de multiplicar. Arrastra las llaves al candado con la solución correspondiente para abrirlos todos, si el candado se pone triste podrás seguir intentándolo. ¡Mucha suerte y que te diviertas!';
            mensajeEmergente.style.position = 'absolute';
            mensajeEmergente.style.marginTop = '50px';
            mensajeEmergente.style.display = 'none';
            mensajeEmergente.style.zIndex = '1000';
            mensajeEmergente.style.backgroundColor = 'black'; // Asegúrate de que esté por encima de otros elementos
            mensajeEmergente.style.color = 'white';
            mensajeEmergente.style.borderRadius = '50px';
            // Agregar más estilos para centrarlo en pantalla, darle color, etc.

            // Agregar el mensaje emergente al cuerpo del documento o al contenedor relevante
            document.body.appendChild(mensajeEmergente);

            // Agregar el evento al hacer clic en ayuda3
            ayuda.addEventListener('click', function () {
                // Posicionar el mensaje emergente y mostrarlo
                mensajeEmergente.style.left = '55%';
                mensajeEmergente.style.top = '28%';
                mensajeEmergente.style.transform = 'translate(-50%, -50%)';
                mensajeEmergente.style.display = 'block';
            });

            // Opcional: escuchar clics fuera del mensaje para cerrarlo
            document.addEventListener('click', function (event) {
                if (event.target !== ayuda && event.target !== mensajeEmergente) {
                    mensajeEmergente.style.display = 'none';

                }
            });
            botonResultado.addEventListener("click", function () {
                divJugarNivel.innerHTML = ""; // Esto elimina todo el contenido, incluida la capa ayuda3
                operativaCandados(resultadoInput3, divJugarNivel);
            });


            break;

        default:
            // Lógica para otros niveles si es necesario
            break;
    }

    // Añadimos el div de juego al div contenedor.
    document.querySelector(".container").appendChild(divJugarNivel);
}

