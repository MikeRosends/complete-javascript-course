'use strict';

let score = 20;
let highscore = Number(document.querySelector('.highscore').textContent);
let secretNum = getRandomNum(1, 20);
console.log(`Secret Number: ${secretNum}`);



document.querySelector('.check').addEventListener('click', checkNumber);

function checkNumber() {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);


  if (score <= 0) {
    displayMessage('Game Over');
  } else if (!guess) {
    displayMessage('Choose a number tho...');
  } else if (guess === secretNum) {
    graphicsWin();
    displayMessage('Great Success!!');
    document.querySelector('.number').textContent = secretNum;
    if (score > highscore) {
      highscore = score;
      changeHighscore(highscore);
    }
  } else if (guess !== secretNum) {
    if (guess > secretNum) {
      displayMessage('Too high...');
    } else if (guess < secretNum) {
      displayMessage('Too low...');
    }
    score--;
    changeScore(score);
  }
}


document.querySelector('.again').addEventListener('click', goAgain);

function goAgain() {
  graphicsGoAgain();
  secretNum = getRandomNum(1, 20);
  console.log(`New Secret Number: ${secretNum}`);
  displayMessage('Start guessing...');
  score = 20;
  changeScore(score);
  document.querySelector('.number').textContent = '?';
}

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + 1);
}

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

function changeScore(score) {
  document.querySelector('.score').textContent = score;
}

function changeHighscore(highscore) {
  document.querySelector('.highscore').textContent = highscore;
}

function graphicsWin() {
  document.querySelector('body').style.backgroundColor = '#60b347';
  document.querySelector('.number').style.width = '30rem';
}

function graphicsGoAgain() {
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
}
