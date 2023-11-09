
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
document.addEventListener('DOMContentLoaded', function() {
    let nivel1Completado = false;
    let nivel2Completado = false;
    let nivel1Activo = false; 
    // Agregamos una variable para controlar si el juego del Nivel 1 ya está activo

    const playButton1 = document.getElementById("play-button1");
    const playButton2 = document.getElementById("play-button2");
    const playButton3 = document.getElementById("play-button3");
    playButton1.addEventListener("click", function(){
       crearNuevaPantalla(1);            
       
    });
    playButton2.addEventListener("click", function(){
        crearNuevaPantalla(2);            
        
     });
     playButton3.addEventListener("click", function(){
        crearNuevaPantalla(3);            
        
     });

});

function crearNuevaPantalla(number) {
    const nivel1 = document.getElementById("nivel1");
    nivel1.style.display = "none";

    const nivel2 = document.getElementById("nivel2");
    nivel2.style.display = "none";

    const nivel3 = document.getElementById("nivel3");
    nivel3.style.display = "none";

    const jugarNivel = document.createElement('div');
    jugarNivel.id = "jugarNivel";
    const botonResultado = document.createElement('button');
    botonResultado.id = "botonResultado";
    botonResultado.textContent = "Jugar";
   

    switch (number) {
        case 1:
            const resultadoInput1 = document.createElement("input");    
        resultadoInput1.placeholder = "Introduce el resultado del nivel 1";
            resultadoInput1.id = "resultadoInput";            
            jugarNivel.appendChild(resultadoInput1);
            jugarNivel.appendChild(botonResultado);
            break;
        case 2:
            // Lógica para el nivel 2, si es diferente al nivel 1
            jugarNivel.appendChild(botonResultado);
            break;
        case 3:
            // Lógica para el nivel 3
            const resultadoInput3 = document.createElement("input");
            resultadoInput3.id = "resultadoInput";
            resultadoInput3.placeholder = "Tabla del 1,2,3... o todas";
            jugarNivel.appendChild(resultadoInput3);
            jugarNivel.appendChild(botonResultado);
            break;
        default:
            // Lógica para otros niveles si es necesario
            break;
    }

    document.querySelector(".container").appendChild(jugarNivel);
}

