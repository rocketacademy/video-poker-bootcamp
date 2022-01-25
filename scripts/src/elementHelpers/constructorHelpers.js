// CSS Class Names: Player
const CLASS_NAME_INPUT = `poker-name-input`;
const CLASS_NAME_BANNER = `poker-name-banner`;
const CLASS_WRAPPER_NAME_CONFIG = `poker-wrapper-config-name`;
const CLASS_NAME_DISPLAY = `poker-name-display`;
const CLASS_PLAYER_CREDIT = `poker-game-config-credit`;
// CSS Class Names: Game Config button
const CLASS_BUTTON_WRAPPER_INPUT = `poker-wrapper-game-modes`;
const CLASS_BUTTON_GAME_MODE_STUD_SEVEN = `poker-game-mode-stud-seven`;
const CLASS_GAME_MODE_DISPLAY = `poker-game-mode-display`;

// CSS Class Names: Game Phase Transition Buttons
const CLASS_BUTTON_START_GAME = `poker-game-config-button-start`;
const CLASS_NAME_CHECKBOX = `poker-game-config-checkbox`;
const CLASS_NAME_CHECKBOX_DESC = `poker-game-config-checkbox-desc`;
const CLASS_NAME_CHECKBOX_LABEL = `poker-game-checkbox-label`;
const CLASS_WRAPPER_PROB_CHECKBOXES = `poker-game-wrapper-prob-checkboxes-group`;
const CLASS_WRAPPER_PROB_GROUP_DESC = `poker-game-wrapper-prob-checkboxes-desc`;

// General Helpers
const _addClassToElement = (element, className) =>
  (element.className += ` ${className}`);
const _newElementTextInput = (className) => {
  const element = document.createElement(`input`);
  element.setAttribute(`type`, `text`);
  _addClassToElement(element, className);
  return element;
};

const _newElementSlider = (className, min, max) => {
  const element = document.createElement("input");
  element.className += ` ${className}`;
  element.setAttribute(`type`, `range`);
  element.setAttribute(`step`, 1);
  element.value = min;
  element.min = min;
  element.max = max;
  element.step = 1;
  return element;
};

const _newElementDiv = (className) => {
  const element = document.createElement(`div`);
  _addClassToElement(element, className);
  return element;
};
const _newElementButton = (className, desc) => {
  const element = document.createElement(`button`);
  element.className += ` ${className}`;
  element.innerText = `${desc}`;
  return element;
};

const _newElementImg = (className, src, alt) => {
  const element = document.createElement(`img`);
  element.className += ` ${className}`;
  element.setAttribute(`src`, src);
  element.setAttribute(`alt`, alt);
  return element;
};

// New Elements

// New Elements: Players

const newElementWrapperNameConfig = () => {
  const element = _newElementDiv(CLASS_WRAPPER_NAME_CONFIG);
  element.className += ` row flex-column align-items-center justify-content-center`;
  return element;
};

const newElementNameInput = () => {
  const element = _newElementTextInput(CLASS_NAME_INPUT);
  element.className += ` col text-center`;
  return element;
};

const newElementNameDisplay = () =>
  _newElementDiv(`${CLASS_NAME_DISPLAY} col text-center`);
const newElementPlayerCreditDisplay = (config) => {
  const credit = getMoneyOfPlayerConfig(config);
  const element = _newElementDiv(` ${CLASS_PLAYER_CREDIT} text-center`);
  setInnerText(element, `💰 ${credit} `);
  return element;
};

// New Elements: Game Mode
const newElementWrapperButtonGameMode = () =>
  _newElementDiv(CLASS_BUTTON_WRAPPER_INPUT);
const newElementButtonGameMode = (desc) =>
  _newElementButton(CLASS_BUTTON_GAME_MODE_STUD_SEVEN, desc);
const newElementDisplayGameMode = () => _newElementDiv(CLASS_GAME_MODE_DISPLAY);

// New Elements: Game Transition
const newElementButtonStartGame = () =>
  _newElementButton(`${CLASS_BUTTON_START_GAME}`, `START`);
