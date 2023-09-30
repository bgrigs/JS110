// Pick out the minimum age from our current Munster family object:

let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

// Using Object.values and sort 
let agesArr = Object.values(ages)

agesArr.sort((a, b) => a - b);
// console.log(agesArr);

let youngest = agesArr[0];
console.log(youngest);

// Maximum age using spread syntax
let oldest = Math.max(...agesArr);
console.log(oldest);


