/*
Display the initial empty 3x3 board.
Ask the user to mark a square.
Computer marks a square.
Display the updated board state.
If it's a winning board, display the winner.
If the board is full, display tie.
If neither player won and the board is not full, go to #2
Play again?
If yes, go to #1
Goodbye!


Keeping score
A match is 2 or more games
A match is won when someone wins 5 games
A global var for the # of games needed to win is okay but but no other global vars
---Not sure how to do this without a global variable.
---If I set a local variable in a function and initialize it to 0 won't it constantly be reset to 0 every time the function is called?

*/


const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const winningLines = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7]
];

while (true) {
  let board = initializeBoard();
  playGame(board);
  displayBoard(board);
  outputResults(board);

  if (!playAgain()) {
    console.log('Thank you for playing. Goodbye');
    break;
  }
}

function playGame(board) {
  while (true) {
    displayBoard(board);

    playerChoosesSquare(board);
    if (someoneWon(board) || boardFull(board)) break;

    let squareToDefend = findAtRiskSquareAI(winningLines, board);
    computerChoosesSquare(board, squareToDefend);
    if (someoneWon(board) || boardFull(board)) break;
  }
}

function outputResults(board) {
  if (someoneWon(board)) {
    console.log(`${detectWinner(winningLines, board)} won!`);
  } else {
    console.log("It's a tie.");
  }
}

function playAgain() {
  console.log('Would you like to play again? (Enter y or n)');

  let answer = readline.prompt().toLowerCase().trim();
  let acceptedAnswers = ['y', 'yes', 'n', 'no'];

  while (true) {
    if (acceptedAnswers.includes(answer)) {
      break;
    } else {
      console.log('That is an invalid response. Please enter y or n');
      answer = readline.prompt().toLowerCase().trim();
    }
  }

  return answer === 'y' || answer === 'yes';
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square += 1) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function displayBoard(board) {
  // console.clear();
  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`);


  console.log("");
  console.log('     |     |     ');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}  `);
  console.log('     |     |     ');
  console.log('-----+-----+-----');
  console.log('     |     |     ');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}  `);
  console.log('     |     |     ');
  console.log('-----+-----+-----');
  console.log('     |     |     ');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}  `);
  console.log('     |     |     ');
}

function emptySquares(board) {
  return Object.keys(board)
    .filter(key => board[key] === INITIAL_MARKER);
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function playerChoosesSquare(board) {
  let square;

  while (true) {
    console.log(`Choose a square ${joinOr(emptySquares(board))}:`);
    square = readline.prompt().trim();

    if (emptySquares(board).includes(square)) break;

    console.log('That is not a valid choice. Please try again.');
  }

  board[square] = HUMAN_MARKER;
}

function computerChoosesSquare(board, squareToDefend) {
  let square;

  if (squareToDefend !== undefined) {
    square = squareToDefend;
  } else {
    let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
    console.log(`randomIndex is ${randomIndex} which is ${typeof randomIndex}`);
    square = emptySquares(board)[randomIndex];
  }

  board[square] = COMPUTER_MARKER;
}

function someoneWon(board) {
  return !!detectWinner(winningLines, board);
}

function detectWinner(winningLines, board) {
  for (let line = 0; line < winningLines.length; line += 1) {
    if (winningLines[line].every(square => board[square] === 'X')) return 'You';
    if (winningLines[line].every(square => board[square] === 'O')) return 'Computer';
  }

  return null;
}

function joinOr(arr, punctuation = ', ', word = 'or') {
  switch (arr.length) {
    case 0:
      return '';
    case 1:
      return `${arr[0]}`;
    case 2:
      return arr.join(` ${word} `);
    default:
      return arr.slice(0, arr.length - 1).join(`${punctuation}`) +
            ` ${word} ${arr[arr.length - 1]}`;
  }
}

function findAtRiskSquareAI(winningLines, board) {
  let squareToDefend;

  for (let lineIndex = 0; lineIndex < winningLines.length; lineIndex += 1) {
    let line = winningLines[lineIndex];
    let humanMarkersinLine = 0;

    for (let squareIndex = 0; squareIndex < line.length; squareIndex += 1) {
      let square = line[squareIndex];
      if (board[square] === 'X') humanMarkersinLine += 1;
      if (humanMarkersinLine > 1) {
        let findAtRiskSquare = line.filter(square => board[square] === INITIAL_MARKER);
        squareToDefend = findAtRiskSquare[0];
        console.log(`defend ${squareToDefend}. this is a ${typeof squareToDefend}`);
        break;
      }
    }

    if (squareToDefend !== undefined) break;
  }

  return squareToDefend;
}


