document.addEventListener('DOMContentLoaded', (event) => {
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
          this.style.backgroundImage = "url('imgSergio/candadoAbierto.png')";
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
            gameContainer.innerHTML = `<img src="imgSergio/Pitágoras.gif" alt="Imagen de éxito">`;
          }
        } 
        
      }
      
});
function jugarNivel(nivel) {
    // Verifica si el nivel anterior está desbloqueado
    if (nivel === 1 || (nivel === 2 && nivel1Completado) || (nivel === 3 && nivel2Completado)) {
        alert(`¡Has completado el Nivel ${nivel}!`);
        // Desbloquea el siguiente nivel
        if (nivel === 1) {
            document.getElementById('nivel2').querySelector('.play-button').removeAttribute('disabled');
            nivel1Completado = true;
        } else if (nivel === 2) {
            document.getElementById('nivel3').querySelector('.play-button').removeAttribute('disabled');
            nivel2Completado = true;
        }
    } else {
        alert(`Debes completar el Nivel ${nivel - 1} antes de desbloquear el Nivel ${nivel}.`);
    }
}

let nivel1Completado = false;
let nivel2Completado = false;
/*
function suma10(){
            const resultado = document.getElementById("resultado").value;
}

function resta(){

}
*/



