export { crearGlobos, moverGlobo };
import { jugarNivelFuncion } from "./juegos.js";

let globosSeleccionados = [];
let score = 0;


// Función para crear las globos
function crearGlobos(resultadoInput, divJugarNivel, operacion) {

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
            // Generamos un número aleatorio entre 0 y el resultado deseado en 5 de los globos
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
      
        //!Aki la lógica de las sumas, restas y de parar el movimiento
        globo.addEventListener("click", () => {
            // Agregar el globo seleccionado al array
           
            globosSeleccionados.push(globo);
          
            globosSeleccionados.forEach(element => {              
                element.className = "globoSeleccionado";
            });
            
                    // Obtener el resultado esperado del input
                    const resultadoEsperado = parseInt(resultadoInput.value);
            console.log("Estamos aquí "+ globosSeleccionados.length);
            if (globosSeleccionados.length === 2) {
                console.log("Estamos aquí "+ globosSeleccionados.length);
                // Obtener los valores de los globos seleccionados
                const valorGlobo1 = parseInt(globosSeleccionados[0].textContent);
                const valorGlobo2 = parseInt(globosSeleccionados[1].textContent);
                console.log(valorGlobo1 + " " +valorGlobo2);
                if (operacion === "+") {
                    // Calcular la suma
                    const suma = valorGlobo1 + valorGlobo2;

                    // Comparar la suma con el resultado esperado
                    if (suma === resultadoEsperado) {
                        score += 1;
                        document.getElementById("scoreDiv").innerText = `Puntuación: ${score}`;
                        arrayGlobos.forEach(element => {
                            if (element.className == "globoSeleccionado") {
                                element.remove();
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
                                    element.remove();
                                }
                            });
                        } else {
                            alert('¡Incorrecto! Inténtalo de nuevo.');
                            globosSeleccionados[0].className = "globo";
                            globosSeleccionados[1].className = "globo";


                        }
                    } if (valorGlobo1 < valorGlobo2) {                       
                    
                        const resta = valorGlobo2 - valorGlobo1;
                        // Comparar la suma con el resultado esperado
                        if (resta === resultadoEsperado) {
                            score += 1;
                            document.getElementById("scoreDiv").innerText = `Puntuación: ${score}`;
                            arrayGlobos.forEach(element => {
                                if (element.className == "globoSeleccionado") {
                                    element.remove();
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
                    window.nivel1Completado = true;
                    jugarNivelFuncion(1);

                    // Ocultar el contenedor del nivel actual
                    container.style.display = 'none';

                    // Mostrar la pantalla inicial (el contenedor)
                    document.querySelector('.container').style.display = 'block';
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