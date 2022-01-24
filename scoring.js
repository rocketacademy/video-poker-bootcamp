/*

1) READ HAND FN
2) if HAND is Royal Flush => return 20pts
3) if Straight flush,=> return 8point.... 
4) if ..  return .. 7 points.. 

*/
let wonPts = 0; /* needs command to be reset */
let finalScore = 0;

const calcHandScore = (hand) => {
  if (checkRoyalFlush(hand) === true ) { 
    wonPts += 20;
  } else if (checkStrFlush(hand) === true ) {
    wonPts += 8;
  } else if (checkQuads(hand) === true) {
    wonPts += 7;
  } else if (checkFullHouse(hand) === true) {
    wonPts += 6;
  } else if (checkFlush(hand) === true) {
    wonPts += 5;
  } else if (checkStraight(hand) === true) {
    wonPts += 4;
  } else if (check3OfAKind(hand) === true) {
    wonPts += 3;
  } else if (check2Pairs(hand) === true) {
    wonPts += 2;
  } else if (check1Pair(hand) === true) {
    wonPts += 1;
  } else if (checkHighCard(hand) === true) {
    wonPts += 0;
  } else {
    wonPts = 'error';
  }

  console.log('wonPts =', wonPts);

  return wonPts;
};
