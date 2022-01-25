const CLASS_NAME_CARD_HOLDER = `card-holder`;
const CLASS_NAME_CARD = `card`;
const CLASS_NAME_CARD_IMG = `card-img`;
const CLASS_NAME_HAND = `hand`;
const URL_CARD_FACE_DOWN = `static/img/cards/JOKER-RED.png`;
const CLASS_NAME_ACTION_AREA = `action-area`;
const CLASS_NAME_BUTTON_BET = `action-bet-button`;
const CLASS_NAME_SLIDER_BET = `slider-bet`;
const CLASS_NAME_BUSTED = `desc busted`;

const PHASE_BET_INITIAL = 0;
const PHASE_BET_ROUND_ONE = 1;
const PHASE_BET_ROUND_TWO = 2;
const PHASE_BET_ROUND_THREE = 3;

/**
 *
 * @returns {CardHolder}
 */
const newElementCardHolder = () => _newElementDiv(CLASS_NAME_CARD_HOLDER);
const newElementCard = (src, alt = `A card element`) =>
  _newElementImg(CLASS_NAME_CARD_IMG, src, alt);
const newElementCardBack = () =>
  _newElementImg(
    CLASS_NAME_CARD_IMG,
    URL_CARD_FACE_DOWN,
    `A card element representing back of the card`
  );

const newElementCardEmpty = () => newElementCard(null, ``);
const newElementHand = () => _newElementDiv(CLASS_NAME_HAND);
const newElementActionArea = () => _newElementDiv(CLASS_NAME_ACTION_AREA);
const newElementBusted = () => {
  const element = _newElementDiv(CLASS_NAME_BUSTED);
  element.innerText = `No more 🍯`;

  return element;
};
const cardToImgUrl = (card) => {
  const ordinal = getInPlayCardOrdinal(card).toString().padStart(2, "0");
  const suit = getInPlayCardSuit(card);
  return `static/img/cards/${ordinal}-${suit}.png`;
};
const newElementCoin = () => {
  return _newElementDiv(`dummy-coin`);
};
const newElementBetButton = () => {
  const element = _newElementButton(CLASS_NAME_BUTTON_BET, `BET`);
  return element;
};
const newElementSliderBet = (min, max) => {
  return _newElementSlider(CLASS_NAME_SLIDER_BET, min, max);
};

const ElementDistribution = () => {};

const newGameStudSeven = (core) => {
  const handSizeToSettle = 7;
  const hand = newHand();
  const deck = newStandardDeck();
  let currentCardPosition = 0;

  let initialBet = null;

  let activeBet = 0;
  let pot = 0;
  const addToPot = (credit) => (pot += credit);

  let phase = PHASE_BET_INITIAL;

  const togglePhase = () => (phase += 1); // do this after current phase wants to end
  /**
   *
   * @param {number} pos
   * @returns {CardHolder}
   */
  const getElementCardHolderByPosition = (pos) =>
    elements.hand.cardHolders[pos];

  const getElementSliderBet = () => elements.action.bet.slider;
  const updateDisplayOfCardHolder = (pos, card) => {
    const elementCardHolder = getElementCardHolderByPosition(pos);
    const imgSrc = cardToImgUrl(card);
    const elementCardImg = newElementCard(imgSrc);
    elementCardHolder.replaceChildren(elementCardImg);
  };

  const drawCardAndUpdateDisplay = () => {
    const card = drawCard(deck);
    addInPlayCardToHand(hand, card);
    const lastIndex = getHandSize(hand) - 1; // this is abit hacky, assumes added card is in the last position.
    updateDisplayOfCardHolder(lastIndex, card);
  };

  /** @typedef {CardHolder[]} cardHolders*/
  const cardHolders = [];

  for (let i = 0; i < handSizeToSettle; i += 1) {
    const holder = newElementCardHolder();
    holder.appendChild(newElementCardEmpty());
    cardHolders.push(holder);
  }

  const wrapper = newElementHand();
  appendChilds(wrapper, cardHolders);

  const elementActionArea = newElementActionArea();
  const elementButtonBet = newElementBetButton();

  const isBusted = () => getPlayerCreditOfCore(core) <= 0;
  elementButtonBet.addEventListener(`click`, () => {
    setInitialBetIfNull(activeBet);
    addToPot(activeBet);
    minusPlayerCreditOfCore(core, activeBet);

    activeBet = 0; // reset

    if (isBusted()) {
      detachAllChildren(elementActionArea);
      elementActionArea.appendChild(newElementBusted());
      return;
    }
    const slider = getElementSliderBet();
    slider.max = getBetLimit();
    slider.value = 0;
    refreshBetButtonVisibility();

    if (phase === PHASE_BET_INITIAL) {
      drawCardAndUpdateDisplay();
      drawCardAndUpdateDisplay();
    } else if (phase === PHASE_BET_ROUND_ONE) {
      drawCardAndUpdateDisplay();
    } else if (phase === PHASE_BET_ROUND_TWO) {
      const elementLoading = document.createElement("div");
      elementLoading.innerText = "Please wait for %";
      elementActionArea.replaceChildren(elementLoading);

      drawCardAndUpdateDisplay();
      setTimeout(() => {
        const scoringDistribution = calcActualScoringDistributionSevenStud(
          hand,
          deck
        );
        console.table(scoringDistribution);
        const scoringDistributionInPercentage = getPMF(scoringDistribution);
        console.log(scoringDistributionInPercentage);
        elementActionArea.replaceChildren(elementButtonBet, elementSliderBet);
      }, 200);
      // appendChild(elementActionArea,elementButtonBet);
    } else if (phase === PHASE_BET_ROUND_THREE) {
      drawCardAndUpdateDisplay();
      drawCardAndUpdateDisplay();
      drawCardAndUpdateDisplay();
      detachAllChildren(elementActionArea);
      // const combs = ______WARN_getHandCombinations(hand, POKER_HAND_SIZE);
      // const best = getBestCombination(combs);
      // const handCombinations = getCombinationsSortedByRankAscending(combs);
      // const handTable = [];
      // for (const hand of handCombinations) {
      //   const handRow = [];
      //   for (const card of hand) {
      //     handRow.push(getInPlayCardRankAndSuitString(card));
      //   }
      //   handTable.push(handRow, getScoreType(hand));
      // }
    }

    togglePhase();
  });

  elementActionArea.appendChild(elementButtonBet);
  const isInitialBetSet = () => initialBet !== null;
  const setInitialBetIfNull = (activeBet) => {
    if (initialBet === null) {
      initialBet = activeBet;
    }
  };
  const getBetLimit = () => {
    if (isInitialBetSet()) {
      return Math.min(initialBet, getPlayerCreditOfCore(core));
    }
    return getPlayerCreditOfCore(core);
  };
  const refreshBetButtonVisibility = () => {
    if (activeBet > 0) {
      setInnerText(elementButtonBet, `BET`);
      showElement(elementButtonBet);
    } else {
      if (isInitialBetSet()) {
        setInnerText(elementButtonBet, `CHECK`);
      } else {
        hideElement(elementButtonBet);
      }
    }
  };
  const elementSliderBet = newElementSliderBet(0, getBetLimit());
  elementSliderBet.addEventListener(`input`, ({ target: { value } }) => {
    activeBet = value;
    refreshBetButtonVisibility();
  });

  elementActionArea.appendChild(elementSliderBet);

  const elements = {
    hand: { wrapper, cardHolders },
    action: {
      area: elementActionArea,
      coin: newElementCoin(),
      bet: { button: elementButtonBet, slider: elementSliderBet },
    },
  };
  refreshBetButtonVisibility();
  return {
    getElementRoot: () => getElementRootOfCore(core),
    getPlayerName: () => getPlayerNameOfCore(core),
    getPlayerCredit: () => getPlayerCreditOfCore(core),
    minusPlayerCredit: (credit) => minusPlayerCreditOfCore(core, credit),
    addPlayerCredit: (credit) => addPlayerCreditOfCore(core, credit),
    getHand: () => hand,
    getCardByPosition: (pos) => hand[pos],
    getCardPosition: () => currentCardPosition,
    incrementCardPosition: () => (currentCardPosition += 1),

    getElementHand: () => elements.hand.wrapper,
    getElementActionArea: () => elements.action.area,
  };
};

const studSevenGoPaint = (game) => {
  const root = game.getElementRoot();

  const childGameName = _newElementDiv(`dummy-gamename`);
  const childPlayerName = _newElementDiv(`dummy-playername`);
  const childPot = _newElementDiv(`dummy-pot`);
  const childHand = game.getElementHand();
  const childAction = game.getElementActionArea();
  const childCredit = _newElementDiv(`dummy-credit`);

  appendChilds(root, [
    childGameName,
    childPlayerName,
    childPot,
    childHand,
    childAction,
    childCredit,
  ]);
};

const goToGameStudSeven = (core) => {
  const game = newGameStudSeven(core);
  studSevenGoPaint(game);
};
