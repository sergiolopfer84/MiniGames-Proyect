export { crearGlobos, moverGlobo };
import { jugarNivelFuncion } from "./juegos.js";

let globosSeleccionados = [];
let score;

document.addEventListener('DOMContentLoaded', (event) => {
    var musica = document.getElementById("musicaJuegos");
    musica.play().catch(error => {
        console.log("La reproducción automática fue bloqueada por el navegador.");
    });
});
// Función para crear las globos
function crearGlobos(resultadoInput, divJugarNivel, operacion) {
    score = 0;
    const scoreDiv = document.createElement("div");
    scoreDiv.id = "scoreDiv";
    scoreDiv.innerText = `Puntuación: ${score}`;
    divJugarNivel.appendChild(scoreDiv);
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

        if (operacion === "+") {
           
            const numeroAleatorio = Math.floor(Math.random() * (numeroFinal - 1));
            // Le ponemos ese valor texto a los cinco globos
            globo.textContent = numeroAleatorio;
            // El valor complementario en los otros cinco
            globoComplement.textContent = numeroFinal - numeroAleatorio;

        } else {
            const numeroAleatorio = Math.floor(Math.random() * (numeroFinal - 1));
            globo.textContent = numeroAleatorio;
            globoComplement.textContent = numeroFinal + numeroAleatorio;

        }


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

        //!Aqui la lógica de las sumas, restas y de parar el movimiento
        globo.addEventListener("click", () => {
            // Agregar el globo seleccionado al array
            if (globosSeleccionados.length === 0){
                globosSeleccionados.push(globo);
            }
            if (globosSeleccionados.length ===1 && globosSeleccionados[0].id !== globo.id){
                globosSeleccionados.push(globo);
            }
            globosSeleccionados.forEach(element => {
                element.className = "globoSeleccionado";
            });            

            // Obtener el resultado esperado del input
            const resultadoEsperado = parseInt(resultadoInput.value);           
            if (globosSeleccionados.length === 2) {               
                // Obtener los valores de los globos seleccionados
                const valorGlobo1 = parseInt(globosSeleccionados[0].textContent);
                const valorGlobo2 = parseInt(globosSeleccionados[1].textContent);
             
                if (operacion === "+") {
                    // Calcular la suma                   
                    
                    const suma = valorGlobo1 + valorGlobo2;

                    // Comparar la suma con el resultado esperado
                    if (suma === resultadoEsperado) {
                        score += 1;
                        document.getElementById("scoreDiv").innerText = `Puntuación: ${score}`;
                        arrayGlobos.forEach(element => {
                            if (element.className == "globoSeleccionado") {
                                explode(globosSeleccionados[0]);
                                explode(globosSeleccionados[1]);
                            }
                        });

                    } else {
                        alert('¡Incorrecto! Inténtalo de nuevo.');
                        globosSeleccionados[0].className = "globo";
                        globosSeleccionados[1].className = "globo";

                    }

                } else {
                    // Calcular la resta
                    if (valorGlobo1 > valorGlobo2) {
                        const resta = valorGlobo1 - valorGlobo2;

                        // Comparar la suma con el resultado esperado
                        if (resta === resultadoEsperado) {
                            score += 1;
                            document.getElementById("scoreDiv").innerText = `Puntuación: ${score}`;
                            arrayGlobos.forEach(element => {
                                if (element.className == "globoSeleccionado") {
                                    explode(globosSeleccionados[0]);
                                    explode(globosSeleccionados[1]);
                                }
                            });
                        } else {
                            alert('¡Incorrecto! Inténtalo de nuevo.');
                            globosSeleccionados[0].className = "globo";
                            globosSeleccionados[1].className = "globo";


                        }
                    } if (valorGlobo1 <= valorGlobo2) {

                        const resta = valorGlobo2 - valorGlobo1;
                        // Comparar la suma con el resultado esperado
                        if (resta === resultadoEsperado) {
                            score += 1;
                            document.getElementById("scoreDiv").innerText = `Puntuación: ${score}`;
                            arrayGlobos.forEach(element => {
                                if (element.className == "globoSeleccionado") {
                                    explode(globosSeleccionados[0]);
                                    explode(globosSeleccionados[1]);
                                }
                            });
                        } else {
                            alert('¡Incorrecto! Inténtalo de nuevo.');
                            globosSeleccionados[0].className = "globo";
                            globosSeleccionados[1].className = "globo";


                        }


                    }
                }
                // Limpiar el array de globos seleccionados
                globosSeleccionados = [];
            }

            if (score === 5) {
                        const gameContainer1 = document.getElementById('jugarNivel1');
                        gameContainer1.innerHTML = `<img src="/img/SUCCESS1.png" alt="Imagen de éxito" style="width: 100%; height: 100%; object-fit: cover;">`;
                        // Establecer un temporizador para cerrar y eliminar el juego después de 5 segundos
                        setTimeout(function() {
                            gameContainer1.style.display = 'none'; // Oculta el contenedor del juego
                           // window.location.href = 'index.html';
                            window.nivel1Completado = true;
                            jugarNivelFuncion(1);
                        }, 5000); // 5000 milisegundos = 5 segundos
                       
                    }
                  
        })

    });
}


// Función para mover los globos.
function moverGlobo(globo, divJugarNivel) {
    // Almacenamos el ancho y alto de la pantalla
    var containerWidth = divJugarNivel.offsetWidth;
    var containerHeight = divJugarNivel.offsetHeight;

    const globoSize = 160; // Tamaño de la globo (píxeles)
    // Damos posición aleatoria para cada globo
    let posX = Math.random() * (containerWidth - globoSize);
    let posY = Math.random() * (containerHeight - globoSize);
    let targetX = Math.random() * (containerWidth - globoSize);
    let targetY = Math.random() * (containerHeight - globoSize);

    function updateContainerSize() {
        containerWidth = divJugarNivel.offsetWidth;
        containerHeight = divJugarNivel.offsetHeight;

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
function explode(globo) {
    // Crear fragmentos del globo
    for (let i = 0; i < 20; i++) {
        const fragmento = document.createElement('div');
        fragmento.style.width = '20px';
        fragmento.style.height = '20px';
        fragmento.style.position = 'absolute';
        fragmento.style.backgroundColor = 'white'; // Color visible para los fragmentos
        fragmento.style.borderRadius = '50%';
        const rect = globo.getBoundingClientRect();
        fragmento.style.left = (rect.left + window.scrollX + globo.offsetWidth / 2 - 5) + 'px'; // Centrar en el globo
        fragmento.style.top = (rect.top + window.scrollY + globo.offsetHeight / 2 - 5) + 'px'; // Centrar en el globo

        document.body.appendChild(fragmento); // Asegurarse de que se añade al body

        // Animar fragmentos
        gsap.to(fragmento, {
            x: Math.random() * 200 - 100, // Valores aleatorios para la dirección
            y: Math.random() * 200 - 100, // Valores aleatorios para la dirección
            opacity: 0,
            duration: 1,
            ease: "power1.out",
            onComplete: () => fragmento.remove() // Eliminar fragmento después de la animación
        });
    }

    // Eliminar el globo original
    globo.remove();
}