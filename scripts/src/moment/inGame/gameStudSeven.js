const CLASS_NAME_CARD_HOLDER = `card-holder`;
const CLASS_NAME_CARD = `card`;
const CLASS_NAME_CARD_IMG = `card-img`;
const CLASS_NAME_HAND = `hand`;
const URL_CARD_FACE_DOWN = `static/img/cards/JOKER-RED.png`;
const CLASS_NAME_ACTION_AREA = `action-area`;
const CLASS_NAME_BUTTON_BET = `action-bet-button`;
const CLASS_NAME_SLIDER_BET = `slider-bet`;

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

const cardToImgUrl = (card) => {
  console.log(getInPlayCardOrdinal(card));
  const ordinal = getInPlayCardOrdinal(card).toString().padStart(2, "0");
  const suit = getInPlayCardSuit(card);
  return `static/img/cards/${ordinal}-${suit}.png`;
};

const newElementCoin = () => {
  // TODO
  return _newElementDiv(`dummy-coin`);
};
const newElementBetButton = () => {
  // TODO
  return _newElementButton(CLASS_NAME_BUTTON_BET, `BET`);
};

const newElementSliderBet = (min, max) => {
  return _newElementSlider(CLASS_NAME_SLIDER_BET, min, max);
};

const newGameStudSeven = (core) => {
  const handSizeToSettle = 7;
  const hand = newHand();
  const deck = newStandardDeck();
  let currentCardPosition = 0;

  let initialBet = null;

  let activeBet = 0;
  let pot = 0;

  /**
   *
   * @param {number} pos
   * @returns {CardHolder}
   */
  const getElementCardHolderByPosition = (pos) =>
    elements.hand.cardHolders[pos];
  const updateDisplayOfCardHolder = (pos, card) => {
    const elementCardHolder = getElementCardHolderByPosition(pos);
    const imgSrc = cardToImgUrl(card);
    const elementCardImg = newElementCard(imgSrc);
    elementCardHolder.replaceChildren(elementCardImg);
  };

  const drawCardAndUpdateDisplay = () => {
    console.group(`drawCard`);

    const card = drawCard(deck);
    addCardToHand(hand, card);

    const lastIndex = getHandSize(hand) - 1; // this is abit hacky, assumes added card is in the last position.
    updateDisplayOfCardHolder(lastIndex, card);
    console.groupEnd();
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

  elementButtonBet.addEventListener(`click`, () => {
    console.log(activeBet);

    activeBet = 0; // reset

    drawCardAndUpdateDisplay();
  });

  elementActionArea.appendChild(elementButtonBet);
  const isInitialBetSet = () => initialBet !== null;

  const getMaxBet = () => {
    if (isInitialBetSet()) {
      return initialBet;
    }
    return getPlayerCreditOfCore(core);
  };
  const elementSliderBet = newElementSliderBet(0, getMaxBet());
  elementSliderBet.addEventListener(`input`, ({ target: { value } }) => {
    console.log(value);
    activeBet = value;
  });

  elementActionArea.appendChild(elementSliderBet);

  const elements = {
    hand: { wrapper, cardHolders },
    action: {
      area: elementActionArea,
      coin: newElementCoin(),
      buttons: { bet: elementButtonBet },
    },
  };

  return {
    getElementRoot: () => getElementRootOfCore(core),
    getPlayerName: () => getPlayerNameOfCore(core),
    getPlayerCredit: () => getPlayerCreditOfCore(core),
    minusPlayerCredit: (credit) => minusPlayerCreditOfCore(core, credit),
    addPlayerCredit: (credit) => addPlayerCreditOfCore(core, credit),
    getHand: () => hand,
    getCardByPosition: (pos) => hand[pos],
    addToPot: (credit) => (pot += credit),

    getCardPosition: () => currentCardPosition,
    incrementCardPosition: () => (currentCardPosition += 1),

    getElementHand: () => elements.hand.wrapper,
    getElementActionArea: () => elements.action.area,
  };
};

const studSevenGoPaint = (game) => {
  console.log(game.getElementRoot());
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
  console.log(`gone to game stud seven ${core}`);

  const game = newGameStudSeven(core);

  studSevenGoPaint(game);
};
