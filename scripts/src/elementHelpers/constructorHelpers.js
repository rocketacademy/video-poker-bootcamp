const CLASS_NAME_INPUT = `poker-name-input`;
const CLASS_WRAPPER_NAME_CONFIG = `poker-wrapper-config-name`;
const CLASS_BUTTON_WRAPPER_INPUT = `poker-wrapper-game-modes`;
const CLASS_NAME_DISPLAY = `poker-name-display`;

const CLASS_BUTTON_GAME_MODE = `poker-game-mode`;

const CLASS_GAME_MODE_DISPLAY = `poker-game-mode-display`;

const _addClassToElement = (element, className) =>
  (element.className += ` ${className}`);

const _newElementTextInput = (className) => {
  const element = document.createElement(`input`);
  element.setAttribute(`type`, `text`);
  _addClassToElement(element, className);
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

const newElementNameInput = () => _newElementTextInput(CLASS_NAME_INPUT);
const newElementWrapperNameConfig = () =>
  _newElementDiv(CLASS_WRAPPER_NAME_CONFIG);
const newElementNameDisplay = () => _newElementDiv(CLASS_NAME_DISPLAY);

const newElementWrapperButtonGameMode = () =>
  _newElementDiv(CLASS_BUTTON_WRAPPER_INPUT);

const newElementButtonGameMode = (desc) =>
  _newElementButton(CLASS_BUTTON_GAME_MODE, desc);

const newElementDisplayGameMode = () => _newElementDiv(CLASS_GAME_MODE_DISPLAY);
