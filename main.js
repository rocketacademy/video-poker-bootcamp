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
const getPlayerNameOfCore = (core) => getPlayerName(core.player);
const getPlayerHandOfCore = (core) => getPlayerHand(core.player);
const getElementRootOfCore = (core) => core.elementRoot;

// -------- START --------

(() => {
  console.log(`START`);
  const mode = getMode();
  if (mode === MODES.TEST) {
    console.group(`Test Mode`);
    TEST_ALL();
    console.log(`end of test phase`);

    console.groupEnd();
  }
  if (mode === MODES.DEMO) {
    const core = newCore();
    goToPlayerConfigPage(core);
    console.log(`Demo Mode`);
  }
})();
