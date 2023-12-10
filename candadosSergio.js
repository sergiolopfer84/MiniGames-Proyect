// No necesitamos exportar `operativaCandados` hasta que no se llame desde otro módulo.
export { operativaCandados, crearCandadosLlaves, generarNumeros };

// Esta importación parece no ser utilizada en el fragmento de código proporcionado.
import { jugarNivelFuncion } from "./juegos.js";
function operativaCandados(resultadoInput3, divJugarNivel) {
    crearCandadosLlaves(resultadoInput3, divJugarNivel);
    
    const keys = document.querySelectorAll('.key');
    const locks = document.querySelectorAll('.lock');

    keys.forEach(key => {
        key.addEventListener('dragstart', dragStart);
    });

    locks.forEach(lock => {
        lock.addEventListener('dragover', dragOver);
        lock.addEventListener('drop', drop);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.value);
    }

    function dragOver(e) {
        e.preventDefault();
    }
    let hidenKeys = 10;
    function drop(e) {
        e.preventDefault();
        const draggedValue = parseInt(e.dataTransfer.getData('text/plain'), 10);
        const lockValue = parseInt(this.dataset.value, 10);
        const currentLock = this; // Referencia al candado actual
    
        if (draggedValue === lockValue) {
            currentLock.style.backgroundImage = "url('/img/candadoAbierto.png')";
            hideKey(draggedValue);
            checkAllKeysUsed();
        }
        else {
            currentLock.style.backgroundImage = "url('/img/candadoTriste.png')";
            // Establecer un temporizador para cambiar la imagen de fondo después de 3 segundos
            setTimeout(function() {
                currentLock.style.backgroundImage = "url('/img/candadoCerrado.png')";
            }, 3000); // 3000 milisegundos equivalen a  segundos
        }
    }

    function hideKey(value) {
        const keyElement = document.querySelector(`.key[data-value="${value}"]`);
       
        if (keyElement) {
            keyElement.style.display = 'none';
            hidenKeys= hidenKeys-1;

        }
    }

    function checkAllKeysUsed() {
        if (hidenKeys === 0) {
            const gameContainer = document.getElementById('jugarNivel3');
            gameContainer.innerHTML = `<img src="/img/SUCESS.gif" alt="Imagen de éxito" style="width: 100%; height: 100%; object-fit: cover;">`;
            
            // Establecer un temporizador para cerrar y eliminar el juego después de 5 segundos
            setTimeout(function() {
                gameContainer.style.display = 'none'; // Oculta el contenedor del juego
                window.location.href = 'index.html';
            }, 5000); // 5000 milisegundos = 5 segundos

        }
    }
}

function generarNumeros(llave, candado, numero1, numero2) {
    const resultado = numero1 * numero2;

    llave.textContent = `${numero1} x ${numero2}`;
    llave.dataset.value = resultado.toString();

    candado.textContent = resultado;
    candado.dataset.value = resultado.toString();
}

function mezclarValores(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function crearCandadosLlaves(resultadoInput3, divJugarNivel) {
    const locks = document.createElement("div");
    locks.className = "locks";
    const keys = document.createElement("div");
    keys.className = "keys";

    const resultadosSet = new Set();

    for (let i = 1; i <= 10; i++) {
        const candado = document.createElement("div");
        const llave = document.createElement("div");
        candado.className = "lock";
        llave.className = "key";
        llave.draggable = true;

        let numero2;

        do {
            if (isNaN(resultadoInput3.value) || resultadoInput3.value === "") {
                numero2 = Math.ceil(Math.random() * 10);
            } else {
                numero2 = parseInt(resultadoInput3.value, 10);
            }
        } while (resultadosSet.has(i * numero2));

        resultadosSet.add(i * numero2);

        generarNumeros(llave, candado, i, numero2);

        locks.appendChild(candado);
        keys.appendChild(llave);
    }

    // Barajar las llaves y candados después de generarlas
    const llavesArray = Array.from(keys.children);
    mezclarValores(llavesArray);
    keys.innerHTML = "";
    llavesArray.forEach(llave => keys.appendChild(llave));

    const candadosArray = Array.from(locks.children);
    mezclarValores(candadosArray);
    locks.innerHTML = "";
    candadosArray.forEach(candado => locks.appendChild(candado));

    divJugarNivel.appendChild(locks);
    divJugarNivel.appendChild(keys);
}
