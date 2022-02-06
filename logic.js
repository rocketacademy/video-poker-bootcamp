/* ======================
 * ---GAMEPLAY LOGIC---
 * ====================== */

/* 1) On loading, message board displays the basic instructions */
/* gameState = 0 */
if (gameState === 0) {
output("Welcome to 5-card Video-Poker. Press 'Deal' to draw.");
};

/* 2) Player keys in bid amount, and hits the bid button which updates the points bank */

/* 3) Player can click deal button and undo button
      - Message output shows that he can hit deal button for the swap
        (changes based on game state) */
/* 4) Player hits CONFIRM  button to swap cards */
/* 5) Computation and Conclusion
 *     - read plyr1Hand and run calcHandScore
 *     - print in Message Screen the winning or losing hand
 *     - update point bank! */
