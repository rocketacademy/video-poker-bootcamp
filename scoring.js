/*

1) READ HAND FN
2) if HAND is Royal Flush => return 20pts
3) if Straight flush,=> return 8point.... 
4) if ..  return .. 7 points.. 

*/


const calcHandScore = (hand) => {
  if (checkRoyalFlush(hand) === true ) { 
    wonPts += 20;
    output(" ROYAL FLUSH - SCORE: 20");
  } else if (checkStrFlush(hand) === true ) {
    wonPts += 8;
    output(" STRAIGHT FLUSH - SCORE: 8");
  } else if (checkQuads(hand) === true) {
    wonPts += 7;
    output(" 4-OF-A-KIND - SCORE: 7");
  } else if (checkFullHouse(hand) === true) {
    wonPts += 6;
    output(" FULL-HOUSE - SCORE: 6");
  } else if (checkFlush(hand) === true) {
    wonPts += 5;
    output(" FLUSH - SCORE: 5");
  } else if (checkStraight(hand) === true) {
    wonPts += 4;
    output(" STRAIGHT- SCORE: 4");
  } else if (check3OfAKind(hand) === true) {
    wonPts += 3;
    output(" 3-OF-A-KIND - SCORE: 3");
  } else if (check2Pairs(hand) === true) {
    wonPts += 2;
    output(" 2 PAIRS - SCORE: 2");
  } else if (check1Pair(hand) === true) {
    wonPts += 1;
    output(" 1 PAIR - SCORE: 1");
  } else if (checkHighCard(hand) === true) {
    wonPts += 0;
    output(" HIGH CARD - SCORE: 0. YOU LOSE");
  } else {
    wonPts = 'error';
  }

  console.log('wonPts =', wonPts);

  return wonPts;
};


