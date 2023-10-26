// Practice Problem 5
// Consider the following nested object. Compute and display the total age of the male members of the family.

let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};

let totalMaleAge = 0;

for (let name in munsters) {
  if (munsters[name]['gender'] === 'male') {
    totalMaleAge += munsters[name]['age'];
  }
}

console.log(totalMaleAge);