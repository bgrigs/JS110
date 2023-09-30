let statement = "The Flintstones Rock";

// Using split/join/split
// let letters = statement.split(" ").join("").split("");

// Using split and filter
let letters = statement.split("").filter(char => char !== ' ');

let letterCount = {};

// Using forEach twice
// letters.forEach(letter => { 
//   letterCount[letter] = 0; 
// });

// letters.forEach(letter => {
//   if (letters.includes(letter)) {
//     letterCount[letter] += 1;
//   }
// })

// Using one forEach with an if statement
// letters.forEach(letter => {
//   if (Object.keys(letterCount).includes(letter)) {
//     letterCount[letter] += 1; 
//   } else {
//     letterCount[letter] = 1; 
//   }
// });

// Using forEach and short-circuiting
letters.forEach(letter => {
  letterCount[letter] = letterCount[letter] || 0;
  letterCount[letter] += 1; 
});

// Using a for loop
// for (let counter = 0; counter < statement.length; counter += 1) {
//   let char = statement[counter];
//   if (char === ' ') continue; 

//   letterCount[char] = letterCount[char] || 0;
//   letterCount[char] += 1;
// }

console.log(letterCount);
