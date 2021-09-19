// const player1SumRank = Math.abs(player1Card.rank);

let suitList = [];
let nameList = [];
let rankList = [];
let nameCounts = {};

// adapted from https://stackoverflow.com/questions/14832603/check-if-all-values-of-array-are-equal
// this helper function helps to check if all values in an array are equal
// we need this to check for flushes
const allEqual = (arr) => arr.every((v) => v === arr[0]);

function nameListChecker(string) {
  return Object.values(nameList).includes(string);
}

// function suitListChecker(string) {
//   return Object.values(suitList).includes(string);
// }

// checks if array has consec numbers
// adapted from https://stackoverflow.com/questions/34257152/javascript-check-if-items-in-an-array-are-consecutive
function consecutiveChecker(array) {
  const a = array[4] - array[3];
  const b = array[3] - array[2];
  const c = array[1] - array[0];

  if (a == 1 && b == 1 && c == 1) {
    return true;
  }

  return false;
}

// check if array has identical strings

// first, check if Array Is Unique i.e. all values are unique so no pairs,
// no triplets, no 4 of a kind
function checkIfArrayIsUnique(myArray) {
  return myArray.length === new Set(myArray).size;
}

/**
 * A function that takes a swapped-out Video Poker Hand
 * Then Computes What Their Value at a Casino "Paytable" will be
 * Paytable values are taken from real life example: https://www.pagat.com/banking/video_poker.html
 * @param hand {object} is the player's swapped out hand to analyze
 * @return {number} after computing Paytable value of hand
 */
function calcHandScore(livehand) {
  // in actual video poker, the lowest kind of hand you need is 1 Jack or better card to gain 1 point

  suitList = [];
  nameList = [];
  rankList = [];
  nameCounts = {};

  let newPoints;
  let flushState = false;
  let straightState = false;
  let royalState = false;
  const royalFlushState = false;
  let fullHouseState = false;
  let fourKindState = false;
  let threeKindState = false;
  let twoPairState = false;

  // push hand metadata into arrays for combination tracking
  for (const card in livehand) {
    suitList.push(hand[card].suit);
    console.log(`pushing ${hand[card].suit} into suitList`);
    nameList.push(hand[card].name);
    console.log(`pushing ${hand[card].name} into nameList`);
    rankList.push(hand[card].rank);
    console.log(`pushing ${hand[card].rank} into rankList`);

    // sort rankList in ascending order for the purpose of checking for straights
    // adapted from https://www.w3schools.com/jsref/jsref_sort.asp
    rankList.sort((a, b) => a - b);
    nameList.sort((a, b) => a - b);
  }

  // counts and stores duplicate names in the hand
  // adapted from https://thewebdev.info/2021/05/15/how-to-count-duplicate-values-in-an-array-in-javascript/
  nameList.forEach((x) => {
    nameCounts[x] = (nameCounts[x] || 0) + 1;
  });
  console.log(`nameCounts are ${nameCounts}`);

  // check royalState
  if (nameListChecker('A') && nameListChecker('K')
  && nameListChecker('Q') && nameListChecker('J') && nameListChecker('10')) royalState = true;

  // same suit means flush
  if (allEqual(suitList) === true) {
    console.log('FLUSH state detected');
    flushState = true;
  }
  // check for straight
  if (consecutiveChecker(rankList) === true) {
    console.log('STRAIGHT state detected');
    straightState = true;
    newPoints = 4;
  }
  // check for royal flush
  if (flushState === true && royalState === true) {
    console.log('ROYAL FLUSH detected');
    royalState = true;
    newPoints = 250;
  }

  // check for straight flush
  else if (straightState === true && flushState === true) {
    console.log('STRAIGHT FLUSH detected!');
    newPoints = 50;
  }
  // detect normal flush
  else if (flushState === true && royalState === false && straightState === false) {
    console.log('NORMAL FLUSH detected');
    royalState = true;
    newPoints = 6;
  }

  // detect normal straight
  else if (flushState === false && royalState === false && straightState === true) {
    console.log('NORMAL STRAIGHT detected');
    royalState = true;
    newPoints = 4;
  }

  // check for 4 of a kind
  else if (Object.values(nameCounts).includes(4)) {
    console.log('FOUR OF A KIND detected');
    fourKindState = true;
    newPoints = 25;
  }

  // check for full house
  else if (Object.values(nameCounts).includes(3) && Object.values(nameCounts).includes(2)) {
    console.log('FULL HOUSE detected');
    fullHouseState = true;
    newPoints = 9;
  }

  // check for triples
  else if (Object.values(nameCounts).includes(3)) {
    console.log('3 OF A KIND detected');
    threeKindState = true;
    newPoints = 3;
  }

  // check for 2 pairs
  else if (Object.values(nameCounts).includes(2) && Object.values(nameCounts).includes(1) && Object.values(nameCounts).length === 3) {
    // this means check if array of tallies is length 3, and contains a pair, a single card, and a third tally
    console.log('TWO PAIRS detected');
    twoPairState = true;
    newPoints = 2;
  }

  // check if hand has jacks or better - ace is considered higher than Jack
  // better also means a single pair
  // so hence also check if unique card nameCounts = 4
  else if ((nameListChecker('A') || nameListChecker('K') || nameListChecker('Q') || nameListChecker('J') || Object.values(nameCounts).length === 4) && (royalState === false && straightState === false && fourKindState === false && fullHouseState === false && flushState === false && threeKindState === false && twoPairState === false)) {
    console.log('JACKS OR BETTER detected');
    newPoints = 1;
  }

  // otherwise, for everything else, no points.
  else {
    console.log('NOTHING detected, losing 1 point!');
    newPoints = -1;
  }
  // return newPoints;
  console.log(`new Points are ${newPoints} points`);
  return newPoints;
}
