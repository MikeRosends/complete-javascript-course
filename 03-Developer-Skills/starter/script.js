// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/* const temps1 = [3, 4, -5, -3, 'error', 10, 19, -2, 12, 9, 5];

const calcTempAmplitude = function (temps) {
  let max = temps1[0];
  let min = temps1[0];
  for (let i = 0; i < temps1.length; i++) {
    const currentTemp = temps1[i];
    if (typeof currentTemp !== 'number') continue;

    if (currentTemp > max) max = currentTemp;
    if (currentTemp < min) min = currentTemp;
  }

  const amplitude = max - min;
  return amplitude;
};

calcTempAmplitude(temps1); */

// now with two arrays:
/* const calcTempAmplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2);

  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const currentTemp = temps[i];
    if (typeof currentTemp !== 'number') continue;

    if (currentTemp > max) max = currentTemp;
    if (currentTemp < min) min = currentTemp;
  }

  const amplitudeNew = max - min;
};

calcTempAmplitudeNew([3,5,1], [9,0,5]);
 */
/* 
const measreKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'cels',
    // value: Number(prompt('Degrees celscius:'))
    value: 10,
  };

//   console.table(measurement);

//   console.log(measurement.value);
  const kelvin = measurement.value + 273;
//   return kelvin;
};

console.log(measreKelvin());


// Using a debugger (The lowest temp in the array is not lower then the starting temp
const calcTempAmplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2);

  let max = 0;
  let min = 0;
  for (let i = 0; i < temps.length; i++) {
    const currentTemp = temps[i];
    if (typeof currentTemp !== 'number') continue;

    if (currentTemp > max) max = currentTemp;
    if (currentTemp < min) min = currentTemp;
  }

  console.log(max, min);

  return max, min;
};

const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
// IDENTIFY BUG
console.log(amplitudeBug);
 */

// NEW PROBLEM:
// DISPLAY THE INDEXES OF THE ARRAY IN A STRING

// 1) LOOP THROUGH THE ARRAY

// 2) GET EACH ITERATION REGISTERED INTO A STRING
// SAVE EACH ITERATION INTO A VARIABLE
// 2.1) WHAT IF YOU DONT KNOW THE NUMBER OF ITEMS IN THE ARRAY?
// HAVE AN INITIAL STRING WITH NOTHING AND WITH EACH ITERATION THE NEW CONTENT
// IS CONCATENATED

// 3) PRINT THE STRING

const arr1 = [17, 21, 23];
const arr2 = [12, 5, -5, 0, 4]


let newString = '';
let forecastString = '';

loop(arr1);

loop(arr2);

function loop(arr) {
    let string = '... ';
    for (let i = 0; i < arr.length; i++) {
        let days = i + 1;
        string = string + `${arr[i]}ºC in ${days} days ...`; 
      }
      console.log(` - ${string}`);
}


