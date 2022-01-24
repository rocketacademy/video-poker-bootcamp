/* notes
 * 1. Make 1 function for reading each player hand
 *    (there are 10 hands) take special note of each condition
 * 2. maybe better to break down the hands into the fundamental
 *  characters ( i.e. fn(find pairs), fn(straights), fn(Kickers?)
 *  then deduce  the type of hand together, fundamentals for each
 *  hand reading.
 * 3. what would be the order of which rank of hand to find first? 
 *    highest or lowest?- answer: Highest.Because after that you 
 *    can rule out having to search for other lower ranked hands. 
 * LOGIC
 * 0. Sort cards according to rank. 
 * 1. highest rank in index [0]
 * 1. Comparing the Hand conditions in terms of rank first between both player's hands, 
 * 2. establish that order
 * 3. if ranks are equal, move to next set of conditions for the remaining cards
 * (may have t)
 */

/* ======================
 * ---GLOBAL VARIABLES---
 * ====================== */

let deck; 
let shuffledDeck;
let plyr1Hand = [];
let compHand = [];
let handSize = 5;

/* ======================
 * ---GAME INITIALISATION---
 * ====================== */

/* Stages + Staging here */