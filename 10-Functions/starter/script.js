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

*/

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a sit on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({flight: `${this.iataCode}${flightNum}`, name})
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