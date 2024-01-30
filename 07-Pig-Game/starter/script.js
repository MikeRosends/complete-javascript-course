'use strict';

// Sekecting Elements
const player0Elm = document.querySelector('.player--0');
const player1Elm = document.querySelector('.player--1');
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

// GAME STATUS
let playing = true;

// STARTING CONDITIONS
function startNewGame() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
}

// Add Event Listeners
rollBtnEl.addEventListener('click', rollDice);
holdBtnEl.addEventListener('click', holdScore);
newBtnEl.addEventListener('click', newGame);

// Roll the dice
function rollDice() {
  if (playing) {
    diceEl.classList.remove('hidden');
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
}

function diceRoll(num) {
  // console.log(`U ROLLED A ${num}`);
  diceEl.src = `dice-${num}.png`;
  diceEl.classList.remove('hidden');

  if (num !== 1) {
    currentScore += num;

    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    resetAndChangePlayer();

    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  }
}

function holdScore() {
  if (playing) {
    // add current score to the total score of active player
    scores[activePlayer] += currentScore; // scores[0 or 1] = scores [0 or 1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      diceEl.classList.add('hidden');
      playing = false;
      console.log(`PLAYER ${activePlayer} WINSSSS!!!!!!`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      resetAndChangePlayer();
    }
  }
}

function newGame() {
  playing = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
}

function resetAndChangePlayer() {
  // Reset the current points
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Ensuring that the css class player--active is only on one element at a time
  player0Elm.classList.toggle('player--active');
  player1Elm.classList.toggle('player--active');
}
