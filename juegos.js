
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



