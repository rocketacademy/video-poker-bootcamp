// COMMON
/**
 *
 * @param {HTMLElement} element
 * @param {HTMLElement} child
 * @returns
 */
const appendChild = (element, child) => element.appendChild(child);

/**
 *
 * @param {HTMLElement} element
 * @param {HTMLElement[]} childs
 * @returns
 */
const appendChilds = (element, childs) =>
  childs.forEach((c) => appendChild(element, c));

const detachAllChildren = (element) => {
  while (element.lastChild) element.removeChild(element.lastChild);
};

const setInnerText = (element, text) => (element.innerText = text);

const setElementStyleDisplay = (element, display) =>
  (element.style.display = display);
const showElement = (element, display = `flex`) =>
  setElementStyleDisplay(element, display);
const hideElement = (element) => setElementStyleDisplay(element, `none`);

// GameConfig

const updateNameDisplayInGameConfig = (playerConfig) => {
  const elementDisplay = getElementNameDisplayOfPlayerConfig(playerConfig);
  const playerName = getPlayerNameOfPlayerConfig(playerConfig);
  setInnerText(elementDisplay, playerName);
};
const clearPlayerConfigPage = (config) => {
  const elementRoot = getElementRootOfPlayerConfig(config);
  detachAllChildren(elementRoot);
};
const _clearPlayerConfigDisplayAndGoToGame = (config) => {
  clearPlayerConfigPage(config);

  const core = getCoreOfPlayerConfig(config);
  const gameMode = getGameModeFromPlayerConfig(config);
  goToGame(core, gameMode);
};

const hideStartButton = (config) => {
  const element = getElementButtonStartOfPlayerConfig(config);
  hideElement(element);
};

const showStartButton = (config) => {
  const element = getElementButtonStartOfPlayerConfig(config);
  showElement(element);
};

const toggleDisabilityClick = (element, is) => {
  if (element) {
    element.disabled = is;
  }
};
const _disableClick = (element) => toggleDisabilityClick(element, true);
const _enableClick = (element) => toggleDisabilityClick(element, false);

const updateDisablitiyGameMode = (config) => {
  const activeElementGameModeButton =
    getElementGameModeActiveOfPlayerConfig(config);
  _enableClick(activeElementGameModeButton);
  const currentMode = getGameModeFromPlayerConfig(config);
  const elementCurrentMode = getElementGameModeOfPlayerConfig(
    config,
    currentMode
  );
  _disableClick(elementCurrentMode);
  setElementGameModeActiveOfPlayerConfig(config, elementCurrentMode);
};
