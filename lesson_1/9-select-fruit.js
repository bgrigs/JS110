let produce = {
  apple: 'Fruit',
  carrot: 'Vegetable',
  pear: 'Fruit',
  broccoli: 'Vegetable'
};

selectFruit(produce); // => { apple: 'Fruit', pear: 'Fruit' }

// My Solution 
function selectFruit(produceList) {
  let fruits = {};

  for (let item in produceList) {
    let itemType = produceList[item];

    if (itemType === "Fruit")  {
      fruits[item] = itemType;
    }
  }

  console.log(fruits);
}

// LS Solution
// function selectFruit(produceList) {
//   let produceKeys = Object.keys(produceList);
//   let selectedFruits = {};

//   for (let counter = 0; counter < produceKeys.length; counter += 1) {
//     let currentKey = produceKeys[counter];
//     let currentValue = produceList[currentKey]

//     if (currentValue === "Fruit") {
//       selectedFruits[currentKey] = currentValue;
//     }
//   }

//   return selectedFruits;
// }