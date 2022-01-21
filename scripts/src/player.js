const DEFAULT_PLAYER_NAME = "PLAYER 1";
const DEFAULT_PLAYER_CREDIT = 100;

/**
 * @typedef {Object} Player
 * @property {Hand} hand
 * @property {string} name
 * @property {number} credit
 */

/**
 *
 * @param {Player} player
 * @returns
 */
const getPlayerCredit = (player) => player.credit;
/**
 *
 * @param {Player} player
 * @returns
 */
const getPlayerHand = (player) => player.hand;
/**
 *
 * @param {Player} player
 * @returns
 */
const getPlayerName = (player) => player.name;

/**
 *
 * @param {Player} player
 * @returns
 */
const setPlayerCredit = (player, credit) => (player.credit = credit);
/**
 *
 * @param {Player} player
 * @returns
 */
const setPlayerHand = (player, hand) => (player.hand = hand);
/**
 *
 * @param {Player} player
 * @returns
 */
const setPlayerName = (player, name) => (player.name = name);

//                        CONSTRUCTOR

/**
 *
 * @returns {Player} A plain Player object
 */
const _playerStruct = () => {
  return {
    name: null,
    credit: null,
  };
};

/**
 *
 * @param {string} name
 * @param {number} credit
 * @returns {Player}
 */
const newPlayer = (name, credit) => {
  const player = _playerStruct();
  setPlayerName(player, name || DEFAULT_PLAYER_NAME);
  setPlayerCredit(player, credit || DEFAULT_PLAYER_CREDIT);
  return player;
};
