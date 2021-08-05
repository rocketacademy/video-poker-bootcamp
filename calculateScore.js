const jackOrBetterScore={
  'royal flush': 800,
  'straight flush':50,
  'four of a kind': 25,
  'full house': 9,
  'flush': 6,
  'straight':4, 
  'three of a kind':3,
  'two pairs':2,
  'jack or better':1,
  'all others':0
}

isRoyalFlush=(rankTally,suitTally)=>{
  if (isRoyalStraight(rankTally) && isFlush(suitTally))
  {
    return true;
  }
  return false;
}

isRoyalStraight=(rankTally)=>{
  if (
  rankTally['1']===1 && 
  rankTally['13']===1 && 
  rankTally['12']===1 && 
  rankTally['11']===1 &&
  rankTally['10']===1)
  {
    return true;
  }
  return false;
}


isStraightFlush=(rankTally, suitTally)=>{
  if(isFlush(suitTally)&&isStraight(rankTally)){
    return true;
  }
   return false;
 }

isFourOfKind=(rankTally)=>{
  for(rank in rankTally)
  {
    if(rankTally[rank]===4)
    {
      return true;
    } 
  }
  return false;
}
isFullHouse=(rankTally)=>{
  if(isThreeKind(rankTally)!=0 && isPair(rankTally)){
    return true;
  }
  return false;
}
isFlush=(suitTally)=>{
  for(suit in suitTally)
  {
    if(suitTally[suit]===maxHandSize)
    {
      return true;
    } 
  }
  return false;
}

isStraight=(rankTally)=>{
  //ace to 9
  for(let i=1; i<= 13 - maxHandSize + 1; i++){
    let countSequential=0;
    for(let j=0; j<maxHandSize; j++)
    {
      if(rankTally[i+j]>=1)
      {
        countSequential+=1;
      }
      else{
        break;
      }
    }
    if(countSequential===maxHandSize)
    {
      
      return true;
    }
  }
  return false;
}
isThreeKind=(rankTally)=>{
  for(rank in rankTally)
  {
    if(rankTally[rank]===3)
    {
      return true;
    } 
  }
  return false;
}

isPair=(rankTally)=>{
  for(rank in rankTally)
  {
    if(rankTally[rank]===2)
    {
      return true;
    } 
  }
  return false;
}
isTwoPair=(rankTally)=>{
  let pairCount=0;
  for(rank in rankTally)
  {
    if(rankTally[rank]===2)
    {
      pairCount+=1;
    } 
  }
  if(pairCount==2){
    return true;
  }
  return false;
}

isJackOrBetter=(rankTally)=>{
  if(rankTally['11']==2 || rankTally['12']==2 || rankTally['13']==2 || rankTally['13']==2 || rankTally['1']==2 ){
    return true;
  }
  return false;
}
/**
 * Calculating score from pokerhands
 * @param {object} rankTally - key: rank, value: number of cards with that rank
 * @param {object} suitTally  - key: suit, value: number of cards with that suit
 * @returns score, hand type as string
 */
const calHandScore=(rankTally, suitTally)=>{
  let multiplier=0;
  let hand='';

  if(isRoyalFlush(rankTally, suitTally))
  {
    hand='royal flush';
  }
  else if(isStraightFlush(rankTally, suitTally))
  {
    hand='straight flush';
  }
  else if(isFourOfKind(rankTally))
  {
    hand='four of a kind';
  }
  else if(isFullHouse(rankTally))
  {
    hand='full house';
  }
  else if(isFlush(suitTally))
  {
    hand='flush';
  }
  else if(isStraight(rankTally)||isRoyalStraight(rankTally) )
  {
    hand='straight';
  }
  else if(isThreeKind(rankTally))
  {
    hand='three of a kind';

  }
  else if(isTwoPair(rankTally))
  {
    hand='two pairs';
  }
  else if(isJackOrBetter(rankTally))
  {
    hand= 'jack or better';
  }
  else
  {
    hand= 'all others';
  }
  multiplier = jackOrBetterScore[hand];
  return [multiplier*bet, hand];
}