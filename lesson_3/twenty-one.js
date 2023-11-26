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


// Add:
  - playAgain
  - what happens in tie?
  - check playerHandValue and if the arrow function needs to run as often as it currently does
  - if player has 21, don't ask them to hit or stay
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
const DEALER_MIN = 17;

console.clear();
playGame();

function playGame() {
  let playerCards = [];
  let dealerCards = [];

  let deck = initializeDeck();
  deal(playerCards, dealerCards, deck);

  let playerHandValue = () => countHandValue(playerCards);
  let dealerHandValue = () => countHandValue(dealerCards);

  displayAllCards(PLAYER_NAME, playerCards, playerHandValue());
  displayDealerCard(dealerCards);

  playerTurn(playerHandValue, playerCards, deck);
  checkDealerTurn(playerHandValue, dealerHandValue, dealerCards, deck);

  if (playerHandValue() !== GOAL_POINTS
      && !bust(playerHandValue)
      && !bust(dealerHandValue)) {
    console.clear();
    revealFinalHands(playerCards, dealerCards, playerHandValue, dealerHandValue);
    determineWinner(playerHandValue, dealerHandValue);
  }
}

function revealFinalHands(playerCards, dealerCards, playerHandValue, dealerHandValue) {
  displayAllCards(PLAYER_NAME, playerCards, playerHandValue());
  displayAllCards(DEALER_NAME, dealerCards, dealerHandValue());
}

function determineWinner(playerHandValue, dealerHandValue) {
  if (playerHandValue() > dealerHandValue()) {
    outputWinner(PLAYER_NAME);
  } else {
    outputWinner(DEALER_NAME);
  }
}


function checkDealerTurn(playerHandValue, dealerHandValue, dealerCards, deck) {
  if (playerHandValue() === GOAL_POINTS) {
    outputWinner(PLAYER_NAME);
  } else if (!bust(playerHandValue)) {
    dealerTurn(dealerHandValue, dealerCards, deck);
  }
}

function playerTurn(playerHandValue, playerCards, deck) {
  while (true) {
    if (bust(playerHandValue)) {
      outputLoser(PLAYER_NAME, 'busted', DEALER_NAME);
      break;
    }
    if (playerHitOrStay() === 'hit') {
      hit(playerCards, deck);
      console.clear();
      displayAllCards(PLAYER_NAME, playerCards, playerHandValue());
    } else break;
  }

  return false;
}

function dealerTurn(dealerHandValue, dealerCards, deck) {
  console.clear();
  while (true) {
    if (dealerHandValue() < DEALER_MIN) {
      hit(dealerCards, deck);
    }
    if (dealerHandValue() > GOAL_POINTS) {
      displayAllCards(DEALER_NAME, dealerCards, dealerHandValue());
      outputLoser(DEALER_NAME, 'busted', PLAYER_NAME);
      break;
    }
    if (dealerHandValue() >= DEALER_MIN) {
      // displayAllCards(DEALER_NAME, dealerCards, dealerHandValue());
      break;
    }
  }

  return false;
}

function bust(handValue) {
  return handValue() > 21;
}

function playerHitOrStay() {
  console.log(`Would you like to hit or stay? Press 'h' for hit and 's' for stay`);

  while (true) {
    let answer = readline.prompt().trim();
    if (answer.toLowerCase() === 's' || answer.toLowerCase() === 'stay') {
      answer = 'stay';
      return answer;
    } else if (answer.toLowerCase() === 'h' || answer.toLowerCase() === 'hit') {
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

function outputWinner(winner) {
  console.log(`🎉 ${winner} wins 🎉`);
}

function outputLoser(loser, lostOrBusted, winner) {
  console.log(`👎 ${loser} has ${lostOrBusted} 
🎉 ${winner} wins`);
}