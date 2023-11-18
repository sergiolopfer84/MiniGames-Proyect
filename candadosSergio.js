// No necesitamos exportar `operativaCandados` hasta que no se llame desde otro módulo.
export { operativaCandados, crearCandadosLlaves, generarNumeros };

// Esta importación parece no ser utilizada en el fragmento de código proporcionado.
import { jugarNivelFuncion } from "./juegos.js";
function operativaCandados(resultadoInput3, divJugarNivel) {
    crearCandadosLlaves(resultadoInput3, divJugarNivel);
    console.log("hola");
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
            currentLock.style.backgroundImage = "url('/img/candadoTriste1.png')";
            // Establecer un temporizador para cambiar la imagen de fondo después de 3 segundos
            setTimeout(function() {
                currentLock.style.backgroundImage = "url('/img/candadoCerrado.png')";
            }, 3000); // 3000 milisegundos equivalen a  segundos
        }
    }

    function hideKey(value) {
        const keyElement = document.querySelector(`.key[data-value="${value}"]`);
        console.log(keyElement);
        if (keyElement) {
            keyElement.style.display = 'none';
            hidenKeys= hidenKeys-1;

        }
    }

    function checkAllKeysUsed() {
        if (hidenKeys=== 0) {
            const gameContainer = document.getElementById('jugarNivel3');
            gameContainer.innerHTML = `<img src="/img/SUCESS.gif" alt="Imagen de éxito">`;
        }
    }
}

function generarNumeros(llave, candado, resultadoInput3, i, resultadosMezclados) {
    let numero, numero2, resultado;

    if (isNaN(resultadoInput3.value) || resultadoInput3.value === "") {
        numero = Math.floor(Math.random() * 10) + 1;
        numero2 = Math.floor(Math.random() * 10) + 1;
        resultado = numero * numero2;
    } else {
        numero = i;
        numero2 = parseInt(resultadoInput3.value, 10);
        resultado = numero * numero2;
    }

    llave.textContent = `${numero} x ${numero2}`;
    llave.dataset.value = resultado.toString();

    // Usar un resultado aleatorio de la lista mezclada
    candado.textContent = resultadosMezclados[i - 1];
    candado.dataset.value = resultadosMezclados[i - 1].toString();
}

function crearCandadosLlaves(resultadoInput3, divJugarNivel) {
    const locks = document.createElement("div");
    locks.className = "locks";
    const keys = document.createElement("div");
    keys.className = "keys";
    let resultados = [];

    for (let i = 1; i <= 10; i++) {
        let numero = i;
        let numero2 = isNaN(resultadoInput3.value) || resultadoInput3.value === "" ?
                      Math.floor(Math.random() * 10) + 1 :
                      parseInt(resultadoInput3.value, 10);
        resultados.push(numero * numero2);
    }

    // Barajar los resultados
    for (let i = resultados.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [resultados[i], resultados[j]] = [resultados[j], resultados[i]];
    }

    for (let i = 1; i <= 10; i++) {
        const candado = document.createElement("div");
        const llave = document.createElement("div");
        candado.className = "lock";
        llave.className = "key";
        llave.draggable = true;

        // Pasar la lista de resultados mezclados a generarNumeros
        generarNumeros(llave, candado, resultadoInput3, i, resultados);
        
        locks.appendChild(candado);
        keys.appendChild(llave);
    }

    divJugarNivel.appendChild(locks);
    divJugarNivel.appendChild(keys);
}