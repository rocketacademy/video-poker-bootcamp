const CLASS_NAME_CARD_HOLDER = `card-holder`;
const CLASS_NAME_CARD = `card`;
const CLASS_NAME_CARD_IMG = `card-img`;
const CLASS_NAME_HAND = `hand`;
const URL_CARD_FACE_DOWN = `static/img/cards/JOKER-RED.png`;

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

const cardToImgUrl = (card) => {
  const ordinal = getCardOrdinal(card).getRank().toString().padStart(2, "0");

  const suit = getCardSuit(card);
  return `static/img/cards/${ordinal}-${suit}.png`;
};

const newGameStudSeven = (core) => {
  const handSizeToSettle = 7;
  const hand = newHand();
  let currentCardPosition = 0;

  const pot = 0;

  /** @typedef {CardHolder[]} cardHolders*/
  const cardHolders = [];

  for (let i = 0; i < handSizeToSettle; i += 1) {
    const holder = newElementCardHolder();
    holder.appendChild(newElementCardEmpty());
    cardHolders.push(holder);
  }

  const wrapper = newElementHand();
  console.log(wrapper);
  appendChilds(wrapper, cardHolders);
  const elements = {
    hand: { wrapper, cardHolders },
  };

  /**
   *
   * @param {number} pos
   * @returns {CardHolder}
   */
  const getElementCardHolderByPosition = (pos) => elements.cardHolders[pos];
  const updateDisplayOfCardHolder = (pos, card) => {
    const elementCardHolder = getElementCardHolderByPosition(pos);
    const imgSrc = cardToImgUrl(card);
    const elementCardImg = newElementCard(imgSrc);
    elementCardHolder.replaceChildren(elementCardImg);
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

    drawCard: () => {
      const card = newCard();
      addCardToHand(hand, card);
      const lastIndex = getHandSize(hand) - 1; // this is abit hacky, assumes added card is in the last position.
      updateDisplayOfCardHolder(lastIndex, card);
    },
  };
};

const studSevenGoPaint = (game) => {
  console.log(game.getElementRoot());
  const root = game.getElementRoot();

  const childGameName = _newElementDiv(`dummy-gamename`);
  const childPlayerName = _newElementDiv(`dummy-playername`);
  const childPot = _newElementDiv(`dummy-pot`);
  const childHand = game.getElementHand();
  const childAction = _newElementDiv(`dummy-action`);
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
