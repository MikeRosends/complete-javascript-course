'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  // first empty the container
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;

    // afterbegin defines the order in which the data appears
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1)); // Last element of any array
console.log(arr.slice(1, -2));
console.log(arr.slice()); // Get a shallow copy of the array

// SPLICE
// console.log(arr.splice(2)); // Mutates the original array
arr.splice(-1); // Remove the last element
arr.splice(1, 2) // Delete 2 elements starting from position 1
console.log(arr);

// REVESRE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f']
console.log(arr2.reverse()); // Mutates the original array
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);

// JOIN
console.log(letters.join(' - '));

const arr = [23, 11, 64];
// same thing, for now
console.log(arr[0]);
console.log(arr.at(0));

// Getting the last element
console.log(arr[arr.length -1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('mike'.at(0));
console.log('mike'.at(-1));



const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movment ${i + 1}: You Deposited ${movement}`);
  } else {
    console.log(`Movment ${i + 1}: You Withdrew ${Math.abs(movement)}`);
  }
}

console.log('---- FOREACH ----');

// You cant break out of a forEach Loop
// the parameters always go in this order - current element, index and the array itself
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movment ${index + 1}: You Deposited ${movement}`);
  } else {
    console.log(`Movment ${index + 1}: You Withdrew ${Math.abs(movement)}`);
  }
});


// MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(currentValue, currentKey, mapItself) {
  console.log(`${currentKey}: ${currentValue}`);
})

// SET
const currenciesUnique = new Set(['USD', 'GBD', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

  // Here, value and key are the same so we use the '_'
currenciesUnique.forEach(function(currentValue, _, mapItself) {
  console.log(`${currentValue}: ${currentValue}`);
})

*/

// CHALLENGE
// test data1
const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];
// test data2
const dogsJulia2 = [9, 16, 6, 8, 3];
const dogsKate2 = [10, 5, 6, 1, 4];


const checkDogs = function(dogsJulia, dogsKate) {
  // Removing the cats
 const justDogs = dogsJulia.slice(1, -2);
 console.log(justDogs);

 // Join both arrays
 const allDogs = justDogs.concat(dogsKate);
 console.log(allDogs);

 // Log ages
 allDogs.forEach(function(val, i) {
  const age = val < 3 ? 'puppy' : 'adult';

  if(val < 3) {
    console.log(`Dog number ${i + 1} is still a ${age}`);
  } else {
    console.log(`Dog number ${i + 1} is an ${age}, and is ${val} years old`);
  }
 });
};

checkDogs(dogsJulia, dogsKate);
console.log('--------');
checkDogs(dogsJulia2, dogsKate2);