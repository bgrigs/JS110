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
*/

const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const COMPUTER_NAME = 'Computer';
const MATCH_ROUNDS = 3;
const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7]
];

while (true) {
  console.log('Welcome to Tic Tac Toe');
  let humanName = getName();
  displayLineBreak();
  let getsFirstRoundTurn = chooseFirstTurn();
  startMatch(humanName, getsFirstRoundTurn);
  break;
}

console.log('Thank you for playing. Goodbye');

function getName() {
  console.log('What is your first name?');
  let humanName = readline.prompt().trim();

  while (true) {
    if (humanName !== '') {
      break;
    } else {
      console.log('That is an invalid response. Please enter your name');
      humanName = readline.prompt().trim();
    }
  }

  return humanName;
}

function startMatch(humanName, getsFirstRoundTurn) {
  let round = 1;
  let wins =  {
    computer: 0,
    human: 0
  };

  console.log(`${humanName} is ${HUMAN_MARKER}. ${COMPUTER_NAME} is ${COMPUTER_MARKER}`);
  displayLineBreak();
  console.log(`A match of ${MATCH_ROUNDS} rounds has begun!`);
  displayLineBreak();
  playMatch(wins, humanName, getsFirstRoundTurn, round);
}

function playMatch(wins, humanName, getsFirstRoundTurn) {
  let round = 1;

  while (true) {
    if (round <= MATCH_ROUNDS) {
      playRound(wins, humanName, getsFirstRoundTurn, round);
      displayScore(wins, humanName);
      round += 1;
      if (round > MATCH_ROUNDS || playAgain('round')) continue;
      if (playNewMatch(humanName)) continue;
      break;
    }

    if (round > MATCH_ROUNDS) {
      outputResults(undefined, wins, 'match', humanName);
      if (playNewMatch(humanName)) continue;
      break;
    }
    break;
  }
}

function playNewMatch(humanName) {
  if (!playAgain('match')) {
    return false;
  }

  return startMatch(humanName, chooseFirstTurn());
}

function displayScore(wins, humanName) {
  console.log(`Score-card
    -${COMPUTER_NAME}: ${wins['computer']} 
    -${humanName}: ${wins['human']}`);
  displayLineBreak();
}

function displayRound(round) {
  console.log(`*** Round ${round} ***`);
}

function playRound(wins, humanName, getsFirstRoundTurn, round) {
  let board = initializeBoard();
  playGame(board, getsFirstRoundTurn, humanName, round);
  keepScore(detectRoundWinner(WINNING_LINES, board, humanName), wins, humanName);
  outputResults(board, undefined, 'round', humanName);
}


function keepScore(winner, wins, humanName) {
  while (true) {
    if (winner === null) break;

    if (winner === COMPUTER_NAME) {
      wins['computer'] += 1;
      break;
    } else if (winner === humanName) {
      wins['human'] += 1;
      break;
    }
  }
}

function chooseFirstTurn() {
  let getsFirstRoundTurn;
  console.log("Enter 1 if you'd like to go first. Enter 2 if you'd like the computer to go first.");
  let answer = readline.prompt().trim();
  let acceptedAnswers = ['1', '2'];

  while (!acceptedAnswers.includes(answer)) {
    console.log('That is an invalid response. Please enter 1 or 2');
    answer = readline.prompt().trim();
  }


  if (answer === '1') {
    getsFirstRoundTurn = 'human';
  } else if (answer === '2') {
    getsFirstRoundTurn = 'computer';
  }

  return getsFirstRoundTurn;
}

function playGame(board, getsFirstRoundTurn, humanName, round) {
  let roundTurn = {
    firstPlayer: undefined,
    secondPlayer: undefined,
  };

  if (round % 2 === 1) {
    oddRound(getsFirstRoundTurn, roundTurn, board, round);
  } else {
    evenRound(getsFirstRoundTurn, roundTurn, board, round);
  }

  while (true) {
    roundTurn.firstPlayer();
    if (roundOver(board, humanName, round)) break;

    roundTurn.secondPlayer();
    if (roundOver(board, humanName, round)) break;
  }
}

function oddRound(getsFirstRoundTurn, roundTurn, board, round) {
  if (getsFirstRoundTurn === 'human') {
    displayBoard(board, round);
    roundTurn.firstPlayer = () => humanChoosesSquare(board);
    roundTurn.secondPlayer = () => computerChoosesStrategy(board);
  } else if (getsFirstRoundTurn  === 'computer') {
    roundTurn.firstPlayer = () =>  computerChoosesStrategy(board);
    roundTurn.secondPlayer = () => humanChoosesSquare(board);
  }
}

function evenRound(getsFirstRoundTurn, roundTurn, board, round) {
  if (getsFirstRoundTurn  === 'human') {
    roundTurn.firstPlayer = () => computerChoosesStrategy(board);
    roundTurn.secondPlayer = () => humanChoosesSquare(board);
  } else if (getsFirstRoundTurn  === 'computer') {
    displayBoard(board, round);
    roundTurn.firstPlayer = () =>  humanChoosesSquare(board);
    roundTurn.secondPlayer = () => computerChoosesStrategy(board);
  }
}

function roundOver(board, humanName, round) {
  displayBoard(board, round);
  return someoneWonRound(board, humanName) || boardFull(board);
}

function outputResults(board, wins, roundOrMatch, humanName) {
  if (roundOrMatch === 'round' && someoneWonRound(board, humanName)) {
    console.log(`${detectRoundWinner(WINNING_LINES, board, humanName)} won the ${roundOrMatch}!`);
  } else if (roundOrMatch === 'match' && someoneWonMatch(wins, humanName)) {
    displayLineBreak();
    console.log(`${detectMatchWinner(wins, humanName)} won the ${roundOrMatch}!`);
  } else {
    console.log(`The ${roundOrMatch} is tied.`);
  }

  displayLineBreak();
}

function playAgain(roundOrMatch) {
  console.log(`Would you like to start a new ${roundOrMatch}? (Enter y or n)`);
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

function displayBoard(board, round) {
  console.clear();
  displayRound(round);

  displayLineBreak();
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
  displayLineBreak();
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

  console.clear();
}

function filterMarkersInLine(markersInLine, player) {
  return markersInLine.filter(marker => marker === player);
}

function twoInLineAI(markersInLine, player) {
  return filterMarkersInLine(markersInLine, player).length === 2 &&
         markersInLine.includes(INITIAL_MARKER);
}

function oneInLineAI(markersInLine) {
  return filterMarkersInLine(markersInLine, COMPUTER_MARKER).length === 1 &&
         filterMarkersInLine(markersInLine, HUMAN_MARKER).length === 2;
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

function someoneWonRound(board, humanName) {
  return !!detectRoundWinner(WINNING_LINES, board, humanName);
}

function someoneWonMatch(wins, humanName) {
  return !!detectMatchWinner(wins, humanName);
}

function detectRoundWinner(WINNING_LINES, board, humanName) {
  for (let line = 0; line < WINNING_LINES.length; line += 1) {
    if (WINNING_LINES[line].every(square => board[square] === 'X')) return humanName;
    if (WINNING_LINES[line].every(square => board[square] === 'O')) return COMPUTER_NAME;
  }

  return null;
}

function detectMatchWinner (wins, humanName) {
  if (wins['computer'] > wins['human']) {
    return COMPUTER_NAME;
  } else if (wins['computer'] < wins['human']) {
    return humanName;
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

function displayLineBreak() {
  console.log("");
}