const MODES = {
  TEST: `test`,
  DEMO: `demo`,
};

const getMode = () => document.getElementById(`root`).getAttribute(`mode`);

const getDefaultElementRoot = () => document.getElementById(`root`);

/**
 * @typedef {Object} Core
 * @property {Player} player
 * @property {HTMLElement} elementRoot
 *
 */

const newCore = () => {
  return {
    player: newPlayer(),
    elementRoot: getDefaultElementRoot(),
  };
};

const getPlayerOfCore = (core) => core.player;
const getPlayerCreditOfCore = (core) => getPlayerCredit(core.player);
const minusPlayerCreditOfCore = (core, credit) =>
  minusPlayerCredit(getPlayerOfCore(core), credit);
const addPlayerCreditOfCore = (core, credit) =>
  addPlayerCredit(getPlayerOfCore(core), credit);
const getPlayerNameOfCore = (core) => getPlayerName(core.player);
const getElementRootOfCore = (core) => core.elementRoot;

// -------- START --------

(() => {
  console.log(`START`);
  const mode = getMode();
  if (mode === MODES.TEST) {
    TEST_ALL();
  }
  if (mode === MODES.DEMO) {
    const core = newCore();

    const imgLoading = document.createElement(`img`);
    imgLoading.setAttribute(`src`, `./static/img/circleOfCards.gif`);
    imgLoading.setAttribute(`alt`, `A loading page gif`);
    imgLoading.setAttribute(
      `credit`,
      `https://tenor.com/view/gamble-cards-pokers-gif-7257796`
    );

    const imgLoadDiv = document.createElement(`div`);
    imgLoadDiv.className += ` img-loading-div`;
    appendChild(imgLoadDiv, imgLoading);
    appendChild(core.elementRoot, imgLoadDiv);
    setTimeout(() => {
      detachAllChildren(core.elementRoot);
      goToPlayerConfigPage(core);
    }, 2000);
  }
})();
