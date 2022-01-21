/*
 ********************************************************************
 ********** GLOBAL VARIABLES ****************************************
 ********************************************************************
 */

// For gameplay
let points = 100;

const hand = [];
// const hand = [...pair2Hand];
const heldCardsIndex = [];
let deck;
let bet = 1;

const cardNameTally = {};
const cardSuitTally = {};

const payout = {
	'Royal Flush': 800,
	'Straight Flush': 50,
	'Four of a Kind': 25,
	'Full House': 9,
	Flush: 6,
	Straight: 4,
	'Three of a Kind': 3,
	'Two Pairs': 2,
	'Jacks or Better': 1,
};

// For HTML elements
const mainContainer = document.createElement('div');
const messageBoard = document.createElement('div');
const pointsContainer = document.createElement('div');
const cardContainer = document.createElement('div');
const dealBtn = document.createElement('button');
const gameInfoContainer = document.createElement('div');
const gameInstructions = document.createElement('div');
const howToWin = document.createElement('div');

/*
 ********************************************************************
 ********** HELPER FUNCTIONS ****************************************
 ********************************************************************
 */

// -----------------------------------------
// ##### Functions for the deck ############
// -----------------------------------------

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

// -----------------------------------------
// ##### Functions for DOM #################
// -----------------------------------------

// Function to create empty card elements
const createEmptyCardElements = () => {
	cardContainer.innerHTML = ``;
	for (let i = 0; i < 5; i += 1) {
		// Create a wrapping div to contain the "hold" message and card
		const cardWrapper = document.createElement('div');
		cardWrapper.classList.add('card-div');

		// Create a div for "hold" message
		const holdMsg = document.createElement('div');
		holdMsg.classList.add('hold');
		holdMsg.innerHTML = '';

		// Create a div for the card itself
		const card = document.createElement('div');
		card.classList.add('card', 'down');
		card.innerHTML = `&nbsp;`;

		// Append divs to cardWrapper and cardContainer
		cardWrapper.appendChild(holdMsg);
		cardWrapper.appendChild(card);
		cardContainer.appendChild(cardWrapper);
	}
};

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
		if (heldCardsIndex.includes(i)) {
			holdMsg.innerHTML = 'Hold';
		}

		// Create a div for the card itself
		const card = document.createElement('div');
		card.classList.add('card');
		if (currentCard.suit === 'diamonds' || currentCard.suit === 'hearts') {
			card.classList.add('red');
		} else {
			card.classList.add('black');
		}
		card.innerHTML = `&nbsp;`;
		if (currentCard !== '') {
			card.innerHTML = `${currentCard.name} <span class="symbol">${currentCard.symbol}</span>`;
		}

		// Append divs to cardWrapper and cardContainer
		cardWrapper.appendChild(holdMsg);
		cardWrapper.appendChild(card);
		cardContainer.appendChild(cardWrapper);

		// Add event listener to each card
		cardWrapper.addEventListener('click', () => {
			toggleHold(holdMsg, i);
		});
	}
};

// Function to update points in
const updatePoints = () => {
	pointsContainer.innerText = `CREDITS: ${points}`;
};

// Function to update message board
const updateMessage = (message) => {
	messageBoard.innerText = message;
};

// Function to allow players to hold / un-hold a card
const toggleHold = (msg, currentCardIndex) => {
	if (msg.innerHTML === '') {
		// Add "hold" message
		msg.innerHTML = 'Hold';
		// Store index of held cards in array
		heldCardsIndex.push(currentCardIndex);
	} else {
		// Remove "hold" message
		msg.innerHTML = '';
		// Remove index of held cards in array
		const indexToRemove = heldCardsIndex.indexOf(currentCardIndex);
		heldCardsIndex.splice(indexToRemove, 1);
	}
};

// -----------------------------------------
// ##### Gameplay Helper Functions #########
// -----------------------------------------

// Function to deal cards & play the game
const dealCards = () => {
	// If it's the first time dealing
	if (hand.length === 0) {
		// Deal 5 cards to hand
		for (let i = 0; i < 5; i += 1) {
			hand.push(deck.pop());
		}
		// Display cards
		createCardElement();
		updateMessage('Select cards to hold');
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

		checkForWin();

		dealBtn.disabled = true;
		setTimeout(newGame, 3000);
	}
};

// Function to tally cards
const tallyCards = () => {
	// Clear card tally
	for (cardName in cardNameTally) {
		delete cardNameTally[cardName];
	}
	for (cardSuit in cardSuitTally) {
		delete cardSuitTally[cardSuit];
	}
	// Tally card name
	for (let i = 0; i < hand.length; i += 1) {
		const cardName = hand[i].name;
		if (cardName in cardNameTally) {
			cardNameTally[cardName] += 1;
		} else {
			cardNameTally[cardName] = 1;
		}
	}
	// Tally card suit
	for (let i = 0; i < hand.length; i += 1) {
		const cardSuit = hand[i].suit;
		if (cardSuit in cardSuitTally) {
			cardSuitTally[cardSuit] += 1;
		} else {
			cardSuitTally[cardSuit] = 1;
		}
	}
};

const getWinnings = (result) => {
	return bet * payout[result];
};

// Function to start a new game with same bet
const newGame = () => {
	deck.length = 0;
	deck = shuffleCards(makeDeck());

	hand.length = 0;
	heldCardsIndex.length = 0;

	updatePoints();
	updateMessage(`Ready to play?`);
	createEmptyCardElements();

	dealBtn.disabled = false;
	dealBtn.innerText = `Deal`;
};

/*
 ********************************************************************
 ********** GAMEPLAY ************************************************
 ********************************************************************
 */

/* ---------------------------------------------------
##### Check for consecutive ranks among cards ######## 
1. Checks card ranks for running numbers (eg 1, 2, 3, 4, 5)
2. Different runningRank count for hands with A & K (1, 10, 11, 12, 13)
3. Returns the runningRank 
--------------------------------------------------- */
const countRunningRank = () => {
	let runningRank = 1;

	// Create copy of hand and sort according to rank
	const handCopy = [...hand];
	handCopy.sort(function (a, b) {
		return a.rank - b.rank;
	});

	// For high straight (10, J, Q, K, A), runningRank should be 4
	if (
		Object.keys(cardNameTally).includes('A') &&
		Object.keys(cardNameTally).includes('K')
	) {
		for (let i = 1; i < handCopy.length - 1; i += 1) {
			if (handCopy[i].rank === handCopy[i + 1].rank - 1) {
				runningRank += 1;
			}
		}
	}
	// For other straights, runningRank should be 5
	else {
		for (let i = 0; i < handCopy.length - 1; i += 1) {
			if (handCopy[i].rank === handCopy[i + 1].rank - 1) {
				runningRank += 1;
			}
		}
	}

	return runningRank;
};

/* ---------------------------------------------------
##### Determine if hand is Royal Flush, Straight Flush or Flush #####
1. Should be executed only if all cards have the same suit 
2. Output is 'Royal Flush' or 'Straight Flush' or 'Flush'
--------------------------------------------------- */
const determineFlush = () => {
	// Royal flush - 10, J, Q, K, A
	if (
		countRunningRank() === 4 &&
		Object.keys(cardNameTally).includes('A') &&
		Object.keys(cardNameTally).includes('K')
	) {
		return 'Royal Flush';
	}

	// Straight flush - straight but all same suit
	else if (countRunningRank() === 5) {
		return 'Straight flush';
	}

	// Flush - all same suit
	else {
		return 'Flush';
	}
};

/* ---------------------------------------------------
##### Check hand for winning combinations ############
--------------------------------------------------- */
const checkForWin = (hand) => {
	tallyCards();
	let lose = false;
	let result;

	/* Checking for Royal Flush / Straight Flush / Flush
	If all cards have the same suit (flush), determine type of flush */
	if (Object.values(cardSuitTally).includes(5)) {
		result = determineFlush();
		points += getWinnings(result);
	}
	//
	/* Checking for Four of a Kind
	If there are four cards with the same card name */
	else if (Object.values(cardNameTally).includes(4)) {
		result = 'Four of a Kind';
		points += getWinnings(result);
	}
	//
	/* Checking for Full House 
	If there are 2 cards + 3 cards with same card name */
	else if (
		Object.values(cardNameTally).includes(2) &&
		Object.values(cardNameTally).includes(3)
	) {
		result = 'Full House';
		points += getWinnings(result);
	}
	//
	/* Checking for Three of a Kind
	If there are three cards with the same name	*/
	else if (Object.values(cardNameTally).includes(3)) {
		result = 'Three of a Kind';
		points += getWinnings(result);
	}
	//
	/* Checking for Two Pairs
	If there are two pairs of cards with the same names (and one without)	*/
	else if (
		Object.values(cardNameTally).includes(2) &&
		Object.values(cardNameTally).length === 3
	) {
		result = 'Two Pairs';
		points += getWinnings(result);
	}
	//
	/* Checking for Jacks or Better
	If there is a pair of J / Q / K / A	*/
	else if (
		cardNameTally['J'] === 2 ||
		cardNameTally['Q'] === 2 ||
		cardNameTally['K'] === 2 ||
		cardNameTally['A'] === 2
	) {
		result = 'Jacks or Better';
		points += getWinnings(result);
	}
	//
	/* Checking for Straight
	If the cards have consecutive card ranks */
	else if (Object.keys(cardNameTally).length === 5) {
		if (
			countRunningRank() === 5 ||
			(countRunningRank() === 4 &&
				Object.keys(cardNameTally).includes('A') &&
				Object.keys(cardNameTally).includes('K'))
		) {
			result = 'Straight';
			points += getWinnings(result);
		}
		// If not straight
		else {
			lose = true;
		}
	}
	// For all other combinations
	else {
		lose = true;
	}

	// Show winnings next to points

	if (lose) {
		result = 'Better luck next round';
		points -= bet;
	}

	updateMessage(result);
	createCardElement(hand);
};

/*
 ********************************************************************
 ********** GAME INITIALISATION *************************************
 ********************************************************************
 */

const initGame = () => {
	deck = shuffleCards(makeDeck());

	// Format divs
	pointsContainer.setAttribute('id', 'points');
	messageBoard.setAttribute('id', 'message-board');
	dealBtn.setAttribute('id', 'deal-button');
	cardContainer.setAttribute('id', 'card-container');
	gameInfoContainer.setAttribute('id', 'game-info');
	gameInstructions.setAttribute('id', 'game-instructions');
	// payTable.setAttribute('id', 'pay-table');
	mainContainer.setAttribute('id', 'main');

	// Add content to the elements
	const howToPlay = [
		`How to play`,
		`Click 'Deal' to draw 5 cards`,
		`Select any cards you want to hold.`,
		`The rest will be discarded.`,
		`Click 'Draw' to replace discarded cards.`,
	];
	const ul = document.createElement('ul');
	for (let i = 0; i < howToPlay.length; i += 1) {
		const li = document.createElement('li');
		li.innerText = howToPlay[i];
		ul.appendChild(li);
	}
	// gameInstructions.appendChild(ul);
	// gameInfoContainer.appendChild(gameInstructions);
	updatePoints();
	messageBoard.innerHTML = `Ready to play?`;
	dealBtn.innerText = `Deal`;
	createEmptyCardElements();

	dealBtn.addEventListener('click', () => {
		dealCards();
	});

	// Append divs to doc
	mainContainer.appendChild(pointsContainer);
	mainContainer.appendChild(messageBoard);
	mainContainer.appendChild(dealBtn);
	mainContainer.appendChild(cardContainer);
	mainContainer.appendChild(gameInfoContainer);

	document.body.appendChild(mainContainer);
};

initGame();
