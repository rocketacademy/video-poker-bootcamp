const getCoreOfPlayerConfig = (config) => config.core;

const getPlayerOfPlayerConfig = (config) => {
  const core = getCoreOfPlayerConfig(config);

  console.log(`core`);
  console.log(core);
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

/**
 *
 * @param {PlayerConfig} playerConfig
 * @returns {Object.<string,HTMLElement>} the group of elements related to player name
 */
const getElementNameGroupOfPlayerConfig = (playerConfig) =>
  playerConfig.elements.name;

const getElementGameModeButtonGroupOfPlayerConfig = (playerConfig) =>
  playerConfig.elements.gameMode;

const getElementGameModeWrapperOfPlayerConfig = (config) =>
  getElementNameGroupOfPlayerConfig(config).wrapper;

const getElementGameModeStud7OfPlayerConfig = (config) =>
  getElementNameGroupOfPlayerConfig(config).sevenStud;
const setElementGameModeWrapperOfPlayerConfig = (playerConfig, wrapper) =>
  (getElementNameGroupOfPlayerConfig(playerConfig).wrapper = wrapper);
const setElementGameModeStud7OfPlayerConfig = (playerConfig, button) =>
  (getElementNameGroupOfPlayerConfig(playerConfig).sevenStud = button);

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
  const elementButtonGameModeStud7 = newElementButtonGameMode(desc);

  setElementGameModeWrapperOfPlayerConfig(
    playerConfig,
    elementButtonGameModeWrapper
  );
  setElementGameModeStud7OfPlayerConfig(
    playerConfig,
    elementButtonGameModeStud7
  );

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

  appendChilds(elementRoot, [elementNameWrapper]);
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
