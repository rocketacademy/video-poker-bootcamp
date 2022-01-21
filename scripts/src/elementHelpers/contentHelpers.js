/**
 *
 * @param {HTMLElement} element
 * @param {HTMLElement} child
 * @returns
 */
const appendChild = (element, child) => element.appendChild(child);

const appendChilds = (element, childs) =>
  childs.forEach((c) => appendChild(element, c));

const setInnerText = (element, text) => (element.innerText = text);

const updateNameDisplayOfPlayerConfig = (playerConfig) => {
  const elementDisplay = getElementNameDisplayOfPlayerConfig(playerConfig);
  const playerName = getPlayerNameOfPlayerConfig(playerConfig);

  console.log(`playerName`);
  console.log(playerName);
  setInnerText(elementDisplay, playerName);
};
