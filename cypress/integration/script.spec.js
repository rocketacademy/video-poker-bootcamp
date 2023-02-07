const { calcHandScore, calcWinnings } = require('../../script');

describe('Unit tests for Video Poker', () => {
  context('script.js', () => {
    it('empty hand score by default returns 0', () => {
      expect(calcHandScore([])).to.eq(0);
    });

    it('random hand score returns 0', () => {
      const playerHand = [
        { rank: 2, suit: 'hearts', name: '2' },
        { rank: 3, suit: 'diamonds', name: '3' },
        { rank: 5, suit: 'spades', name: '5' },
        { rank: 7, suit: 'spades', name: '7' },
        { rank: 9, suit: 'hearts', name: '9' },
      ];

      expect(calcHandScore(playerHand)).to.eq(0);
    });

    it('one-pair-below-jack hand score returns 0', () => {
      const playerHand = [
        { rank: 2, suit: 'hearts', name: '2' },
        { rank: 2, suit: 'diamonds', name: '2' },
        { rank: 5, suit: 'spades', name: '5' },
        { rank: 7, suit: 'spades', name: '7' },
        { rank: 9, suit: 'hearts', name: '9' },
      ];

      expect(calcHandScore(playerHand)).to.eq(0);
    });

    it('one-pair-jack hand score returns 1', () => {
      const playerHand = [
        { rank: 2, suit: 'hearts', name: '2' },
        { rank: 11, suit: 'diamonds', name: 'jack' },
        { rank: 11, suit: 'spades', name: 'jack' },
        { rank: 7, suit: 'spades', name: '7' },
        { rank: 9, suit: 'hearts', name: '9' },
      ];

      expect(calcHandScore(playerHand)).to.eq(1);
    });

    it('one-pair-ace hand score returns 1', () => {
      const playerHand = [
        { rank: 2, suit: 'hearts', name: '2' },
        { rank: 1, suit: 'diamonds', name: 'ace' },
        { rank: 1, suit: 'spades', name: 'ace' },
        { rank: 7, suit: 'spades', name: '7' },
        { rank: 9, suit: 'hearts', name: '9' },
      ];

      expect(calcHandScore(playerHand)).to.eq(1);
    });

    it('two-pair-queen-seven hand score returns 2', () => {
      const playerHand = [
        { rank: 2, suit: 'hearts', name: '2' },
        { rank: 12, suit: 'diamonds', name: 'queen' },
        { rank: 12, suit: 'spades', name: 'queen' },
        { rank: 7, suit: 'spades', name: '7' },
        { rank: 7, suit: 'hearts', name: '7' },
      ];

      expect(calcHandScore(playerHand)).to.eq(2);
    });

    it('three-of-a-kind-seven hand score returns 3', () => {
      const playerHand = [
        { rank: 2, suit: 'hearts', name: '2' },
        { rank: 7, suit: 'diamonds', name: '7' },
        { rank: 12, suit: 'spades', name: 'queen' },
        { rank: 7, suit: 'spades', name: '7' },
        { rank: 7, suit: 'hearts', name: '7' },
      ];

      expect(calcHandScore(playerHand)).to.eq(3);
    });

    it('three-of-a-kind-king hand score returns 3', () => {
      const playerHand = [
        { rank: 10, suit: 'hearts', name: '10' },
        { rank: 13, suit: 'hearts', name: 'king' },
        { rank: 12, suit: 'diamonds', name: 'queen' },
        { rank: 13, suit: 'spades', name: 'king' },
        { rank: 13, suit: 'clubs', name: 'king' },
      ];

      expect(calcHandScore(playerHand)).to.eq(3);
    });

    it('straight-to-five hand score returns 4', () => {
      const playerHand = [
        { rank: 1, suit: 'hearts', name: '1' },
        { rank: 2, suit: 'diamonds', name: '2' },
        { rank: 3, suit: 'spades', name: '3' },
        { rank: 4, suit: 'spades', name: '4' },
        { rank: 5, suit: 'hearts', name: '5' },
      ];

      expect(calcHandScore(playerHand)).to.eq(4);
    });

    it('straight-to-ace hand score returns 4', () => {
      const playerHand = [
        { rank: 10, suit: 'hearts', name: '10' },
        { rank: 11, suit: 'diamonds', name: 'jack' },
        { rank: 12, suit: 'spades', name: 'queen' },
        { rank: 13, suit: 'spades', name: 'king' },
        { rank: 1, suit: 'hearts', name: 'ace' },
      ];

      expect(calcHandScore(playerHand)).to.eq(4);
    });

    it('flush-king-high hand score returns 6', () => {
      const playerHand = [
        { rank: 2, suit: 'hearts', name: '2' },
        { rank: 4, suit: 'hearts', name: '4' },
        { rank: 7, suit: 'hearts', name: '7' },
        { rank: 11, suit: 'hearts', name: 'jack' },
        { rank: 13, suit: 'hearts', name: 'king' },
      ];

      expect(calcHandScore(playerHand)).to.eq(6);
    });

    it('flush-seven-high hand score returns 6', () => {
      const playerHand = [
        { rank: 2, suit: 'hearts', name: '2' },
        { rank: 4, suit: 'hearts', name: '4' },
        { rank: 7, suit: 'hearts', name: '7' },
        { rank: 5, suit: 'hearts', name: '5' },
        { rank: 3, suit: 'hearts', name: '3' },
      ];

      expect(calcHandScore(playerHand)).to.eq(6);
    });

    it('full-house-seven hand score returns 9', () => {
      const playerHand = [
        { rank: 7, suit: 'hearts', name: '7' },
        { rank: 7, suit: 'spades', name: '7' },
        { rank: 7, suit: 'clubs', name: '7' },
        { rank: 11, suit: 'hearts', name: 'jack' },
        { rank: 11, suit: 'diamonds', name: 'jack' },
      ];

      expect(calcHandScore(playerHand)).to.eq(9);
    });

    it('four-of-a-kind-jack hand score returns 25', () => {
      const playerHand = [
        { rank: 7, suit: 'hearts', name: '7' },
        { rank: 11, suit: 'spades', name: 'jack' },
        { rank: 11, suit: 'clubs', name: 'jack' },
        { rank: 11, suit: 'hearts', name: 'jack' },
        { rank: 11, suit: 'diamonds', name: 'jack' },
      ];

      expect(calcHandScore(playerHand)).to.eq(25);
    });

    it('straight-flush-to-nine hand score returns 50', () => {
      const playerHand = [
        { rank: 5, suit: 'spades', name: '5' },
        { rank: 6, suit: 'spades', name: '6' },
        { rank: 7, suit: 'spades', name: '7' },
        { rank: 8, suit: 'spades', name: '8' },
        { rank: 9, suit: 'spades', name: '9' },
      ];

      expect(calcHandScore(playerHand)).to.eq(50);
    });

    it('royal-flush hand score returns 250', () => {
      const playerHand = [
        { rank: 10, suit: 'diamonds', name: '10' },
        { rank: 11, suit: 'diamonds', name: 'jack' },
        { rank: 12, suit: 'diamonds', name: 'queen' },
        { rank: 13, suit: 'diamonds', name: 'king' },
        { rank: 1, suit: 'diamonds', name: 'ace' },
      ];

      expect(calcHandScore(playerHand)).to.eq(250);
    });

    it('bet 3 flush hand score return 18', () => {
      const playerHand = [
        { rank: 2, suit: 'hearts', name: '2' },
        { rank: 4, suit: 'hearts', name: '4' },
        { rank: 7, suit: 'hearts', name: '7' },
        { rank: 5, suit: 'hearts', name: '5' },
        { rank: 3, suit: 'hearts', name: '3' },
      ];

      expect(calcWinnings(calcHandScore(playerHand), 3)).to.eq(18);
    });

    it('bet 5 royal-flush hand score returns 4000', () => {
      const playerHand = [
        { rank: 10, suit: 'diamonds', name: '10' },
        { rank: 11, suit: 'diamonds', name: 'jack' },
        { rank: 12, suit: 'diamonds', name: 'queen' },
        { rank: 13, suit: 'diamonds', name: 'king' },
        { rank: 1, suit: 'diamonds', name: 'ace' },
      ];

      expect(calcWinnings(calcHandScore(playerHand), 5)).to.eq(4000);
    });
  });
});
