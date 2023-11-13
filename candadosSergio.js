export { operativaCandados, crearCandadosLlaves, generarNumeros };
import { jugarNivelFuncion } from "./juegos.js";


function operativaCandados(resultadoInput3, divJugarNivel) {
    crearCandadosLlaves(resultadoInput3, divJugarNivel);
    document.addEventListener('DOMContentLoaded', (event) => {
        
        console.log("entramos inicio");
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

        function drop(e) {
            e.preventDefault();
            const draggedKey = e.dataTransfer.getData('text/plain');
            const lockOperation = this.dataset.value.split('x');
            const lockVal = parseInt(lockOperation[0]) * parseInt(lockOperation[1]);
            const keyElement = document.querySelector(`[data-value="${draggedKey}"]`);

            if (draggedKey == lockVal) {
                // Cambia la imagen de fondo del candado a la imagen del candado abierto
                this.style.backgroundImage = "url('img/candadoAbierto.png')";
                // Oculta el número del candado
                this.querySelector('.operation').textContent = '';
                // Oculta la llave arrastrada
                keyElement.style.display = 'none';

                // Comprobar si hay más llaves visibles
                const remainingKeys = document.querySelectorAll('.key');
                const allKeysHidden = Array.from(remainingKeys).every(key => key.style.display === 'none');

                if (allKeysHidden) {
                    // Si no hay más llaves, limpia el game-container y muestra el mensaje de éxito
                    const gameContainer = document.getElementById('game-container');
                    gameContainer.innerHTML = `<img src="img/Pitágoras.gif" alt="Imagen de éxito">`;
                }
            }

        }

    });
}
function crearCandadosLlaves(resultadoInput3, divJugarNivel) {
    const locks = document.createElement("div");
    locks.className = "locks";
    const keys = document.createElement("div");
    keys.className = "keys";
    
    for (let i = 1; i <= 10; i++) {
        let candado = document.createElement("div");
        let llave = document.createElement("div");
        candado.id = `candado${i}`;
        llave.id = `llave${i}`;
        llave.className = "key";
        candado.className = "lock";
        llave.draggable = "true";
        generarNumeros(llave, candado, resultadoInput3, i);
        locks.appendChild(candado);
        keys.appendChild(llave);

        
    }
    
    divJugarNivel.appendChild(locks);
    divJugarNivel.appendChild(keys);

}

function generarNumeros(llave, candado, resultadoInput3,i) {
   
    if (isNaN(resultadoInput3.value)) {
        let numero = Math.floor(Math.random() * 10) + 1;
        let numero2 = Math.floor(Math.random() * 10) + 1;
        let resultado = numero * numero2;
        llave.innerHTML = `${numero} * ${numero2}`;
        llave.setAttribute('data-value',`${numero} * ${numero2}`);
        candado.innerHTML = resultado;
        candado.setAttribute('data-value',`${resultado}`);
    } else {
        
        let resultado = resultadoInput3.value * i;
        llave.innerHTML = `${i} * ${resultadoInput3.value}`;
        llave.setAttribute('data-value',`${i} * ${resultadoInput3.value}`);
        candado.innerHTML = resultado;
        candado.setAttribute('data-value',`${resultado}`);
    }
}