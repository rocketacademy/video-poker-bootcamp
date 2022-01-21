const _updatePlayerInputHandler =
  (playerConfig) =>
  ({ target: { value } }) => {
    const player = getPlayerOfPlayerConfig(playerConfig);
    setPlayerNameOfPlayerConfig(playerConfig, value);
    updateNameDisplayOfPlayerConfig(playerConfig);
    console.log(player);
  };

/**
 *
 * @param {playerConfig} playerConfig
 * @returns
 */
const newElementNameInputWhichUpdatesPlayerNameOnInput = (playerConfig) => {
  console.log(playerConfig);
  const element = newElementNameInput();

  element.addEventListener(
    `input`,
    _updatePlayerInputHandler(playerConfig, element)
  );

  return element;
};
