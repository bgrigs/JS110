/* Array level / sorting
- Ensure correct order of arguments in the callback
    to `sort` to produce a descending order


*/ 

// String level
//   - remove the whitespace from each string  

//   - initialize count to zero
//   - initialize a temp string to an empty string

//   - loop through each character in each string
//     - initialize an index variable to 0 (will be used to iterate through each character)
//     - initialize a 'number of adjacent consonants' variable to 0

//     - if the character is a consonant:
//         - concatenate it to the temp string   
//         - if the temp string has a length greater than 1 && has a length greater than the current count, set the count to the length of the temp string 
//     - if the character is a vowel:
//       
//         - reset the temp string to an empty string 
        

//     - reassign count to the length of the temporary string 
//     - return count

function sortStringsByConsonants(strings) {
  let stringsCopy = strings.slice();

  let sortedStrings = stringsCopy.sort((a, b) => {
    return countMaxAdjacentConsonants(b) - countMaxAdjacentConsonants(a);
  });

  return sortedStrings;
}

function countMaxAdjacentConsonants(string) {
  let count = 0;
  let tempString = "";
  string = string.split(" ").join("");

  for (let index = 0; index < string.length; index += 1) {
    let letter = string[index];

    if ('bcdfghjklmnpqrstvwxyz'.includes(letter)) {
      tempString += letter;
      if ((tempString.length > 1) && (tempString.length > count)) {
        count = tempString.length;  
      }
    } else {
      tempString = ""
    }
  } 

  return count; 
}


// String-level test cases
// console.log(countMaxAdjacentConsonants('dddaa')); // 3
// console.log(countMaxAdjacentConsonants('ccaa'));  // 2
// console.log(countMaxAdjacentConsonants('baa'));   // 0
// console.log(countMaxAdjacentConsonants('aa'));    // 0
// console.log(countMaxAdjacentConsonants('dd'));    // 2


// Array-level test cases
console.log(sortStringsByConsonants(['aa', 'baa', 'ccaa', 'dddaa'])); // ['dddaa', 'ccaa', 'aa', 'baa']
console.log(sortStringsByConsonants(['can can', 'toucan', 'batman', 'salt pan'])); // ['salt pan', 'can can', 'batman', 'toucan']
console.log(sortStringsByConsonants(['bar', 'car', 'far', 'jar'])); // ['bar', 'car', 'far', 'jar']
console.log(sortStringsByConsonants(['day', 'week', 'month', 'year'])); // ['month', 'day', 'week', 'year']