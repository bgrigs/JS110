// Practice Problem 8
// Using the forEach method, write some code to output all vowels from the strings in the arrays. Don't use a for or while loop.

let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};

let vowels = 'aeiou';

Object.values(obj).forEach(element => {
  element.forEach(word => {
    word.split("").forEach(letter => {
      if (vowels.includes(letter)) {
        console.log(letter);
      }
    });
  });
});


