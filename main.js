const MODES = {
  TEST: `test`,
  DEMO: `demo`,
};

const getMode = () => document.getElementById(`root`).getAttribute(`mode`);

(() => {
  const mode = getMode();
  if (mode === MODES.TEST) {
    console.group(`Test Mode`);
    TEST_ALL();
    console.log(`end of test phase`);

    console.groupEnd();
  }

  if (mode === MODES.DEMO) {
    console.log(`Demo Mode`);
  }
})();
