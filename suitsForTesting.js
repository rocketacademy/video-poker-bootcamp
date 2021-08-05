
suitColor = 'green';
currentSuitSym= "🎃";
//royal flush
//k
const king = {
        suitSymbol: currentSuitSym,
        suit: 'c',
        name: 'k',
        displayName: 'k',
        colour: suitColor,
        rank: 13,
      };
//Q
const queen = {
        suitSymbol: currentSuitSym,
        suit: 'c',
        name: 'q',
        displayName: 'q',
        colour: suitColor,
        rank: 12,
      };
//J
const jack = {
        suitSymbol: currentSuitSym,
        suit: 'c',
        name: 'j',
        displayName: 'j',
        colour: suitColor,
        rank: 11,
      };
//A
const ace = {
        suitSymbol: currentSuitSym,
        suit: 'c',
        name: 'a',
        displayName: 'a',
        colour: suitColor,
        rank: 1,
      };
//10
const ten = {
        suitSymbol: currentSuitSym,
        suit: 'c',
        name: '10',
        displayName: '10',
        colour: suitColor,
        rank: 10,
      };







// //k
// const king = {
//         suitSymbol: "🎵",
//         suit: 'hearts',
//         name: 'k',
//         displayName: 'k',
//         colour: suitColor,
//         rank: 13,
//       };
// //Q
// const queen = {
//         suitSymbol: currentSuitSym,
//         suit: 'clubs',
//         name: 'q',
//         displayName: 'q',
//         colour: suitColor,
//         rank: 12,
//       };
// //J
// const jack = {
//         suitSymbol: "🎵",
//         suit: 'hearts',
//         name: 'j',
//         displayName: 'j',
//         colour: suitColor,
//         rank: 11,
//       };
// //A
// const ace = {
//         suitSymbol: currentSuitSym,
//         suit: 'clubs',
//         name: 'a',
//         displayName: 'a',
//         colour: suitColor,
//         rank: 1,
//       };
// //10
// const ten = {
//         suitSymbol: "🎵",
//         suit: 'hearts',
//         name: '10',
//         displayName: '10',
//         colour: suitColor,
//         rank: 10,
//       };
//9
const nine = {
        suitSymbol: currentSuitSym,
        suit: 'clubs',
        name: '9',
        displayName: '9',
        colour: suitColor,
        rank: 9,
      };
//8
const eight = {
        suitSymbol: "🎵",
        suit: 'hearts',
        name: '8',
        displayName: '8',
        colour: suitColor,
        rank: 8,
      };
//7
const seven = {
        suitSymbol: currentSuitSym,
        suit: 'clubs',
        name: '7',
        displayName: '7',
        colour: suitColor,
        rank: 7,
      };
//6
const six = {
        suitSymbol: "🎵",
        suit: 'hearts',
        name: '6',
        displayName: '6',
        colour: suitColor,
        rank: 6,
      };
//5
const five = {
        suitSymbol: currentSuitSym,
        suit: 'clubs',
        name: '5',
        displayName: '5',
        colour: suitColor,
        rank: 5,
      };
//4
const four = {
        suitSymbol: "🎵",
        suit: 'hearts',
        name: '4',
        displayName: '4',
        colour: suitColor,
        rank: 4,
      };
//3
const three = {
        suitSymbol: currentSuitSym,
        suit: 'clubs',
        name: '3',
        displayName: '3',
        colour: suitColor,
        rank: 3,
      };

//card combinations
const royalFlush=[ace, king, queen, jack, ten];

const straightFlush=[jack, ten, nine, eight, seven];

const fourOfaKind=[five,five,five,five, four];

const fullHouse=[six, six, six, king, king];

const flush = [three, five, seven, nine, ace];

const straight=[ten, nine, eight, seven, six];

const threeOfaKind=[queen, queen, queen, six, three];

const twoPairs=[jack, jack, three, three, four];

const onePair=[ten, ten, eight, seven, four];

const doubleJack=[jack,jack,nine, eight, seven]