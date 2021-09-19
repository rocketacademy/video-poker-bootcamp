// const player1SumRank = Math.abs(player1Card.rank);

let pointsModifier;
let flushState = false;
let straightState = false;
let suitList = [];
let nameList = [];
let rankList = [];
const sameNameTally = 0;

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

https://stackoverflow.com/questions/19655975/check-if-an-array-contains-duplicate-values#:~:text=function%20checkIfArrayIsUnique(myArray)%20%7B%20for,there%20are%20no%20duplicate%20values.%20%7D

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

  for (const card in livehand) {
    suitList.push(hand[card].suit);
    console.log(`pushing ${hand[card].suit} into suitList`);
    nameList.push(hand[card].name);
    console.log(`pushing ${hand[card].name} into nameList`);
    rankList.push(hand[card].rank);
    console.log(`pushing ${hand[card].rank} into rankList`);
  }

  // sort rankList in ascending order for the purpose of checking for straights
  // adapted from https://www.w3schools.com/jsref/jsref_sort.asp
  rankList.sort((a, b) => a - b);

  // same suit means flush
  if (allEqual(suitList) === true) {
    console.log('FLUSH state detected');
    pointsModifier = 6;
    flushState = true;
  }

  // check for royal flush
  if (flushState === true && nameListChecker('A') && nameListChecker('K')
  && nameListChecker('Q') && nameListChecker('J') && nameListChecker('10')) {
    console.log('ROYAL FLUSH detected');
    pointsModifier = 250;
  }

  // check for straight
  if (consecutiveChecker(rankList) === true) {
    console.log('STRAIGHT state detected');
    straightState = true;
    pointsModifier = 4;
  }

  // check for straight flush
  if (straightState === true && flushState === true) {
    console.log('STRAIGHT FLUSH detected!');
    pointsModifier = 50;
  }

  // check for 4 of a kind or triplets

  // check if hand has jacks or better
  // else if (nameListChecker('J') ||){
  //   points
  // }

  else {
    pointsModifier = 0;
  }
  // return newPoints;
  console.log(`pointsModifier is ${pointsModifier} points`);
  return pointsModifier;
}
