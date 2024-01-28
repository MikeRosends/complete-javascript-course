'use strict';

// Sekecting Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const rollBtnEl = document.querySelector('.btn--roll');
const newBtnEl = document.querySelector('.btn--new');
const holdBtnEl = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player1Section = document.querySelector('.player--1');
const player2Section = document.querySelector('.player--2');

startNewGame();

// PLAYE'S SCORES
const scores = [0, 0];

// PLAYERS STARTING SCORE:
let currentScore = 0;

// PLAYE SELECTOR
let activePlayer = 0;

// STARTING CONDITIONS
function startNewGame() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
}

// Add Event Listeners
rollBtnEl.addEventListener('click', rollDice);
holdBtnEl.addEventListener('click', holdScore);
// newBtnEl.addEventListener('click', newGame);
// holdBtnEl.addEventListener('click', holdScore);

// Roll the dice
function rollDice() {
  let diceNum = Math.ceil(Math.random() * 6);
  console.log(`ROLLED A ${diceNum}`);
  switch (diceNum) {
    case 1:
      diceRoll(1);
      break;
    case 2:
      diceRoll(2);
      break;
    case 3:
      diceRoll(3);
      break;
    case 4:
      diceRoll(4);
      break;
    case 5:
      diceRoll(5);
      break;
    case 6:
      diceRoll(6);
      break;
  }
  return diceNum;
}

function diceRoll(num) {
  // console.log(`U ROLLED A ${num}`);
  diceEl.src = `dice-${num}.png`;
  diceEl.classList.remove('hidden');

  if (num !== 1) {
    currentScore += num;
    console.log(`=========PLAYER ${activePlayer}==========`);
    console.log(`current score: ${currentScore}`, typeof currentScore);

    console.log("Before dice roll: " + document.getElementById(`current--${activePlayer}`).textContent);
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    console.log("After dice roll: " + document.getElementById(`current--${activePlayer}`).textContent);

  } else {
    // Reassigning active player
    if (activePlayer === 0) {
      activePlayer = 1
    } else {
      activePlayer = 0
    }
    
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    console.log(`=========PLAYER ${activePlayer}==========`);
    console.log(`current score: ${currentScore}`, typeof currentScore);

    console.log(document.getElementById(`current--${activePlayer}`).textContent);
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    console.log(document.getElementById(`current--${activePlayer}`).textContent);
    // player1Section.style.backgroundColor = 'white';
  }
}

function holdScore() {
  document.getElementById(`score--${activePlayer}`).textContent = currentScore;
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;

  if (activePlayer === 0) {
    activePlayer = 1
  } else {
    activePlayer = 0
  }
}
