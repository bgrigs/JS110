// Practice Problem 9
// Given the following data structure, return a new array with the same structure, but with the values in each subarray ordered -- alphabetically or numerically as appropriate -- in ascending order.

let arr = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];

arr.map(innerArr => {
  if (typeof innerArr[0] === 'string') {
    return innerArr.slice().sort();
  } else {
    return innerArr.slice().sort((a, b) => a - b);
  }
});

