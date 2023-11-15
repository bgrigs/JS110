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
const FIRST_TURN = 'choose';
const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7]
];

function chooseFirstTurn() {
  let getsFirstTurn;
  console.log("Welcome to Tic Tac Toe. Enter 1 if you'd like to go first. Enter 2 if you'd like the computer to go first.");
  let answer = readline.prompt().trim();
  let acceptedAnswers = ['1', '2'];

  while (true) {
    if (acceptedAnswers.includes(answer)) {
      break;
    } else {
      console.log('That is an invalid response. Please enter 1 or 2');
      answer = readline.prompt().trim();
    }
  }

  if (answer === '1') {
    getsFirstTurn = 'human';
  } else if (answer === '2') {
    getsFirstTurn = 'computer';
  }

  return getsFirstTurn;
}

while (true) {
  let board = initializeBoard();
  let getsFirstTurn;

  switch (FIRST_TURN) {
    case 'choose':
      getsFirstTurn = chooseFirstTurn();
      break;
    case 'human':
      getsFirstTurn = 'human';
      break;
    case 'computer':
      getsFirstTurn = 'computer';
  }

  displayBoard(board);
  playGame(board, getsFirstTurn);
  outputResults(board);

  if (!playAgain()) {
    console.log('Thank you for playing. Goodbye');
    break;
  }
}

function playGame(board, getsFirstTurn) {
  let firstPlayer;
  let secondPlayer;

  if (getsFirstTurn === 'human') {
    firstPlayer = () => humanChoosesSquare(board);
    secondPlayer = () => computerChoosesStrategy(board);
  } else if (getsFirstTurn === 'computer') {
    firstPlayer = () =>  computerChoosesStrategy(board);
    secondPlayer = () => humanChoosesSquare(board);
  }

  while (true) {
    firstPlayer();
    if (gameOver(board)) break;

    secondPlayer();
    if (gameOver(board)) break;
  }
}

function gameOver(board) {
  displayBoard(board);
  return someoneWon(board) || boardFull(board);
}

function outputResults(board) {
  if (someoneWon(board)) {
    console.log(`${detectWinner(WINNING_LINES, board)} won!`);
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

  console.clear();
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
  console.clear();
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
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function humanChoosesSquare(board) {
  let square;

  while (true) {
    console.log(`Choose a square ${joinOr(emptySquares(board))}:`);
    square = readline.prompt().trim();

    if (emptySquares(board).includes(square)) break;
    console.log('That is not a valid choice. Please try again.');
  }

  board[square] = HUMAN_MARKER;
}

function computerChoosesStrategy(board) {
  let squareToWin;
  let squareToDefend;
  let squareToTwoInLine;

  for (let lineIndex = 0; lineIndex < WINNING_LINES.length; lineIndex += 1) {
    let line = WINNING_LINES[lineIndex];
    let markersInLine = line.map(square => board[square]);
    if (twoInLineAI(markersInLine, COMPUTER_MARKER)) {
      squareToWin = findAtRiskSquareAI(line, board);
    } else if (twoInLineAI(markersInLine, HUMAN_MARKER)) {
      squareToDefend = findAtRiskSquareAI(line, board);
    } else if (oneInLineAI(markersInLine)) {
      squareToTwoInLine = chooseSecondSquareInLineAI(line, board);
    }
  }

  computerChoosesSquare(squareToWin, squareToDefend, squareToTwoInLine, board);
}

function computerChoosesSquare(squareToWin, squareToDefend, squareToTwoInLine, board) {
  if (squareToWin) {
    board[squareToWin] = COMPUTER_MARKER;
  } else if (squareToDefend) {
    board[squareToDefend] = COMPUTER_MARKER;
  } else if (board['5'] === INITIAL_MARKER)  {
    board['5'] = COMPUTER_MARKER;
  } else if (squareToTwoInLine) {
    board[squareToTwoInLine] = COMPUTER_MARKER;
  } else {
    let randomIndex = getRandomIndex(emptySquares(board));
    let randomSquare = emptySquares(board)[randomIndex];
    board[randomSquare] = COMPUTER_MARKER;
  }
}

function twoInLineAI(markersInLine, player) {
  return markersInLine.filter(marker => marker === player).length === 2 &&
         markersInLine.includes(INITIAL_MARKER);
}

function oneInLineAI(markersInLine) {
  return markersInLine.filter(marker => marker === COMPUTER_MARKER).length === 1 &&
         markersInLine.filter(marker => marker === INITIAL_MARKER).length === 2;
}

function findAtRiskSquareAI(line, board) {
  return line.find(square => board[square] === INITIAL_MARKER);
}

function chooseSecondSquareInLineAI(line, board) {
  let emptySpacesInLine = line.filter(square => board[square] === INITIAL_MARKER);
  let randomIndex = getRandomIndex(emptySpacesInLine);
  return emptySpacesInLine[randomIndex];
}

function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

function someoneWon(board) {
  return !!detectWinner(WINNING_LINES, board);
}

function detectWinner(WINNING_LINES, board) {
  for (let line = 0; line < WINNING_LINES.length; line += 1) {
    if (WINNING_LINES[line].every(square => board[square] === 'X')) return 'You';
    if (WINNING_LINES[line].every(square => board[square] === 'O')) return 'Computer';
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