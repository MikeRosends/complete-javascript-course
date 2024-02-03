'use strict';
//console.log(this);

const calcAge = function (birthYear) {
    console.log(2024 -birthYear);
    //console.log(this);
}

calcAge(1998);

const calcAgeArrow = (birthYear) => {
    //console.log(2037 -birthYear);
    //console.log(this);
}

console.log('-=-=-=-=-=-=-=-=-=-=-=');

calcAgeArrow(1991);

const mike = {
    year: 1998,
    calcAge: function() {
        console.log(this);
        console.log(2024 - this.year);
    },
};
mike.calcAge();

const bia = {
    year: 2002,
};

bia.calcAge = mike.calcAge;
bia.calcAge();

const f = mike.calcAge;
f();
