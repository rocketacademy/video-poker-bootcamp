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

// Stud Seven Page
