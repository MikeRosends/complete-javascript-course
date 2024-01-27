'use strict';

/*
document.querySelector('.message').textContent;
document.querySelector('.message').textContent = 'Correct Number!';
document.querySelector('.message').textContent;

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;
*/

let score = 20;
let highscore = Number(document.querySelector('.highscore').textContent);

document.querySelector('.check').addEventListener('click', checkNumber);
document.querySelector('.again').addEventListener('click', goAgain);

let secretNum = getRandomNum(1, 20);
console.log(`Secret Number: ${secretNum}`);

function checkNumber() {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (score <= 0) {
    changeMessage('Game Over');
  } else if (!guess) {
    changeMessage('Choose a number tho...');
  } else if (guess === secretNum) {
    graphicsWin();
    changeMessage('Great Success!!');
    document.querySelector('.number').textContent = secretNum;
    if (score > highscore) {
      highscore = score;
      changeHighscore(highscore);
    }
  } else if (guess > secretNum) {
    changeMessage('Too high...');
    score--;
    changeScore(score);
  } else if (guess < secretNum) {
    changeMessage('Too low...');
    score--;
    changeScore(score);
  }
}

function goAgain() {
  graphicsGoAgain();
  secretNum = getRandomNum(1, 20);
  console.log(`New Secret Number: ${secretNum}`);
  changeMessage('Start guessing...');
  score = 20;
  changeScore(score);
  document.querySelector('.number').textContent = '?';
}

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + 1);
}

function changeMessage(message) {
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
