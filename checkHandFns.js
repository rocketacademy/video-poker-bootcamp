/* =====================================
 * ---CHECK WINNING HAND COMBINATIONS---
 * ===================================== */

/* FN: ROYAL FLUSH */
const checkRoyalFlush = (hand) => {
  let answer = false;
  const handClone = JSON.parse(JSON.stringify(hand));
  sortRank(handClone);
  if ( checkFlush(handClone) === true
    && handClone[0].rank === 13
    && handClone[1].rank === 12
    && handClone[2].rank === 11
    && handClone[3].rank === 10
    && handClone[4].rank === 1) {
    answer = true;
  }
return answer;
};

/* FN: STRAIGHT FLUSH */
const checkStrFlush = (hand) => {
  let answer = false;
  const handClone = JSON.parse(JSON.stringify(hand));
  sortRank(handClone);
  if (checkFlush(handClone) === true
      && checkSequential(handClone) === true) {
    answer = true;
  }
  return answer;
};

/* FN: 4-OF-A-KIND */
const checkQuads = (hand) => {
  let answer = false;
  for (let i = 0; i < hand.length; i += 1) {
    console.log('LOOP NUMBER =', i);
    let handClone = JSON.parse(JSON.stringify(hand)); 
    sortRank(handClone);
    handClone.splice(i, 1);
    let handRanks = [];
    for (let j = 0; j < handClone.length; j += 1) {
      handRanks.push(handClone[j].rank);
      console.log('handRanks =', handRanks);
    }
    const handRankSet = new Set(handRanks);
    console.log('handRankSet =', handRankSet);
    if (handRankSet.size === 1) {
      answer = true;
    }
  }
  return answer;
};

/* FN: CHECK FOR FULL HOUSE (1 Triplet + 1 Pair) */ 
/* 3-of-a-kind position is grouped to 1 Pair position, use checkTriplet coding to build. */
/* once confirm triplet is present, subtract and use set to check? */
const checkFullHouse = (hand) => {
  let answer = false;
  /* there are 2 tiers to check for full house */
  /* each tier works of a primary check function */
  let tier1Triplets = 0;
  let tier1pairs = 0;
  let tier1FullHouse= 0;
  let tier2Triplets = 0;
  let tier2pairs = 0;
  let tier2FullHouse = 0;
  let handClone = JSON.parse(JSON.stringify(hand));
  sortRank(handClone);
  /* Tier 1, combi 1, 2, 3, in excel diagram */
  for (let i = 0; i < handClone.length - 2; i += 1) {
    let cloneFirst = JSON.parse(JSON.stringify(handClone));
    console.log('tier1 LOOP ', i);
    console.log('cloneInner =', cloneFirst);

    if (cloneFirst[i].rank === cloneFirst[i + 1].rank
      && cloneFirst[i + 1].rank === cloneFirst[i + 2].rank) {
      tier1Triplets += 1;
      console.log('triplet count =', tier1Triplets);
      /* if 1 triplet is found, proceed to check if remaining 2 cards form a pair */
      /* , is remainder 2 cards = pair, return full house is true */
      cloneFirst.splice(i, 3);
      console.log('tier1 remainders  = ', cloneFirst);
      let remainderT1Ranks = [];

      /* loop for parsing ranks of remainder into an array for ranks */
      for(let j = 0; j < cloneFirst.length; j += 1) {
        remainderT1Ranks.push(cloneFirst[j].rank);
      }
      let remainderT1 = new Set(remainderT1Ranks);
      console.log('remainderT1 =', remainderT1);
      if (remainderT1.size === 1) {
        tier1pairs += 1;
        tier1FullHouse += 1;
      /* console.log('=> tier1pairs count =', tier1pairs); */
      /* console.log('====> tier1FullHouse count =', tier1FullHouse); */
      } else {
        tier1pairs += 0;
        tier1FullHouse += 0;
      /* console.log('=> tier1pairs count =', tier1pairs); */
      /*  console.log('====> tier1FullHouse count =', tier1FullHouse); */
      }
    }
  }
  console.log('=> tier1pairs count =', tier1pairs);
  console.log('====> tier1FullHouse count =', tier1FullHouse);
  /* Tier 2, combi 4, 5, 6 in excel diagram */
  for (let j = 1; j < handClone.length - 2; j += 1) {
    let cloneSecond = JSON.parse(JSON.stringify(handClone));
    if (cloneSecond[0].rank === cloneSecond[j]
      && cloneSecond[j] === cloneSecond[4]) {
      tier2Triplets += 1;
      console.log('tier2 LOOP ', j);
      console.log('cloneSecond =', cloneSecond);
      console.log('Tier 2 triplet count =', tier2Triplets);
      /* if 1 triplet is found, proceed to check if remaining 2 cards form a pair */
      /* , is remainder 2 cards = pair, return full house is true */
      /* loop for parsing ranks of remainder into an array for ranks */
      if (j === 1) {
        let tier2Rmdr = [];
        tier2Rmdr.push(cloneSecond[2].rank);
        tier2Rmdr.push(cloneSecond[3].rank);
        console.log('tier2 remainders =', tier2Rmdr);
        let remainderT2 = new Set(tier2Rmdr);
        if (remainderT2.size === 1) {
          tier2pairs += 1;
          tier2FullHouse += 1;
        } else {
          tier2pairs += 0;
          tier2FullHouse += 0;
        }
      }
      if (j === 2) {
        let tier2Rmdr = [];
        tier2Rmdr.push(cloneSecond[1].rank);
        tier2Rmdr.push(cloneSecond[3].rank);
        console.log('tier2 remainders =', tier2Rmdr);
        let remainderT2 = new Set(tier2Rmdr);
        if (remainderT2.size === 1) {
          tier2pairs += 1;
          tier2FullHouse += 1;
        } else {
          tier2pairs += 0;
          tier2FullHouse += 0;
        }
      }
      if (j === 3) {
        let tier2Rmdr = [];
        tier2Rmdr.push(cloneSecond[1].rank);
        tier2Rmdr.push(cloneSecond[2].rank);
        console.log('tier2 remainders =', tier2Rmdr);
        let remainderT2 = new Set(tier2Rmdr);
        if (remainderT2.size === 1) {
          tier2pairs += 1;
          tier2FullHouse += 1;
        } else {
          tier2pairs += 0;
          tier2FullHouse += 0;
        }
      }
    }
  }
  console.log('=> tier2pairs count =', tier2pairs);
  console.log('====> tier2FullHouse count =', tier2FullHouse);

  if (tier1FullHouse === 0 && tier2FullHouse === 0) {
    answer = false;
  } else if (tier1FullHouse === 1 && tier2FullHouse === 1) {
    answer = false;
  } else if (tier1FullHouse === 1 && tier2FullHouse === 0) {
    answer = true;
  } else if (tier1FullHouse === 0 && tier2FullHouse === 1) {
    answer = true;
  } 

  return answer;
};

/* FN: CHECK FLUSH */
/* sequentials === FALSE && FLUSH ==== TRUE */
const checkFlush = (hand) => {
  let answer = false;
  const handClone = JSON.parse(JSON.stringify(hand));
  sortRank(handClone);
  if (checkSameRank(handClone) === true
      && checkSequential(handClone) === false) {
    answer = true;
  }
  return answer;
};

/* FN: CHECK STRAIGHT */
/* sequentials === TRUE && FLUSH ==== FALSE */
const checkStraight = (hand) => {
  let answer = false;
  const handClone = JSON.parse(JSON.stringify(hand));
  sortRank(handClone);
  if (checkSameRank(handClone) === false
      && checkSequential(handClone) === true) {
    answer = true;
  }
  return answer;
};

/* FN: CHECK 3-of-a-Kind PAIRS */
/* checkQuads === FALSE and checkTriplets === True */
const check3OfAKind = (hand) => {
  let answer = false;
  const handClone = JSON.parse(JSON.stringify(hand));
  sortRank(handClone);
  if (checkQuads(handClone) === false
      && checkTriplets(handClone) === true) {
    answer = true;
  }
  return answer;
};

/* FN: CHECK 2 PAIRS */
/* checkQuads === FALSE and countPairs === 2 */
const check2Pairs = (hand) => {
let answer = false;
const handClone = JSON.parse(JSON.stringify(hand));
sortRank(handClone);
if (checkQuads(handClone) === false
    && countPairs(handClone) === 2) {
  answer = true;
}
return answer;
};

/* FN: CHECK 1 PAIR */
/* checkQuads === FALSE and countPairs === 2 */
const check1Pair =  (hand) => {
  let answer = false;
  let tier1 = false;
  let tier2 = false;
  const handClone = JSON.parse(JSON.stringify(hand));
  sortRank(handClone);

  /* check no quads and only 1 pair */
  if (checkQuads(handClone) === false
      && countPairs(handClone) === 1) {
    tier1 = true;
    console.log('tier1 = ', tier1);
  } else { 
    tier1 = false;
    console.log('tier1 = ', tier1);
  }

  /* check no triplets */
  if (checkTriplets(handClone) === false) {
    tier2 = true;
    console.log('tier2 = ', tier2);
  } else { 
    tier2 = false;
    console.log('tier2 = ', tier2);
  }
  if (tier1 === true && tier2 === true) {
    answer = true;
  }
  return answer;
  };


/* FN: CHECK HIGHCARD */
/* NO REPEATS (PAIR/, 2PAIRS,TRIPLETS, QUADS) */
/* NO SIMULT REPEATS (FULL HOUSE) */
/* NO SEQUENTIALS */
/* NO SAME SUITS */
const checkHighCard = (hand) => {
  let result = '';
  let score = 0;
  let answer = false;

  /* tier 0: no same suit + no sequentials*/
  if (checkFlush(hand) === true && checkStraight(hand) === true) {
    result = 'STRAIGHT FLUSH = TRUE';
    score += 0;
  } else if (checkFlush(hand) === false && checkStraight(hand) === false) {
    result = 'STRAIGHT FLUSH = FALSE';
    score += 1;
  }
  console.log('############## STAGE 0 CHECK ###> : ', result);
  console.log('score =', score);

  /* tier 1: no same suit */
  if (checkFlush(hand) === true) {
    result = 'FLUSH = TRUE';
    score += 0;
  } else if (checkFlush(hand) === false) {
    score += 1;
    result = 'FLUSH = FALSE';
  }
  console.log('############## STAGE 1 CHECK ###> : ', result);
  console.log('score =', score);

  /* Tier 2: no sequentials */
  if (checkStraight(hand) === true) {
    result = 'STRAIGHT = TRUE';
    score += 0;
  } else if (checkStraight(hand) === false) {
    result = 'STRAIGHT = FALSE';
    score += 1;
  }
  console.log('############## STAGE 2 CHECK ###> : ', result);
  console.log('score =', score);

  /* Tier 3: no Royalflush */ 
  if (checkRoyalFlush(hand) === true) {
    result = 'ROYAL FLUSH = TRUE';
    score += 0;
  } else if (checkRoyalFlush(hand) === false) {
    result = 'ROYAL FLUSH = FALSE';
    score += 1;
  }
  console.log('############## STAGE 3 CHECK ###> : ', result);
  console.log('score =', score);

  /* Tier 4: no quads */
  if (checkQuads(hand) === true) {
    result = 'QUADS = TRUE';
    score += 0;
  } else if (checkQuads(hand) === false) {
    result = 'QUADS = FALSE';
    score += 1;
  }
  console.log('############## STAGE 4 CHECK ###> : ', result);
  console.log('score =', score);

  /* Tier 5: no triplets */
  if (checkTriplets(hand) === true) {
    result = 'TRIPLETS = TRUE';
    score += 0;
  } else if (checkTriplets(hand) === false) {
    result = 'TRIPLETS = FALSE';
    score += 1;
  }
  console.log('############## STAGE 5 CHECK ###> : ', result);
  console.log('score =', score);

  /* Tier 6: no doublePairs >>>> BUG PRESENT IN CONSOLE LOG <<<<<<< */
  if (check2pairs(hand) === true) {
    result = '2 PAIRS = TRUE';
    score += 0;
  } else if (check2pairs(hand) === false) {
    result = '2 PAIRS = FALSE';
    score += 1;
  }
  console.log('############## STAGE 6 CHECK ###> : ', result);
  console.log('score =', score);

  /* Tier 7: no single Pairs */
  if (check1Pair(hand) === true ) {
    result = '1 PAIR = TRUE';
    score += 0;
  } else if (check1Pair(hand) === false) {
    result = '1 PAIR = FALSE';
    score += 1;
  }
  console.log('############## STAGE 7 CHECK ###> : ', result);
  console.log('score = ', score);
  if (score === 8) {
    answer = true;
  }
  return answer;
};