const GAME_MODE_STUD_SEVEN = `stud-seven`;

const GAME_MODES = [GAME_MODE_STUD_SEVEN];

const getGameModeFromPlayerConfig = (config) => config.gameMode;

const setGameModeForPlayerConfig = (config, mode) => (config.gameMode = mode);

const getCoreOfPlayerConfig = (config) => config.core;

const getPlayerOfPlayerConfig = (config) => {
  const core = getCoreOfPlayerConfig(config);
  return getPlayerOfCore(core);
};

const getPlayerNameOfPlayerConfig = (config) => {
  const player = getPlayerOfPlayerConfig(config);
  return getPlayerName(player);
};

const setPlayerNameOfPlayerConfig = (config, name) => {
  const player = getPlayerOfPlayerConfig(config);
  setPlayerName(player, name);
};

const getElementGameGroupOfPlayerConfig = (playerConfig) =>
  playerConfig.elements.gameMode;

const getElementGameModeWrapperOfPlayerConfig = (config) =>
  getElementGameGroupOfPlayerConfig(config).wrapper;
const getElementGameModeOfPlayerConfig = (config, mode) =>
  getElementGameGroupOfPlayerConfig(config).modes[mode];
const getElementGameDisplayOfPlayerConfig = (config) =>
  getElementGameGroupOfPlayerConfig(config).display;

const setElementGameModeActiveOfPlayerConfig = (config, element) =>
  (getElementGameGroupOfPlayerConfig(config).active = element);
const getElementGameModeActiveOfPlayerConfig = (config) =>
  getElementGameGroupOfPlayerConfig(config).active;
const getElementButtonsGameModeOfPlayerConfigAsObject = (config) =>
  getElementGameGroupOfPlayerConfig(config).modes;
const getElementButtonsGameModeOfPlayerConfigAsList = (config) =>
  Object.entries(getElementButtonsGameModeOfPlayerConfigAsObject(config));

const setElementGameModeWrapperOfPlayerConfig = (playerConfig, wrapper) =>
  (getElementGameGroupOfPlayerConfig(playerConfig).wrapper = wrapper);
const setElementGameModeOfPlayerConfig = (playerConfig, button, mode) =>
  (getElementGameGroupOfPlayerConfig(playerConfig).modes[mode] = button);
const setElementGameDisplayOfPlayerConfig = (playerConfig, display) => {
  getElementGameGroupOfPlayerConfig(playerConfig).display = display;
};

const getElementGameModeCurrentOfPlayerConfig = (config) =>
  getElementGameGroupOfPlayerConfig(config).current;
const setElementGameModeCurrentOfPlayerConfig = (config) =>
  (getElementGameGroupOfPlayerConfig(config, element).current = element);

const setElementButtonStartOfPlayConfig = (playerConfig, element) =>
  (playerConfig.elements.start = element);

const getElementPlayerOfPlayerConfig = (playerConfig) =>
  playerConfig.elements.player;
/**
 *
 * @param {PlayerConfig} playerConfig
 * @returns {Object.<string,HTMLElement>} the group of elements related to player name
 */
const getElementPlayerGroupOfPlayerConfig = (playerConfig) =>
  getElementPlayerOfPlayerConfig(playerConfig).name;

/**
 *
 * @param {PlayerConfig} config
 * @returns {HTMLElement} element which wraps the name elements
 */
const getElementPlayerWrapperOfPlayerConfig = (config) =>
  getElementPlayerGroupOfPlayerConfig(config).wrapper;

/**
 *
 * @param {PlayerConfig} config
 * @returns {HTMLElement} element which allows player input
 */
const getElementNameInputOfPlayerConfig = (config) =>
  getElementPlayerGroupOfPlayerConfig(config).input;

/**
 *
 * @param {PlayerConfig} config
 * @returns {HTMLElement} element which displays the player name
 */
const getElementNameDisplayOfPlayerConfig = (config) =>
  getElementPlayerGroupOfPlayerConfig(config).display;

const getElementPlayerCreditOfPlayerConfig = (config) =>
  getElementPlayerGroupOfPlayerConfig(config).credit;

const getElementButtonStartOfPlayerConfig = (config) => config.elements.start;
/**
 * set wrapper element for the group of elements related to player name
 * @param {PlayerConfig} config
 * @param {HTMLElement} element
 * @returns
 */
const setElementNameWrapperOfPlayerConfig = (config, element) =>
  (getElementPlayerGroupOfPlayerConfig(config).wrapper = element);

/**
 * set input element for the group of elements related to player name
 * @param {PlayerConfig} config
 * @param {HTMLElement} element
 * @returns
 */
const setElementNameInputOfPlayerConfig = (config, element) =>
  (getElementPlayerGroupOfPlayerConfig(config).input = element);
const setElementPlayerCreditOfPlayerConfig = (config, element) =>
  (getElementPlayerGroupOfPlayerConfig(config).credit = element);

/**
 * set display element for the group of elements related to player name
 * @param {PlayerConfig} config
 * @param {HTMLElement} element
 * @returns
 */
const setElementNameDisplayOfPlayerConfig = (config, element) =>
  (getElementPlayerGroupOfPlayerConfig(config).display = element);

const getMoneyOfPlayerConfig = (config) => {
  const player = getPlayerOfPlayerConfig(config);
  return getPlayerCredit(player);
};

//                        CONSTRUCTOR

/**
 *
 * @param {*} core
 * @returns {PlayerConfig} a plain PlayerConfig object
 */
const _playerConfigStruct = (core) => {
  return {
    core,
    gameMode: null,
    elements: {
      player: {
        name: { wrapper: null, input: null, display: null },
        credit: { display: null },
      },
      gameMode: {
        wrapper: null,
        modes: { [GAME_MODE_STUD_SEVEN]: null },
        current: null,
      },
      start: { button: null },
    },
  };
};

const getElementRootOfPlayerConfig = (playerConfig) => {
  const thisCore = getCoreOfPlayerConfig(playerConfig);
  const elementRoot = getElementRootOfCore(thisCore);
  return elementRoot;
};

/**
 * Create default HTML elements with default props and attach event listeners.
 * @param {PlayerConfig} playerConfig
 * @returns {PlayerConfig}
 */
const _playerConfigReadyInteractivePaint = (playerConfig) => {
  // Elements: Player Info : Name
  const elementPlayerWrapper = newElementWrapperNameConfig();
  setElementNameWrapperOfPlayerConfig(playerConfig, elementPlayerWrapper);

  const elementNameDisplay = newElementNameDisplay(playerConfig);
  setElementNameDisplayOfPlayerConfig(playerConfig, elementNameDisplay);

  const elementNameInput =
    newElementNameInputWhichUpdatesPlayerNameOnInput(playerConfig);
  setElementNameInputOfPlayerConfig(playerConfig, elementNameInput);

  elementNameInput.value = getPlayerNameOfPlayerConfig(playerConfig);
  updateNameDisplayInGameConfig(playerConfig);

  // Elements: Player Info : Money

  const elementCredit = newElementPlayerCreditDisplay(playerConfig);
  setElementPlayerCreditOfPlayerConfig(playerConfig, elementCredit);

  // Elements: Game Mode
  const elementButtonGameModeWrapper = newElementWrapperButtonGameMode();

  for (const mode of GAME_MODES) {
    const elementButtonGameMode = newElementButtonGameModeAndSetToggle(
      `Stud Seven`,
      mode,
      playerConfig
    );
    setElementGameModeOfPlayerConfig(playerConfig, elementButtonGameMode, mode);
  }

  setElementGameModeWrapperOfPlayerConfig(
    playerConfig,
    elementButtonGameModeWrapper
  );

  // Start button
  const elementButtonStart = newElementButtonStartGameWithStart(playerConfig);
  setElementButtonStartOfPlayConfig(playerConfig, elementButtonStart);
  return playerConfig;
};

// Tree Building
const _playerConfigGoPaint = (playerConfig) => {
  const elementRoot = getElementRootOfPlayerConfig(playerConfig);

  const elementPlayerWrapper =
    getElementPlayerWrapperOfPlayerConfig(playerConfig);
  const elementNameInput = getElementNameInputOfPlayerConfig(playerConfig);
  const elementNameDisplay = getElementNameDisplayOfPlayerConfig(playerConfig);

  const elementCredit = getElementPlayerCreditOfPlayerConfig(playerConfig);

  appendChilds(elementPlayerWrapper, [
    elementNameInput,
    elementNameDisplay,
    elementCredit,
  ]);

  const elementWrapperGameMode =
    getElementGameModeWrapperOfPlayerConfig(playerConfig);

  const elementGameModeButtons =
    getElementButtonsGameModeOfPlayerConfigAsList(playerConfig);

  const buttons = [];
  for (const [_, button] of elementGameModeButtons) {
    buttons.push(button);
  }
  appendChilds(elementWrapperGameMode, buttons);

  const elementStartButton = getElementButtonStartOfPlayerConfig(playerConfig);

  appendChilds(elementRoot, [
    elementPlayerWrapper,
    elementWrapperGameMode,
    elementStartButton,
  ]);
};

const newPlayerConfig = (core) => _playerConfigStruct(core);

/**
 *
 * @param {Core} core
 */
const goToPlayerConfigPage = (core) => {
  // data structure
  const playerConfig = newPlayerConfig(core);

  // ui
  _playerConfigReadyInteractivePaint(playerConfig);

  // defaults
  setGameModeAndUpdateDisability(playerConfig, GAME_MODE_STUD_SEVEN);

  // ui
  _playerConfigGoPaint(playerConfig);
};
