// Another way to do it would be to use the Object.values method along with forEach or a loop:

let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};

let totalMaleAge = 0; 

Object.values(munsters).forEach(munster => {
  if (munster.gender === 'male') {
    totalMaleAge += munster.age;
  }
});
console.log(totalMaleAge);

