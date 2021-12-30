/**
 * Scores or payouts for winning hands.
 */
const SCORES = {
  ROYAL_FLUSH: 250,
  STRAIGHT_FLUSH: 50,
  FOUR_OF_A_KIND: 25,
  FULL_HOUSE: 9,
  FLUSH: 6,
  STRAIGHT: 4,
  THREE_OF_A_KIND: 3,
  TWO_PAIR: 2,
  ONE_PAIR: 1,
};

/**
 * Delays for various scenarios.
 */
const NUMBERS_DELAY_IN_MILLI_SECONDS = 100;
const TEXT_DELAY_IN_MILLI_SECONDS = 50;
const NEW_TEXT_DELAY_IN_MILLI_SECONDS = 2000;
const GAME_OVER_DELAY_IN_MILLI_SECONDS = 1000;
const REDIRECT_DELAY_IN_MILLI_SECONDS = 3000;
const REVEAL_CARDS_DELAY_IN_MILLI_SECONDS = 175;
const ONE_SEC_IN_MILLI_SECONDS = 1000;
const TEMP_CHANGE_DELAY_IN_MILLI_SECONDS = 1700;
const KEY_SEQUENCE_DELAY_IN_MILLI_SECONDS = 700;
const NEW_HINT_TEXT_DELAY_IN_MILLI_SECONDS = 2500;

/**
 * Global variables.
 */
let board = [];
let deck;
let credit = 100;
let bet = 0;
let messageId;
let creditId;
let delayedMessageId;
let delayedAnalyzeHandId;
let delayedHintsMessageId;
let guaranteedWin = false;
let speedUpCounting = false;
let gameHost;
let gameMusic;

const NUMBER_OF_CARDS = 5;
const MAX_BET = 5;
const MAX_MULTIPLIER = 16;
const MIN_RANK_FOR_ONE_PAIR = 11; // jack or higher

const analyzeAPIPath = 'https://vp-analyzer.herokuapp.com/analyze';

/**
 * Start/stop audio when speaker icon clicked.
 */
const playGameAudio = () => {
  const audio = document.getElementById('game-audio');
  const speaker = document.getElementById('speaker');

  if (audio.paused) {
    speaker.src = './assets/speaker.png';
    audio.play();
  } else {
    speaker.src = './assets/speaker-mute.png';
    audio.pause();
  }
};

/**
 * Play win audio.
 */
const playWinAudio = () => {
  document.getElementById('win-audio').play();
};

/**
 * Play game over audio.
 */
const playGameOverAudio = () => {
  document.getElementById('game-over-audio').play();
};

/**
 * Display game state message.
 * @param {*} message Message
 * @param {*} color Color of message text
 */
const displayMessage = (message, color = 'black') => {
  const balloonMessage = document.querySelector('.balloon-message');
  let subStringLength = 0;

  // clear existing delayed messages
  clearInterval(messageId);
  clearTimeout(delayedMessageId);
  clearTimeout(delayedAnalyzeHandId);
  clearTimeout(delayedHintsMessageId);

  messageId = setInterval(() => {
    if (subStringLength === message.length) {
      clearInterval(messageId);
    } else {
      subStringLength += 1;
      balloonMessage.innerText = message.substring(0, subStringLength);
      balloonMessage.style.color = color;
    }
  }, TEXT_DELAY_IN_MILLI_SECONDS);
};

/**
 * Reveal card to player
 * @param {*} cardElement Card
 * @param {*} cardInfo Card information
 * @param {*} order Order in group of cards
 * @returns Card
 */
const revealCard = (cardElement, cardInfo, order = 0) => {
  setTimeout(() => {
    cardElement.classList = 'card';
    cardElement.classList.add(`${cardInfo.suit}-${cardInfo.name}`);
  }, order * REVEAL_CARDS_DELAY_IN_MILLI_SECONDS);

  return cardElement;
};

/**
 * Update wins info.
 * @param {*} creditWin Credits won
 */
const updateWins = (creditWin) => {
  const wins = document.querySelector('.wins');
  if (creditWin === 0) {
    wins.innerText = '';
  } else {
    wins.innerText = `Win:${creditWin}`;
  }
};

/**
 * Update bets.
 * @param {*} newBet
 */
const updateBets = (newBet) => {
  bet += newBet;
  const bets = document.querySelector('.bets');
  bets.innerText = `Bet:${bet}`;
};

/**
 * Update credits after a game.
 * @param {*} creditChange Change of credit
 */
const updateCredits = (creditChange) => {
  const credits = document.querySelector('.credits');

  if (creditChange > 0) {
    const newCredit = credit + creditChange;
    let addCredit = 0;
    creditId = setInterval(() => {
      if (credit === newCredit) {
        clearInterval(creditId);

        // reset bet
        updateBets(-1 * bet);

        setButtons('bet');
      } else if (speedUpCounting) {
        // skip counting if counting of winning takes too long
        credit = newCredit;
        addCredit = creditChange;

        // reset speed counting
        speedUpCounting = false;

        credits.innerText = `Credits:${credit}`;
        updateWins(addCredit);
      } else {
        credit += 1;
        addCredit += 1;

        credits.innerText = `Credits:${credit}`;
        updateWins(addCredit);
      }
    }, NUMBERS_DELAY_IN_MILLI_SECONDS);
  } else {
    credit += creditChange;
    credits.innerText = `Credits:${credit}`;
    setButtons('bet');
  }
};

/**
 * Calculate winnings based on score and bet.
 * @param {*} score Score of hand
 * @param {*} gameBet Bet placed for game
 */
const calcWinnings = (score, gameBet) => {
  let winCredits = gameBet;

  // special extra winnings if player gets royal flush and bets max
  if (score === SCORES.ROYAL_FLUSH) {
    winCredits = (gameBet >= MAX_BET) ? MAX_MULTIPLIER : gameBet;
  }

  return score * winCredits;
};

/**
 * Hold selected card.
 * @param {*} cardElement Card selected
 * @param {*} index
 */
const holdCard = (cardElement) => {
  // ignore card click if not in drawing mode
  if (document.getElementById('draw').disabled) return;

  // toggle holding card between card clicks
  if (cardElement.classList.contains('held')) {
    cardElement.classList.remove('held');
  } else {
    cardElement.classList.add('held');
  }
};

/**
 * Handle card click
 * @param {*} cardElement Card
 */
const cardClick = (cardElement) => {
  holdCard(cardElement);
};

/**
 * Get a random index ranging from 0 (inclusive) to max (exclusive).
 * @param {*} max Max index limit
 * @returns Random index in range
 */
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * Shuffle an array of cards.
 * @param {*} cards Deck of cards
 * @returns Shuffled cards
 */
const shuffleCards = (cards) => {
  const shuffledCards = cards;

  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    shuffledCards[currentIndex] = randomCard;
    shuffledCards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return shuffledCards;
};

/**
 * Make a new card deck.
 * @returns An array of cards
 */
const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  // const suitsSymbol = ['♥️', '♦️', '♣️', '♠️'];
  const suitsSymbol = ['Hea', 'Dia', 'Clu', 'Spa'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let cardDisplayName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        cardDisplayName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        cardDisplayName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        cardDisplayName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        cardDisplayName = 'K';
      }

      let cardColour = 'black';
      if ((suits[suitIndex] === 'hearts') || (suits[suitIndex] === 'diamonds')) {
        cardColour = 'red';
      }

      // Create a new card info with the suit symbol ('♦️'), suit ('diamond'),
      // name ('queen'), display name ('Q'), colour ('red'), and rank (12).
      const card = {
        suitSymbol: suitsSymbol[suitIndex],
        suit: currentSuit,
        name: cardName,
        displayName: cardDisplayName,
        colour: cardColour,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

/**
 * Tally the occurence of cards in hand.
 * @param {*} cards Cards in hand
 * @returns Object that contains card rank tally and card suit tally.
 */
const tallyCards = (cards) => {
  // Create Object as tally
  const cardRankTally = {};
  const cardSuitTally = {};

  // Loop over hand
  for (let i = 0; i < cards.length; i += 1) {
    const cardRank = cards[i].rank;
    const cardSuit = cards[i].suit;

    // If we have seen the card rank before, increment its count
    if (cardRank in cardRankTally) {
      cardRankTally[cardRank] += 1;
    } else {
      // Else, initialise count of this card rank to 1
      cardRankTally[cardRank] = 1;
    }

    // If we have seen the card suit before, increment its count
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    } else {
      // Else, initialise count of this card suit to 1
      cardSuitTally[cardSuit] = 1;
    }
  }

  return { ranks: cardRankTally, suits: cardSuitTally };
};

/**
 * Check if there is one pair in hand.
 * @param {*} cardTally Tally of cards in hand
 * @returns True, if there is one pair. False, otherwise.
 */
const isOnePair = (cardTally) => {
  const rankKeys = Object.keys(cardTally.ranks);

  if (rankKeys.length !== 4) return false;

  // check for pairs
  for (let i = 0; i < rankKeys.length; i += 1) {
    const rank = 1 * rankKeys[i];
    if ((cardTally.ranks[rank] === 2)
      && ((rank >= MIN_RANK_FOR_ONE_PAIR) || rank === 1)) return true;
  }

  return false;
};

/**
 * Check if there is two pair in hand.
 * @param {*} cardTally Tally of cards in hand
 * @returns True, if there is two pair. False, otherwise.
 */
const isTwoPair = (cardTally) => {
  const rankKeys = Object.keys(cardTally.ranks);
  return (rankKeys.length === 3)
  && (((cardTally.ranks[rankKeys[0]] === 2) && (cardTally.ranks[rankKeys[1]] === 2))
    || ((cardTally.ranks[rankKeys[0]] === 2) && (cardTally.ranks[rankKeys[2]] === 2))
    || ((cardTally.ranks[rankKeys[1]] === 2) && (cardTally.ranks[rankKeys[2]] === 2)));
};

/**
 * Check if there is a three of a kind in hand.
 * @param {*} cardTally Tally of cards in hand
 * @returns True, if there is a three of a kind. False, otherwise.
 */
const isThreeOfAKind = (cardTally) => {
  const rankKeys = Object.keys(cardTally.ranks);
  return (rankKeys.length === 3)
    && ((cardTally.ranks[rankKeys[0]] === 3)
    || (cardTally.ranks[rankKeys[1]] === 3)
    || (cardTally.ranks[rankKeys[2]] === 3));
};

/**
 * Check if the cards in hand make a flush.
 * @param {*} cardTally Tally of cards in hand
 * @returns True, if there is a flush. False, otherwise.
 */
const isFlush = (cardTally) => (Object.keys(cardTally.suits).length === 1);

/**
 * Check if the cards in hand make a straight.
 * @param {*} cardTally Tally of cards in hand
 * @returns True, if there is a straight. False, otherwise.
 */
const isStraight = (cardTally) => {
  let rankKeys = Object.keys(cardTally.ranks);
  if (rankKeys.length !== 5) return false;

  // sort rank keys array to compare each values
  rankKeys = rankKeys.map(Number).sort((a, b) => a - b);

  // special case of straight to ace
  if (JSON.stringify(rankKeys) === JSON.stringify([1, 10, 11, 12, 13])) return true;

  for (let i = 1; i < rankKeys.length; i += 1) {
    // compare current value and previous value to confirm consecutive numbers
    if ((rankKeys[i] - rankKeys[i - 1]) !== 1) return false;
  }

  return true;
};

/**
 * Check if the cards in hand make a full house.
 * @param {*} cardTally Tally of cards in hand
 * @returns True, if there is a full house. False, otherwise.
 */
const isFullHouse = (cardTally) => {
  const rankKeys = Object.keys(cardTally.ranks);
  return (rankKeys.length === 2)
    && ((cardTally.ranks[rankKeys[0]] === 3) || (cardTally.ranks[rankKeys[1]] === 3));
};

/**
 * Check if there is a four of a kind in hand.
 * @param {*} cardTally Tally of cards in hand
 * @returns True, if there is a four of a kind. False, otherwise.
 */
const isFourOfAKind = (cardTally) => {
  const rankKeys = Object.keys(cardTally.ranks);
  return (rankKeys.length === 2)
    && ((cardTally.ranks[rankKeys[0]] === 4) || (cardTally.ranks[rankKeys[1]] === 4));
};

/**
 * Check if the cards in hand make a straight flush.
 * @param {*} cardTally Tally of cards in hand
 * @returns True, if there is a straight flush. False, otherwise.
 */
const isStraightFlush = (cardTally) => isStraight(cardTally) && isFlush(cardTally);

/**
 * Check if the cards in hand make a royal flush.
 * @param {*} cardTally Tally of cards in hand
 * @returns True, if there is a royal flush. False, otherwise.
 */
const isRoyalFlush = (cardTally) => {
  const rankKeys = Object.keys(cardTally.ranks);

  // royal flush hand is also a straight flush
  if (!isStraightFlush(cardTally)) return false;

  // check hand is straight flush with 10, jack, queen, king, ace
  for (let i = 0; i < rankKeys.length; i += 1) {
    const rank = 1 * rankKeys[i];
    if ((rank < 10) && (rank !== 1)) return false;
  }

  return true;
};

/**
 * Calculate score for the cards in hand.
 * @param {*} cards Array of card objects
 * @returns Number of points that the user scored for the cards in their hand
 */
const calcHandScore = (cards) => {
  const cardTally = tallyCards(cards);

  if (isRoyalFlush(cardTally)) return SCORES.ROYAL_FLUSH;
  if (isStraightFlush(cardTally)) return SCORES.STRAIGHT_FLUSH;
  if (isFourOfAKind(cardTally)) return SCORES.FOUR_OF_A_KIND;
  if (isFullHouse(cardTally)) return SCORES.FULL_HOUSE;
  if (isFlush(cardTally)) return SCORES.FLUSH;
  if (isStraight(cardTally)) return SCORES.STRAIGHT;
  if (isThreeOfAKind(cardTally)) return SCORES.THREE_OF_A_KIND;
  if (isTwoPair(cardTally)) return SCORES.TWO_PAIR;
  if (isOnePair(cardTally)) return SCORES.ONE_PAIR;

  return 0;
};

/**
 * Handle deal button click with dealing cards.
 * @param {*} cardElements Cards on hand
 */
const dealCards = (cardElements) => {
  board = [];
  deck = shuffleCards(makeDeck());

  for (let j = 0; j < NUMBER_OF_CARDS; j += 1) {
    board.push(deck.pop());
    revealCard(cardElements[j], board[j], j);
  }
};

/**
 * Deal any cards you want.
 * @param {*} cardElements Cards on hand
 * @param {*} hand Cards you want
 */
const dealSelectedCards = (cardElements, hand) => {
  board = [];
  deck = makeDeck();

  for (let i = 0; i < hand.length; i += 1) {
    const cardIndex = deck.findIndex((card) => (card.rank === hand[i].rank)
      && (card.suit === hand[i].suit));
    board.push(deck[cardIndex]);
    deck.splice(cardIndex, 1);
  }

  for (let j = 0; j < NUMBER_OF_CARDS; j += 1) {
    revealCard(cardElements[j], board[j], j);
  }
};

/**
 * Deal royal flush.
 * @param {*} cardElements Cards on hand
 */
const dealRoyalFlush = (cardElements) => {
  const royalFlushHand = [
    { rank: 10, suit: 'spades', name: '10' },
    { rank: 11, suit: 'spades', name: 'jack' },
    { rank: 12, suit: 'spades', name: 'queen' },
    { rank: 13, suit: 'spades', name: 'king' },
    { rank: 1, suit: 'spades', name: 'ace' },
  ];

  dealSelectedCards(cardElements, royalFlushHand);
};

/**
 * Handle draw button click by replacing cards not held.
 * @param {*} cardElements Cards on hand
 */
const drawCards = (cardElements) => {
  for (let i = 0; i < cardElements.length; i += 1) {
    if (!cardElements[i].classList.contains('held')) {
      board[i] = deck.pop();
      revealCard(cardElements[i], board[i], i);
    } else {
      cardElements[i].classList.remove('held');
    }
  }
};

/**
 * Buttons colors based on nes button types.
 */
const buttonColorsByType = {
  bet: 'is-primary',
  bet_max: 'is-warning',
  deal: 'is-error',
  draw: 'is-error',
};

/**
 * Enable or disable buttons.
 * @param {*} buttonsGroup Bet/Deal/Draw buttons
 */
const setButtons = (buttonsGroup) => {
  const buttons = document.querySelectorAll('.buttons > .nes-btn');
  buttons.forEach((button) => {
    if (((buttonsGroup === 'bet') && button.id.includes('bet'))
      || ((buttonsGroup === 'deal') && !button.id.includes('draw'))
      || ((buttonsGroup === 'draw') && button.id.includes('draw'))) {
      button.classList.remove('is-disabled');
      button.disabled = '';

      button.classList.add(buttonColorsByType[button.id]);
    } else {
      button.classList.add('is-disabled');
      button.disabled = 'disabled';

      button.classList.remove('is-primary');
      button.classList.remove('is-warning');
      button.classList.remove('is-error');
    }
  });
};

/**
 * Check if game is over.
 */
const isGameOver = () => {
  if (credit === 0) {
    // disable all buttons
    setButtons();

    const gameOverDialog = document.getElementById('game-over-dialog');
    gameOverDialog.showModal();

    playGameOverAudio();

    const gameOverParagraph = gameOverDialog.firstChild;

    // set countdown
    let counter = REDIRECT_DELAY_IN_MILLI_SECONDS;
    const gameOverMessageId = setInterval(() => {
      if (counter === 0) {
        clearInterval(gameOverMessageId);

        // redirect to main page
        window.location.replace('index.html');
      } else {
        gameOverParagraph.innerText += ` ${counter / ONE_SEC_IN_MILLI_SECONDS}`;
        counter -= ONE_SEC_IN_MILLI_SECONDS;
      }
    }, ONE_SEC_IN_MILLI_SECONDS);
  }
};

/**
 * Handle BET button click.
 */
const betClick = () => {
  // do nothing if no more credit
  if (credit === 0) return;

  if (bet === 0) {
    displayMessage('Click DEAL button to play.');
  }

  // remove win info
  updateWins(0);

  // subtract credit count
  updateCredits(-1);

  // add bet count
  updateBets(1);

  setButtons('deal');
};

/**
 * Handle BET MAX button click.
 */
const betMaxClick = () => {
  // do nothing if not enough credit
  if ((credit - MAX_BET) < 0) return;

  if (bet === 0) {
    displayMessage('Click DEAL button to play.');
  }

  // remove win info
  updateWins(0);

  // subtract credit count by max_bet
  updateCredits(-1 * MAX_BET);

  // add bet count by max_bet
  updateBets(MAX_BET);

  setButtons('deal');
};

/**
 * Handle DEAL button click.
 * @param {*} cardsElement Cards
 */
const dealClick = (cardsElement) => {
  displayMessage('Select cards to keep ...');
  delayedMessageId = setTimeout(() => {
    displayMessage('and click DRAW to replace the rest.');

    delayedAnalyzeHandId = setTimeout(() => {
      analyzeHand(board);
    }, NEW_TEXT_DELAY_IN_MILLI_SECONDS);
  }, NEW_TEXT_DELAY_IN_MILLI_SECONDS);

  // remove win info
  updateCredits(0);

  if (guaranteedWin) dealRoyalFlush(cardsElement.children);
  else dealCards(cardsElement.children);

  setButtons('draw');
};

/**
 * Handle DRAW button click.
 * @param {*} cardsElement Cards
 */
const drawClick = (cardsElement) => {
  drawCards(cardsElement.children);

  // disable all buttons while calculating score
  setButtons();

  // calculate hand score, winnings, and update credits
  const score = calcHandScore(board);
  const winnings = calcWinnings(score, bet);
  updateCredits(winnings);

  if (winnings >= (SCORES.ROYAL_FLUSH * MAX_MULTIPLIER)) {
    // add special message if getting a royal flush
    // while betting 5 or more
    displayMessage('Royal Flush with Bet of 5 or more!');
    delayedMessageId = setTimeout(() => {
      displayMessage('Enjoy the 800 multiplier!');
      delayedMessageId = setTimeout(() => {
        displayMessage('Click BET button to play again.');
      }, NEW_TEXT_DELAY_IN_MILLI_SECONDS * 1.5);
    }, NEW_TEXT_DELAY_IN_MILLI_SECONDS * 1.5);
  } else {
    displayMessage('Click BET button to play again.');
  }

  // reset guaranteed win code
  guaranteedWin = false;

  // check if game is over
  setTimeout(() => {
    isGameOver();
  }, GAME_OVER_DELAY_IN_MILLI_SECONDS);
};

/**
 * Dialog builder.
 * @param {*} id Id of dialog
 * @param {*} title Title of dialog content
 * @param {*} contentHTML Dialog content
 * @returns Dialog element
 */
const buildDialog = (id, title, contentHTML) => {
  const dialog = document.createElement('dialog');
  dialog.classList.add('nes-dialog');
  dialog.classList.add('is-rounded');
  dialog.id = id;

  const dialogCloseSpan = document.createElement('span');
  dialogCloseSpan.classList.add('close');
  dialogCloseSpan.classList.add('nes-pointer');
  dialogCloseSpan.innerHTML = '&times;';
  dialogCloseSpan.addEventListener('click', () => dialog.close());

  const dialogTitle = document.createElement('p');
  dialogTitle.classList.add('title');
  dialogTitle.innerText = title;

  const dialogContent = document.createElement('p');
  dialogContent.classList.add('dialog-content');
  dialogContent.innerHTML = contentHTML;

  dialog.appendChild(dialogCloseSpan);
  dialog.appendChild(dialogTitle);
  dialog.appendChild(dialogContent);

  return dialog;
};

/**
 * Close dialog when clicking outside of dialog.
 */
window.addEventListener('click', (event) => {
  const howToPlayDialog = document.getElementById('how-to-play-dialog');
  const scoringGuideDialog = document.getElementById('scoring-guide-dialog');

  if (event.target === howToPlayDialog) howToPlayDialog.close();
  else if (event.target === scoringGuideDialog) scoringGuideDialog.close();
});

/**
 * Build How To Play dialog.
 * @returns Dialog element
 */
const buildHowToPlayDialog = () => {
  const howToPlayContentHTML = `
    <div class="nes-table-responsive">
      <table class="nes-table is-centered">
        <thead>
          <tr>
            <th>#</th>
            <th>Steps</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Click on 'Bet' or 'Bet 5' to place a bet</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Click on 'Deal' to deal the cards</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Click on the cards you want to keep</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Click on 'Draw' to replace cards</td>
          </tr>
        </tbody>
      </table>
    </div>  
  `;

  return buildDialog('how-to-play-dialog', 'How to Play', howToPlayContentHTML);
};

/**
 * Build Scoring Guide dialog.
 * @returns Dialog element
 */
const buildScoringGuideDialog = () => {
  const buildScoringGuideHTML = `
    <div class="nes-table-responsive">
      <table class="nes-table is-centered">
        <thead>
          <tr>
            <th>Hand</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Royal Flush</td>
            <td>250</td>
          </tr>
          <tr>
            <td>Straight Flush</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Four of a Kind</td>
            <td>25</td>
          </tr>
          <tr>
            <td>Full House</td>
            <td>9</td>
          </tr>
          <tr>
            <td>Flush</td>
            <td>6</td>
          </tr>
          <tr>
            <td>Straight</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Three of a Kind</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Two Pair</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Jacks or Better</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  return buildDialog('scoring-guide-dialog', 'Scoring Guide', buildScoringGuideHTML);
};

/**
 * Build Game Over dialog.
 * @returns Dialog element
 */
const buildGameOverDialog = () => {
  const dialog = document.createElement('dialog');
  dialog.classList.add('nes-dialog');
  dialog.classList.add('is-rounded');
  dialog.id = 'game-over-dialog';

  const dialogContent = document.createElement('p');
  dialogContent.innerText = `GAME OVER
  
  Returning to Start Screen in
  ...`;

  dialog.appendChild(dialogContent);

  return dialog;
};

/**
 * Create buttons to show guides.
 * @returns The guide buttons
 */
const buildGuideButtons = () => {
  // add area for guide buttons
  const buttonsElement = document.createElement('div');
  buttonsElement.classList.add('guide-buttons');

  // add how to play button
  const howToPlayButtonElement = document.createElement('button');
  howToPlayButtonElement.id = 'how-to-play';
  howToPlayButtonElement.innerText = 'How to Play';
  howToPlayButtonElement.classList.add('nes-btn');
  howToPlayButtonElement.classList.add('is-primary');
  howToPlayButtonElement.addEventListener('click', () => {
    document.getElementById('how-to-play-dialog').showModal();
  });

  // add how to play button
  const scoringGuideButtonElement = document.createElement('button');
  scoringGuideButtonElement.id = 'scoring-guide';
  scoringGuideButtonElement.innerText = 'Scoring Guide';
  scoringGuideButtonElement.classList.add('nes-btn');
  scoringGuideButtonElement.classList.add('is-success');
  scoringGuideButtonElement.addEventListener('click', () => {
    document.getElementById('scoring-guide-dialog').showModal();
  });

  buttonsElement.appendChild(howToPlayButtonElement);
  buttonsElement.appendChild(scoringGuideButtonElement);

  return buttonsElement;
};

/**
 * Create the game state elements that will go on the screen.
 * @returns The game state elements
 */
const buildGameStateElements = () => {
  // add game state container
  const stateOfGameContainerElement = document.createElement('section');
  stateOfGameContainerElement.classList.add('container');

  // add area for state of game information
  const stateOfGameElement = document.createElement('section');
  stateOfGameElement.classList.add('message');
  stateOfGameElement.classList.add('game-state');

  // add area for game information balloon
  const balloonElement = document.createElement('div');
  balloonElement.classList.add('nes-balloon');
  balloonElement.classList.add('from-right');
  balloonElement.classList.add('balloon');

  // create paragraph for balloon message
  const balloonMessageElement = document.createElement('p');
  balloonMessageElement.classList.add('balloon-message');
  balloonElement.appendChild(balloonMessageElement);

  // add area for game information: credits, bet, and win
  const gameInfoContainerElement = document.createElement('div');
  gameInfoContainerElement.classList.add('game-info');

  const gameInfoElement = document.createElement('div');

  // add area for credits
  const creditsElement = document.createElement('div');
  creditsElement.classList.add('credits');
  creditsElement.innerText = `Credits:${credit}`;
  gameInfoElement.appendChild(creditsElement);

  // add area for bets
  const betsElement = document.createElement('div');
  betsElement.classList.add('bets');
  betsElement.innerText = `Bet:${bet}`;
  gameInfoElement.appendChild(betsElement);

  // add area for wins
  const winsElement = document.createElement('div');
  winsElement.classList.add('wins');
  gameInfoElement.appendChild(winsElement);

  gameInfoContainerElement.appendChild(gameInfoElement);

  // add area for game host image
  const hostElement = document.createElement('i');
  hostElement.classList.add(gameHost);
  gameInfoContainerElement.appendChild(hostElement);

  // add balloon and game state to main container
  stateOfGameElement.appendChild(balloonElement);
  stateOfGameElement.appendChild(gameInfoContainerElement);

  stateOfGameContainerElement.appendChild(stateOfGameElement);

  return stateOfGameContainerElement;
};

/**
 * Create buttons to play game.
 * @param {*} cardsElement Cards
 * @returns The game buttons
 */
const buildGameButtons = (cardsElement) => {
  // add area for buttons
  const buttonsElement = document.createElement('div');
  buttonsElement.classList.add('buttons');

  // add bet button
  const betButtonElement = document.createElement('button');
  betButtonElement.id = 'bet';
  betButtonElement.innerText = 'BET';
  betButtonElement.classList.add('nes-btn');
  betButtonElement.classList.add('is-primary');
  betButtonElement.addEventListener('click', () => betClick());
  buttonsElement.appendChild(betButtonElement);

  // add bet max button
  const betMaxButtonElement = document.createElement('button');
  betMaxButtonElement.id = 'bet_max';
  betMaxButtonElement.innerText = `BET ${MAX_BET}`;
  betMaxButtonElement.classList.add('nes-btn');
  betMaxButtonElement.classList.add('is-warning');
  betMaxButtonElement.addEventListener('click', () => betMaxClick());
  buttonsElement.appendChild(betMaxButtonElement);

  // add deal game button
  const dealButtonElement = document.createElement('button');
  dealButtonElement.id = 'deal';
  dealButtonElement.innerText = 'DEAL';
  dealButtonElement.classList.add('nes-btn');
  dealButtonElement.classList.add('is-disabled');
  dealButtonElement.addEventListener('click', () => dealClick(cardsElement));
  dealButtonElement.disabled = 'disabled';
  buttonsElement.appendChild(dealButtonElement);

  // add draw game button
  const drawButtonElement = document.createElement('button');
  drawButtonElement.id = 'draw';
  drawButtonElement.innerText = 'DRAW';
  drawButtonElement.classList.add('nes-btn');
  drawButtonElement.classList.add('is-disabled');
  drawButtonElement.disabled = 'disabled';
  drawButtonElement.addEventListener('click', () => drawClick(cardsElement));
  buttonsElement.appendChild(drawButtonElement);

  return buttonsElement;
};

/**
 * Create all the board elements that will go on the screen.
 * @returns The built board
 */
const buildBoardElements = () => {
  // create the element that everything will go inside of
  const boardElement = document.createElement('div');

  // give it a class for CSS purposes
  boardElement.classList.add('board');

  // build game guide buttons
  boardElement.appendChild(buildGuideButtons());

  // build game state elements
  boardElement.appendChild(buildGameStateElements());

  // build container for cards
  const divElement = document.createElement('div');
  divElement.classList.add('cards-container');

  // make an element for the cards
  const cardsElement = document.createElement('div');
  cardsElement.classList.add('cards');

  // make all the squares for this row
  for (let j = 0; j < NUMBER_OF_CARDS; j += 1) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('pokemon-back');

    // set the click event
    // eslint-disable-next-line
    card.addEventListener('click', (event) => {
      // we will want to pass in the card element so
      // that we can change how it looks on screen, i.e.,
      // "turn the card over"
      cardClick(event.currentTarget);
    });

    cardsElement.appendChild(card);
  }

  divElement.appendChild(cardsElement);
  boardElement.appendChild(divElement);

  // build game buttons
  boardElement.appendChild(buildGameButtons(cardsElement));

  // build dialogs
  boardElement.appendChild(buildHowToPlayDialog());
  boardElement.appendChild(buildScoringGuideDialog());
  boardElement.appendChild(buildGameOverDialog());

  return boardElement;
};

/**
 * Load settings.
 */
const loadSettings = () => {
  // load game host setting
  gameHost = localStorage.getItem('host');
  if (gameHost === null || gameHost === '') gameHost = 'nes-bulbasaur';

  // set background color based on host
  if (gameHost.includes('squirtle')) {
    document.body.style.backgroundColor = '#5EBDFC';
  } else if (gameHost.includes('charmander')) {
    document.body.style.backgroundColor = '#CE2211';
  }

  // load game music setting
  gameMusic = localStorage.getItem('music');
  if (gameMusic === null || gameMusic === '') gameMusic = './assets/pokemon-center.mp3';
  document.getElementById('game-audio').src = gameMusic;
};

/**
 * Initialize game.
 */
const initGame = () => {
  // load settings
  loadSettings();

  const boardEl = buildBoardElements(board);
  document.body.appendChild(boardEl);

  displayMessage('Click BET button to start.');
};
initGame();

/**
 * Handle keyboard input.
 */
document.addEventListener('DOMContentLoaded', () => {
  const konamiCodeKeySequence = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a',
  ];

  const royalFlushCodeKeySequence = [
    'ArrowUp', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'b', 'a',
  ];

  let userInput = [];
  let lastKeyTime = Date.now();

  // handle key presses
  document.addEventListener('keydown', (event) => {
    const currentTime = Date.now();

    // put key in sequence, reset if delay is too long
    if ((currentTime - lastKeyTime) > KEY_SEQUENCE_DELAY_IN_MILLI_SECONDS) {
      userInput = [event.key];
    } else {
      userInput.push(event.key);
    }
    lastKeyTime = currentTime;

    // if user input has the same sequence as one of the codes
    if (konamiCodeKeySequence.every((v, k) => v === userInput[k])) {
      credit += 30;

      // add background color to highlight credit increase
      const creditElement = document.querySelector('.credits');
      creditElement.innerText = `Credits:${credit}`;
      creditElement.style.backgroundColor = '#f7d51d';

      // remove background color after a short delay
      setTimeout(() => {
        creditElement.style.backgroundColor = '';
      }, TEMP_CHANGE_DELAY_IN_MILLI_SECONDS);

      playWinAudio();
    } else if (royalFlushCodeKeySequence.every((v, k) => v === userInput[k])) {
      guaranteedWin = true;

      playWinAudio();
    } else if (event.key === ' ') {
      speedUpCounting = true;
    }
  });
});

/**
 * Read hand analysis result from video_poker_analyze API.
 * @param {*} resp API response
 * @returns Cards to keep based on analysis
 */
const readHandAnalysis = (resp) => {
  const discardStrategy = Object.keys(resp)[0];

  const cardsToKeep = [];
  for (let i = 0; i < 10; i += 2) {
    let cardName = discardStrategy.substring(i, i + 1);
    let cardSuit = discardStrategy.substring(i + 1, i + 2);

    if (cardName !== 'X') {
      // convert T to 10
      if (cardName === 'T') cardName = '10';

      // convert suit
      if (cardSuit === 's') cardSuit = 'Spades';
      else if (cardSuit === 'h') cardSuit = 'Hearts';
      else if (cardSuit === 'c') cardSuit = 'Clubs';
      else if (cardSuit === 'd') cardSuit = 'Diamonds';

      // keep recommended cards
      cardsToKeep.push({ suit: cardSuit, name: cardName });
    }
  }

  return cardsToKeep;
};

/**
 * Convert cards object into string input for video_poker_analyze API.
 * @param {*} cards Cards
 * @returns Cards string
 */
const convertCardsToString = (cards) => {
  const cardsStringArray = [];

  for (let i = 0; i < cards.length; i += 1) {
    const card = cards[i];
    if (card.displayName === '10') card.displayName = 'T';

    // combine display name with suit
    cardsStringArray.push(card.displayName + cards[i].suit.substring(0, 1));
  }

  return cardsStringArray.join().replaceAll(',', '');
};

/**
 * Display hints of cards to keep.
 * @param {*} cards Cards to keep
 */
const displayCardsToKeep = (cards) => {
  if (cards.length === 5) {
    displayMessage('... keep all 5 cards');
    return;
  }

  const stringsToDisplay = [];
  let stringToDisplay;
  for (let i = 0; i < cards.length; i += 1) {
    if (i === 0) {
      stringToDisplay = `${cards[i].name} of ${cards[i].suit}`;
    } else {
      stringToDisplay += `,${cards[i].name} of ${cards[i].suit}`;
    }

    // store in array when cards to keep is more than 2 or final card
    if ((cards.length > 2) && (i === 1)) {
      stringToDisplay += ' ...';
      stringsToDisplay.push(stringToDisplay);
      stringToDisplay = '';
    } else if (cards.length === (i + 1)) {
      stringsToDisplay.push(stringToDisplay);
      stringToDisplay = '';
    }
  }

  // display first 2 cards to keep
  displayMessage(stringsToDisplay[0]);

  // display the other 2 cards to keep
  if (stringsToDisplay.length > 1) {
    setTimeout(() => {
      displayMessage(stringsToDisplay[1]);
    }, NEW_HINT_TEXT_DELAY_IN_MILLI_SECONDS);
  }
};

/**
 * Analyze hand using video_poker_analyze API.
 * @param {*} cards Cards to analyze
 * @returns Cards to keep
 */
const analyzeHand = (cards) => {
  const cardsString = convertCardsToString(cards);
  let cardsToKeep = [];

  fetch(`${analyzeAPIPath}/${cardsString}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'error') throw new Error(data.message);

      cardsToKeep = readHandAnalysis(data);

      displayMessage('Hint: Keep these cards ...');

      if (cardsToKeep.length > 0) {
        delayedHintsMessageId = setTimeout(() => {
          displayCardsToKeep(cardsToKeep);
        }, NEW_HINT_TEXT_DELAY_IN_MILLI_SECONDS);
      }
    }).catch((error) => console.error(error));

  return cardsToKeep;
};

/**
 * This module.exports is needed to run unit tests.
 * This causes a 'Uncaught ReferenceError: module is not defined'
 * in the browser but it doesn't stop the web app from working.
 */
module.exports = { calcHandScore, calcWinnings };
