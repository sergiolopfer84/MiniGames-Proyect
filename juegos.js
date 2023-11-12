function jugarNivelFuncion(nivel) {
    // Verifica si el nivel anterior está desbloqueado
    if (nivel === 1 || (nivel === 2 && nivel1Completado) || (nivel === 3 && nivel2Completado)) {
        alert(`¡Has completado el Nivel ${nivel}!`);
        // Desbloquea el siguiente nivel
        if (nivel === 1) {
            console.log(`jugarNivelFuncion llamada para Nivel ${nivel}`);
            document.getElementById('nivel2').querySelector('.play-button').removeAttribute('disabled');
            nivel1Completado = true;

            document.getElementById('jugarNivel').style.display = 'none';

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
let score = 0;

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
    const jugarNivel = document.createElement('div');
    jugarNivel.id = "jugarNivel";
    
    const botonResultado = document.createElement('button');
    botonResultado.id = "botonResultado";
    botonResultado.textContent = "Jugar";

    // Según el número pasado por parámetro creamos la operativa
    switch (number) {
        case 1:
            // Input para introducir los datos y botón para iniciar el juego
            const resultadoInput1 = document.createElement("input");
            resultadoInput1.placeholder = "Introduce el resultado del nivel 1";
            resultadoInput1.id = "resultadoInput";
            
            jugarNivel.appendChild(resultadoInput1);
            jugarNivel.appendChild(botonResultado);

            // Operativa al pulsar el botón
            botonResultado.addEventListener("click", function () {
                // Eliminamos el input y el botón de la pantalla
                jugarNivel.innerHTML = "";
                // Iniciamos el juego pasando por parámetro el valor que queremos 
                // como resultado y el input donde se realiza la operativa del juego
                crearGlobos(resultadoInput1, jugarNivel);
            });
            break;

        case 2:
            // Lógica para el nivel 2
            jugarNivel.appendChild(botonResultado);
            break;

        case 3:
            // Lógica para el nivel 3
            const resultadoInput3 = document.createElement("input");
            resultadoInput3.id = "resultadoInput";
            resultadoInput3.placeholder = "Tabla del 1, 2, 3... o todas";
            jugarNivel.appendChild(resultadoInput3);
            jugarNivel.appendChild(botonResultado);
            break;

        default:
            // Lógica para otros niveles si es necesario
            break;
    }

    // Añadimos el div de juego al div contenedor.
    document.querySelector(".container").appendChild(jugarNivel);
}

let globosSeleccionados = [];

// Función para crear las globos
function crearGlobos(resultadoInput, container) {

    const scoreDiv = document.createElement("div");
            scoreDiv.id = "scoreDiv";
            scoreDiv.innerText= `Puntuación: ${score}`;
            jugarNivel.appendChild(scoreDiv);
    const numeroFinal = parseInt(resultadoInput.value); // Guardamos el valor de la suma
    let arrayGlobos = [];

    // Iteramos para crear los globos y sus complementos
    for (let i = 0; i < 5; i++) {
        const globo = document.createElement('div');
        const globoComplement = document.createElement('div');
        globo.className = 'globo';
        globoComplement.className = 'globo';
        globo.id = `globo-${i + 1}`; // Asignar un ID único a cada globo
        globoComplement.id = `globoComplem-${i + 1}`;

        // Generamos un número aleatorio entre 0 y el resultado deseado en 5 de los globos
        const numeroAleatorio = Math.floor(Math.random() * (numeroFinal - 1));
        // Le ponemos ese valor texto a los cinco globos
        globo.textContent = numeroAleatorio;
        // El valor complementario en los otros cinco
        globoComplement.textContent = numeroFinal - numeroAleatorio;

        // Introducimos dos variables para dar fondo aleatorio a los globos
        const randomGloboNumber1 = Math.floor(Math.random() * 6) + 1;
        const randomGloboNumber2 = Math.floor(Math.random() * 6) + 1;
        globo.style.backgroundImage = `url('img/globo${randomGloboNumber1}.png')`;
        globoComplement.style.backgroundImage = `url('img/globo${randomGloboNumber2}.png')`;

        // Agregamos los globos al array
        arrayGlobos.push(globo, globoComplement);
    }

    // Añadimos los globos al contenedor
    container.append(...arrayGlobos);

    // Ejecutamos la función para mover los globos
    arrayGlobos.forEach(globo => {
        moverGlobo(globo, container);
        //!Aki la lógica de las sumas y de parar el movimiento
        globo.addEventListener("click", () => {
            // Agregar el globo seleccionado al array
            globosSeleccionados.push(globo);
            globosSeleccionados.forEach(element => {
                element.className="globoSeleccionado";
            });
        
            if (globosSeleccionados.length === 2) {
             
                // Obtener los valores de los globos seleccionados
                const valorGlobo1 = parseInt(globosSeleccionados[0].textContent);
                const valorGlobo2 = parseInt(globosSeleccionados[1].textContent);
                
                // Calcular la suma
                const suma = valorGlobo1 + valorGlobo2;
                
                // Obtener el resultado esperado del input
                const resultadoEsperado = parseInt(resultadoInput.value);
               
                // Comparar la suma con el resultado esperado
                if (suma === resultadoEsperado) {
                   
                    score += 1;
                    document.getElementById("scoreDiv").innerText = `Puntuación: ${score}`;
                    arrayGlobos.forEach(element => {
                        if(element.className == "globoSeleccionado"){
                            element.remove();
                        }                        
                    });
                    if (score === 5){
                        nivel1Completado = true; 
                        jugarNivelFuncion(1);

                        // Ocultar el contenedor del nivel actual
                        container.style.display = 'none';
                
                        // Mostrar la pantalla inicial (el contenedor)
                        document.querySelector('.container').style.display = 'block';
                    }
                } else {
                    alert('¡Incorrecto! Inténtalo de nuevo.');
                    globosSeleccionados[0].className = "globo";
                    globosSeleccionados[1].className = "globo";
                }

                // Limpiar el array de globos seleccionados
                globosSeleccionados = [];
            }

        })


    });
}

// Función para mover los globos.
function moverGlobo(globo, container) {
    // Almacenamos el ancho y alto de la pantalla
    var containerWidth = container.offsetWidth;
    var containerHeight = container.offsetHeight;

    const globoSize = 160; // Tamaño de la globo (píxeles)
    // Damos posición aleatoria para cada globo
    let posX = Math.random() * (containerWidth - globoSize);
    let posY = Math.random() * (containerHeight - globoSize);
    let targetX = Math.random() * (containerWidth - globoSize);
    let targetY = Math.random() * (containerHeight - globoSize);

    function updateContainerSize() {
        containerWidth = container.offsetWidth;
        containerHeight = container.offsetHeight;

        // Ajustar la posición y el objetivo de los globos después de cada redimensionamiento
        posX = Math.min(posX, containerWidth - globoSize);
        posY = Math.min(posY, containerHeight - globoSize);
        targetX = Math.random() * (containerWidth - globoSize);
        targetY = Math.random() * (containerHeight - globoSize);
    }

    // Añadir un listener para el evento resize en la ventana
    window.addEventListener('resize', updateContainerSize);

    // Llamamos a la función para establecer las dimensiones iniciales
    updateContainerSize();

    const speed = 0.5; // Velocidad del movimiento

    // Función para animar el movimiento de un globo dentro de un contenedor
    function move() {
        // Comprobar la dirección horizontal del movimiento
        if (posX < targetX) {
            // Incrementar posX hasta alcanzar el objetivo o el límite derecho del contenedor
            posX = Math.min(posX + speed, containerWidth - globoSize);
        } else {
            // Decrementar posX hasta alcanzar el objetivo o el límite izquierdo del contenedor
            posX = Math.max(posX - speed, 0);
        }

        // Comprobar la dirección vertical del movimiento
        if (posY < targetY) {
            // Incrementar posY hasta alcanzar el objetivo o el límite inferior del contenedor
            posY = Math.min(posY + speed, containerHeight - globoSize);
        } else {
            // Decrementar posY hasta alcanzar el objetivo o el límite superior del contenedor
            posY = Math.max(posY - speed, 0);
        }

        // Actualizar las propiedades CSS del globo con las nuevas posiciones
        globo.style.left = posX + 'px';
        globo.style.top = posY + 'px';

        // Verificar si el globo ha alcanzado su objetivo en ambas direcciones
        if (Math.abs(posX - targetX) < speed && Math.abs(posY - targetY) < speed) {
            // Generar un nuevo objetivo aleatorio para el siguiente movimiento
            targetX = Math.random() * (containerWidth - globoSize);
            targetY = Math.random() * (containerHeight - globoSize);
        }

        // Solicitar la siguiente animación de cuadro de manera recursiva
        requestAnimationFrame(move);
    }

    // Al finalizar la función, eliminamos el listener de resize después del bucle de animación
    // para evitar problemas de rendimiento
    function onAnimationEnd() {
        window.removeEventListener('resize', updateContainerSize);
    }

    move();

    // Agregar un listener para detectar el final de la animación
    globo.addEventListener('animationend', onAnimationEnd);
}
