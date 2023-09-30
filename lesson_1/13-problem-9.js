// Add up all of the ages from the Munster family object:

let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

let ageTotal = 0;
// let ageArr = Object.values(ages);

// ageArr.forEach(age => {
//   ageTotal += age;
// })

// Using method chaining:
// Object.values(ages).forEach(age => ageTotal += age);

// console.log(ageTotal);

// Using reduce

ageTotal = Object.values(ages).reduce((agesSum, currAge) => agesSum + currAge, 0); // 6174

console.log(ageTotal);