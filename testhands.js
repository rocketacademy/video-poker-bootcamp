const royalFlushHand = [
	{ name: 'Q', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 12 },
	{ name: 'J', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 11 },
	{ name: '10', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 10 },
	{ name: 'K', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 13 },
	{ name: 'A', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 1 },
];

const fakeRoyalFlushHand = [
	{ name: 'Q', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 12 },
	{ name: 'J', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 11 },
	{ name: '10', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 10 },
	{ name: 'K', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 13 },
	{ name: 'A', suit: 'hearts', symbol: '♥️', color: 'red', rank: 1 },
];

const straightFlushHand = [
	{ name: '4', suit: 'clubs', symbol: '♣️', color: 'black', rank: 4 },
	{ name: '5', suit: 'clubs', symbol: '♣️', color: 'black', rank: 5 },
	{ name: '3', suit: 'clubs', symbol: '♣️', color: 'black', rank: 3 },
	{ name: 'A', suit: 'clubs', symbol: '♣️', color: 'black', rank: 1 },
	{ name: '2', suit: 'clubs', symbol: '♣️', color: 'black', rank: 2 },
];

const fakeStraightFlushHand = [
	{ name: '4', suit: 'clubs', symbol: '♣️', color: 'black', rank: 4 },
	{ name: '5', suit: 'clubs', symbol: '♣️', color: 'black', rank: 5 },
	{ name: '3', suit: 'clubs', symbol: '♣️', color: 'black', rank: 3 },
	{ name: 'A', suit: 'clubs', symbol: '♣️', color: 'black', rank: 1 },
	{ name: '2', suit: 'spades', symbol: '♠️', color: 'black', rank: 2 },
];

const kind4Hand = [
	{ name: 'Q', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 12 },
	{ name: 'Q', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 12 },
	{ name: 'Q', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 12 },
	{ name: 'Q', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 12 },
	{ name: '2', suit: 'hearts', symbol: '♥️', color: 'red', rank: 2 },
];

const fullHouseHand = [
	{ name: 'Q', suit: 'hearts', symbol: '♥️', color: 'red', rank: 12 },
	{ name: 'Q', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 12 },
	{ name: 'Q', suit: 'spades', symbol: '♠️', color: 'black', rank: 12 },
	{ name: 'J', suit: 'clubs', symbol: '♣️', color: 'black', rank: 11 },
	{ name: 'J', suit: 'spades', symbol: '♠️', color: 'black', rank: 11 },
];

const flushHand = [
	{ name: '9', suit: 'clubs', symbol: '♣️', color: 'black', rank: 9 },
	{ name: '6', suit: 'clubs', symbol: '♣️', color: 'black', rank: 6 },
	{ name: 'J', suit: 'clubs', symbol: '♣️', color: 'black', rank: 11 },
	{ name: 'A', suit: 'clubs', symbol: '♣️', color: 'black', rank: 1 },
	{ name: '8', suit: 'clubs', symbol: '♣️', color: 'black', rank: 8 },
];

const fakeFlushHand = [
	{ name: '9', suit: 'spades', symbol: '♠️', color: 'black', rank: 9 },
	{ name: '6', suit: 'clubs', symbol: '♣️', color: 'black', rank: 6 },
	{ name: 'J', suit: 'clubs', symbol: '♣️', color: 'black', rank: 11 },
	{ name: 'A', suit: 'clubs', symbol: '♣️', color: 'black', rank: 1 },
	{ name: '8', suit: 'clubs', symbol: '♣️', color: 'black', rank: 8 },
];

const straightHand = [
	{ name: '9', suit: 'clubs', symbol: '♣️', color: 'black', rank: 9 },
	{ name: '6', suit: 'clubs', symbol: '♣️', color: 'black', rank: 6 },
	{ name: '7', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 7 },
	{ name: '10', suit: 'spades', symbol: '♠️', color: 'black', rank: 10 },
	{ name: '8', suit: 'clubs', symbol: '♣️', color: 'black', rank: 8 },
];

const straightAceHand = [
	{ name: 'Q', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 12 },
	{ name: 'J', suit: 'clubs', symbol: '♣️', color: 'black', rank: 11 },
	{ name: '10', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 10 },
	{ name: 'K', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 13 },
	{ name: 'A', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 1 },
];

const fakeStraightAceHand = [
	{ name: 'Q', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 12 },
	{ name: 'J', suit: 'clubs', symbol: '♣️', color: 'black', rank: 11 },
	{ name: '9', suit: 'clubs', symbol: '♣️', color: 'black', rank: 9 },
	{ name: 'K', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 13 },
	{ name: 'A', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 1 },
];

const kind3Hand = [
	{ name: 'Q', suit: 'spades', symbol: '♠️', color: 'black', rank: 12 },
	{ name: 'Q', suit: 'clubs', symbol: '♣️', color: 'black', rank: 12 },
	{ name: 'Q', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 12 },
	{ name: 'K', suit: 'hearts', symbol: '♥️', color: 'red', rank: 13 },
	{ name: '2', suit: 'hearts', symbol: '♥️', color: 'red', rank: 2 },
];

const pair2Hand = [
	{ name: 'J', suit: 'clubs', symbol: '♣️', color: 'black', rank: 11 },
	{ name: 'J', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 11 },
	{ name: 'Q', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 12 },
	{ name: 'Q', suit: 'spades', symbol: '♠️', color: 'black', rank: 12 },
	{ name: '2', suit: 'hearts', symbol: '♥️', color: 'red', rank: 2 },
];

const pairJacksHand = [
	{ name: 'J', suit: 'clubs', symbol: '♣️', color: 'black', rank: 11 },
	{ name: 'J', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 11 },
	{ name: 'Q', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 12 },
	{ name: 'K', suit: 'hearts', symbol: '♥️', color: 'red', rank: 13 },
	{ name: '2', suit: 'hearts', symbol: '♥️', color: 'red', rank: 2 },
];

const pair10Hand = [
	{ name: 'J', suit: 'clubs', symbol: '♣️', color: 'black', rank: 11 },
	{ name: '10', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 10 },
	{ name: 'Q', suit: 'diamonds', symbol: '♦️', color: 'red', rank: 12 },
	{ name: 'K', suit: 'hearts', symbol: '♥️', color: 'red', rank: 13 },
	{ name: '10', suit: 'hearts', symbol: '♥️', color: 'red', rank: 10 },
];

/* Initial testing of the flushes (logical error)
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

	// Flush (*6) - all same suit
	else if (Object.keys(cardSuitTally).includes(5)) {
		points += bet * 6;
		console.log('Flush!!');
	}
*/
