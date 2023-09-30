function multiply(numbers, multiplier) {

let multiplied = [];
let index = 0; 

while (index < numbers.length) {
  multiplied.push(numbers[index] * multiplier);
  index += 1;
  }

  return multiplied;
}

let myNumbers = [1, 4, 3, 7, 2, 6];
console.log(multiply(myNumbers, 3)); // => [3, 12, 9, 21, 6, 18]
console.log(myNumbers); 