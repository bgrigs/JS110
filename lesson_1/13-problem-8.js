//Write a program that uses this array to create an object where the names are the keys and the values are the positions in the array
// { Fred: 0, Barney: 1, Wilma: 2, Betty: 3, Pebbles: 4, Bambam: 5 }

let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];

let flintstonesObj = {};

//Using a for loop 
// for (let position = 0; position < flintstones.length; position += 1) {
//   let flintstone = flintstones[position];
//   flintstonesObj[flintstone] = position;
//   console.log(flintstonesObj);
// }

// Using forEach
flintstones.forEach((name, index) => {
  flintstonesObj[name] = index;
})

console.log(flintstonesObj);

