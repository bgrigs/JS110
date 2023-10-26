// Practice Problem 17
// A UUID is a type of identifier often used to uniquely identify items, even when some of those items were created on a different server or by a different application. That is, without any synchronization, two or more computer systems can create new items and label them with a UUID with no significant risk of stepping on each other's toes. It accomplishes this feat through massive randomization. The number of possible UUID values is approximately 3.4 X 10E38, which is a huge number. The chance of a conflict is vanishingly small with such a large number of possible values.

// Each UUID consists of 32 hexadecimal characters (the digits 0-9 and the letters a-f) represented as a string. The value is typically broken into 5 sections in an 8-4-4-4-12 pattern, e.g., 'f65c57f6-a6aa-17a8-faa1-a67f2dc9fa91'.

// Write a function that takes no arguments and returns a string that contains a UUID.

function makeUUID() {
  let UUIDArr = [];
  let section1 = addCharacter(8)
  let section2 = addCharacter(4)
  let section3 = addCharacter(4)
  let section4 = addCharacter(4)
  let section5 = addCharacter(12)

  UUIDArr.push(section1, section2, section3, section4, section5);
  let UUID = UUIDArr.join('-')
  return UUID; 
}

function addCharacter(length) {
  let string = '';
  for (let i = 0; i < length; i += 1) {
    string += randomCharacter();
  }

  return string; 
}

function randomCharacter() {
  let characters = 'abcdef0123456789';
  let charactersLength = characters.length;
  return characters[[Math.floor(Math.random() * charactersLength)]];
}

console.log(makeUUID());