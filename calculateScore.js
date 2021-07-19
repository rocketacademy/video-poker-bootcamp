
isRoyalFlush=(rankTally)=>{
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
  if(isFlush(suitTally)||isStraight(rankTally)){
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
    if(suitTally[suit]===5)
    {
      return true;
    } 
  }
  return false;
}

isStraight=(rankTally)=>{
  //ace to 9
  for(let i=1; i<= 13 - maxHandSize + 1; i++){
    const countSequential=0;
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
//to test if full house not true
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
const calHandScore=(rankTally, suitTally)=>{
  let multiplier=0;
  
  if(isRoyalFlush(rankTally))
  {
    multiplier=800;
  }
  else if(isStraightFlush(rankTally, suitTally))
  {
    multiplier=50;
  }
  else if(isFourOfKind(rankTally))
  {
    multiplier=25;
  }
  else if(isFullHouse(rankTally))
  {
    multiplier=9;
  }
  else if(isFlush(suitTally))
  {
    multiplier=6;
  }
  else if(isStraight(rankTally))
  {
    multiplier=4;
  }
  else if(isThreeKind(rankTally))
  {
    multiplier=3;
  }
  else if(isTwoPair(rankTally))
  {
    multiplier=2;
  }
  else if(isJackOrBetter(rankTally))
  {
    multiplier=1;
  }
  return multiplier*bet;
}