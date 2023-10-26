PEDAC Guided Practice: Sort by Most Adjacent Consonants

Given an array of strings, return a new array where the strings are sorted to the highest number of adjacent consonants a particular string contains. If two strings contain the same highest number of adjacent consonants they should retain their original order in relation to each other. Consonants are considered adjacent if they are next to each other in the same word or if there is a space between two consonants in adjacent words.

Step 1: Understand the Problem

input: an array of stirngs 
output: a new array (of strings which are sorted to the highest # of adjacent consonants a particular string contains)

explicit requirements:
  - consonants are considered adjacent if:
    - they're next to each other in the same word OR 
    - if there is a space between two consonants in adjacent workds
  - if two strings contain the same number of adjacent consonants, they should retain their original order in relation to each other
  - in the new/returned array, the strings should be sorted by the highest number of adjacent consonants that each string contains

implicit requirements:
  - strings can contain multiple words
  - single consonants in a string do not affect sort order in comparison to strings with no consonants. Only adjacent consonants affect sort order.

questions:
  - are upper case and lower case consonants considered the same?
  - sorted from low to high or high to low?
  - do strings always contain multiple words?
    - can they be empty?
    - can they contain a single word?
  - can a string contain no adjacent consonants?
  - what is meant by "a space between two consonants in adjacent words"?
  - what role does punctuation play?


Step 2: Examples and test case

console.log(sortStringsByConsonants(['aa', 'baa', 'ccaa', 'dddaa'])); // ['dddaa', 'ccaa', 'aa', 'baa']
console.log(sortStringsByConsonants(['can can', 'toucan', 'batman', 'salt pan'])); // ['salt pan', 'can can', 'batman', 'toucan']
console.log(sortStringsByConsonants(['bar', 'car', 'far', 'jar'])); // ['bar', 'car', 'far', 'jar']
console.log(sortStringsByConsonants(['day', 'week', 'month', 'year'])); // ['month', 'day', 'week', 'year']

observations:
  - the strings do NOT always contain multiple words 
  - a string may contain 0 adjacent consonants 
  - the strings in the array should be sorted highest to lowest # of adjacent consonants
  - a space appears to be: " " 

  - questions not answered from the test cases:
    - does case matter? (for now, assume no)
    - can strings be empty? (for now, assume no)
    - does punctuation matter? (for now, assume no)

Step 3: Data Structures

We'll be working with arrays. It's pssible that we may use an object to track the # of adjacent consonants in each word but this is more of an implementation detail

Step 4: Algorithm

Given an array of strings, return a new array where the strings are sorted to the highest number of adjacent consonants a particular string contains. If two strings contain the same highest number of adjacent consonants they should retain their original order in relation to each other. Consonants are considered adjacent if they are next to each other in the same word or if there is a space between two consonants in adjacent words.



Array-level: 

Part 1: Iterate through 


String-level

Part 1: Determine the # of adjacent consonants in each string in each array

Input: a string
Output: an integer representing a count of the highest number of adjacent consonants in the string

<!-- - initialize a variable to the input array
- initialize a result variable to an empty array?? -->

<!-- - loop through each string in the array  -->

Focus on string level for now (use string test cases instead of the array test cases)
  - remove the whitespace from each string 
  - initialize count to zero
  - initialize a temp string to an empty string

  - loop through each character in each string
    - initialize an index variable to 0 (will be used to iterate through each character)
    - initialize a 'number of adjacent consonants' variable to 0

    - if the character is a consonant:
        - concatenate it to the temp string   
    - if the character is a vowel:
        - if the temp string has a length greater than 1 && has a length greater than the current count, set the count to the length of the temp string 
        - reset the temp string to an empty string / temp string: ""
        

    - reassign count to the length of the temporary string 
    - return count

 Some test cases:
  console.log(countMaxAdjacentConsonants('dddaa')); // 3
  console.log(countMaxAdjacentConsonants('ccaa'));  // 2
  console.log(countMaxAdjacentConsonants('baa'));   // 0
  console.log(countMaxAdjacentConsonants('aa'));    // 0


- need to have a 'previos character was a consonant' and set it to a boolean value?
  - if 'previous character' was a consonant && current character is a consonant, increment  'number of adjacent consonants' by 1
  - if 'previous character' was a consonant && current character is not a consanant, do not increment
 
  
Part 2: Sort the # of adjacent consonants 


Part 3: Return the sorted array
  - reassign the result variable to a new array sorted by the # of consonants in each string 
