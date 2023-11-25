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

*/

// console.log(`${deck[randomSuit][1][randomCard]} of ${deck[randomSuit][0]}`);
const CARDS_INITIAL_HAND = 2;
const WORTH_10 = ['J', 'Q', 'K'];

playGame();

function playGame() {
  let playerCards = [];
  let dealerCards = [];

  let deck = initializeDeck();
  deal(playerCards, dealerCards, deck);

  let playerHandValue = countHandValue(playerCards);
  let dealerHandValue = countHandValue(dealerCards);

  displayAllCards(playerCards, playerHandValue);
  displayLineBreak();

  displayDealerCard(dealerCards, dealerHandValue);
  displayLineBreak();

  // dealRandomCard(playerCards, 1, deck);
  // countHandValue(playerCards); // handValue isn't updating after 3rd card is drawn
  // displayAllCards(playerCards, playerHandValue);

}


function countHandValue(hand) {
  // console.log(`cards in hand: ${hand.length}`);
  let handValue = 0;
  let cardValues = hand.map(card => card[1][0]);
  // console.log(cardValues);

  cardValues.forEach(value => {
    if (value === 'A') handValue += 11;
    if (WORTH_10.includes(value)) handValue += 10;
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

  console.log(playerCards);
  console.log(dealerCards);
}


function displayAllCards(hand, handValue) {
  console.log(`Player has: `);
  hand.forEach(card =>  console.log(`** ${card[1]} of ${card[0]}`));
  console.log(`** Hand value: ${handValue}`);
}

function displayDealerCard(dealerCards, dealerHandValue) {
  let card = dealerCards[0];
  console.log(`Dealer has: `);
  console.log(`** ${card[1]} of ${card[0]}`);
  console.log(`** Hand value: ${dealerHandValue}`);

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


// console.log(`${deck[randomSuit][1][randomCard]} of ${deck[randomSuit][0]}`);

function displayLineBreak() {
  console.log('');
}
