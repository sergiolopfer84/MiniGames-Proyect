export { startGame };
import { jugarNivelFuncion } from "./juegos.js";

const numberImages = [];
const numImagesToGenerate = 10;
const numTotalPeces = 100;

for (let i = 0; i < numTotalPeces; i++) {
  const img = new Image();
  const imageIndex = i % numImagesToGenerate; // Usamos el operador módulo para ciclar entre las 10 imágenes
  img.src = `img/peces_${imageIndex}.png`;
  img.id = `peces_${i}`;
  numberImages.push(img);
}


// Función para mostrar la pantalla de instrucciones al cargar la página
/*window.onload = function() {
  showInstructionsModal();
};

function showInstructionsModal() {
  var modal = document.getElementById('instructionsModal');
  modal.style.display = 'flex'; // Cambia 'none' a 'flex' para mostrar la superposición
}

function closeInstructionsModal() {
  var modal = document.getElementById('instructionsModal');
  modal.style.display = 'none';
}
function showCongratulationsScreen() {
  var congratulationsScreen = document.getElementById('congratulationsScreen');
  congratulationsScreen.style.display = 'block';
}

function hideCongratulationsScreen() {
  var congratulationsScreen = document.getElementById('congratulationsScreen');
  congratulationsScreen.style.display = 'none';
}
*/

function generateRandomNumbers(valor) {
  let numbers = [];
  while (numbers.length < 10) {
    let randomNumber = Math.floor(Math.random() * valor);
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers;
}
let randomNumbers = [];
let sortedNumbers = [];
const random = document.createElement('div');
random.id = 'randomNumbers';
const sorted = document.createElement('div');
sorted.id = 'sortedNumbers';

function startGame(resultadoInput2, divJugarNivel) {
  const resultadoJuego = parseInt(resultadoInput2.value);

  divJugarNivel.appendChild(random);
  divJugarNivel.appendChild(sorted);
  randomNumbers = generateRandomNumbers(resultadoJuego);
  sortedNumbers = [];
  displayNumbers(random, randomNumbers, divJugarNivel);
  displayNumbers(sorted, sortedNumbers, divJugarNivel);
  

  random.addEventListener('click', function (event) {

    let clickedNumber = parseInt(event.target.getAttribute('data-number'), 10);
    if (clickedNumber === Math.max(...randomNumbers)) {
      randomNumbers.unshift(clickedNumber);
      randomNumbers = randomNumbers.filter(num => num !== clickedNumber);
      displayNumbers(random, randomNumbers, divJugarNivel);
      displayNumbers(sorted, sortedNumbers, divJugarNivel);
      

      if (randomNumbers.length === 0) {
        //showCongratulationsScreen();
        
      }

      displayOrderedNumber(clickedNumber, divJugarNivel);
    } else {
      alert('¡Incorrecto! Vuelve a intentarlo.');
      displayNumbers(random, randomNumbers, divJugarNivel);
      displayNumbers(sorted, sortedNumbers, divJugarNivel);

    }

});

}

function displayNumbers(container, numbers, divJugarNivel) {
  let containerElement = container;
  containerElement.innerHTML = "";
  

  numbers.forEach((number, index) => {
    let numberContainer = document.createElement('div');
    numberContainer.classList.add('number-container');
     // Utiliza porcentajes para las posiciones
    numberContainer.style.top = Math.floor(Math.random() * 70) + '%';
    numberContainer.style.left = (index * 10) + '%';
    
    let img = numberImages[number].cloneNode(true);
    img.setAttribute('data-number', number);

    let span = document.createElement('span');
    span.innerText = number;
    span.setAttribute('data-number', number);
    span.style.position = 'absolute';
    span.style.bottom = '0';
    

    numberContainer.appendChild(img);
    numberContainer.appendChild(span);
    container.appendChild(numberContainer);
    

    img.addEventListener('click', function (event) {
      let clickedNumber = parseInt(event.target.getAttribute('data-number'), 10);
      if (container === random && clickedNumber === Math.max(...numbers)) {
        randomNumbers.unshift(clickedNumber);
        numbers = numbers.filter(num => num !== clickedNumber);
        displayNumbers(random, randomNumbers, divJugarNivel);
        displayNumbers(sorted, sortedNumbers, divJugarNivel);
        console.log(randomNumbers);

        if (numbers.length === 0) {
          showCongratulationsScreen();
        }
      } 
      
    });
  });
  divJugarNivel.appendChild(container);
}

const element = document.createElement('div');
const parrafo = document.createElement('p');
element.className = 'orderedNumbers';
parrafo.className = 'orderedNumbers p';

function displayOrderedNumber(number, divJugarNivel) {


  let orderedNumberContainer = document.createElement('span');
  orderedNumberContainer.classList.add('orderedNumber-container');
  orderedNumberContainer.innerText = number;

  divJugarNivel.appendChild(orderedNumberContainer);
  element.appendChild(parrafo);
  element.appendChild(orderedNumberContainer);
  divJugarNivel.appendChild(element);


  
}