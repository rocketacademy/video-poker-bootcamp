const TEST_PLAYERS = () => {
  runTest(`testDefaultPlayerCredit`, () => {
    const player = newPlayer();
    assertLog(
      100,
      getPlayerCredit(player),
      () => `[testDefaultPlayerCredit] Fail`
    );
  });
};
