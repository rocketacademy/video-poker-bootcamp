
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
  if(rankTally['11']==2){
    return true;
  }
  return false;
}
/**
 * Calculating score from pokerhands
 * @param {*} rankTally 
 * @param {*} suitTally 
 * @returns score, hand type as string
 */
const calHandScore=(rankTally, suitTally)=>{
  let multiplier=0;
  let output='';
  console.log(`rankTally `);
  console.log(rankTally);
  console.log(`suitTally `);
   console.log(suitTally);
  if(isRoyalFlush(rankTally, suitTally))
  {
    multiplier=800;
    output='royal flush';
  }
  else if(isStraightFlush(rankTally, suitTally))
  {
    multiplier=50;
    output='straight flush';
  }
  else if(isFourOfKind(rankTally))
  {
    multiplier=25;
    output='four of a kind';
  }
  else if(isFullHouse(rankTally))
  {
    multiplier=9;
    output='full house';
  }
  else if(isFlush(suitTally))
  {
    multiplier=6;
    output='flush';
  }
  else if(isStraight(rankTally)||isRoyalStraight(rankTally) )
  {
    multiplier=4;
    output='straight';
  }
  else if(isThreeKind(rankTally))
  {
    multiplier=3;
    output='three of a kind';

  }
  else if(isTwoPair(rankTally))
  {
    multiplier=2;
    output='two pair';
  }
  else if(isJackOrBetter(rankTally))
  {
    multiplier=1;
    output= 'jack or better';
  }
  else
  {
    output= 'all others';
  }
  return [multiplier*bet, output];
}