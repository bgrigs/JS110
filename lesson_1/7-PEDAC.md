Leftover Blocks

You have a number of building blocks that can be used to build a valid structure. There are certain rules about what determines the validity of a structure:

- The building blocks are cubes
- The structure is built in layers
- The top layer is a single block
- A block in an upper layer must be supported by four blocks in a lower layer
- A block in a lower layer can support more than one block in an upper layer
- You cannot leave gaps between blocks

Write a program that, given the number for a specific amount of cubes, calculates the number of blocks left over after building the tallest possible valid structure.

You are provided with the problem description above. Your tasks for this step are:

To make notes of your mental model for the problem, including explicit and implicit rules
Write a list of questions for things that aren't clear about the problem from the description provided

Step 1: Understand the Problem

input: number (specific amount of cubes)
output: number (number of leftover blocks after building tallest possible valid structure)

rules:
  explicit requirements:
    - structures are built with blocks
      - blocks are cubes
      - cubes are six-sided, have square faces, and equal lengths on all sides
    - must accept a number
    - top layer is a single block
    - a block in an upper layer must be supported by four blocks in a lower layer 
    - a block in a lower layer can support more than one block in an upper layer
    - there can be no gaps in between blocks
    - output will be calculated based on the # of blocks left over after building the tallest possible valid structure 

  implicit requirements:
    - layer number correlates with blocks in a layer
      - layer number x layer number = # of blocks in a layer
    

Questions:
- how do we determine if a structure is valid?
- is a lower layer still valid if it has more blocks than it needs?
- will there always be left-over blocks?


Step 2: Examples and Test Cases

console.log(calculateLeftoverBlocks(0) === 0); //true
  - 0 block leftoever since 0 were provided.

console.log(calculateLeftoverBlocks(1) === 0); //true
  - 0 leftover. 1 block appears to be an acceptable/valid structure. 

console.log(calculateLeftoverBlocks(2) === 1); //true
  - 1 is leftover because an upper layer must have at least   four blocks beneath it.

console.log(calculateLeftoverBlocks(4) === 3); //true
  - it appears that while an upper layer must have at least four blocks beneath it, a layer of 1 needs no more than 4 blocks. Perhaps the layers must all be squared (aka 2 by 2, 3 by 3, etc.)?

console.log(calculateLeftoverBlocks(5) === 0); //true
  - 5 blocks would be divided into two layers. One layer of one block and one layer of 2 by 2 (4 blocks)

console.log(calculateLeftoverBlocks(6) === 1); //true
  - there aren't enough blocks to form a third block that is 3 by 3. Thus, one block is leftover

console.log(calculateLeftoverBlocks(14) === 0); //true
  - there are sufficient blocks for 3 layers. 1 block at the top, four blocks on the second layer (2 by 2), and 9 blocks on the 3rd layer (3 by 3)

Questions answered: 
  - there will not always be leftover blocks (some of the test cases show 0 leftover blocks)
  - a structure is valid when its layer number is squared (aka layer 2 is 2 by 2 which is 4 blocks, layer 3 is 3 by 3 which is 9 blocks, and so on)
  - a structre is not valid if it has more blocks than it needs (according to the test cases, if we have 6 blocks for example and the second layer only needs 4 blocks, the extra block won't be used to make the layer larger)

Step 3: Data Structures

- Perhaps use a nested array to represent the structure?
	- Each subarray could represent a layer

[
	['x'],
	['x', 'x', 'x', 'x'],
	['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
	...
]

Step 4: Algorithm
1. Build the structure one layer at a time until you no longer have enough blocks left to build a 'valid' layer.
2. Count how many blocks you have left.

- The smallest valid layer (the topmost layer) is comprised of one block.
- There is a direct relationship between the layer 'number' and the number of blocks in that layer: layer 1 is a 1x1 square (i.e a single block), layer 2 is a 2x2 square (i.e 4 blocks), etc. So as long as we keep track of which number layer we are building, we can calculate the number of blocks needed to build it.

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

Let's check the 3rd test case using this algorithm, i.e: 
  console.log(calculateLeftoverBlocks(2) === 1); //true

Step 1:
  - 'number of blocks remaining' will be equal to the input 2
  - 'current layer' is equal to 0
Step 2:
  - the 'next layer' is calculated by adding 1 to 'current layer' ('next layer' is now equal to 1)
Step 3:
  - the 'number of blocks required' is calculated by multiplying the 'next layer' by itself. 1 x 1 = 1
Step 4:
  - calculate if 'number of blocks remaining' (which is 2) is greater than or equal to the 'number of blocks required' (1)
    -It is, so:
      - Subtract the 'number of blocks required' (1) from the 'number of blocks remaining' (2). 'number of blocks remaining' is now 1.
      - Increment the 'current layer' by 1 (current layer is now 1)

      - Go back to Step 2
        - the 'next layer' is calculated by adding 1 to 'current layer' (next layer is now equal to 2)
        - Step 3
          - the 'number of blocks required' is calculated by multiplying 'next layer' by itself. 2 x 2 = 4
         - Step 4
          - calculate if 'number of blocks remaining' (which is now 1) is greater than or equal to the 'number of blocks required'
            - It is not, so:
              - return the 'number of blocks remaining'







