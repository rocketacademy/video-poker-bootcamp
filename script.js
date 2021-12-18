// global variables
// let gameScore = 100;
// const folderPath = './cards';
// const rankTally = {};
// const suitTally = {};
// let canDeal = false;
// let canSwap = false;
// let gameMode = 'place_bets';
// const maxPlayerHand = 5;
// let currentBet = 0;
// let cardsToSwap = [];
// let handScore = 0;
// let pointsWon;
// let playerHand = [];

// return filepath of card
// const getFilePathCard = (suit, rank) =>
// {
//   const filePath = `${folderPath}/${suit}\ ${rank}.png`;
//   return filePath;
// };

// const gameInfo = document.createElement('div');
// gameInfo.classList.add('gameInfoContainer');
// document.body.appendChild(gameInfo);

// const betInfo = document.createElement('div');
// betInfo.classList.add('gameInfoContainer');
// document.body.appendChild(betInfo);

// const mainContainer = document.createElement('div');
// mainContainer.classList.add('mainContainer');
// document.body.appendChild(mainContainer);

// const scoreContainer = document.createElement('div');
// scoreContainer.classList.add('score-Container');
// scoreContainer.innerText = `${gameScore}`;
// document.body.appendChild(scoreContainer);

// const playerdiv = document.createElement('div');
// playerdiv.classList.add('player1container');
// mainContainer.appendChild(playerdiv);

// // create the buttons
// const dealBtn = document.createElement('BUTTON');
// dealBtn.classList.add('start-btn');
// dealBtn.innerHTML = 'Deal';

// const swapBtn = document.createElement('BUTTON');
// swapBtn.classList.add('start-btn');
// swapBtn.innerHTML = 'Swap';

// const bet1Btn = document.createElement('BUTTON');
// bet1Btn.innerHTML = '1 Coin';
// bet1Btn.classList.add('video-game-button');

// const bet5Btn = document.createElement('BUTTON');
// bet5Btn.innerHTML = '5 Coins';
// bet5Btn.classList.add('video-game-button');

// const buttonsContainer = document.createElement('div');
// buttonsContainer.classList.add('btnContainer');
// buttonsContainer.appendChild(bet1Btn);
// buttonsContainer.appendChild(bet5Btn);
// buttonsContainer.appendChild(dealBtn);
// buttonsContainer.appendChild(swapBtn);
// document.body.appendChild(buttonsContainer);

// const muteBtn = document.querySelector('.mute');
// const bgMusic = new Audio('sounds/casino-bgm.mp3');
// bgMusic.volume = 0.1;

// const playPause = () => {
//   if (bgMusic.paused) {
//     bgMusic.play();
//     muteBtn.className = 'unmute';
//   } else {
//     bgMusic.pause();
//     muteBtn.className = 'mute';
//   }
// };

// muteBtn.addEventListener('click', playPause);

// helper functions
// display message using output
// const output = (message) => {
//   gameInfo.innerText = message;
// };

// const betOutput = (message) => {
//   betInfo.innerText = message;
// };

// const insertCoinEffect = () => {
//   const audio = new Audio('sounds/insert-coin.mp3');
//   audio.volume = 0.5;
//   audio.play();
// };

// const flipEffect = () => {
//   const audio = new Audio('sounds/flip-card.mp3');
//   audio.play();
// };

// const winSoundEffect = () => {
//   const audio = new Audio('sounds/win-sound.mp3');
//   audio.volume = 0.1;
//   audio.play();
// };

// const loseSoundEffect = () => {
//   const audio = new Audio('sounds/lose-sound.mp3');
//   audio.volume = 0.5;
//   audio.play();
// };

// const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
// const shuffleCards = (cards) => {
//   // Loop over the card deck array once
//   for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
//     // Select a random index in the deck
//     const randomIndex = getRandomIndex(cards.length);
//     // Select the card that corresponds to randomIndex
//     const randomCard = cards[randomIndex];
//     // Select the card that corresponds to currentIndex
//     const currentCard = cards[currentIndex];
//     // Swap positions of randomCard and currentCard in the deck
//     cards[currentIndex] = randomCard;
//     cards[randomIndex] = currentCard;
//   }
//   // Return the shuffled deck
//   return cards;
// };

// const makeDeck = () => {
//   // Initialise an empty deck array
//   const newDeck = [];
//   // Initialise an array of the 4 suits in our deck. We will loop over this array.
//   const suits = ['hearts', 'diamond', 'clubs', 'spades'];
//   let cardColor = '';
//   let symbol;
//   // Loop over the suits array
//   for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
//     // Store the current suit in a variable
//     const currentSuit = suits[suitIndex];

//     // Loop from 1 to 13 to create all cards for a given suit
//     // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
//     // This is an example of a loop without an array.
//     for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
//       // By default, the card name is the same as rankCounter
//       let cardName = `${rankCounter}`;

//       // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
//       if (cardName === '1') {
//         cardName = 'A';
//       } else if (cardName === '11') {
//         cardName = 'J';
//       } else if (cardName === '12') {
//         cardName = 'Q';
//       } else if (cardName === '13') {
//         cardName = 'K';
//       }

//       if (currentSuit === 'diamonds') {
//         symbol = '♦';
//         cardColor = 'red';
//       } else if (currentSuit === 'clubs') {
//         symbol = '♣';
//         cardColor = 'black';
//       } else if (currentSuit === 'hearts') {
//         symbol = '♥️';
//         cardColor = 'red';
//       } else if (currentSuit === 'spades') {
//         symbol = '♠️';
//         cardColor = 'black';
//       }

//       // Create a new card with the current name, suit, and rank
//       const card = {
//         name: cardName,
//         suit: currentSuit,
//         rank: rankCounter,
//         color: cardColor,
//         symbol,
//       };
//       console.log(card);

//       // Add the new card to the deck
//       newDeck.push(card);
//     }
//   }

//   // Return the completed card deck
//   return newDeck;
// };

// const createCardImg = (cardInfo) => {
//   const cardImg = document.createElement('img');
//   cardImg.src = getFilePathCard(cardInfo.suit, cardInfo.rank);
//   cardImg.classList.add('cardimg');
//   return cardImg;
// };

// const deck = shuffleCards(makeDeck());

// function to store the metainfo of the drawn card
// const createCard = (cardInfo) => {
//   console.log('card info:', cardInfo);

//   const card = document.createElement('div');
//   const cardImage = createCardImg(cardInfo);
//   card.classList.add('card');
//   card.appendChild(cardImage);

//   return card;
// };

// work on the function that count the number of cards in each rank
// create an object to store the info of the cards in deck
// const tallyHand = () => {
//   for (let i = 0; i < playerHand.length; i += 1)
//   {
//     const card = playerHand[i];
//     if (card.rank in rankTally) {
//       rankTally[`${card.rank}`] += 1;
//     }
//     else {
//       rankTally[`${card.rank}`] = 1;
//     }

//     if (card.suit in suitTally) {
//       suitTally[`${card.suit}`] += 1;
//     }
//     else {
//       suitTally[`${card.suit}`] = 1;
//     }
//   }
//   return [rankTally, suitTally];
// };
// // helper function to clear the tally

// const clearTally = (object) => {
//   Object.keys(object).forEach((key) => delete object[key]);
// };

// // helper function to check for each winning condition

// const checkFlush = (suitTally) => {
//   for (suit in suitTally) {
//     if (suitTally[suit] === 5) {
//       return true;
//     }
//   }
//   return false;
// };

// const checkFourOfAKind = (rankTally) => {
//   for (rank in rankTally) {
//     if (rankTally[rank] === 4) {
//       return true;
//     }
//   }
//   return false;
// };

// const checkThreeOfKind = (rankTally) => {
//   for (rank in rankTally) {
//     if (rankTally[rank] === 3) {
//       return true;
//     }
//   }
//   return false;
// };

// const checkPair = (rankTally) => {
//   for (rank in rankTally) {
//     if (rankTally[rank] === 2) {
//       return true;
//     }
//   }
//   return false;
// };

// const checkFullHouse = (rankTally) => {
//   if (checkThreeOfKind(rankTally) === true && (checkPair(rankTally) === true)) {
//     return true;
//   }
//   return false;
// };

// const checkTwoPair = (rankTally) => {
//   let pairCount = 0;
//   for (rank in rankTally) {
//     if (rankTally[rank] === 2) {
//       pairCount += 1;
//     }
//     if (pairCount === 2) {
//       return true;
//     }
//   }
//   return false;
// };

// const checkStraight = () => {
//   let count = 0;
//   for (let i = 0; i < (playerHand.length - 1); i += 1) {
//     if (playerHand[i].rank - playerHand[i + 1].rank === 1) {
//       count += 1;
//     }
//   }
//   if (count === 4) {
//     return true;
//   }

//   return false;
// };

// const checkStraightFlush = (suitTally, rankTally) => {
//   if (checkFlush(suitTally) === true && (checkStraight(rankTally) === true)) {
//     return true;
//   }
//   return false;
// };

// const checkRoyalStraight = (rankTally) => {
//   if (
//     rankTally['1'] === 1
//     && rankTally['13'] === 1
//     && rankTally['12'] === 1
//     && rankTally['11'] === 1
//     && rankTally['10'] === 1) {
//     return true;
//   }
//   return false;
// };

// const checkRoyalFlush = () => {
//   if (checkRoyalStraight(rankTally) === true && checkFlush(suitTally) === true) {
//     return true;
//   }
//   return false;
// };

// const checkJacksOrBetter = () => {
//   if (rankTally['11'] === 2 || rankTally['12'] === 2 || rankTally['13'] === 2 || rankTally['1'] === 2) {
//     return true;
//   }
//   return false;
// };

// /**
//  * Calculates the handscore from the hand
//  * @param {object} rankTally - key: rank, value: number of cards with rank
//  * @param {object} suitTally - key: suit, value: number of cars with suit
//  * @returns handscore as number
//  */

// const calcHandScore = (rankTally, suitTally) => {
//   if (checkRoyalFlush(rankTally, suitTally) === true) {
//     handScore = 800;
//     return handScore;
//   } if (checkStraightFlush(suitTally) === true) {
//     handScore = 50;
//     return handScore;
//   } if (checkFlush(suitTally) === true) {
//     handScore = 6;
//     return handScore;
//   } if (checkFourOfAKind(rankTally) === true) {
//     handScore = 25;
//     return handScore;
//   } if (checkFullHouse(rankTally) === true) {
//     handScore = 9;
//     return handScore;
//   } if (checkThreeOfKind(rankTally) === true) {
//     handScore = 3;
//     return handScore;
//   } if (checkTwoPair(rankTally) === true) {
//     handScore = 2;
//     return handScore;
//   } if (checkRoyalStraight(rankTally) === true) {
//     handScore = 4;
//     return handScore;
//   } if (checkStraight(rankTally) === true) {
//     handScore = 4;
//     return handScore;
//   } if (checkJacksOrBetter(rankTally) === true) {
//     handScore = 1;
//     return handScore;
//   }
//   handScore = 0;
//   return handScore;
// };
// /**
//  * Calculates the total points won
//  * @returns pointsWon as a number
//  */
// const calcPointsWon = () => {
//   pointsWon = currentBet * handScore;
//   return pointsWon;
// };
// /**
//  * Adds the points won into gameScore
//  * @returns gameScore as a number
//  */
// const addPoints = () => {
//   gameScore += calcPointsWon();
//   return gameScore;
// };
// /**
//  * Display the winning message based on the handscore
//  * @returns output, betOuput as string
//  */

// const displayGameResult = () => {
//   if (handScore === 800) {
//     winSoundEffect();
//     output('You Win! You got a Royal Flush!');
//     betOutput(`You have ${gameScore} Coins! You won ${pointsWon} coins`);
//     return (output, betOutput);
//   } if (handScore === 50) {
//     winSoundEffect();
//     output('You Win! You got a Straight Flush!');
//     betOutput(`You have ${gameScore} Coins! You won ${pointsWon} coins`);
//     return (output, betOutput);
//   } if (handScore === 6) {
//     winSoundEffect();
//     output('You Win! You got a Flush!');
//     betOutput(`You have ${gameScore} Coins! You won ${pointsWon} coins`);
//     return (output, betOutput);
//   } if (handScore === 25) {
//     winSoundEffect();
//     output('You Win! You got a Four of a Kind!');
//     betOutput(`You have ${gameScore} Coins! You won ${pointsWon} coins`);
//     return (output, betOutput);
//   } if (handScore === 3) {
//     winSoundEffect();
//     output('You Win! You got Three of a Kind!');
//     betOutput(`You have ${gameScore} Coins! You won ${pointsWon} coins`);
//     return (output, betOutput);
//   } if (handScore === 9) {
//     winSoundEffect();
//     output('You Win! You got a Full House!');
//     betOutput(`You have ${gameScore} Coins! You won ${pointsWon} coins`);
//     return (output, betOutput);
//   } if (handScore === 2) {
//     winSoundEffect();
//     output('You Win! You got a Two Pair!');
//     betOutput(`You have ${gameScore} Coins! You won ${pointsWon} coins`);
//     return (output, betOutput);
//   } if (handScore === 4) {
//     winSoundEffect();
//     output('You Win! You got a Straight');
//     betOutput(`You have ${gameScore} Coins! You won ${pointsWon} coins`);
//     return (output, betOutput);
//   } if (handScore === 1) {
//     winSoundEffect();
//     output('You Win! You got Jacks or Better');
//     betOutput(`You have ${gameScore} Coins! You won ${pointsWon} coins`);
//     return (output, betOutput);
//   }
//   loseSoundEffect();
//   output('You Lose!');
//   betOutput(`You have ${gameScore} Coins! You won ${pointsWon} coins`);
//   return (output, betOutput);
// };
// /**
//  * Adds the clicked card into cardsToSwap array
//  * @param {object} cardElement - div with the image of the card
//  * @param {array} cardToSwap - array with the cards clicked
//  */
// const cardClick = (cardElement, cardToSwap) => {
//   if (canSwap === true) {
//     let isCardPresent = false;
//     if (cardsToSwap.length > 0) {
//       for (let j = 0; j < cardsToSwap.length; j += 1) {
//         if (cardToSwap === cardsToSwap[j]) {
//         // if the card is present, remove it from array
//           isCardPresent = true;
//           cardsToSwap.splice(j, 1); // remove it from array
//           j -= 1; // account for the decrease in array length
//         }
//       }
//     }
//     cardElement.classList.toggle('cardSwap');
//     // if there is no card in cards to swap array, push it into the cardsToSwap array
//     if (isCardPresent === false) {
//       cardsToSwap.push(cardToSwap);
//     }
//   }
// };
// /**
//  * Deals 5 cards from the deck
//  */
// const dealHand = () => {
//   if (canDeal === true) {
//     output('Deal Hand! Select Which Cards to Swap!');
//     console.log(`${gameMode}`);
//     flipEffect();
//     if (currentBet >= 1 && gameMode === 'deal_Hand') {
//       for (let i = 0; i < maxPlayerHand; i += 1) {
//         playerHand.push(deck.pop());
//         const cardElement = createCard(playerHand[i]);
//         const cardToSwap = playerHand[i];
//         cardElement.addEventListener('click', (event) => {
//           // if (canDeal === true) {
//           cardClick(event.currentTarget, cardToSwap);
//           // }
//         });
//         playerdiv.appendChild(cardElement);
//       }
//     }
//   }
//   canDeal = false;
//   canSwap = true;
//   gameMode = 'swap_Cards';
// };

// // const initGame = () => {
// //   if (gameMode === 'place_bets') {
// //     output('Place Your Bets');
// //     betOutput(`You have ${gameScore} Coins! Your Bet is ${currentBet}`);
// //     console.log(`${gameMode}`);
// //   }
// // };

// const reinitGame = () => {
//   canDeal = false;
//   playerHand = [];
//   currentBet = 0;
//   playerdiv.innerHTML = '';
//   gameMode = 'place_bets';
//   clearTally(rankTally);
//   clearTally(suitTally);
//   scoreContainer.innerText = `${gameScore}`;
//   output('Place Your Bets');
//   betOutput(`You have ${gameScore} Coins! Your Bet is ${currentBet}`);
// };

// const swapCards = () => {
//   // exchange the selected cards in playerHand
//   if (canSwap === true && gameMode === 'swap_Cards') {
//     output('Pick Which Cards to Swap!');
//     for (let i = 0; i < playerHand.length; i += 1) {
//       for (let j = 0; j < cardsToSwap.length; j += 1) {
//         if (cardsToSwap[j].rank === playerHand[i].rank
//         && cardsToSwap[j].suit === playerHand[i].suit) {
//           playerHand.splice(i, 1, deck.pop());
//         }
//       }
//     }
//     // empty cardsToExchange array since we do not need the cards inside anymore
//     cardsToSwap = [];

//     // clear previous display of player's hand
//     playerdiv.innerHTML = '';
//     flipEffect();
//     // make the player's cards' display and display them
//     for (let i = 0; i < playerHand.length; i += 1) {
//       const cardElement = createCard(playerHand[i]);
//       playerdiv.appendChild(cardElement);
//     }
//     tallyHand(playerHand);
//     calcHandScore(rankTally, suitTally);
//     addPoints();
//     displayGameResult();
//     setTimeout(() => {
//       reinitGame();
//     }, 6000);
//   }
//   canSwap = false;
// };

// const betOne = () => {
//   if (gameMode === 'place_bets') {
//     insertCoinEffect();
//     gameScore -= 1;
//     currentBet += 1;
//   }
//   scoreContainer.innerText = `${gameScore}`;
//   betOutput(`You have ${gameScore} Coins! Your Bet is ${currentBet}`);
//   gameMode = 'deal_Hand';
//   canDeal = true;
// };

// const betFive = () => {
//   if (gameMode === 'place_bets') {
//     insertCoinEffect();
//     gameScore -= 5;
//     currentBet += 5;
//   }
//   scoreContainer.innerText = `${gameScore}`;
//   betOutput(`You have ${gameScore} Coins! Your Bet is ${currentBet}`);
//   gameMode = 'deal_Hand';
//   canDeal = true;
// };

// dealBtn.addEventListener('click', dealHand);
// swapBtn.addEventListener('click', swapCards);
// bet1Btn.addEventListener('click', betOne);
// bet5Btn.addEventListener('click', betFive);

// initGame();
