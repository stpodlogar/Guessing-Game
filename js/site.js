'use strict'

const min = 1;
const max = 100;
let secretNum = Math.floor(Math.random() * (max - min) + (min + 1));
console.log(secretNum);

document.querySelector('.title').insertAdjacentHTML('beforeend', `<h5>Guess a number between ${min} and ${max}</h5>`);

// Generate numbers increasing by 1 from min to max
function createNumbers() {
    let numbers = '';
    let count = min;
    while (count < max + 1) {
        numbers += `\t<div class="numbers" data-number="${count}">${count}</div>\n`;
        count++;
    }
    // insert HTML
    document.querySelector('#game-board').insertAdjacentHTML('afterbegin', numbers);

    // add eventListener to each number
    document.querySelectorAll('.numbers').forEach(number => {
        number.addEventListener('click', playGame);
    })
}

// Play the game
let currentNumber, guesses = 0;

function playGame(event) {
    currentNumber = Number(event.target.dataset.number);
    if (currentNumber > secretNum) {
        this.style.backgroundColor = "#50BFC3";
        this.style.color = "#000000";
        guesses += 1;
        toggleMessage(currentNumber);
    }
    else if (currentNumber < secretNum) {
        this.style.backgroundColor = "#2C7695";
        this.style.color = "#000000";
        guesses += 1;
        toggleMessage(currentNumber);
    }
    else {
        this.style.backgroundColor = "goldenrod";
        this.style.color = "#000000";
        guesses += 1;
        removeListeners();
        toggleMessage(currentNumber);
    }
}

function removeListeners() {
    document.querySelectorAll('.numbers').forEach(number => {
        number.removeEventListener('click', playGame);
    })
}

function toggleMessage(number) {
    let message = document.querySelector('#feedback');
    if (number < secretNum) {
        message.textContent = "Too Low!"
        setTimeout(() => { message.textContent = "Make a Guess!" }, 1250);
    }
    else if (number > secretNum) {
        message.textContent = "Too high!"
        setTimeout(() => { message.textContent = "Make a Guess!" }, 1250);
    }
    else {
        message.innerHTML = `Congrats! It's <span>${secretNum}</span>. <br /> You guessed the secret number in <span>${guesses}</span> tries!`;
        document.querySelector('#play-again').hidden = false;
        document.querySelector('#play-again').addEventListener('click', playAgain);
    }
}

function playAgain() {
    guesses = 0;
    secretNum = Math.floor(Math.random() * (max - min) + (min + 1));
    console.log(secretNum);
    document.querySelector('#play-again').hidden = true;
    document.querySelector('#feedback').textContent = "Make a Guess!"
    
    document.querySelectorAll('.numbers').forEach(number => {
        number.addEventListener('click', playGame);
        number.style.backgroundColor = "#486581";
        number.style.color = "rgba(255, 255, 255, 0.87)";
    })
}

createNumbers();

// Add event Listener to each button

// onClick compare guess to random number

// put guess in empty array