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
 * @param {PlayerConfig} config
 * @returns {Object.<string,HTMLElement>} the group of elements related to player name
 */
const getElementNameGroupOfPlayerConfig = (config) => config.elements.name;

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
    elements: {
      name: { input: null, wrapper: null, display: null },
      gameMode: {},
    },
    gameMode: null,
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
const _playerConfigReadyPaint = (playerConfig) => {
  const elementNameWrapper = newElementNameWrapper();
  setElementNameWrapperOfPlayerConfig(playerConfig, elementNameWrapper);

  const elementNameDisplay = newElementNameDisplay(playerConfig);
  setElementNameDisplayOfPlayerConfig(playerConfig, elementNameDisplay);

  const elementNameInput =
    newElementNameInputWhichUpdatesPlayerNameOnInput(playerConfig);
  setElementNameInputOfPlayerConfig(playerConfig, elementNameInput);
  elementNameInput.value = getPlayerNameOfPlayerConfig(playerConfig);
  return playerConfig;
};

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

  _playerConfigReadyPaint(playerConfig);
  _playerConfigGoPaint(playerConfig);
};
