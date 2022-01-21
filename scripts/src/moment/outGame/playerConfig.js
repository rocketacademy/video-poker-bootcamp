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

const getElementGameModeStud7OfPlayerConfig = (config) =>
  getElementGameGroupOfPlayerConfig(config).sevenStud;
const getElementGameDisplayOfPlayerConfig = (config) =>
  getElementGameGroupOfPlayerConfig(config).display;

const setElementGameModeWrapperOfPlayerConfig = (playerConfig, wrapper) =>
  (getElementGameGroupOfPlayerConfig(playerConfig).wrapper = wrapper);
const setElementGameModeStud7OfPlayerConfig = (playerConfig, button) =>
  (getElementGameGroupOfPlayerConfig(playerConfig).sevenStud = button);

const setElementGameDisplayOfPlayerConfig = (playerConfig, display) => {
  getElementGameGroupOfPlayerConfig(playerConfig).display = display;
};

/**
 *
 * @param {PlayerConfig} playerConfig
 * @returns {Object.<string,HTMLElement>} the group of elements related to player name
 */
const getElementNameGroupOfPlayerConfig = (playerConfig) =>
  playerConfig.elements.name;

/**
 *
 * @param {PlayerConfig} config
 * @returns {HTMLElement} element which wraps the name elements
 */
const getElementNameWrapperOfPlayerConfig = (config) =>
  getElementNameGroupOfPlayerConfig(config).wrapper;

/**
 *
 * @param {PlayerConfig} config
 * @returns {HTMLElement} element which allows player input
 */
const getElementNameInputOfPlayerConfig = (config) =>
  getElementNameGroupOfPlayerConfig(config).input;

/**
 *
 * @param {PlayerConfig} config
 * @returns {HTMLElement} element which displays the player name
 */
const getElementNameDisplayOfPlayerConfig = (config) =>
  getElementNameGroupOfPlayerConfig(config).display;

/**
 * set wrapper element for the group of elements related to player name
 * @param {PlayerConfig} config
 * @param {HTMLElement} element
 * @returns
 */
const setElementNameWrapperOfPlayerConfig = (config, element) =>
  (getElementNameGroupOfPlayerConfig(config).wrapper = element);

/**
 * set input element for the group of elements related to player name
 * @param {PlayerConfig} config
 * @param {HTMLElement} element
 * @returns
 */
const setElementNameInputOfPlayerConfig = (config, element) =>
  (getElementNameGroupOfPlayerConfig(config).input = element);

/**
 * set display element for the group of elements related to player name
 * @param {PlayerConfig} config
 * @param {HTMLElement} element
 * @returns
 */
const setElementNameDisplayOfPlayerConfig = (config, element) =>
  (getElementNameGroupOfPlayerConfig(config).display = element);

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
      name: { wrapper: null, input: null, display: null },
      gameMode: { wrapper: null, sevenStud: null },
    },
  };
};

const getElementRootOfPlayerConfig = (playerConfig) => {
  const thisCore = getCoreOfPlayerConfig(playerConfig);
  const elementRoot = getElementRootOfCore(thisCore);
  return elementRoot;
};

/**
 * assigns default elements of this game.
 * @param {PlayerConfig} playerConfig
 * @returns {PlayerConfig}
 */
const _playerConfigReadyInteractivePaint = (playerConfig) => {
  const elementNameWrapper = newElementWrapperNameConfig();
  setElementNameWrapperOfPlayerConfig(playerConfig, elementNameWrapper);

  const elementNameDisplay = newElementNameDisplay(playerConfig);
  setElementNameDisplayOfPlayerConfig(playerConfig, elementNameDisplay);

  const elementNameInput =
    newElementNameInputWhichUpdatesPlayerNameOnInput(playerConfig);
  setElementNameInputOfPlayerConfig(playerConfig, elementNameInput);
  elementNameInput.value = getPlayerNameOfPlayerConfig(playerConfig);

  const elementButtonGameModeWrapper = newElementWrapperButtonGameMode();
  const elementButtonGameModeStud7 = newElementButtonGameMode(`Stud Seven`);
  const elementGameModeDisplay = newElementDisplayGameMode();

  setElementGameModeWrapperOfPlayerConfig(
    playerConfig,
    elementButtonGameModeWrapper
  );

  console.log(
    elementButtonGameModeWrapper ===
      getElementGameModeWrapperOfPlayerConfig(playerConfig)
  );
  setElementGameModeStud7OfPlayerConfig(
    playerConfig,
    elementButtonGameModeStud7
  );
  setElementGameDisplayOfPlayerConfig(playerConfig, elementGameModeDisplay);

  return playerConfig;
};

// i did some ui tried to organise my code
// tried to organise my code

const _playerConfigGoPaint = (playerConfig) => {
  const elementRoot = getElementRootOfPlayerConfig(playerConfig);

  const elementNameWrapper = getElementNameWrapperOfPlayerConfig(playerConfig);
  const elementNameInput = getElementNameInputOfPlayerConfig(playerConfig);
  const elementNameDisplay = getElementNameDisplayOfPlayerConfig(playerConfig);

  updateNameDisplayOfPlayerConfig(playerConfig);

  appendChilds(elementNameWrapper, [elementNameInput, elementNameDisplay]);

  const elementWrapperGameMode =
    getElementGameModeWrapperOfPlayerConfig(playerConfig);
  const elementButtonGameModeStud7 =
    getElementGameModeStud7OfPlayerConfig(playerConfig);
  const elementDisplayGameMode =
    getElementGameDisplayOfPlayerConfig(playerConfig);
  console.log(elementWrapperGameMode);
  console.log(elementButtonGameModeStud7);
  appendChilds(elementWrapperGameMode, [
    elementButtonGameModeStud7,
    elementDisplayGameMode,
  ]);

  appendChilds(elementRoot, [elementNameWrapper, elementWrapperGameMode]);
};

const newPlayerConfig = (core) => _playerConfigStruct(core);

/**
 *
 * @param {Core} core
 */
const goToPlayerConfigPage = (core) => {
  const playerConfig = newPlayerConfig(core);
  _playerConfigReadyInteractivePaint(playerConfig);
  _playerConfigGoPaint(playerConfig);
};
