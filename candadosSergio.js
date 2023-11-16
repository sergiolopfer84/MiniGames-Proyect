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
       

        if (draggedValue === lockValue) {
            this.style.backgroundImage = "url('/img/candadoAbierto.png')";
            console.log(this);
            hideKey(draggedValue);
            checkAllKeysUsed();
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
            gameContainer.innerHTML = `<img src="/img/Pitágoras.gif" alt="Imagen de éxito">`;
        }
    }
}

function crearCandadosLlaves(resultadoInput3, divJugarNivel) {
    const locks = document.createElement("div");
    locks.className = "locks";
    const keys = document.createElement("div");
    keys.className = "keys";

    for (let i = 1; i <= 10; i++) {
        const candado = document.createElement("div");
        const llave = document.createElement("div");
        candado.className = "lock";
        llave.className = "key";
        llave.draggable = true;
        generarNumeros(llave, candado, resultadoInput3, i);
        locks.appendChild(candado);
        keys.appendChild(llave);
    }

    divJugarNivel.appendChild(locks);
    divJugarNivel.appendChild(keys);
}

function generarNumeros(llave, candado, resultadoInput3, i) {
    let numero, numero2, resultado;

    if (isNaN(resultadoInput3.value)|| resultadoInput3.value === "") {
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
    candado.textContent = resultado;
    candado.dataset.value = resultado.toString();
}
