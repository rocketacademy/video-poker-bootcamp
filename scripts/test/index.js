const TEST_SUITE = (desc, testSuite) => {
  console.group(`---------- ${desc}`);
  testSuite();
  console.groupEnd();
};

const TEST_ALL = () => {
  TEST_SUITE(`TEST_CARDS`, TEST_CARDS);
  TEST_SUITE(`TEST_PLAYERS`, TEST_PLAYERS);
  TEST_SUITE(`TEST_SCORINGS`, TEST_SCORINGS);
};
