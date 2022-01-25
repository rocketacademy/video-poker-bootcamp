// Player Config Page

const _updatePlayerInputHandler =
  (playerConfig) =>
  ({ target: { value } }) => {
    if (value === ``) {
      hideStartButton(playerConfig);
    } else {
      showStartButton(playerConfig);
    }
    setPlayerNameOfPlayerConfig(playerConfig, value);
    updateNameDisplayInGameConfig(playerConfig);
  };

const setGameModeAndUpdateDisability = (playerConfig, mode) => {
  setGameModeForPlayerConfig(playerConfig, mode);
  updateDisablitiyGameMode(playerConfig);
};
const _toggleGameModeHandler = (playerConfig, mode) => () =>
  setGameModeAndUpdateDisability(playerConfig, mode);

/**
 *
 * @param {playerConfig} playerConfig
 * @returns
 */
const newElementNameInputWhichUpdatesPlayerNameOnInput = (playerConfig) => {
  const element = newElementNameInput();
  element.addEventListener(
    `input`,
    _updatePlayerInputHandler(playerConfig, element)
  );
  return element;
};

const newElementButtonStartGameWithStart = (playerConfig) => {
  const element = newElementButtonStartGame();
  element.addEventListener(`click`, () => {
    _clearPlayerConfigDisplayAndGoToGame(playerConfig);
  });

  return element;
};

const newElementButtonGameModeAndSetToggle = (desc, mode, config) => {
  const element = newElementButtonGameMode(desc);
  element.addEventListener(`click`, _toggleGameModeHandler(config, mode));
  return element;
};

const newElementCheckboxesProbabilityWithFlagToggles = (config) => {
  const labelFourCards = document.createElement(`label`);
  const checkboxFourCards = document.createElement(`input`);
  checkboxFourCards.className += ` ${CLASS_NAME_CHECKBOX}`;
  checkboxFourCards.setAttribute(`type`, `checkbox`);
  checkboxFourCards.addEventListener(`change`, ({ target: { checked } }) => {
    setFlagProbFourCardsOfPlayerConfig(config, checked);
  });
  const descFourCards = document.createElement(`div`);
  descFourCards.innerText = `4 Cards`;
  appendChild(labelFourCards, checkboxFourCards);
  appendChild(labelFourCards, descFourCards);

  const labelThreeCards = document.createElement(`label`);

  const checkboxThreeCards = document.createElement(`input`);
  checkboxThreeCards.className += ` ${CLASS_NAME_CHECKBOX}`;
  checkboxThreeCards.setAttribute(`type`, `checkbox`);
  checkboxThreeCards.addEventListener(`change`, ({ target: { checked } }) => {
    setFlagProbThreeCardsOfPlayerConfig(config, checked);
  });
  const descThreeCards = document.createElement(`div`);
  descThreeCards.innerText = `3 Cards`;
  appendChild(labelThreeCards, checkboxThreeCards);
  appendChild(labelThreeCards, descThreeCards);

  const group = document.createElement(`div`);

  const groupDesc = document.createElement(`div`);
  groupDesc.innerText = `Calculate % on: `;

  group.appendChild(groupDesc);
  group.appendChild(labelThreeCards);
  group.appendChild(labelFourCards);
  return group;
};
// Stud Seven Page
