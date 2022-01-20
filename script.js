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
let bet = 1;

const cardNameTally = {};
const cardSuitTally = {};

// For HTML elements
const mainContainer = document.createElement('div');
const messageBoard = document.createElement('div');
const pointsContainer = document.createElement('div');
const cardContainer = document.createElement('div');
const dealBtn = document.createElement('button');
const gameInfoContainer = document.createElement('div');
const gameInstructions = document.createElement('div');
const payTable = document.createElement('div');

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
			// // Add "hold" message
			// holdMsg.innerHTML = 'Hold';
			// // Store index of held cards in array
			// heldCardsIndex.push(i);
			toggleHold(holdMsg, i);
		});
	}
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

// Function to update points in
const updatePoints = () => {
	pointsContainer.innerText = `CREDIT ${points}`;
};

// Function to update message board
const updateMessage = (message) => {
	messageBoard.innerText = message;
};

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

		dealBtn.innerText = `Deal`;
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
};

// ***** GAMEPLAY *****************************************

// To check for win
const checkForWin = () => {
	let winAmount = 0;
	let lose = false;
	tallyCards();

	/* If all cards have the same suit, could be
	- Royal Flush
	- Straight Flush
	- Flush */
	if (Object.values(cardSuitTally).includes(5)) {
		const handCopy = [...hand];
		handCopy.sort(function (a, b) {
			return a.rank - b.rank;
		});
		let runningRank = 1;

		if (
			Object.keys(cardNameTally).includes('A') &&
			Object.keys(cardNameTally).includes('K')
		) {
			for (let i = 1; i < handCopy.length - 1; i += 1) {
				if (handCopy[i].rank === handCopy[i + 1].rank - 1) {
					runningRank += 1;
				}
			}
		} else {
			for (let i = 0; i < handCopy.length - 1; i += 1) {
				if (handCopy[i].rank === handCopy[i + 1].rank - 1) {
					runningRank += 1;
				}
			}
		}

		// Royal flush (*800) - 10, J, Q, K, A
		if (
			Object.keys(cardNameTally).includes('A') &&
			Object.keys(cardNameTally).includes('K') &&
			runningRank === 4
		) {
			winAmount = bet * 800;
			updateMessage('Royal flush');
		}
		// Straight flush (*50) - straight but all same suit
		else if (runningRank === 5) {
			winAmount = bet * 50;
			updateMessage('Straight flush');
		}
		// Flush (*6) - all same suit
		else {
			winAmount = bet * 6;
			updateMessage('Flush');
		}
	}

	// Four of a kind (*25)
	else if (Object.values(cardNameTally).includes(4)) {
		points += bet * 25;
		updateMessage('Four of a kind');
	}

	// Full house (*9)
	else if (
		Object.values(cardNameTally).includes(2) &&
		Object.values(cardNameTally).includes(3)
	) {
		winAmount = bet * 9;
		updateMessage('Full house');
	}

	// Straight (*4)
	else if (Object.keys(cardNameTally).length === 5) {
		const handCopy = [...hand];
		handCopy.sort(function (a, b) {
			return a.rank - b.rank;
		});
		let runningRank = 1;

		// For 10, J, Q, K, A straight
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
		// For all other straights
		else {
			for (let i = 0; i < handCopy.length - 1; i += 1) {
				if (handCopy[i].rank === handCopy[i + 1].rank - 1) {
					runningRank += 1;
				}
			}
		}

		if (
			(Object.keys(cardNameTally).includes('A') &&
				Object.keys(cardNameTally).includes('K') &&
				runningRank === 4) ||
			runningRank === 5
		) {
			winAmount = bet * 4;
			updateMessage('Straight');
		}
		// If not straight
		else {
			lose = true;
		}
	}

	// Three of a kind (*3)
	else if (Object.values(cardNameTally).includes(3)) {
		winAmount = bet * 3;
		updateMessage('Three of a kind');
	}

	// 2 pairs (*2)
	else if (
		Object.values(cardNameTally).includes(2) &&
		Object.values(cardNameTally).length === 3
	) {
		winAmount = bet * 2;
		updateMessage('Two pairs');
	}

	// Jacks or better (*1)
	else if (
		cardNameTally['J'] === 2 ||
		cardNameTally['Q'] === 2 ||
		cardNameTally['K'] === 2 ||
		cardNameTally['A'] === 2
	) {
		winAmount = bet * 1;
		updateMessage('Jacks or better');
	}

	// Lose
	else {
		lose = true;
	}

	points += winAmount;
	// Show winAmount next to points

	if (lose) {
		points -= bet;
		updateMessage(`Better luck next round`);
	}

	createCardElement(hand);
};

// ***** GAME INITIALISATION ******************************
//

const initGame = () => {
	deck = shuffleCards(makeDeck());

	// Format divs
	pointsContainer.setAttribute('id', 'points');
	messageBoard.setAttribute('id', 'message-board');
	dealBtn.setAttribute('id', 'deal-button');
	cardContainer.setAttribute('id', 'card-container');
	gameInfoContainer.setAttribute('id', 'game-info');
	gameInstructions.setAttribute('id', 'game-instructions');
	payTable.setAttribute('id', 'pay-table');
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
	gameInstructions.appendChild(ul);
	gameInfoContainer.appendChild(gameInstructions);
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
