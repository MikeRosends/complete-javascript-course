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

const displayMovements = function (movements, sort = false) {
  // first empty the container
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;

    // afterbegin defines the order in which the data appears
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);

  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const user = 'Steven Thomas Williams'; // username: stw
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createUsernames(accounts);

accounts;

const updateUI = function (acc) {
  // Display movments
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// EVENT HANDLERS
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submiting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();

    // UpdateUI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);

  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = '';
  inputTransferTo.value = '';

  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    // Update Ui
    updateUI(currentAccount);
  }
});

// Only grants a loan if there is at least one deposit
// with at least 10% of requested loan amount
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete Account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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


// CHALLENGE #1
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



// MAP
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUSD = 1.1;

const movmentsUSD = movements.map(mov => mov * euroToUSD);

console.log(movements);
console.log(movmentsUSD);

// Same thing but extra steps
const movUSDfor = [];
for (const mov of movements) {
  movmentsUSD.push(mov * movUSDfor);
}

console.log(movUSDfor);

const movementsDescriptions = movements.map((mov, i) => {
  const operation = mov > 0 ? 'deposited' : 'withdrew';

  return `Movment ${i + 1}: You ${operation} ${mov}`;
});
console.log(movementsDescriptions);


// FILTER
const deposits = account1.movements.filter(function(currElement) {
  return currElement > 0
})

console.log(account1.movements);
console.log(deposits);

const withdrawals = account1.movements.filter(currElem => currElem < 0)

console.log(withdrawals);


// REDUCE
console.log(account1.movements);

// Accumulator -> Snowball
const balance = account1.movements.reduce(
  (accumulator, currVal) => accumulator + currVal,
  160
);

// console.log(balance);

// Maximum Value
const maxValue = account1.movements.reduce(function(acc, cur, i, arr) {
  if (acc > cur) {
    return acc;
  } else return cur
}, account1.movements[0])

console.log(maxValue);

// CHALLENGE #1
const ages = [5, 2, 4, 1, 15, 8, 3];
const calcAverageHumanAge = function(ages) {
  const humanAges = ages.map(age => age <= 2 ? age * 2 : 16 + age * 4);
  console.log(humanAges);

  const adultDogs = humanAges.filter(cur => cur >= 18);
  console.log(adultDogs);

  const averageAdultAges = adultDogs.reduce((acc, cur, i, arr) => acc + cur, 0) / adultDogs.length;
  return averageAdultAges;
}

console.log(calcAverageHumanAge(ages));


const movements = account1.movements;
const euroToUSD = 1.1;
console.log(movements);

const totalDeposit = movements
  .filter(mov => mov < 0)
  .map((mov, i, arr) => {
    console.log(arr);
    return mov * euroToUSD;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDeposit);


// CHALLENGE #2
const ages2 = [5, 2, 4, 1, 15, 8, 3];
let reducedArray;

const calcAverageHumanAge2 = ages => {
  const humanAges =
    ages
      .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
      .filter(cur => cur >= 18)
      .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
      console.log(humanAges);
};

calcAverageHumanAge2(ages2);



// FIND - only returns one element and not an array
const movements = account1.movements;

const firstWithdrawal = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis')
console.log(account);
*/

const movements = account1.movements;
/*
console.log(movements);

// INCLUDES: EQUALITY
console.log(movements.includes(-130));

// SOME: CONDITION 
console.log(movements.some(mov => mov === -130));
console.log(movements.some(mov => mov > 1500));

// EVERY - if all elements pass the condition
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

// FLAT
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // 2 - levels of nesting

// Using MAP and FLAT is very often used
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// FLATMAP - only goes one level deep
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);


// SORT - mutates original array
// strings
const owners = ['Jonas', 'Zack', 'Adam', 'Martha'];
console.log(owners.sort());

// numbers
console.log(movements);
// return < 0 -> A, B (keep order)
// return > 0 -> B, A (switch order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
movements.sort((a, b) => a - b) // if it returns a negative number the order stays the same
console.log(movements);

// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });
movements.sort((a, b) => b - a)
console.log(movements);

// Creates an array with 7 empty elements
const x = new Array(7);
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// FILL - mutates original
x.fill(1, 3, 5);
x.fill(1); // example 1
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// ARRAY.FROM - (same as example 1, but nicer)
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1); // values from 1 - 7
console.log(z);

const randomDiceRolls = Array.from({ length: 100 }, () =>
  Math.ceil(Math.random() * 6)
);
// console.log(randomDiceRolls);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  console.log(movementsUI);
});



// 1.
const bankDepositsSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur);

console.log(bankDepositsSum);

// 2.
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? sums.deposits += cur : sums.withdrawals += cur;
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

// 4.
// convert any string to title case
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {

  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exceptions.includes(word) ? word : capitalize(word))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is LONG title but not to long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

// CHALENGE 4#

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(dog => (dog.recomendedFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);

if (
  dogSarah.curFood > dogSarah.recomendedFood * 0.9 &&
  dogSarah.curFood < dogSarah.recomendedFood * 1.1
) {
  console.log('Eating the recomended amount');
} else {
  console.log('Not eating the recomended amount');
}

// 3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recomendedFood)
  .flatMap(dog => dog.owners);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recomendedFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

// 4.
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too little!`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recomendedFood));

// 6.
const checkEatingOk = dog =>
  dog.curFood > dog.recomendedFood * 0.9 && dog.curFood < dog.recomendedFood * 1.1;
console.log(dogs.some(checkEatingOk));

// 7.
console.log(dogs.filter(checkEatingOk));

// 8.
const dogsSorted = dogs.slice().sort((a, b) => a.recomendedFood - b.recomendedFood);
console.log(dogsSorted);