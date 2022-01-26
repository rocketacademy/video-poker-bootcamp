/* ======================
 * ---GLOBAL VARIABLES---
 * ====================== */

let deck; 
let shuffledDeck;
let plyr1Hand = [];
let compHand = [];
let handSize = 5;
let plyr1Pts = 100;
let gameState = 0;


let cardNameTally = {}; /* used in helper FN: cardTally */

let bidAmount;

let wonPts = 0; /* needs command to be reset */

const discardIndexArr = []; /* holds the discarded cards of the user */


