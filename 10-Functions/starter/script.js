'use strict';

/*
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5:
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123', undefined, 2);



const flight = 'LH234';
const mike = {
  name: 'Miguel Rosendo',
  passport: 1234566798,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 1234566798) {
    console.log('Checked In');
  } else {
    console.log('Wrong Passport');
  }
};

checkIn(flight, mike);
console.log(flight);
console.log(mike);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000);
};

newPassport(mike);
checkIn(flight, mike);



const oneWord = function(str) {
    return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function(str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
}

// Higher-order function
const transformer = function (str, fn) {
    console.log(`Original String: ${str}`);
    console.log(`Treansformed String: ${fn(str)}`);

    console.log(`Transformed by: ${fn.name}`);
}

transformer('JavaScript is the best!', upperFirstWord)

transformer('JavaScript is the best!', oneWord)


// JS Uses callbacks all the time
const high5 = function() {
  console.log('High Five');
}

document.body.addEventListener('click', high5);

const nameArr = ['Jonas', 'Martha', 'Adam'];

nameArr.forEach(high5);



const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');

greeterHey('Jonas');
greeterHey('Mike');

greet('Helloa')('Mike');


// Same thing but with arrow functions
const greet2 = greeting2 => name2 => console.log(`${greeting2} ${name2}`);

greet2('Hola')('Miguel')



const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a sit on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Miguel Rosendo');
lufthansa.book(635, 'Jona Schmid');
console.log(lufthansa);

const eurowings = {
  name: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Does not work
//book(567, 'Peter Parker');

// Call method
book.call(eurowings, 567, 'Peter Parker');

console.log(eurowings);

book.call(lufthansa, 987, 'Donald Trump');

// Apply method
const flightData = [653, 'George Cooper'];
//book.apply(lufthansa, flightData);

book.call(eurowings, ...flightData);

// Bind method
// book.call(eurowings, 567, 'Peter Parker');

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
bookEW(765, 'Stephen Williams');
bookLH(123, 'Johanna Bannana');

const bookLH23 = book.bind(lufthansa, 23);
bookLH23('John Statham');
bookLH23('Bruce Wayne');

// with Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(100));

// Challenge
const addTax2 = function(rate) {
  return function(value) {
    return value + value * rate;
  }
}

const addVat2 = addTax2(0.23);

console.log(addVat2(100))



// Challenge #1

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const input = prompt(
      `${this.question}\n${this.options.join('\n')}\n(Write option number)`
    );

    const number = parseInt(input);

    typeof number === 'number' &&
    isNaN(number) === false &&
    number >= 0 &&
    number <= this.answers.length - 1
      ? this.answers[input]++
      : console.log('input must be a number between 0 and 3');

    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({answers: [5, 2, 3]}, 'string')
poll.displayResults.call({answers: [1, 5, 3, 9, 6, 1]})



const runOnce = function () {
  console.log('This will never run again... SIIIKE');
};

runOnce();
runOnce();

//IIFE
(function () {
  console.log('This will never run again');
})();

(() => console.log('This will ALSO never run again'))();



const secureBooking = function() {
  let passengerCount = 0;

  return function() {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  }
}

const booker = secureBooking();

booker();
booker();
booker();


console.dir(booker)



// Re-assignmt
let f;

const g = function(){
  const a = 23;
  f = function() {
    console.log(a * 2);
  }
}

const h = function() {
  const b = 777;
  f = function() {
    console.log(b * 2);
  }
}

g();
f();

// Re-assigning f function
h();
f();

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function() {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000)

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassengers(180, 3);



// Chalenge

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  const body = document.querySelector('body');
  header.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
*/