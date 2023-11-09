playButton1.addEventListener("click", function () {
    //ocultamos los div nivel
    const nivel1 = document.getElementById("nivel1");
    nivel1.style.display = "none";
    const nivel2 = document.getElementById("nivel2");
    nivel2.style.display = "none";
    const nivel3 = document.getElementById("nivel3");
    nivel3.style.display = "none";
    //creamos un div que será donde se inicialice el juego.
    //En el css le damos medidas previamente
    const jugarNivel1 = document.createElement('div');
    jugarNivel1.id = "jugarNivel1";
    //creamos un input  para introducir el resultado de la suma
    const resultadoInput = document.createElement("input");
    resultado.id = "resultadoInput";
    //creamos el botón para almacenar el resultado
    const botonResultado = document.createElement('button');
    botonResultado.id = "botonResultado";
    jugarNivel1.appendChild(resultadoInput);
    jugarNivel1.appendChild(botonResultado);

    document.querySelector(".container").appendChild(jugarNivel1);
});
