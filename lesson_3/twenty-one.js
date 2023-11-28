/*
1. Initialize deck
2. Deal cards to player and dealer
  - deal a hand of two cards (random)
    - deck[randomSuit][1].splice(randomCard, 1);
  - player can see their two cards
  - player can only see one of the dealer's cards
  - count the value of the cards
    - if the card value is 2-10, add it to cardValue
    - if the card is J, Q, or K, add 10
    - if the card is A, add 11
    - if the hand value is over 21 and the hand contains an ace, subtract 10
3. Player turn: hit or stay
   - repeat until bust or stay
4. If player bust, dealer wins.
5. Dealer turn: hit or stay
   - repeat until total >= 17
6. If dealer busts, player wins.
7. Compare cards and declare winner.


Add:
  - add validation for startRound
*/

const readline = require('readline-sync');
const PLAYER_NAME = 'Player';
const DEALER_NAME = 'Dealer';
const GOAL_POINTS = 21;
const CARDS_INITIAL_HAND = 2;
const CARDS_HIT = 1;
const WORTH_10 = ['J', 'Q', 'K'];
const FACE_VALUE = 10;
const ACE_VALUE = 11;
const POINTS_TO_WIN = 3;
const DEALER_MIN = 17;

console.log('Welcome to Twenty-One');

while (true) {
  let scorecard = startMatch();
  playMatch(scorecard);

  console.log(scorecard);

  if (!playAgain()) {
    console.log('Thank you for playing Twenty-One. Goodbye.');
    break;
  }
}

function startMatch() {
  let scorecard = {
    Player: 0,
    Dealer: 0
  };

  return scorecard;
}

function playMatch(scorecard) {
  let round = 1;

  while (scorecard[PLAYER_NAME] < POINTS_TO_WIN && scorecard[DEALER_NAME] < POINTS_TO_WIN) {
    if (!askStartRound(round)) break;
    console.clear();
    playGame(scorecard);
    round += 1;
    displayLineBreak();
    console.log(scorecard);
  }
}

function askStartRound(round) {
  console.log(`Press enter when you are ready to start Round ${round}. Press 'q' to quit.`);
  let answer = readline.prompt().trim().toLowerCase();

  while (true) {
    if (answer === 'q' || answer === 'quit') {
      return false;
    } else if (answer === '') {
      return true;
    } else {
      console.log(`Invalid answer. Press enter to start the round or press 'q' to quit.`);
      answer = readline.prompt().trim().toLowerCase();
    }
  }
}

function playGame(scorecard) {
  let deck = initializeDeck();
  let playerCards = [];
  let dealerCards = [];
  let playerHandValue = () => countHandValue(playerCards);
  let dealerHandValue = () => countHandValue(dealerCards);

  deal(playerCards, dealerCards, deck);
  showBothHands(playerCards, playerHandValue, dealerCards);

  playerTurn(playerHandValue, playerCards, deck, dealerCards, scorecard);
  let playerFinalHandValue = playerHandValue();
  checkDealerTurn(playerFinalHandValue, dealerHandValue, dealerCards, deck, scorecard);
  let dealerFinalHandValue = dealerHandValue();

  // game results will already have displayed via playerTurn and checkDealerTurn functions if a bust or win of 21 has occured.
  if (playerFinalHandValue !== GOAL_POINTS && !bust(playerFinalHandValue) && !bust(dealerFinalHandValue)) {
    displayGameResults(playerCards, dealerCards, playerFinalHandValue, dealerFinalHandValue, scorecard);
  }
}

function showBothHands(playerCards, playerHandValue, dealerCards) {
  displayAllCards(PLAYER_NAME, playerCards, playerHandValue());
  displayDealerCard(dealerCards);
}

function revealFinalHands(playerCards, dealerCards, playerHandValue, dealerHandValue) {
  displayAllCards(PLAYER_NAME, playerCards, playerHandValue);
  displayAllCards(DEALER_NAME, dealerCards, dealerHandValue);
}

function determineWinner(playerHandValue, dealerHandValue) {
  let winner;
  if (playerHandValue > dealerHandValue) {
    winner = PLAYER_NAME;
  } else if (dealerHandValue > playerHandValue) {
    winner = DEALER_NAME;
  } else {
    winner = null;
  }

  return winner;
}

function checkDealerTurn(playerFinalHandValue, dealerHandValue, dealerCards, deck, scorecard) {
  if (!bust(playerFinalHandValue) && playerFinalHandValue !== GOAL_POINTS) {
    dealerTurn(dealerHandValue, dealerCards, deck, scorecard);
  }
}

function playerTurn(playerHandValue, playerCards, deck, dealerCards, scorecard) {
  while (true) {
    if (bust(playerHandValue())) {
      outputLoser(PLAYER_NAME, 'busted', DEALER_NAME);
      scorecard[DEALER_NAME] += 1;
      break;
    }

    if (playerHitOrStay() === 'hit') {
      hit(playerCards, deck);
      console.clear();
      showBothHands(playerCards, playerHandValue, dealerCards);
    } else if (playerHandValue() === GOAL_POINTS) {
      displayAllCards(PLAYER_NAME, playerCards, playerHandValue());
      scorecard[PLAYER_NAME] += 1;
      outputWinner(PLAYER_NAME);
      break;
    } else break;
  }

  return false;
}

function dealerTurn(dealerHandValue, dealerCards, deck, scorecard) {
  console.clear();

  while (true) {
    if (dealerHandValue() < DEALER_MIN) {
      hit(dealerCards, deck);
    }

    if (bust(dealerHandValue())) {
      displayAllCards(DEALER_NAME, dealerCards, dealerHandValue());
      scorecard[PLAYER_NAME] += 1;
      outputLoser(DEALER_NAME, 'busted', PLAYER_NAME);
      break;
    }

    if (dealerHandValue() >= DEALER_MIN) {
      break;
    }
  }

  return false;
}

function bust(handValue) {
  return handValue > 21;
}

function playerHitOrStay() {
  console.log(`Would you like to hit or stay? Press 'h' for hit and 's' for stay`);

  while (true) {
    let answer = readline.prompt().toLowerCase().trim();
    if (answer === 's' || answer === 'stay') {
      answer = 'stay';
      return answer;
    } else if (answer === 'h' || answer === 'hit') {
      answer = 'hit';
      return answer;
    } else {
      console.log(`That is an invalid answer. Press 'h' for hit and 's' for stay`);
    }
  }
}

function hit(playerCards, deck) {
  dealRandomCard(playerCards, CARDS_HIT, deck);
}

function countHandValue(hand) {
  let handValue = 0;
  let cardValues = hand.map(card => card[1][0]);

  cardValues.forEach(value => {
    if (value === 'A') handValue += ACE_VALUE;
    if (WORTH_10.includes(value)) handValue += FACE_VALUE;
    if (!isNaN(Number(value))) handValue += Number(value);
  });

  cardValues.filter(value => value === "A").forEach(_ => {
    if (handValue > 21) handValue -= 10;
  });

  return handValue;
}

function initializeDeck() {
  let deck = [
    ['hearts', ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']],
    ['diamonds', ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']],
    ['spades', ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']],
    ['clubs', ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']],
  ];

  return deck;
}


function deal(playerCards, dealerCards, deck) {
  dealRandomCard(playerCards, CARDS_INITIAL_HAND, deck);
  dealRandomCard(dealerCards, CARDS_INITIAL_HAND, deck);
}


function displayAllCards(dealerOrPlayer, hand, handValue) {
  console.log(`${dealerOrPlayer} has: `);
  hand.forEach(card =>  console.log(`** ${card[1]} of ${card[0]}`));
  console.log(`** Hand value: ${handValue}`);
  displayLineBreak();
}

function displayDealerCard(dealerCards) {
  let card = dealerCards[0];
  console.log(`Dealer has: `);
  console.log(`** ${card[1]} of ${card[0]}`);
  console.log(`** 1 hidden card`);
  displayLineBreak();
}

function dealRandomCard(hand, cardsToDeal, deck) {
  for (let card = 1; card <= cardsToDeal; card += 1) {
    let randomSuit = getRandomSuitIndex(deck);
    hand.push([deck[randomSuit][0], deck[randomSuit][1].splice(getRandomCardIndex(randomSuit, deck), 1)]);
  }
}

function getRandomSuitIndex(deck) {
  let randomSuitIndex = Math.floor(Math.random() * deck.length);
  return randomSuitIndex;
}

function getRandomCardIndex(randomSuit, deck) {
  let randomCardIndex = Math.floor(Math.random() * deck[randomSuit][1].length);
  return randomCardIndex;
}

function displayLineBreak() {
  console.log('');
}

function displayGameResults(playerCards, dealerCards, playerHandValue, dealerHandValue, scorecard) {
  console.clear();
  revealFinalHands(playerCards, dealerCards, playerHandValue, dealerHandValue);
  let winner = determineWinner(playerHandValue, dealerHandValue);
  if (winner !== null) {
    scorecard[winner] += 1;
    outputWinner(winner);
  } else {
    console.log(`It's a tie`);
  }
}

function outputWinner(winner) {
  console.log(`🎉 ${winner} wins 🎉`);
}

function outputLoser(loser, lostOrBusted, winner) {
  console.log(`👎 ${loser} has ${lostOrBusted} 
🎉 ${winner} wins`);
}

function playAgain() {
  console.log(`Would you like to start a new match? (Enter y or n)`);
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