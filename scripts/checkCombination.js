const factorialize = (num) => {
  if (num < 0) return -1;
  if (num === 0) return 1;
  return (num * factorialize(num - 1));
};

const countTotalCombinations = (numberOfCardsLeft, cardsToDraw) => {
  const numerator = factorialize(numberOfCardsLeft);
  const denominator = (factorialize(numberOfCardsLeft - cardsToDraw) * factorialize(cardsToDraw));

  return numerator / denominator;
};

const checkRoyalFlushCombinations = () => {
  const royalResult = isHeldCardsRoyal(stats.hand);
  const flushResult = isHeldCardsSameSuit(stats.hand);

  // check whether same suit first
  if (flushResult.result && royalResult.result) {
    // check what are the remaining cards to draw to get a royal flush
    if (royalResult.royalHand.ace !== 1) {
      // check if card is available
      if (cardsLeft.ace[flushResult.suit] !== 1) {
        return 0;
      }
    }

    if (royalResult.royalHand.king !== 1) {
      // check if card is available
      if (cardsLeft.king[flushResult.suit] !== 1) {
        return 0;
      }
    }

    if (royalResult.royalHand.queen !== 1) {
      // check if card is available
      if (cardsLeft.queen[flushResult.suit] !== 1) {
        return 0;
      }
    }

    if (royalResult.royalHand.jack !== 1) {
      // check if card is available
      if (cardsLeft.jack[flushResult.suit] !== 1) {
        return 0;
      }
    }

    if (royalResult.royalHand[10] !== 1) {
      // check if card is available
      if (cardsLeft[10][flushResult.suit] !== 1) {
        return 0;
      }
    }

    return 1;
  }
  return 0;
};

const checkStraightFlushCombinations = () => {
  const flushResult = isHeldCardsSameSuit(stats.hand);
  const withinStraightResult = isHeldCardsWithinStraight(stats.hand);

  let combinations = 0;

  if (flushResult.result && withinStraightResult.result) {
    const { straightHand } = withinStraightResult;
    const { diff } = withinStraightResult;
    const { suit } = flushResult;

    // check all the different cards i need to draw
    // if i have rank 1 and 5, 1 and 5 are the limits (diff = 4)
    // and i can only find 3, 4 ane 5
    // if i have rank 2 and 5, 1 and 6 are the limits (diff = 3)
    // e.g. 1,2,3,4,5 or 2,3,4,5,6
    // if i have rank 5 and 7, 3 and 9 are the limits (diff = 2)
    // e.g. 3,4,5,6,7 or 5,6,7,8,9
    // if i have rank 5 and 6, 2 and 9 are the limits (diff = 1)
    // e.g. 2,3,4,5,6,7 or 5,6,7,8,9

    const rankArray = Object.keys(straightHand);

    if (diff === 4) {
      let straightPossible = true;

      const firstRank = parseInt(rankArray[0], 10);

      for (let i = 1; i < 5; i += 1) {
        if (rankArray.indexOf((firstRank + i).toString()) === -1) {
          // current rank is not in held cards
          // find in cardsLeft
          if (cardsLeft[(firstRank + i).toString()][suit] === 0) {
            straightPossible = false;
          }
        }
      }

      if (straightPossible) {
        combinations += 1;
      }
    } else if (diff === 3) {
      let straightPossible = true;

      const firstRank1 = parseInt(rankArray[0], 10);
      const lastRank1 = firstRank1 + 4;

      for (let i = firstRank1; i <= lastRank1; i += 1) {
        if (straightHand[i] === undefined) {
          if (i === 1) {
            if (cardsLeft.ace[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i === 11) {
            if (cardsLeft.jack[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i === 12) {
            if (cardsLeft.queen[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i === 13) {
            if (cardsLeft.king[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i > 13) {
            straightPossible = false;
            break;
          } else if (cardsLeft[i][suit] === 0) {
            straightPossible = false;
            break;
          }
        }
      }

      if (straightPossible) {
        combinations += 1;
      }

      straightPossible = true;

      if (parseInt(rankArray[0], 10) - 1 > 0) {
        const firstRank2 = parseInt(rankArray[0], 10) - 1;
        const lastRank2 = firstRank2 + 4;

        for (let i = firstRank2; i <= lastRank2; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }
    } else if (diff === 2) {
      let straightPossible = true;

      const firstRank1 = parseInt(rankArray[0], 10) - 1;
      const lastRank1 = firstRank1 + 4;

      for (let i = firstRank1; i <= lastRank1; i += 1) {
        if (straightHand[i] === undefined) {
          if (i === 1) {
            if (cardsLeft.ace[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i === 11) {
            if (cardsLeft.jack[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i === 12) {
            if (cardsLeft.queen[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i === 13) {
            if (cardsLeft.king[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i > 13) {
            straightPossible = false;
            break;
          } else if (cardsLeft[i][suit] === 0) {
            straightPossible = false;
            break;
          }
        }
      }

      if (straightPossible) {
        combinations += 1;
      }

      straightPossible = true;

      if (parseInt(rankArray[0], 10) - 1 > 0) {
        const firstRank2 = parseInt(rankArray[0], 10) - 1;
        const lastRank2 = firstRank2 + 4;

        for (let i = firstRank2; i <= lastRank2; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }

      straightPossible = true;

      if (parseInt(rankArray[0], 10) - 2 > 0) {
        const firstRank3 = parseInt(rankArray[0], 10) - 2;
        const lastRank3 = firstRank3 + 4;

        for (let i = firstRank3; i <= lastRank3; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }
    } else if (diff === 1) {
      let straightPossible = true;

      const firstRank1 = parseInt(rankArray[0], 10) - 1;
      const lastRank1 = firstRank1 + 4;

      for (let i = firstRank1; i <= lastRank1; i += 1) {
        if (straightHand[i] === undefined) {
          if (i === 1) {
            if (cardsLeft.ace[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i === 11) {
            if (cardsLeft.jack[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i === 12) {
            if (cardsLeft.queen[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i === 13) {
            if (cardsLeft.king[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i > 13) {
            straightPossible = false;
            break;
          } else if (cardsLeft[i][suit] === 0) {
            straightPossible = false;
            break;
          }
        }
      }

      if (straightPossible) {
        combinations += 1;
      }

      straightPossible = true;

      if (parseInt(rankArray[0], 10) - 1 > 0) {
        const firstRank2 = parseInt(rankArray[0], 10) - 1;
        const lastRank2 = firstRank2 + 4;

        for (let i = firstRank2; i <= lastRank2; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }

      straightPossible = true;

      if (parseInt(rankArray[0], 10) - 2 > 0) {
        const firstRank3 = parseInt(rankArray[0], 10) - 2;
        const lastRank3 = firstRank3 + 4;

        for (let i = firstRank3; i <= lastRank3; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }

      if (parseInt(rankArray[0], 10) - 3 > 0) {
        const firstRank4 = parseInt(rankArray[0], 10) - 3;
        const lastRank4 = firstRank4 + 4;

        for (let i = firstRank4; i <= lastRank4; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }
    } else if (diff === 0) {
      let straightPossible = true;

      if (parseInt(rankArray[0], 10) !== 0) {
        const firstRank1 = parseInt(rankArray[0], 10);
        const lastRank1 = firstRank1 + 4;

        for (let i = firstRank1; i <= lastRank1; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }

      straightPossible = true;

      if (parseInt(rankArray[0], 10) - 1 > 0) {
        const firstRank2 = parseInt(rankArray[0], 10) - 1;
        const lastRank2 = firstRank2 + 4;

        for (let i = firstRank2; i <= lastRank2; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }

      straightPossible = true;

      if (parseInt(rankArray[0], 10) - 2 > 0) {
        const firstRank3 = parseInt(rankArray[0], 10) - 2;
        const lastRank3 = firstRank3 + 4;

        for (let i = firstRank3; i <= lastRank3; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }

      straightPossible = true;

      if (parseInt(rankArray[0], 10) - 3 > 0) {
        const firstRank4 = parseInt(rankArray[0], 10) - 3;
        const lastRank4 = firstRank4 + 4;

        for (let i = firstRank4; i <= lastRank4; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }

      straightPossible = true;

      if (parseInt(rankArray[0], 10) - 4 > 0) {
        const firstRank5 = parseInt(rankArray[0], 10) - 4;
        const lastRank5 = firstRank5 + 4;

        for (let i = firstRank5; i <= lastRank5; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }
    }

    return combinations;
  }

  return 0;
};

const checkTwoPairCombinations = () => {
  const result = {
    combinations: 0,
    alreadyWin: false,
  };
  let combinations = 0;

  // get the cards being held first
  const twoPairHand = {};

  for (let i = 0; i < stats.hand.length; i += 1) {
    if (stats.hand[i].hold === true) {
      if (twoPairHand[stats.hand[i].rank] === undefined) {
        twoPairHand[stats.hand[i].rank] = 1;
      } else {
        twoPairHand[stats.hand[i].rank] += 1;
      }
    }
  }

  const rankArray = Object.keys(twoPairHand);

  const twoPairHandValues = Object.values(twoPairHand);
  const twoPairHandCardLeft = [];

  for (let i = 0; i < rankArray.length; i += 1) {
    const rank = parseInt(rankArray[i], 10);

    const cardsLeftWithRank = getCardsLeftWithRank(rank);

    twoPairHandCardLeft.push(cardsLeftWithRank);
  }

  let twoCounts = 0;

  for (let i = 0; i < twoPairHandValues.length; i += 1) {
    if (twoPairHandValues[i] === 2) {
      twoCounts += 1;
    }
  }

  if (Object.values(twoPairHand).length === 5 || rankArray.length >= 4) {
    combinations = 0;
  } else if (twoCounts === 2) {
    result.alreadyWin = true;
    combinations = 1;
  } else if (rankArray.length === 3) {
    const rank1Held = twoPairHandValues[0];
    const rank1Left = twoPairHandCardLeft[0];

    const rank2Held = twoPairHandValues[1];
    const rank2Left = twoPairHandCardLeft[1];

    const rank3Held = twoPairHandValues[2];
    const rank3Left = twoPairHandCardLeft[2];

    if (rank1Held <= 2 && rank2Held <= 2 && rank3Held <= 2) {

      let tempCombinations = 0;

      let rank1 = parseInt(rankArray[0], 10);

      if (rank1 === 1) {
        rank1 = 'ace';
      } else if (rank1 === 11) {
        rank1 = 'jack';
      } else if (rank1 === 12) {
        rank1 = 'queen';
      } else if (rank1 === 13) {
        rank1 = 'king';
      }

      let rank2 = parseInt(rankArray[1], 10);

      if (rank2 === 1) {
        rank2 = 'ace';
      } else if (rank2 === 11) {
        rank2 = 'jack';
      } else if (rank2 === 12) {
        rank2 = 'queen';
      } else if (rank2 === 13) {
        rank2 = 'king';
      }

      let rank3 = parseInt(rankArray[1], 10);

      if (rank3 === 1) {
        rank3 = 'ace';
      } else if (rank3 === 11) {
        rank3 = 'jack';
      } else if (rank3 === 12) {
        rank3 = 'queen';
      } else if (rank3 === 13) {
        rank3 = 'king';
      }

      const cardsLeftKeys = Object.keys(cardsLeft);
      const cardsLeftValues = Object.values(cardsLeft);

      // set 1: 2 of Rank A 2 of Rank B 1 of Rank C
      if ((rank1Left + rank1Held >= 2) && (rank2Left + rank2Held >= 2)) {
        const rank1Combinations = countTotalCombinations(rank1Left, 2 - rank1Held);
        const rank2Combinations = countTotalCombinations(rank2Left, 2 - rank2Held);

        tempCombinations += (rank1Combinations * rank2Combinations);
      } else {
        tempCombinations = 0;
      }

      combinations += tempCombinations;

      tempCombinations = 0;

      // set 2: 2 of Rank A 1 of Rank B 2 of Rank C
      if ((rank1Left + rank1Held >= 2) && (rank3Left + rank3Held >= 2)) {
        const rank1Combinations = countTotalCombinations(rank1Left, 2 - rank1Held);
        const rank3Combinations = countTotalCombinations(rank3Left, 2 - rank3Held);

        tempCombinations += (rank1Combinations * rank3Combinations);
      } else {
        tempCombinations = 0;
      }

      combinations += tempCombinations;

      tempCombinations = 0;

      // set 3: 1 of Rank A 2 of Rank B 2 of Rank C
      if ((rank2Left + rank2Held >= 2) && (rank3Left + rank3Held >= 2)) {
        const rank2Combinations = countTotalCombinations(rank2Left, 2 - rank2Held);
        const rank3Combinations = countTotalCombinations(rank3Left, 2 - rank3Held);

        tempCombinations += (rank2Combinations * rank3Combinations);
      } else {
        tempCombinations = 0;
      }

      combinations += tempCombinations;
    }
  } else if (rankArray.length === 2) {
    const rank1Held = twoPairHandValues[0];
    const rank1Left = twoPairHandCardLeft[0];

    const rank2Held = twoPairHandValues[1];
    const rank2Left = twoPairHandCardLeft[1];

    if (rank1Held <= 2 && rank2Held <= 2) {

      let tempCombinations = 0;

      // if i am holding to 2 and 4
      // i need to have different conditions

      let rank1 = parseInt(rankArray[0], 10);

      if (rank1 === 1) {
        rank1 = 'ace';
      } else if (rank1 === 11) {
        rank1 = 'jack';
      } else if (rank1 === 12) {
        rank1 = 'queen';
      } else if (rank1 === 13) {
        rank1 = 'king';
      }

      let rank2 = parseInt(rankArray[1], 10);

      if (rank2 === 1) {
        rank2 = 'ace';
      } else if (rank2 === 11) {
        rank2 = 'jack';
      } else if (rank2 === 12) {
        rank2 = 'queen';
      } else if (rank2 === 13) {
        rank2 = 'king';
      }

      const cardsLeftKeys = Object.keys(cardsLeft);
      const cardsLeftValues = Object.values(cardsLeft);

      // set 1: two 2s one 4 and two of other cards
      if (rank1Left + rank1Held >= 2) {
        const rank1Combinations = countTotalCombinations(rank1Left, 2 - rank1Held);

        for (let i = 0; i < cardsLeftKeys.length; i += 1) {
          let tempCombi = 0;
          if (cardsLeftKeys[i] !== rank1 && cardsLeftKeys[i] !== rank2) {
            const tempCardLeftValue = getCardsLeftWithRank(cardsLeftKeys[i]);
            if (tempCardLeftValue >= 2) {
              tempCombi = countTotalCombinations(tempCardLeftValue, 2);
            } else {
              tempCombi = 0;
            }

            tempCombinations += (rank1Combinations * tempCombi);
          }
        }
      } else {
        tempCombinations = 0;
      }

      combinations += tempCombinations;

      tempCombinations = 0;

      // set 2: one 2 two 4s and two of other cards
      if (rank2Left + rank2Held >= 2) {
        const rank2Combinations = countTotalCombinations(rank2Left, 2 - rank2Held);

        for (let i = 0; i < cardsLeftKeys.length; i += 1) {
          let tempCombi = 0;
          if (cardsLeftKeys[i] !== rank1 && cardsLeftKeys[i] !== rank2) {
            const tempCardLeftValue = getCardsLeftWithRank(cardsLeftKeys[i]);
            if (tempCardLeftValue >= 2) {
              tempCombi = countTotalCombinations(tempCardLeftValue, 2);
            } else {
              tempCombi = 0;
            }

            tempCombinations += (rank2Combinations * tempCombi);
          }
        }
      } else {
        tempCombinations = 0;
      }

      combinations += tempCombinations;
    }
  } else if (rankArray.length === 1) {
    const rankHeld = twoPairHandValues[0];
    const rankLeft = twoPairHandCardLeft[0];

    if (rankHeld <= 2) {
      let rank = parseInt(rankArray[0], 10);

      if (rank === 1) {
        rank = 'ace';
      } else if (rank === 11) {
        rank = 'jack';
      } else if (rank === 12) {
        rank = 'queen';
      } else if (rank === 13) {
        rank = 'king';
      }

      const cardsLeftKeys = Object.keys(cardsLeft);
      const cardsLeftValues = Object.values(cardsLeft);

      // set 1: 2 of rank 1, 2 of any other number, 1 of any other number
      if ((rankLeft + rankHeld) >= 2) {
        const rankCombinations = countTotalCombinations(rankLeft, 2 - rankHeld);

        for (let i = 0; i < cardsLeftKeys.length; i += 1) {
          let tempCombinations = 0;
          if (cardsLeftKeys[i] !== rank) {
            const tempCardLeftValue = getCardsLeftWithRank(cardsLeftKeys[i]);
            if (tempCardLeftValue >= 2) {
              // there is enough of this second rank to fill up the second pair
              tempCombinations = countTotalCombinations(tempCardLeftValue, 2);
            } else {
              // there is not enough of this second rank to fill up the second pair
              // need to rely on third rank
              tempCombinations = 0;
            }

            const totalCardsLeft = 47 - tempCardLeftValue;
            const remainingCombinations = countTotalCombinations(totalCardsLeft, 1);

            combinations += (rankCombinations * tempCombinations * remainingCombinations);
          }
        }
      } else {
        // set 2: 1 of rank 1, 2 of any other number, 2 of any other number
        for (let i = 0; i < cardsLeftKeys.length; i += 1) {
          let tempCombinations = 0;
          if (cardsLeftKeys[i] !== rank) {
            const tempCardLeftValue = getCardsLeftWithRank(cardsLeftKeys[i]);
            if (tempCardLeftValue >= 2) {
              // there is enough of this second rank to fill up the second pair
              tempCombinations = countTotalCombinations(tempCardLeftValue, 2);
              for (let j = 0; j < cardsLeftKeys.length; j += 1) {
                if (cardsLeftKeys[j] !== cardsLeftKeys[i] && cardsLeftKeys[j] !== rank) {
                  const tempCardLeftValue2 = getCardsLeftWithRank(cardsLeftKeys[j]);

                  if (tempCardLeftValue2 >= 2) {
                    tempCombinations *= countTotalCombinations(tempCardLeftValue2, 2);
                  } else {
                    tempCombinations = 0;
                  }

                  combinations += tempCombinations;
                }
              }
            } else {
              // there is not enough of this second rank to fill up the second pair
              // need to rely on third rank
              tempCombinations = 0;
            }

            combinations += tempCombinations;
          }
        }
      }
    }
  }

  result.combinations = combinations;
  return result;
};

const checkThreeOfAKindCombinations = () => {
  const result = {
    combinations: 0,
    alreadyWin: false,
  };
  let combinations = 0;

  // get the cards being held first
  const threeOfAKindHand = {};

  for (let i = 0; i < stats.hand.length; i += 1) {
    if (stats.hand[i].hold === true) {
      if (threeOfAKindHand[stats.hand[i].rank] === undefined) {
        threeOfAKindHand[stats.hand[i].rank] = 1;
      } else {
        threeOfAKindHand[stats.hand[i].rank] += 1;
      }
    }
  }

  const rankArray = Object.keys(threeOfAKindHand);

  if (Object.values(threeOfAKindHand).length >= 4) {
    // if there are 3 different card ranks are being held, return 0
    combinations = 0;
  } else if (Object.values(threeOfAKindHand).indexOf(3) !== -1) {
    // if there are already 4 cards with the same rank being held, return 1
    combinations = 1;
    result.alreadyWin = true;
  } else {
    for (let i = 0; i < rankArray.length; i += 1) {
      const rank = parseInt(rankArray[i], 10);
      const noOfCardsHeld = threeOfAKindHand[rank];

      const noOfCardsLeft = getCardsLeftWithRank(rank);

      if (noOfCardsHeld + noOfCardsLeft >= 3) {
        combinations += 1;
      }
    }
  }

  result.combinations = combinations;

  return result;
};

const checkFourOfAKindCombinations = () => {
  const result = {
    combinations: 0,
    alreadyWin: false,
  };
  let combinations = 0;

  // get the cards being held first
  const fourOfAKindHand = {};

  for (let i = 0; i < stats.hand.length; i += 1) {
    if (stats.hand[i].hold === true) {
      if (fourOfAKindHand[stats.hand[i].rank] === undefined) {
        fourOfAKindHand[stats.hand[i].rank] = 1;
      } else {
        fourOfAKindHand[stats.hand[i].rank] += 1;
      }
    }
  }

  const rankArray = Object.keys(fourOfAKindHand);

  if (Object.values(fourOfAKindHand).length >= 3) {
    // if there are 3 different card ranks are being held, return 0
    combinations = 0;
  } else if (Object.values(fourOfAKindHand).indexOf(4) !== -1) {
    // if there are already 4 cards with the same rank being held, return 1
    combinations = 1;
    result.alreadyWin = true;
  } else {
    for (let i = 0; i < rankArray.length; i += 1) {
      const rank = parseInt(rankArray[i], 10);
      const noOfCardsHeld = fourOfAKindHand[rank];

      const noOfCardsLeft = getCardsLeftWithRank(rank);

      if (noOfCardsHeld + noOfCardsLeft === 4) {
        combinations += 1;
      }
    }
  }
  result.combinations = combinations;

  return result;
};

const checkFullHouseCombinations = () => {
  const result = {
    combinations: 0,
    alreadyWin: false,
  };
  let combinations = 0;

  // get the cards being held first
  const fullHouseHand = {};

  for (let i = 0; i < stats.hand.length; i += 1) {
    if (stats.hand[i].hold === true) {
      if (fullHouseHand[stats.hand[i].rank] === undefined) {
        if (stats.hand[i].rank === 11) {
          fullHouseHand.jack = 1;
        } else if (stats.hand[i].rank === 12) {
          fullHouseHand.queen = 1;
        } else if (stats.hand[i].rank === 13) {
          fullHouseHand.king = 1;
        } else if (stats.hand[i].rank === 1) {
          fullHouseHand.ace = 1;
        } else {
          fullHouseHand[stats.hand[i].rank] = 1;
        }
      } else if (stats.hand[i].rank === 11) {
        fullHouseHand.jack += 1;
      } else if (stats.hand[i].rank === 12) {
        fullHouseHand.queen += 1;
      } else if (stats.hand[i].rank === 13) {
        fullHouseHand.king += 1;
      } else if (stats.hand[i].rank === 1) {
        fullHouseHand.ace += 1;
      } else {
        fullHouseHand[stats.hand[i].rank] += 1;
      }
    }
  }

  const rankArray = Object.keys(fullHouseHand);

  if (rankArray.length >= 3) {
    combinations = 0;
  } else if (rankArray.length === 2) {
    // given the two different ranks A and B, i need to find out
    // different combinations of 3 As 2 Bs and 2 As 3 Bs.

    const rank1 = rankArray[0];
    const noOfRank1CardsHeld = fullHouseHand[rank1];
    const noOfRank1CardsLeft = getCardsLeftWithRank(rank1);

    const rank2 = rankArray[1];
    const noOfRank2CardsHeld = fullHouseHand[rank2];
    const noOfRank2CardsLeft = getCardsLeftWithRank(rank2);

    // 3 of Rank1Cards 2 of Rank2Cards
    if (noOfRank1CardsHeld === 3) {
      if (noOfRank2CardsLeft >= (2 - noOfRank2CardsHeld)) {
        combinations += countTotalCombinations(noOfRank2CardsLeft, 2 - noOfRank2CardsHeld);
      }
    } else if (noOfRank1CardsHeld < 3) {
      if (noOfRank1CardsLeft >= (3 - noOfRank1CardsHeld)) {
        const rank1TotalCombinations = countTotalCombinations(noOfRank1CardsLeft,
          3 - noOfRank1CardsHeld);
        if (noOfRank2CardsLeft >= (2 - noOfRank2CardsHeld)) {
          combinations += (rank1TotalCombinations
            * countTotalCombinations(noOfRank2CardsLeft, 2 - noOfRank2CardsHeld));
        }
      }
    }

    // 2 of Rank1Cards 3 of Rank2Cards
    if (noOfRank1CardsHeld === 2) {
      if (noOfRank2CardsLeft >= (3 - noOfRank2CardsHeld)) {
        combinations += countTotalCombinations(noOfRank2CardsLeft, 3 - noOfRank2CardsHeld);
      }
    } else if (noOfRank1CardsHeld < 2) {
      if (noOfRank1CardsLeft >= (2 - noOfRank1CardsHeld)) {
        const rank1TotalCombinations = countTotalCombinations(noOfRank1CardsLeft,
          2 - noOfRank1CardsHeld);
        if (noOfRank2CardsLeft >= (3 - noOfRank2CardsHeld)) {
          combinations += (rank1TotalCombinations
            * countTotalCombinations(noOfRank2CardsLeft, 3 - noOfRank2CardsHeld));
        }
      }
    }
  } else if (rankArray.length === 1) {
    // if there is only 1 rank A, i need to find out
    // different combinations of 3 As 2 Of Everything Else and
    // 2 As 3 Of Everything Else

    const rank1 = rankArray[0];
    const noOfRank1CardsHeld = fullHouseHand[rank1];
    const noOfRank1CardsLeft = getCardsLeftWithRank(rank1);
    const totalRank1Cards = noOfRank1CardsHeld + noOfRank1CardsLeft;

    const cardsLeftKeys = Object.keys(cardsLeft);
    const cardsLeftValues = Object.values(cardsLeft);

    for (let i = 0; i < cardsLeftValues.length; i += 1) {
      cardsLeftValues[i] = getCardsLeftWithRank(cardsLeftKeys[i]);
    }

    // 3 of Rank1Cards 2 of Rank2Cards
    if (noOfRank1CardsHeld === 3) {
      for (let i = 0; i < cardsLeftKeys.length; i += 1) {
        if (cardsLeftValues[i] >= 2) {
          combinations += countTotalCombinations(cardsLeftValues[i], 2);
        }
      }
    } else if (noOfRank1CardsHeld < 3) {
      if (noOfRank1CardsLeft >= (3 - noOfRank1CardsHeld)) {
        const rank1TotalCombinations = countTotalCombinations(noOfRank1CardsLeft,
          3 - noOfRank1CardsHeld);

        for (let i = 0; i < cardsLeftKeys.length; i += 1) {
          if (cardsLeftValues[i] >= 2) {
            combinations += (rank1TotalCombinations * countTotalCombinations(cardsLeftValues[i], 2));
          }
        }
      }
    }

    // 2 of Rank1Cards 3 of Rank2Cards
    if (noOfRank1CardsHeld === 2) {
      for (let i = 0; i < cardsLeftKeys.length; i += 1) {
        if (cardsLeftValues[i] >= 3) {
          combinations += countTotalCombinations(cardsLeftValues[i], 3);
        }
      }
    } else if (noOfRank1CardsHeld < 2) {
      if (noOfRank1CardsLeft >= (2 - noOfRank1CardsHeld)) {
        const rank1TotalCombinations = countTotalCombinations(noOfRank1CardsLeft,
          2 - noOfRank1CardsHeld);

        for (let i = 0; i < cardsLeftKeys.length; i += 1) {
          if (cardsLeftValues[i] >= 3) {
            combinations += (rank1TotalCombinations * countTotalCombinations(cardsLeftValues[i], 3));
          }
        }
      }
    }
  }

  result.combinations = combinations;

  return result;
};

const checkFlushCombinations = () => {
  let combinations = 0;
  const flushHand = {};

  for (let i = 0; i < stats.hand.length; i += 1) {
    if (stats.hand[i].hold === true) {
      if (flushHand[stats.hand[i].suit] === undefined) {
        flushHand[stats.hand[i].suit] = 1;
      } else {
        flushHand[stats.hand[i].suit] += 1;
      }
    }
  }

  const cardsLeftValues = Object.values(cardsLeft);

  if (Object.keys(flushHand).length > 1) {
    combinations = 0;
  } else {
    const suit = Object.keys(flushHand)[0];
    const cardsHeld = Object.values(flushHand)[0];

    let cardsLeftWithSuit = 0;

    for (let i = 0; i < cardsLeftValues.length; i += 1) {
      cardsLeftWithSuit += cardsLeftValues[i][suit];
    }

    combinations = countTotalCombinations(cardsLeftWithSuit, 5 - cardsHeld);
  }

  return combinations;
};

const checkStraightCombinations = () => {
  const withinStraightResult = isHeldCardsWithinStraight(stats.hand);

  let combinations = 0;

  if (withinStraightResult.result) {
    const { straightHand } = withinStraightResult;
    const { diff } = withinStraightResult;

    const rankArray = Object.keys(straightHand);

    if (diff > 4) {
      combinations = 0;
    } else if (diff === 4) {
      const firstRank = parseInt(rankArray[0], 10);

      combinations = 1;

      for (let i = 1; i < 5; i += 1) {
        if (rankArray.indexOf((firstRank + i).toString()) === -1) {
          // current rank is not in held cards
          // find in cardsLeft

          const cardsLeftWithRank = getCardsLeftWithRank(firstRank + i);

          if (cardsLeftWithRank > 0) {
            combinations *= countTotalCombinations(cardsLeftWithRank, 1);
          } else {
            combinations = 0;
          }
        }
      }
    } else if (diff === 3) {
      let tempCombinations = 1;

      const firstRank = parseInt(rankArray[0], 10);
      const lastRank = firstRank + 4;

      for (let i = firstRank; i <= lastRank; i += 1) {
        if ((rankArray.indexOf((i).toString()) === -1) && (i < 15)) {
          const cardsLeftWithRank = getCardsLeftWithRank(i);

          if (cardsLeftWithRank > 0) {
            tempCombinations *= countTotalCombinations(cardsLeftWithRank, 1);
          } else {
            tempCombinations = 0;
          }
        }
      }

      combinations += tempCombinations;

      tempCombinations = 1;

      const firstRank1 = parseInt(rankArray[0], 10) - 1;
      if (firstRank1 > 0) {
        const lastRank1 = firstRank1 + 4;

        for (let i = firstRank1; i <= lastRank1; i += 1) {
          if ((rankArray.indexOf((i).toString()) === -1) && (i < 15)) {
            const cardsLeftWithRank = getCardsLeftWithRank(i);

            if (cardsLeftWithRank > 0) {
              tempCombinations *= countTotalCombinations(cardsLeftWithRank, 1);
            } else {
              tempCombinations = 0;
            }
          }
        }

        combinations += tempCombinations;
      }
    } else if (diff === 2) {
      let tempCombinations = 1;

      const firstRank = parseInt(rankArray[0], 10);
      const lastRank = firstRank + 4;

      for (let i = firstRank; i <= lastRank; i += 1) {
        if ((rankArray.indexOf((i).toString()) === -1) && (i < 15)) {
          const cardsLeftWithRank = getCardsLeftWithRank(i);

          if (cardsLeftWithRank > 0) {
            tempCombinations *= countTotalCombinations(cardsLeftWithRank, 1);
          } else {
            tempCombinations = 0;
          }
        }
      }

      combinations += tempCombinations;

      tempCombinations = 1;

      const firstRank1 = parseInt(rankArray[0], 10) - 1;
      if (firstRank1 > 0) {
        const lastRank1 = firstRank1 + 4;

        for (let i = firstRank1; i <= lastRank1; i += 1) {
          if ((rankArray.indexOf((i).toString()) === -1) && (i < 15)) {
            const cardsLeftWithRank = getCardsLeftWithRank(i);

            if (cardsLeftWithRank > 0) {
              tempCombinations *= countTotalCombinations(cardsLeftWithRank, 1);
            } else {
              tempCombinations = 0;
            }
          }
        }

        combinations += tempCombinations;
      }

      tempCombinations = 1;

      const firstRank2 = parseInt(rankArray[0], 10) - 2;
      if (firstRank2 > 0) {
        const lastRank2 = firstRank2 + 4;

        for (let i = firstRank2; i <= lastRank2; i += 1) {
          if ((rankArray.indexOf((i).toString()) === -1) && (i < 15)) {
            const cardsLeftWithRank = getCardsLeftWithRank(i);

            if (cardsLeftWithRank > 0) {
              tempCombinations *= countTotalCombinations(cardsLeftWithRank, 1);
            } else {
              tempCombinations = 0;
            }
          }
        }

        combinations += tempCombinations;
      }
    } else if (diff === 1) {
      let tempCombinations = 1;

      const firstRank = parseInt(rankArray[0], 10);
      const lastRank = firstRank + 4;

      for (let i = firstRank; i <= lastRank; i += 1) {
        if ((rankArray.indexOf((i).toString()) === -1) && (i < 15)) {
          const cardsLeftWithRank = getCardsLeftWithRank(i);

          if (cardsLeftWithRank > 0) {
            tempCombinations *= countTotalCombinations(cardsLeftWithRank, 1);
          } else {
            tempCombinations = 0;
          }
        }
      }

      combinations += tempCombinations;

      tempCombinations = 1;

      const firstRank1 = parseInt(rankArray[0], 10) - 1;
      if (firstRank1 > 0) {
        const lastRank1 = firstRank1 + 4;

        for (let i = firstRank1; i <= lastRank1; i += 1) {
          if ((rankArray.indexOf((i).toString()) === -1) && (i < 15)) {
            const cardsLeftWithRank = getCardsLeftWithRank(i);

            if (cardsLeftWithRank > 0) {
              tempCombinations *= countTotalCombinations(cardsLeftWithRank, 1);
            } else {
              tempCombinations = 0;
            }
          }
        }

        combinations += tempCombinations;
      }

      tempCombinations = 1;

      const firstRank2 = parseInt(rankArray[0], 10) - 2;
      if (firstRank2 > 0) {
        const lastRank2 = firstRank2 + 4;

        for (let i = firstRank2; i <= lastRank2; i += 1) {
          if ((rankArray.indexOf((i).toString()) === -1) && (i < 15)) {
            const cardsLeftWithRank = getCardsLeftWithRank(i);

            if (cardsLeftWithRank > 0) {
              tempCombinations *= countTotalCombinations(cardsLeftWithRank, 1);
            } else {
              tempCombinations = 0;
            }
          }
        }

        combinations += tempCombinations;
      }

      tempCombinations = 1;

      const firstRank3 = parseInt(rankArray[0], 10) - 3;
      if (firstRank3 > 0) {
        const lastRank3 = firstRank3 + 4;

        for (let i = firstRank3; i <= lastRank3; i += 1) {
          if ((rankArray.indexOf((i).toString()) === -1) && (i < 15)) {
            const cardsLeftWithRank = getCardsLeftWithRank(i);

            if (cardsLeftWithRank > 0) {
              tempCombinations *= countTotalCombinations(cardsLeftWithRank, 1);
            } else {
              tempCombinations = 0;
            }
          }
        }

        combinations += tempCombinations;
      }
    } else if (diff === 0) {
      let tempCombinations = 1;

      const firstRank = parseInt(rankArray[0], 10);
      const lastRank = firstRank + 4;

      for (let i = firstRank; i <= lastRank; i += 1) {
        if ((rankArray.indexOf((i).toString()) === -1) && (i < 15)) {
          const cardsLeftWithRank = getCardsLeftWithRank(i);

          if (cardsLeftWithRank > 0) {
            tempCombinations *= countTotalCombinations(cardsLeftWithRank, 1);
          } else {
            tempCombinations = 0;
          }
        }
      }

      combinations += tempCombinations;

      tempCombinations = 1;

      const firstRank1 = parseInt(rankArray[0], 10) - 1;
      if (firstRank1 > 0) {
        const lastRank1 = firstRank1 + 4;

        for (let i = firstRank1; i <= lastRank1; i += 1) {
          if ((rankArray.indexOf((i).toString()) === -1) && (i < 15)) {
            const cardsLeftWithRank = getCardsLeftWithRank(i);

            if (cardsLeftWithRank > 0) {
              tempCombinations *= countTotalCombinations(cardsLeftWithRank, 1);
            } else {
              tempCombinations = 0;
            }
          }
        }

        combinations += tempCombinations;
      }

      tempCombinations = 1;

      const firstRank2 = parseInt(rankArray[0], 10) - 2;
      if (firstRank2 > 0) {
        const lastRank2 = firstRank2 + 4;

        for (let i = firstRank2; i <= lastRank2; i += 1) {
          if ((rankArray.indexOf((i).toString()) === -1) && (i < 15)) {
            const cardsLeftWithRank = getCardsLeftWithRank(i);

            if (cardsLeftWithRank > 0) {
              tempCombinations *= countTotalCombinations(cardsLeftWithRank, 1);
            } else {
              tempCombinations = 0;
            }
          }
        }

        combinations += tempCombinations;
      }

      tempCombinations = 1;

      const firstRank3 = parseInt(rankArray[0], 10) - 3;
      if (firstRank3 > 0) {
        const lastRank3 = firstRank3 + 4;

        for (let i = firstRank3; i <= lastRank3; i += 1) {
          if ((rankArray.indexOf((i).toString()) === -1) && (i < 15)) {
            const cardsLeftWithRank = getCardsLeftWithRank(i);

            if (cardsLeftWithRank > 0) {
              tempCombinations *= countTotalCombinations(cardsLeftWithRank, 1);
            } else {
              tempCombinations = 0;
            }
          }
        }

        combinations += tempCombinations;
      }

      tempCombinations = 1;

      const firstRank4 = parseInt(rankArray[0], 10) - 3;
      if (firstRank4 > 0) {
        const lastRank4 = firstRank4 + 4;

        for (let i = firstRank4; i <= lastRank4; i += 1) {
          if ((rankArray.indexOf((i).toString()) === -1) && (i < 15)) {
            const cardsLeftWithRank = getCardsLeftWithRank(i);

            if (cardsLeftWithRank > 0) {
              tempCombinations *= countTotalCombinations(cardsLeftWithRank, 1);
            } else {
              tempCombinations = 0;
            }
          }
        }

        combinations += tempCombinations;
      }
    }
  }

  return combinations;
};
