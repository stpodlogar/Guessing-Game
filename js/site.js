'use strict'

let min = 1;
let max = 100;

document.querySelector('.title').insertAdjacentHTML('beforeend', `<h5>Guess a number between ${min} and ${max}</h5>`);

// Generate numbers increasing by 1 from min to max
function createNumbers() {
    let numbers = '';
    while (min < max + 1) {
        numbers += `\t<div class="number" data-number="${min}">${min}</div>\n`;
        min++;
        console.log('Number added');
    }
    document.querySelector('#game-board').insertAdjacentHTML('afterbegin', numbers);
}

createNumbers();

// Add event Listener to each button

// onClick compare guess to random number

// put guess in empty array