/* ======================
 * ---GAMEPLAY LOGIC---
 * ====================== */

/* STEP 1: Show: , Message Board: Table, Interface ('Deal', 'Hold', 'Reset', 'Bet') buttons 
*          and pop ups: 'Help' 
 * STEP 2: Message Board, Ask Player to Place Bets

 */

/* HOW TO have the DOM work with player action through the display UI?
 * 1) player clicks write into .state key of cardInfo
 *    - state can be "hold" or "discard", which marks the card for next
 *      player action or card swaps
 *      i.e. 
 *          Plyr >>>> DOM, by clicking and sets cardState 
 *          DOM >>>> Plyr through Card state */