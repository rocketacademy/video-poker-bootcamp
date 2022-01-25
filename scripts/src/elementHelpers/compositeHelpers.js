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

const newLabelProbFlag = (foo, config, desc) => {
  const label = document.createElement(`label`);
  label.className += ` ${CLASS_NAME_CHECKBOX_LABEL} col`;

  const checkbox = document.createElement(`input`);
  checkbox.className += ` ${CLASS_NAME_CHECKBOX}`;
  checkbox.setAttribute(`type`, `checkbox`);
  checkbox.addEventListener(`change`, ({ target: { checked } }) => {
    foo(config, checked);
  });

  const checkboxDesc = document.createElement(`div`);
  checkboxDesc.innerText = desc;
  checkboxDesc.className += ` ${CLASS_NAME_CHECKBOX_DESC}`;
  appendChild(label, checkbox);
  appendChild(label, checkboxDesc);
  return label;
};
const newElementCheckboxesProbabilityWithFlagToggles = (config) => {
  const labelFourCards = newLabelProbFlag(
    setFlagProbFourCardsOfPlayerConfig,
    config,
    `4 cards`
  );

  const labelThreeCards = newLabelProbFlag(
    setFlagProbThreeCardsOfPlayerConfig,
    config,
    `3 cards`
  );

  const groupDesc = document.createElement(`div`);
  groupDesc.innerText = `Calculate % on: `;
  groupDesc.className += ` ${CLASS_WRAPPER_PROB_GROUP_DESC} col`;

  const group = document.createElement(`div`);

  group.className += ` ${CLASS_WRAPPER_PROB_CHECKBOXES} row`;
  group.appendChild(groupDesc);
  group.appendChild(labelThreeCards);
  group.appendChild(labelFourCards);
  return group;
};
// Stud Seven Page
