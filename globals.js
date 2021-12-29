// GLOBAL VARIABLES //
//---FOR WINNING COMBOS---//
let twoPairs = false;
let threeKinds = false;
let straight = false;
let flush = false;
let fullHouse = false;
let fourKinds = false;
let straightFlush = false;
let royalFlush = false;
let jackOrBetter = false;
//---FOR BETTING---//
let bettingMoney = 0;
let balanceAmount = 0;
let winnings = 0;
let returns = 0;
let clickCount = 0;

//---FOR CARDS---//
let container;
let playerCardHand = [];
let playerHandRank = [];
let cardName;
let cardSuit;
let cardRank;
let card;
let hold;
let holdArray = [];
let allCards = [];
//---FOR CARD TALLY---//
let cardNameTally = {};
let cardSuitTally = {};
let cardRankInHand = [];
//---FOR MODES---//
let mode = "firstRound";
