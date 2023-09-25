/*
1. Start with: 
  - A count of the 'number of blocks remaining' equal to the input
  - A count of the 'current layer' equal to 0
2. Calculate the number for the 'next layer' by adding 1 to the value for the 'current layer'
3. Using the number for the 'next layer', calculate the 'number of blocks required' to build that layer, by multiplying the number by itself
4. Determine if the 'number of blocks remaining' is greater than or equal to the 'number of blocks required' to build the layer
  - If it is:
    - Subtract the 'number of blocks required' from the 'number of blocks remaining' 
    - Increment the 'current layer' by 1
    - Go back to Step 2
  - If it isn't:
    - Return the 'number of blocks remaining'

Step 1: variable initialization
Step 2-4: loop and a conditional statement on step 4
  - Use a `while` loop?
  - For the condition, check if 'number of blocks remaining' is greater than or equal to the 'number of blocks required'

- Calculating the blocks for the next layer, use `**` operator?
  - E.g. `(currentLayer + 1)**2`

*/


function calculateLeftoverBlocks(blocks) {
  let blocksRemaining = blocks;
  let currentLayer = 0; 

  let blocksRequired = (currentLayer + 1) ** 2; 

  while (blocksRemaining >= blocksRequired) {
    blocksRemaining -= blocksRequired; 
    currentLayer += 1;
    blocksRequired = (currentLayer + 1) ** 2; 
  }

  return blocksRemaining;
}

console.log(calculateLeftoverBlocks(0) === 0); 
console.log(calculateLeftoverBlocks(1) === 0);
console.log(calculateLeftoverBlocks(2) === 1);
console.log(calculateLeftoverBlocks(4) === 3);
console.log(calculateLeftoverBlocks(5) === 0);
console.log(calculateLeftoverBlocks(6) === 1);
console.log(calculateLeftoverBlocks(14) === 0); 

