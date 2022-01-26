const CLASS_NAME_CARD_HOLDER = `card-holder`;
const CLASS_NAME_CARD = `card`;
const CLASS_NAME_CARD_IMG = `card-img`;
const CLASS_NAME_HAND = `poker-hand`;
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

const newElementStagingCard = () => {
  const elementStagingCardImg = newElementCardEmpty(null);
  elementStagingCardImg.style.borderColor = `green`;

  return elementStagingCardImg;
};

const newElementHand = () => _newElementDiv(`${CLASS_NAME_HAND} row`);
const newElementActionArea = () =>
  _newElementDiv(`${CLASS_NAME_ACTION_AREA} flex-column`);
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

const newGameStudSeven = (core, flags) => {
  const handSizeToSettle = 7;
  const hand = newHand();
  const deck = newStandardDeck();

  const PROBABILTY_FLAG = {
    FLOP: flags.probability.threeCards,
    TURN: flags.probability.fourCards,
  };

  console.log(PROBABILTY_FLAG);
  let currentCardPosition = 0;

  let initialBet = null;

  let activeBet = 0;
  let pot = 0;
  const addToPot = (credit) => (pot += credit);

  const getPot = () => pot;
  const elePot = document.createElement(`div`);
  elePot.className += ` money--`;
  const updatePotDisplay = () => {
    elePot.innerText = `Pot: $$${getPot()}`;
  };

  const elePlayerCredit = document.createElement(`div`);
  elePlayerCredit.className += ` money--`;
  const updatePlayerCreditDisplay = () => {
    elePlayerCredit.innerText = `You Have: $$${getPlayerCreditOfCore(core)}`;
  };

  const eleInitBet = document.createElement(`div`);
  eleInitBet.className += ` money--`;
  const updateInitBetDisplay = () => {
    eleInitBet.innerText = `Initial Bet: $$${
      initialBet === null ? `-` : initialBet
    }`;
  };
  const eleMoneys = document.createElement(`div`);
  eleMoneys.className += ` moneys row`;
  const inGameHeader = document.createElement(`div`);
  inGameHeader.className += ` in-game-header`;
  updatePotDisplay();
  updatePlayerCreditDisplay();
  updateInitBetDisplay();
  eleMoneys.appendChild(elePlayerCredit);
  eleMoneys.appendChild(elePot);
  eleMoneys.appendChild(eleInitBet);

  const elementNameDisplay = newElementNameDisplay();
  elementNameDisplay.innerText = getPlayerNameOfCore(core);

  inGameHeader.appendChild(elementNameDisplay);
  inGameHeader.appendChild(eleMoneys);
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
  const elementCardHolders = [];

  for (let i = 0; i < handSizeToSettle; i += 1) {
    const elementHolder = newElementCardHolder();
    elementHolder.appendChild(newElementCardEmpty());
    elementCardHolders.push(elementHolder);
  }
  replaceChilds(elementCardHolders[0], newElementStagingCard());
  replaceChilds(elementCardHolders[1], newElementStagingCard());

  const wrapper = newElementHand();
  appendChilds(wrapper, elementCardHolders);

  const elementActionArea = newElementActionArea();

  const elementButtonBar = _newElementDiv(
    `button-bar row justify-content-center`
  );
  const elementButtonBet = newElementBetButton();
  const elementBetValue = document.createElement(`div`);
  elementBetValue.innerText = activeBet;
  const isBusted = () => getPlayerCreditOfCore(core) <= 0;

  const transferAndUpdateDisplayCredit = (activeBet) => {
    addToPot(activeBet);
    minusPlayerCreditOfCore(core, activeBet);
    updatePotDisplay();
    updatePlayerCreditDisplay();
  };
  elementButtonBet.addEventListener(`click`, () => {
    // on bet, immediately draw card first, then assess the actions to be taken.
    setAndDisplayInitialBetIfNull(activeBet);
    transferAndUpdateDisplayCredit(activeBet);

    activeBet = 0; // reset
    elementBetValue.innerText = activeBet;

    const slider = getElementSliderBet();
    slider.max = getBetLimit();
    slider.value = activeBet;

    if (isBusted()) {
      elementBetValue.replaceChildren(newElementBusted());
      slider.parentNode?.removeChild(slider);
    } else {
    }

    refreshBetButtonVisibility();

    if (phase === PHASE_BET_INITIAL) {
      drawCardAndUpdateDisplay();
      drawCardAndUpdateDisplay();
    } else if (phase === PHASE_BET_ROUND_ONE) {
      drawCardAndUpdateDisplay();

      if (PROBABILTY_FLAG.FLOP === true) {
        const elementLoading = document.createElement("div");
        elementLoading.innerText = "Please wait for %";
        elementActionArea.replaceChildren(elementLoading);
        setTimeout(() => {
          const scoringDistribution =
            calcScoringDistributionSevenStudGivenSomeRevealedCards(hand, deck);
          const scoringDistributionInPercentage = getPMF(scoringDistribution);
          console.log(scoringDistributionInPercentage);
          if (isBusted()) {
            elementActionArea.replaceChildren(
              elementBetValue,
              elementButtonBet
            );
          } else {
            elementActionArea.replaceChildren(
              elementSliderBet,
              elementBetValue,
              elementButtonBet
            );
          }
        }, 200);
      }
      replaceChilds(getElementCardHolderByPosition(3), newElementStagingCard());
    } else if (phase === PHASE_BET_ROUND_TWO) {
      drawCardAndUpdateDisplay();
      if (PROBABILTY_FLAG.TURN === true) {
        const elementLoading = document.createElement("div");
        elementLoading.innerText = "Please wait for %";
        elementActionArea.replaceChildren(elementLoading);
        setTimeout(() => {
          const scoringDistribution =
            calcScoringDistributionSevenStudGivenSomeRevealedCards(hand, deck);
          console.table(scoringDistribution);
          const pmf = getPMF(scoringDistribution);

          const [elementXValue, elementPmfTable] = newDistributionTable(pmf);
          console.log(scoringDistribution);
          if (isBusted()) {
            elementActionArea.replaceChildren(
              elementBetValue,
              elementButtonBet
            );
          } else {
            elementActionArea.replaceChildren(
              elementSliderBet,
              elementBetValue,
              elementButtonBet
            );
          }
          // elementActionArea.appendChild(elementXValue); // Please check payout table
          elementActionArea.appendChild(elementPmfTable);
        }, 200);
      }
    } else if (phase === PHASE_BET_ROUND_THREE) {
      drawCardAndUpdateDisplay();
      drawCardAndUpdateDisplay();
      drawCardAndUpdateDisplay();

      // settle score here, my hand will have seven cards
      const { bestScore, simpleBestHand } =
        ______WARN_getHandSimpleBestCombination(hand);

      console.log(getHandAsString(simpleBestHand));
      console.log(bestScore);

      const elementBestScore = document.createElement(`div`);
      elementBestScore.className += ` best-score--`;
      elementBestScore.innerText = `Your hand: ${getNiceStringOfScoringType(
        bestScore
      )}, Payout: ${getPayoutOfScoringType(bestScore)}`;

      detachAllChildren(elementActionArea);

      const buttonRestart = document.createElement(`button`);
      buttonRestart.className += ` button-restart`;
      buttonRestart.innerText = "PLAY AGAIN";

      buttonRestart.addEventListener(`click`, () => {
        const root = getElementRootOfCore(core);
        detachAllChildren(root);
        goToGameStudSeven(core, flags);
      });
      elementActionArea.appendChild(elementBestScore);
      elementActionArea.appendChild(buttonRestart);
    }

    // display

    if (phase === PHASE_BET_INITIAL) {
      replaceChilds(getElementCardHolderByPosition(2), newElementStagingCard());
    } else if (phase === PHASE_BET_ROUND_ONE) {
      replaceChilds(getElementCardHolderByPosition(3), newElementStagingCard());
    } else if (phase === PHASE_BET_ROUND_TWO) {
      replaceChilds(getElementCardHolderByPosition(4), newElementStagingCard());
      replaceChilds(getElementCardHolderByPosition(5), newElementStagingCard());
      replaceChilds(getElementCardHolderByPosition(6), newElementStagingCard());
    } else if (phase === PHASE_BET_ROUND_THREE) {
    }

    togglePhase();
  });

  const isInitialBetSet = () => initialBet !== null;
  const setAndDisplayInitialBetIfNull = (activeBet) => {
    if (initialBet === null) {
      initialBet = activeBet;
      updateInitBetDisplay();
    }
  };
  const getBetLimit = () => {
    if (isInitialBetSet()) {
      return Math.min(initialBet, getPlayerCreditOfCore(core));
    }
    return 5;
  };
  const refreshBetButtonVisibility = () => {
    if (activeBet > 0) {
      if (isBusted()) {
        setInnerText(elementButtonBet, `CHECK`);
      } else {
        if (PHASE_BET_INITIAL === phase) {
          setInnerText(elementButtonBet, `INITIAL BET`);
        } else {
          setInnerText(elementButtonBet, `BET`);
        }
      }
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
    activeBet = Number(value);
    elementBetValue.innerText = activeBet;
    refreshBetButtonVisibility();
  });

  elementActionArea.appendChild(elementSliderBet);
  elementActionArea.appendChild(elementBetValue);

  elementButtonBar.appendChild(elementButtonBet);

  elementActionArea.appendChild(elementButtonBar);

  const elements = {
    header: inGameHeader,
    hand: { wrapper, cardHolders: elementCardHolders },
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
    getElementHeader: () => elements.header,
  };
};

const studSevenGoPaint = (game) => {
  const root = game.getElementRoot();

  const childHeader = game.getElementHeader();
  const childHand = game.getElementHand();
  const childAction = game.getElementActionArea();

  appendChilds(root, [childHeader, childHand, childAction]);
};

const goToGameStudSeven = (core, flags) => {
  const game = newGameStudSeven(core, flags);
  studSevenGoPaint(game);
};

const newDistributionTable = (pmf) => {
  const rows = [
    { text: "Hand", key: "hand" },
    { text: "%", key: "p" },
    { text: "Payout", key: "payoutRatio" },
  ];

  const arrayData = Object.entries(pmf);

  const expectedValue = arrayData.reduce((sum, [key, { payoutRatio, p }]) => {
    return sum + payoutRatio * p;
  }, 0);

  const elementXValue = document.createElement(`div`);

  elementXValue.className += ` x-val--`;
  elementXValue.innerText = `xPayout: ${(expectedValue / 100).toFixed(2)}`;

  // TABLE
  const length = arrayData.length;

  const eTable = document.createElement(`table`);

  const eHead = document.createElement(`thead`);

  const eHeaderRow = document.createElement(`tr`);

  for (const { text: colHeaderVal } of rows) {
    const th = document.createElement(`th`);
    th.innerText = colHeaderVal;
    eHeaderRow.appendChild(th);
  }
  eHead.appendChild(eHeaderRow);

  const eBody = document.createElement(`tbody`);
  for (let i = 0; i < length; i += 1) {
    const [key, rv] = arrayData[i];

    const { occurrence } = rv;
    if (occurrence > 0) {
      const eRow = document.createElement(`tr`);
      for (const { key } of rows) {
        const td = document.createElement(`td`);
        td.innerText = rv[key];
        eRow.appendChild(td);
      }

      eBody.appendChild(eRow);
    }
  }

  eTable.appendChild(eHead);
  eTable.appendChild(eBody);

  return [elementXValue, eTable];
};
