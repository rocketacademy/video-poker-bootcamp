const CLASS_NAME_INPUT = `poker-name-input`;
const CLASS_NAME_WRAPPER_INPUT = `poker-name-wrapper`;
const CLASS_NAME_DISPLAY = `poker-name-display`;

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

const newElementNameInput = () => _newElementTextInput(CLASS_NAME_INPUT);

const newElementNameWrapper = () => _newElementDiv(CLASS_NAME_WRAPPER_INPUT);

const newElementNameDisplay = () => _newElementDiv(CLASS_NAME_DISPLAY);
