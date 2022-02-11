const TEST_PLAYERS = () => {
  runTest(`testDefaultPlayerCredit`, () => {
    const player = newPlayer();
    assertLogTrue(
      100,
      getPlayerCredit(player),
      () => `[testDefaultPlayerCredit] Fail`
    );
  });
};
