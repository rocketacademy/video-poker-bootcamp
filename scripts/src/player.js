const DEFAULT_PLAYER_NAME = "NEW PLAYER";
const DEFAULT_PLAYER_CREDIT = 100;

const getPlayerCredit = (player) => player.credit;

/**
 * @typedef {Object} Player
 * @property {Card[]} hand
 * @property {string} name
 * @property {number} credit
 */

/**
 *
 * @param {string} name
 * @param {number} credit
 * @returns {Player}
 */
const newPlayer = (name, credit) => {
  return {
    hand: [],
    name: name || DEFAULT_PLAYER_NAME,
    credit: credit || DEFAULT_PLAYER_CREDIT,
  };
};
