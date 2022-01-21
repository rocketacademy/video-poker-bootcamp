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

const getElementPlayerOfPlayerConfig = (playerConfig) =>
  playerConfig.elements.player;
/**
 *
 * @param {PlayerConfig} playerConfig
 * @returns {Object.<string,HTMLElement>} the group of elements related to player name
 */
const getElementNameGroupOfPlayerConfig = (playerConfig) =>
  getElementPlayerOfPlayerConfig(playerConfig).name;

/**
 *
 * @param {PlayerConfig} config
 * @returns {HTMLElement} element which wraps the name elements
 */
const getElementPlayerWrapperOfPlayerConfig = (config) =>
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
      player: {
        name: { wrapper: null, input: null, display: null },
        money: { display: null },
      },
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
 * assigns default HTML elements of this game.
 * @param {PlayerConfig} playerConfig
 * @returns {PlayerConfig}
 */
const _playerConfigReadyInteractivePaint = (playerConfig) => {
  // Player info elements
  const elementPlayerWrapper = newElementWrapperNameConfig();
  setElementNameWrapperOfPlayerConfig(playerConfig, elementPlayerWrapper);

  const elementNameDisplay = newElementNameDisplay(playerConfig);
  setElementNameDisplayOfPlayerConfig(playerConfig, elementNameDisplay);

  const elementNameInput =
    newElementNameInputWhichUpdatesPlayerNameOnInput(playerConfig);
  setElementNameInputOfPlayerConfig(playerConfig, elementNameInput);

  elementNameInput.value = getPlayerNameOfPlayerConfig(playerConfig);
  updateNameDisplayOfPlayerConfig(playerConfig);

  // Game mode elements
  const elementButtonGameModeWrapper = newElementWrapperButtonGameMode();
  const elementButtonGameModeStud7 = newElementButtonGameMode(`Stud Seven`);
  const elementGameModeDisplay = newElementDisplayGameMode();

  setElementGameModeWrapperOfPlayerConfig(
    playerConfig,
    elementButtonGameModeWrapper
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

  const elementPlayerWrapper =
    getElementPlayerWrapperOfPlayerConfig(playerConfig);
  const elementNameInput = getElementNameInputOfPlayerConfig(playerConfig);
  const elementNameDisplay = getElementNameDisplayOfPlayerConfig(playerConfig);

  appendChilds(elementPlayerWrapper, [elementNameInput, elementNameDisplay]);

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

  appendChilds(elementRoot, [elementPlayerWrapper, elementWrapperGameMode]);
};

const newPlayerConfig = (core) => _playerConfigStruct(core);

/**
 *
 * @param {Core} core
 */
const goToPlayerConfigPage = (core) => {
  // data
  const playerConfig = newPlayerConfig(core);

  // ui
  _playerConfigReadyInteractivePaint(playerConfig);
  _playerConfigGoPaint(playerConfig);
};
