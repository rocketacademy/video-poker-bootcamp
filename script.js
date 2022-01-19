/* Game flow
 * User starts with 100 points => global variable
 * User clicks Deal button
 * User draws 5 cards => array
 * User can choose how many cards to keep
 * Replace those not kept with new cards
 * Check user's hand for winning combination
 * Assign points based on combination
 */

// ***** GLOBAL VARIABLES *********************************
// For gameplay
let points = 100;
const hand = [];
const heldCardsIndex = [];
let deck;

// For HTML elements
const mainContainer = document.createElement('div');
const gameInstructions = document.createElement('div');
const pointsContainer = document.createElement('div');
const cardContainer = document.createElement('div');
const dealBtn = document.createElement('button');

// ***** HELPER FUNCTIONS *********************************
// Functions for the deck-----------------------------
const getRandomIndex = (max) => Math.floor(Math.random() * max);

const makeDeck = () => {
	const newDeck = [];
	const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
	const suitSymbols = ['♥️', '♦️', '♣️', '♠️'];
	const cardName = [
		'A',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'J',
		'Q',
		'K',
	];
	const cardRank = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

	// Loop over the suits array
	for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
		// Store the current suit in a variable
		const currentSuit = suits[suitIndex];

		for (let i = 0; i < 13; i += 1) {
			// Set suit color
			let suitColor = 'black';
			if (currentSuit === 'hearts' || currentSuit === 'diamonds') {
				suitColor = 'red';
			}

			// Create a new card with the current name, suit, and rank
			const card = {
				name: cardName[i],
				suit: currentSuit,
				symbol: suitSymbols[suitIndex],
				color: suitColor,
				rank: cardRank[i],
			};

			// Add the new card to the deck
			newDeck.push(card);
		}
	}

	// Return the completed card deck
	return newDeck;
};

const shuffleCards = (cards) => {
	// Loop over the card deck array once
	for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
		// Select a random index in the deck
		const randomIndex = getRandomIndex(cards.length);
		// Select the card that corresponds to randomIndex
		const randomCard = cards[randomIndex];
		// Select the card that corresponds to currentIndex
		const currentCard = cards[currentIndex];
		// Swap positions of randomCard and currentCard in the deck
		cards[currentIndex] = randomCard;
		cards[randomIndex] = currentCard;
	}
	// Return the shuffled deck
	return cards;
};
// ---------------------------------------------------

// Function to create card elements
const createCardElement = () => {
	cardContainer.innerHTML = ``;
	for (let i = 0; i < hand.length; i += 1) {
		const currentCard = hand[i];

		// Create a wrapping div to contain the "hold" message and card
		const cardWrapper = document.createElement('div');
		cardWrapper.classList.add('card-div');

		// Create a div for "hold" message
		const holdMsg = document.createElement('div');
		holdMsg.classList.add('hold');
		holdMsg.innerHTML = '';

		// Create a div for the card itself
		const card = document.createElement('div');
		card.classList.add('card');
		card.innerHTML = `&nbsp;`;
		if (currentCard !== '') {
			card.innerHTML = `${currentCard.name} ${currentCard.symbol}`;
		}

		// Append divs to cardWrapper and cardContainer
		cardWrapper.appendChild(holdMsg);
		cardWrapper.appendChild(card);
		cardContainer.appendChild(cardWrapper);

		// Add event listener to each card
		cardWrapper.addEventListener('click', () => {
			// Add "hold" message
			holdMsg.innerHTML = 'Hold';
			// Store index of held cards in array
			heldCardsIndex.push(i);
		});
	}
};

// Function to deal cards
// Deal until hand.length = 5
const dealCards = () => {
	// If it's the first time dealing
	if (hand.length === 0) {
		// Deal 5 cards to hand
		for (let i = 0; i < 5; i += 1) {
			hand.push(deck.pop());
		}
		// Display cards
		createCardElement();
		mainContainer.appendChild(cardContainer);
		dealBtn.innerText = `Draw`;
	}
	// If user selects cards to hold
	else {
		// Loop through hand array
		for (let i = 0; i < hand.length; i += 1) {
			// If i does not exist in heldCardsIndex array, pop card from deck to that index
			if (!heldCardsIndex.includes(i)) {
				hand[i] = deck.pop();
			}
		}
		createCardElement();

		// Check hand against pay table
		checkForWin(1); // remember to remove params later

		// Show message win or lose
		// Update points
		// setTimeout to remove cards and restart game

		dealBtn.innerText = `Deal`;
	}
};

// need a function to check hand against pay table
// const checkForWin = () => {}

// ***** GAMEPLAY *****************************************

// To check for win
// remember to remove params later
const checkForWin = (bet) => {
	const cardNameTally = {};
	for (let i = 0; i < hand.length; i += 1) {
		const cardName = hand[i].name;
		if (cardName in cardNameTally) {
			cardNameTally[cardName] += 1;
		} else {
			cardNameTally[cardName] = 1;
		}
	}
	console.log(cardNameTally);

	const cardSuitTally = {};
	for (let i = 0; i < hand.length; i += 1) {
		const cardSuit = hand[i].suit;
		if (cardSuit in cardSuitTally) {
			cardSuitTally[cardSuit] += 1;
		} else {
			cardSuitTally[cardSuit] = 1;
		}
	}
	console.log(cardSuitTally);

	// Royal flush (*800) - 10, J, Q, K, A
	if (
		Object.keys(cardNameTally).length === 5 &&
		Object.keys(cardNameTally).includes('A') &&
		Object.values(cardSuitTally).includes(5)
	) {
		const handCopy = [...hand];
		handCopy.sort(function (a, b) {
			return a.rank - b.rank;
		});
		let runningRank = 1;
		for (let i = 1; i < handCopy.length - 1; i += 1) {
			if (handCopy[i].rank === handCopy[i + 1].rank - 1) {
				runningRank += 1;
			}
		}
		if (runningRank === 4) {
			points += bet * 800;
			console.log('ROYALLLLL FLUSHH!!!!!');
		}
	}

	// Straight flush (*50) - straight but all same suit
	else if (
		Object.keys(cardNameTally).length === 5 &&
		Object.values(cardSuitTally).includes(5)
	) {
		const handCopy = [...hand];
		handCopy.sort(function (a, b) {
			return a.rank - b.rank;
		});
		let runningRank = 1;
		for (let i = 0; i < handCopy.length - 1; i += 1) {
			if (handCopy[i].rank === handCopy[i + 1].rank - 1) {
				runningRank += 1;
			}
		}
		if (runningRank === 5) {
			points += bet * 50;
			console.log('Straight FLUSHH~~');
		}
	}

	// Four of a kind (*25)
	else if (Object.values(cardNameTally).includes(4)) {
		points += bet * 25;
		console.log('Four of a kind!');
	}

	// Full house (*9)
	else if (
		Object.values(cardNameTally).includes(2) &&
		Object.values(cardNameTally).includes(3)
	) {
		points += bet * 9;
		console.log('Full house!!');
	}

	// Flush (*6) - all same suit
	else if (Object.values(cardSuitTally).includes(5)) {
		points += bet * 6;
		console.log('Flush!!');
	}

	// Straight (*4)
	else if (Object.keys(cardNameTally).length === 5) {
		const handCopy = [...hand];
		handCopy.sort(function (a, b) {
			return a.rank - b.rank;
		});
		let runningRank = 1;
		for (let i = 0; i < handCopy.length - 1; i += 1) {
			if (handCopy[i].rank === handCopy[i + 1].rank - 1) {
				runningRank += 1;
			}
		}
		if (runningRank === 5) {
			points += bet * 4;
			console.log('Straight~~');
		}
	}

	// Three of a kind (*3)
	else if (Object.values(cardNameTally).includes(3)) {
		points += bet * 3;
		console.log('Three of a kind!');
	}

	// 2 pairs (*2)
	else if (
		Object.values(cardNameTally).includes(2) &&
		Object.values(cardNameTally).length === 3
	) {
		points += bet * 2;
		console.log('Two pairs!');
	}

	// Jacks or better (*1)
	else if (
		cardNameTally['J'] === 2 ||
		cardNameTally['Q'] === 2 ||
		cardNameTally['K'] === 2 ||
		cardNameTally['A'] === 2
	) {
		points += bet * 1;
		console.log('JACKS OR BETTER');
	}

	pointsContainer.innerText = points;
	createCardElement(hand);
};

// ***** GAME INITIALISATION ******************************
//

const initGame = () => {
	deck = shuffleCards(makeDeck());

	// Format divs
	dealBtn.setAttribute('id', 'deal-button');
	cardContainer.setAttribute('id', 'card-container');
	gameInstructions.classList.add('game-instructions');
	pointsContainer.setAttribute('id', 'points');
	mainContainer.classList.add('main');

	dealBtn.innerText = `Deal`;
	cardContainer.innerHTML = ``;
	gameInstructions.innerHTML = `Ready to play?`;
	pointsContainer.innerText = points;

	dealBtn.addEventListener('click', () => {
		dealCards();
	});

	// Append divs to doc
	mainContainer.appendChild(gameInstructions);
	mainContainer.appendChild(pointsContainer);
	mainContainer.appendChild(dealBtn);
	mainContainer.appendChild(cardContainer);

	document.body.appendChild(mainContainer);
};

initGame();
