const MODES = {
  TEST: `test`,
  DEMO: `demo`,
};

const getMode = () => document.getElementById(`root`).getAttribute(`mode`);

(() => {
  const mode = getMode();
  if (mode === MODES.TEST) {
    console.log(`test phase`);
  }

  if (mode === MODES.DEMO) {
    console.log(`demo phase`);
  }
})();
