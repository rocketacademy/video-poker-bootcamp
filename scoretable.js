let pointsList = [
  {hand:'royal flush', points: 250},
  {hand: 'straight flush', points: 50},
  {hand: 'four of a kind', points: 25},
  {hand: 'fullhouse', points: 9},
  {hand: 'flush', points: 6},
  {hand: 'straight', points: 4},
  {hand: 'three of a kind', points: 3},
  {hand: 'two pair', points: 2},
  {hand: 'jacks or better', points: 1},
  {hand: 'lose', points:0}]

let bet = [1,2,3,4,5]
let heading = ["bet amount", "1", "2", "3", "4 "," 5"]

const scoreTable = document.getElementById("scoretable")

for(let j = 0; j <= bet.length; j +=1){
  const column = document.createElement('div')
  for (let i = 1; i <= pointsList.length; i +=1){
    const row = document.createElement('p')
    
    if ((i-1)===0) {
      row.innerText = heading[j]
    } 
    else if (j === 0) {
      row.innerText = pointsList[i-2].hand
    } else {
      row.innerText = pointsList[i-2].points * (j)
    }
    column.append(row)

  }
  scoreTable.append(column)
}

 
/**
 * A function to highligh the relevant column in the score table based on the bet input
 * @param {number} bet 
 */
const highlightScore =(betAmt)=>{
  Array.from(document.querySelectorAll('#scoretable div')).forEach(e=>e.removeAttribute('id'))

  if (betAmt <=5){
    document.querySelector('#scoretable div:nth-child('+ (betAmt+1) +')').id = "highlight"
  } 

  betButton.innerText = `Bet: ${betAmt}`

  
 
}

let betAmt=1;
let count = 0;


const betButton = document.getElementById("bet")
betButton.innerText = `Bet: ${betAmt}`
betButton.addEventListener('click', ()=>{
  console.log(betAmt)
  if(betAmt === 5){
    betAmt = 0
  }
  betAmt +=1
  checkBet(betAmt,pointsNum)

  highlightScore(betAmt)
  
  })

/**
 * A function to check if the bet number < points available.
 * @param {number} betAmt 
 * @param {number} pointsNum 
 * if bet exceeds, player cannot proceed until the bet is changed. If bet does not exceed, player is prompted to deal and start.
 */

const checkBet =(betAmt, pointsNum) => {
  
  if(betAmt > pointsNum) {
  output("bet exceeds available amount.")
  dealButton.disabled = true
  } else if(gameEnd === false ){
  output ("press deal to start")
  console.log("checkbet")
  dealButton.disabled = false
  }
}
