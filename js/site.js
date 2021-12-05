'use strict'

// global variables
const min = 1;
const max = 100;
let secretNum = Math.floor(Math.random() * (max - min) + (min + 1));
console.log(secretNum);

// insert HTML to select a number between
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

// remove event listeners when game is complete
function removeListeners() {
    document.querySelectorAll('.numbers').forEach(number => {
        number.removeEventListener('click', playGame);
    })
}

// change message displayed based on user number
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
        // show button to play again
        document.querySelector('#play-again').hidden = false;
        document.querySelector('#play-again').addEventListener('click', playAgain);
    }
}

// function to play game again
function playAgain() {
    guesses = 0;
    secretNum = Math.floor(Math.random() * (max - min) + (min + 1));
    console.log(secretNum);
    document.querySelector('#play-again').hidden = true;
    document.querySelector('#feedback').textContent = "Make a Guess!"
    
    // add event listeners again and change number styles back to original
    document.querySelectorAll('.numbers').forEach(number => {
        number.addEventListener('click', playGame);
        number.style.backgroundColor = "#486581";
        number.style.color = "rgba(255, 255, 255, 0.87)";
    })
}


// main
createNumbers();