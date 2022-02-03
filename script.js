/*
 ********************************************************************
 ********** GLOBAL VARIABLES ****************************************
 ********************************************************************
 */

// For gameplay
let deck;
let bet = 1;
let points = 100;
const hand = []; // Comment out for testing
const heldCardsIndex = []; // Comment out for testing

/* To test winning hands
-- Comment above 2 lines
-- Un-comment below 2 lines */
// const hand = [...kind3Hand];
// const heldCardsIndex = [0, 1, 2, 3, 4];

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
	'Better luck next round': -bet,
};

// For HTML elements
const mainContainer = document.createElement('main');
const topRow = document.createElement('div');
const pointsContainer = document.createElement('div');
const playerDiv = document.createElement('div');
const musicContainer = document.createElement('div');
const musicIcon = document.createElement('i');
const music = document.createElement('audio');

const messageBoard = document.createElement('div');
const cardContainer = document.createElement('div');
const dealBtn = document.createElement('button');
const payTableBtn = document.createElement('button');
const payTable = document.createElement('div');

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

// Function to create the pay table div
const createPayTable = () => {
	for (key in payout) {
		let p = document.createElement('p');
		p.innerText = key;
		let span = document.createElement('span');
		span.style.color = '#c40093';
		span.innerText = ` +${payout[key]}`;
		if (key === 'Better luck next round') {
			p.innerText = `Nothing`;
			span.innerText = ` ${payout[key]}`;
		}
		p.appendChild(span);
		payTable.appendChild(p);
	}

	let closeBtn = document.createElement('button');
	closeBtn.innerHTML = '<span style="font-size:2em;">→</span> Close';
	closeBtn.setAttribute('id', 'close-button');
	closeBtn.addEventListener('click', () => {
		payTable.classList.toggle('hidden');
	});
	payTable.appendChild(closeBtn);
};

// Function to update credits
const updatePoints = () => {
	pointsContainer.innerText = `CREDITS: ${points}`;
};

// Function to update message board
const updateMessage = (message) => {
	messageBoard.innerText = message;
};

// Function to change text on Deal / Draw button
const toggleBtnText = () => {
	const arrow = '<span style="font-size:2em;">→</span>';
	if (dealBtn.innerHTML === `${arrow} Deal`) {
		dealBtn.innerHTML = `${arrow} Draw`;
	} else {
		dealBtn.innerHTML = `${arrow} Deal`;
	}
};

// Function to allow players to hold / un-hold a card
const toggleHold = (msg, currentCardIndex) => {
	if (!dealBtn.disabled) {
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
	}
};

// Function to pause/play the audio track
const toggleMusic = () => {
	if (music.paused === false) {
		music.pause();
		musicIcon.classList.remove('fa-volume-up');
		musicIcon.classList.add('fa-volume-off');
	} else {
		music.play();
		musicIcon.classList.add('fa-volume-up');
		musicIcon.classList.remove('fa-volume-off');
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
		toggleBtnText();
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

		let outcome = checkForWin();
		const pointDiff = getWinnings(outcome);
		updateMessage(outcome);
		points += pointDiff;

		let pointDiffElement = document.createTextNode(` ${pointDiff}`);
		if (pointDiff >= 0) {
			pointDiffElement = document.createTextNode(` +${pointDiff}`);
		}
		pointsContainer.appendChild(pointDiffElement);

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

// Function to pull out winnings from payout object
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
	toggleBtnText();

	// No new game when user is out of credits
	if (points <= 0) {
		updateMessage(`Game over`);
		dealBtn.disabled = true;
	}
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
	let result;

	/* Checking for Royal Flush / Straight Flush / Flush
	If all cards have the same suit (flush), determine type of flush */
	if (Object.values(cardSuitTally).includes(5)) {
		result = determineFlush();
	}
	//
	/* Checking for Four of a Kind
	If there are four cards with the same card name */
	else if (Object.values(cardNameTally).includes(4)) {
		result = 'Four of a Kind';
	}
	//
	/* Checking for Full House 
	If there are 2 cards + 3 cards with same card name */
	else if (
		Object.values(cardNameTally).includes(2) &&
		Object.values(cardNameTally).includes(3)
	) {
		result = 'Full House';
	}
	//
	/* Checking for Three of a Kind
	If there are three cards with the same name	*/
	else if (Object.values(cardNameTally).includes(3)) {
		result = 'Three of a Kind';
	}
	//
	/* Checking for Two Pairs
	If there are two pairs of cards with the same names (and one without)	*/
	else if (
		Object.values(cardNameTally).includes(2) &&
		Object.values(cardNameTally).length === 3
	) {
		result = 'Two Pairs';
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
		}
		// If not straight
		else {
			result = 'Better luck next round';
		}
	}
	// For all other combinations
	else {
		result = 'Better luck next round';
	}

	return result;
};

/*
 ********************************************************************
 ********** GAME INITIALISATION *************************************
 ********************************************************************
 */

const initGame = () => {
	deck = shuffleCards(makeDeck());

	/* Format divs
	----- Top row */
	topRow.setAttribute('id', 'top-row');
	pointsContainer.setAttribute('id', 'points');
	playerDiv.setAttribute('id', 'player');
	musicContainer.setAttribute('id', 'music');

	/* -- Play area */
	messageBoard.setAttribute('id', 'message-board');
	dealBtn.setAttribute('id', 'deal-button');
	cardContainer.setAttribute('id', 'card-container');

	/* -- Bottow row */
	payTableBtn.setAttribute('id', 'paytable-button');
	payTable.classList.add('paytable', 'hidden');

	/* Add content to the elements */
	updatePoints();
	messageBoard.innerHTML = `Ready to play ?`;
	toggleBtnText();
	playerDiv.innerText = `1P`;
	createEmptyCardElements();
	payTableBtn.innerText = `How to score points ? `;
	createPayTable();

	/* Add event listeners to buttons */
	musicContainer.addEventListener('click', () => {
		toggleMusic();
	});
	dealBtn.addEventListener('click', () => {
		dealCards();
	});
	payTableBtn.addEventListener('click', () => {
		payTable.classList.toggle('hidden');
	});

	/* Append divs to docs */
	musicContainer.appendChild(musicIcon);
	topRow.appendChild(pointsContainer);
	topRow.appendChild(playerDiv);
	topRow.appendChild(musicContainer);

	mainContainer.appendChild(topRow);
	mainContainer.appendChild(messageBoard);
	mainContainer.appendChild(dealBtn);
	mainContainer.appendChild(cardContainer);
	mainContainer.appendChild(payTableBtn);
	document.body.appendChild(payTable);
	document.body.appendChild(mainContainer);

	/* Add music */
	let source = document.createElement('source');
	source.src = 'music/fsm-team-escp-neonscapes.mp3';
	source.type = 'audio/mp3';
	music.appendChild(source);
	musicIcon.classList.add('fa', 'fa-volume-off');
	music.volume = 0.2;
	music.loop = true;
	musicIcon.ariaHidden = true;
	document.body.appendChild(music);
};

initGame();
