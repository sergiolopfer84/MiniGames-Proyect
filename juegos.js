import { crearGlobos, moverGlobo } from './sumarNati.js';
export { jugarNivelFuncion };
import { operativaCandados } from './candadosSergio.js';
import { startGame } from './juegoYeTati.js';

document.addEventListener('DOMContentLoaded', (event) => {
    var musica = document.getElementById("musicaJuegos");
    musica.play().catch(error => {
        console.log("La reproducción automática fue bloqueada por el navegador.");
    });
});



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
            for (let i = 1; i <= 3; i++) {
                const nivel = document.getElementById(`nivel${i}`);
                nivel.style.display = "inline-block";
            }
            

        } else if (nivel === 2) {
            console.log(`jugarNivelFuncion llamada para Nivel ${nivel}`);
            document.getElementById('nivel3').querySelector('.play-button').removeAttribute('disabled');
            nivel2Completado = true;
            document.getElementById('container').style.display = 'block';
            for (let i = 1; i <= 3; i++) {
                const nivel = document.getElementById(`nivel${i}`);
                nivel.style.display = "inline-block";
            }
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
    for (let i = 1; i <= 3; i++) {
        const nivel = document.getElementById(`nivel${i}`);
        nivel.style.display = "none";
    }
    // Creamos un nuevo div para almacenar y un botón para manejarlo
    const divJugarNivel = document.createElement('div');
    divJugarNivel.id = `jugarNivel${number}`;
    divJugarNivel.className = "jugarNivel";

    const botonResultado = document.createElement('button');    
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
            // Creamos el contenedor de ayuda
            const ayuda1 = document.createElement("div");
            ayuda1.className = "ayuda1";
            ayuda1.style.backgroundImage = "url('/img/profesor.png')";
            ayuda1.style.width = "250px";
            ayuda1.style.height = "250px";
            const ayuda1Titulo = document.createElement("div");
            ayuda1Titulo.className = "ayuda1Titulo";
            ayuda1Titulo.style.height = "50px";
            ayuda1Titulo.innerText = "Sumas y restas."
            //Se crea el selector para las operaciones 
            const divOperacion= document.createElement("div");
            divOperacion.className= "divOperacion";
            divOperacion.id = "divOperacion";
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
            divOperacion.appendChild(resultadoInput1);
            divOperacion.appendChild(operacion);
            divJugarNivel.appendChild(divOperacion);
            divJugarNivel.appendChild(ayuda1Titulo);
            divJugarNivel.appendChild(ayuda1);
            botonResultado.id = "botonResultado1";
            divJugarNivel.appendChild(botonResultado);
            const mensajeEmergente1 = document.createElement('div');
            mensajeEmergente1.id = 'mensajeEmergente1';
            mensajeEmergente1.style.padding = '15px';
            mensajeEmergente1.textContent = 'Selecciona un resultado y pulsa jugar para realizar la suma o resta según corresponda. Pincha un globo y luego su pareja, si aciertas explotarán, ¡Mucha Suerte!';
          
            document.body.appendChild(mensajeEmergente1);
            ayuda1.addEventListener('click', function () {
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
                const minValue = 1;
                if (parseInt(resultadoInput1.value) > maxValue) {
                    resultadoInput1.value = maxValue; // Si es mayor a 999, ajustamos el valor
                }
                if (parseInt(resultadoInput1.value) < minValue) {
                    resultadoInput1.value = minValue;
                }
            });


            // Operativa al pulsar el botón
            botonResultado.addEventListener("click", function () {
                // Convertimos el valor del input a un número
                const valorInput = parseInt(resultadoInput1.value);

                // Verificamos si el valor del input es un número válido
                if (isNaN(valorInput)) {
                    // Mostrar un mensaje de error si el valor no es un número
                    alert("El valor introducido no es un número válido.");
                } else {
                    // Continuar con la lógica del juego si el valor es un número válido

                    // Limpiar el divJugarNivel y establecer el fondo
                    divJugarNivel.innerHTML = "";
                    divJugarNivel.style.backgroundImage = "url('/img/cielo_fondo.png')";

                    // Obtener el valor de la operación seleccionada
                    const valorOperacion = operacion.value;

                    // Iniciar el juego
                    crearGlobos(resultadoInput1, divJugarNivel, valorOperacion);
                }
            });

            break;

        case 2:

            // Input para introducir los datos y botón para iniciar el jueg
            const resultadoInput2 = document.createElement("input");
           
            resultadoInput2.type = "number";
            resultadoInput2.min = 10;
            resultadoInput2.max = 100;
            resultadoInput2.placeholder = "10-100";
            resultadoInput2.id = "resultadoInput2";
            // Comprobamos si el valor introducido es un número válido
            const ayuda2 = document.createElement("div");
            ayuda2.className = "ayuda2";
            const ayuda2Titulo = document.createElement("div");
            ayuda2Titulo.className = "ayuda2Titulo";
            ayuda2Titulo.style.height = "50px";
            ayuda2Titulo.innerText = "Ordena de mayor a menor."
            ayuda2.style.backgroundImage = "url('/img/profesora.png')";
            ayuda2.style.width = "250px";
            ayuda2.style.height = "250px";
            divJugarNivel.appendChild(ayuda2);
            divJugarNivel.appendChild(ayuda2Titulo);
            const mensajeEmergente2 = document.createElement('div');
            mensajeEmergente2.id = 'mensajeEmergente2';
            mensajeEmergente2.textContent = 'Hola, este juego te ayudará a distinguir que números son mayores y menores. Selecciona de mayor a menor los pececitos hasta ordenarlos todos, ¡mucha suerte!';
        
            // Agregar el mensaje emergente al cuerpo del documento o al contenedor relevante
            document.body.appendChild(mensajeEmergente2);
            ayuda2.addEventListener('click', function () {
                // Posicionar el mensaje emergente y mostrarlo
                mensajeEmergente2.style.transform = 'translate(-50%, -50%)';
                mensajeEmergente2.style.display = 'block';
            });

            // Opcional: escuchar clics fuera del mensaje para cerrarlo
            document.addEventListener('click', function (event) {
                if (event.target !== ayuda2 && event.target !== mensajeEmergente2) {
                    mensajeEmergente2.style.display = 'none';

                }
            });
            const botonResultado2 = document.createElement('button');
            botonResultado2.id = "botonResultado2";
            botonResultado2.textContent = "Jugar";
            divJugarNivel.appendChild(resultadoInput2);
            divJugarNivel.appendChild(botonResultado2);
            resultadoInput2.style.margin = "auto";


            resultadoInput2.addEventListener("input", function () {
                const maxValue = 100;
                const minValue = 10;
                if (parseInt(resultadoInput2.value) > maxValue) {
                    resultadoInput2.value = maxValue; // Si es mayor a 100, ajustamos el valor
                }
                if (parseInt(resultadoInput2.value) < minValue) {
                    resultadoInput2.value = minValue;
                }
            });

            botonResultado2.addEventListener("click", function () {
                // Verificamos si el valor ingresado es un número válido
                const valorInput2 = parseInt(resultadoInput2.value);
                if (isNaN(valorInput2)) {
                    alert("Por favor, ingresa un número válido en el campo.");
                } else {
                    // Eliminamos el input y el botón de la pantalla
                    divJugarNivel.innerHTML = "";
                    divJugarNivel.style.backgroundImage = "url('/img/fondo2.jpg')";
                    const container = document.querySelector(".container");
                              
                    // Iniciamos el juego pasando por parámetro el valor que queremos 
                    // como resultado y el input donde se realiza la operativa del juego
                    startGame(resultadoInput2, divJugarNivel);
                }
            });

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
            const ayuda3Titulo = document.createElement("div");
            ayuda3Titulo.className = "ayuda3Titulo";
            ayuda3Titulo.style.height = "50px";
            ayuda3Titulo.innerText = "Aprendemos a multiplicar."
            divJugarNivel.appendChild(resultadoInput3);
            divJugarNivel.appendChild(ayuda); // Añade la capa ayuda3 al divJugarNivel
            divJugarNivel.appendChild(ayuda3Titulo);
            botonResultado.id = "botonResultado3";
            divJugarNivel.appendChild(botonResultado);
            const mensajeEmergente = document.createElement('div');
            mensajeEmergente.id = 'mensajeEmergente3';
            mensajeEmergente.textContent = 'Hola, este juego te ayudará a practicar las tablas de multiplicar. Arrastra las llaves al candado con la solución correspondiente para abrirlos todos, si el candado se pone triste podrás seguir intentándolo. ¡Mucha suerte y que te diviertas!';
          
            // Agregar el mensaje emergente al cuerpo del documento o al contenedor relevante
            document.body.appendChild(mensajeEmergente);

            // Agregar el evento al hacer clic en ayuda3
            ayuda.addEventListener('click', function () {
                // Posicionar el mensaje emergente y mostrarlo
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
