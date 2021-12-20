  let playerScore = 100;
 
  const gameLoop = () => {

      let deck = [];
      let playerHandArray = [];
      const playerHandSize = 5;
      let gameMode = 0
      let betAmount = 0;
      let playerHandArray2 = [];
      let playerHandArrayFinal = [];
      let royalFlush = false;
      let straightFlush = false;
      let fourOfAKind = false;
      let fullHouse = false;
      let flush = false;
      let straight = false;
      let threeOfAKind = false;
      let twoPair = false;
      let onePair = false;
      // let jacksOrBetter = false;


      /**
       * A function that builds deck
       */
      const makeDeck = () => {
        // create the empty deck at the beginning
        const newDeck = [];
        const suitInfo = [
          { suitsShape: "hearts", suitsSymbol: "♥️", suitsColour: "red" },
          { suitsShape: "diamonds", suitsSymbol: "♦️", suitsColour: "red" },
          { suitsShape: "clubs", suitsSymbol: "♣️", suitsColour: "black" },
          { suitsShape: "spades", suitsSymbol: "♠️", suitsColour: "black" },
        ];

        for (let suitIndex = 0; suitIndex < suitInfo.length; suitIndex += 1) {
          // make a variable of the current suit
          let currentSuit = suitInfo[suitIndex].suitsShape;
          let currentSymbol = suitInfo[suitIndex].suitsSymbol;
          let currentColour = suitInfo[suitIndex].suitsColour;

          // loop to create all cards in this suit
          // rank 1-13
          for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
            // Convert rankCounter to string
            let cardName = `${rankCounter}`;

            // 1, 11, 12 ,13
            if (cardName === '1') {
              cardName = 'ace';
              displayName = "A";
            } else if (cardName === '11') {
              cardName = 'jack';
              displayName = "J";
            } else if (cardName === '12') {
              cardName = 'queen';
              displayName = "Q";
            } else if (cardName === '13') {
              cardName = 'king';
              displayName = "K";
            }

            // make a single card object variable
            const card = {
              name: cardName,
              suit: currentSuit,
              rank: rankCounter,
              pic: `./cardsPng/${cardName}_of_${currentSuit}.png`,
              //`./images/cards/${cardName}_of_${currentSuit}.png`,
              display: displayName,      //1,2,J,K
              colour: currentColour,     //red,black
              suitSymbol: currentSymbol, //"♥️"
            };

            // add the card to the deck
            newDeck.push(card);
          }
        }
        return newDeck;
      };

      /**
       * A function that gets a random number
       * @param  max {number} max number to be generated
       * @return {number} random number from 0 to max
       */
      const getRandomIndex = (max) => Math.floor(Math.random() * max);

      /**
       * A function that switches the items in an array
       * @param  cards {number} the max length of the array
       * @return {array} {array} returns the array with its items shuffled
       */
      const shuffleCards = (cards) => {
        // Loop over the card deck array once
        for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
          // Select a random index in the deck
          const randomIndex = getRandomIndex(cards.length);
          // Select the card that corresponds to randomIndex
          const randomCard = cards[randomIndex];
          // Select the card that corresponds to currentIndex
          const currentCard = cards[currentIndex];
          // Swap positions of randomCard and currentCard in the deck
          cards[currentIndex] = randomCard;
          cards[randomIndex] = currentCard;
        }
        // Return the shuffled deck
        return cards;
      };

      /**
       * A function which creates a standard board that will go on the screen
       *  @return an empty board which holds 5 slots for cards 
       */
      const buildPlayerHand = () => {
        // create a div which represents the player's hand
        let playerHand = document.createElement('div');
        // give it a class for CSS purposes
        playerHand.classList.add('playerHand', 'child');
        // making 5 squares within the board    
          for (let i = 0; i < 5; i += 1) {
            // create the square element in each row
            const square = document.createElement('div');
            // set a class for CSS purposes
            // The squares are created. 
            square.classList.add('square');
            square.id = `square${i}`
            playerHand.appendChild(square);
            } 
        //appending each square in the row div
        return playerHand;
      };

      /**
       * A function which creates a score board which helps the player understand how the game works
       *  @return a div board which contains various elements
       */
      const buildScoreBoard = () => {
        let scoreBoardContainer = document.createElement('div');
        scoreBoardContainer.id = "score-board-container"
        scoreBoardContainer.classList.add("child")
        let firstColumn = ['', 'Royal Flush', 'Straight Flush', 'Four of a kind', 'Full House', 'Flush', 'Straight', 'Three of a kind', 'Two pair']
        // let secondColumn = [1, 250, 50, 25, 9, 6, 4, 3, 2, 1]
        let secondColumn = ['1', '250', '50', '25', '9','6', '4', '3', '2']
        let thirdColumn = ['2', '500', '100', '50', '18', '12', '8', '6', '4']
        let fourthColumn = ['3', '750', '150', '75', '27', '18', '12', '9', '6']
        let fifthColumn = ['4', '1000', '200', '100', '36', '24', '16', '12', '8']
        let sixthColumn = ['5', '1250', '250', '125', '45', '30', '20', '15', '10']
        // create a div which contains the elements of the scoreboard
        let scoreBoard = document.createElement('table');
        // give it a class for CSS purposes
        scoreBoard.classList.add('scoreBoard');
        scoreBoard.innerHTML = `<tbody>`
        for (let i = 0; i<firstColumn.length; i++){  
          scoreBoard.innerHTML += '<tr><td>' + firstColumn[i] + '</td><td>' + secondColumn[i] + '</td><td>' + thirdColumn[i] + '</td><td>' + fourthColumn[i] + '</td><td>' + fifthColumn[i] + '</td><td>' + sixthColumn[i] + '</td></tr>';
            } 
          scoreBoard.innerHTML += '</tbody>'
        scoreBoardContainer.appendChild(scoreBoard);
        return scoreBoardContainer;
        
      };

      /**
       * A function to deal cards into the squares when the deal button is pressed
       *  @param  squares {div} targets the squares of playerHand
       *  @return a filled playerHand when deal is clicked. 
       */
      const dealCards = () => {
        //store card value within the squares
        if (gameMode === 0) {
          for (let i = 0; i < 5; i+= 1) {
            document.getElementById(`square${i}`).innerHTML = `<img src="${playerHandArray[i].pic}" class="card-pic" />`;
            document.getElementById(`square${i}`).innerHTML = `<img src="${playerHandArray[i].pic}" class="card-pic" />`;
            gameMode = 1;
            //instructions for player to switch out cards
            msgForPlayer();
            console.log("this is the first time deal button is pressed")
            //adding event listeners to the squares
            clickUnclick();
          }
        } else if (gameMode === 1) {
            //so deal button will not work anymore
            gameMode = 99;
            console.log("this is the second time deal button is pressed")
            for (let i = 0; i < 5; i+= 1) {
            if (document.getElementById(`square${i}`).classList.contains("clickedContainer")){
            document.getElementById(`square${i}`).innerHTML = `<img src="${playerHandArray2[i].pic}" class="card-pic" />`;
            //I'm storing this into a final array so we can easily compare winning condition
            let holder = playerHandArray2[i]
            playerHandArrayFinal[i] = holder;
              } else {
                //I'm storing this into a final array so we can easily compare winning condition
                let holder = playerHandArray[i]
                playerHandArrayFinal[i] = holder;
              }
            }
            console.log(playerHandArrayFinal);
            calcHandScore();
            msgForPlayer();
            }
          else {
            //remove all the elements in gameContainer
            const myNode = document.getElementById("gameContainer");
            while (myNode.firstChild) {
            myNode.removeChild(myNode.lastChild);
             }
            gameLoop();
          }
        }
      /**
       * A function which adds an event listener onto the squares to register the cards which user wants to change. Event listener function will change the playerHandArray, so the next time the deal button is pressed, it outputs different cards
       *  @return a different playerHandArray
       */
      const clickUnclick = () => {
        for (let i = 0; i < 5; i += 1) {
          document.getElementById(`square${i}`).addEventListener("click", ()=>{
            // if the containers already have a class called clickedContainer, it removes the clickedContainer class
            if(document.getElementById(`square${i}`).classList.contains("clickedContainer")) {
              document.getElementById(`square${i}`).classList.remove("clickedContainer")
            } 
            else {
            document.getElementById(`square${i}`).classList.add("clickedContainer")
              }
            })
        }
      }
      
      const buildButtonBoard = () => {
        let buttonContainer = document.createElement('div');
        buttonContainer.id = "button-container"
        buttonContainer.classList.add("child")
 
      const buildDealButton = () => {
        // create a deal button
        let makeDealButton = document.createElement('button');
        // give it a class for CSS purposes
        makeDealButton.classList.add('button');
        // give it an id 
        makeDealButton.id = "deal-button"
        makeDealButton.innerText = "DEAL"
        // when button is clicked, it takes from the playerHandArray and stores it in the each squares.
        makeDealButton.addEventListener("click", dealCards)
        return makeDealButton;
      }

      const buildBetOneButton = () => {
        // create a betOne button
        let makeBetOneButton = document.createElement('button');
        // give it a class for CSS purposes
        makeBetOneButton.classList.add('button');
        // give it an id 
        makeBetOneButton.id = "bet-one-button"
        makeBetOneButton.innerText = "BET ONE"
        // when button is clicked, it takes from the playerHandArray and stores it in the each squares.
        makeBetOneButton.addEventListener("click", betOnePoints)
        return makeBetOneButton;
      }

      const buildBetMaxButton = () => {
        // create a betMax button
        let makeBetMaxButton = document.createElement('button');
        // give it a class for CSS purposes
        makeBetMaxButton.classList.add('button');
        // give it an id 
        makeBetMaxButton.id = "bet-max-button"
        makeBetMaxButton.innerText = "BET MAX"
        // when button is clicked, it takes from the playerHandArray and stores it in the each squares.
        makeBetMaxButton.addEventListener("click", betMaxPoints)
        return makeBetMaxButton;
      }

      const betOnePoints = () => {
        if (betAmount < 5 && gameMode === 0) {
          betAmount += 1;
          playerScore -= 1;
          betMsg();
          outputPlayerCreditMsg()
        } else 
        console.log("Max bet Amount reached")
      }

      const betMaxPoints = () => {
          if (betAmount < 5 && gameMode === 0) {
          //reset playerScore and betAmount
            playerScore += betAmount;
            betAmount = 0;
            betAmount += 5;
            playerScore -= 5;
            betMsg();
            outputPlayerCreditMsg()
        } else
        console.log("Max bet Amount reached")
        }
        buttonContainer.appendChild(buildDealButton());
        buttonContainer.appendChild(buildBetOneButton());
        buttonContainer.appendChild(buildBetMaxButton());
        return buttonContainer
      }


      /**
       * A function which creates messages relating to the betting. Msg should change output whenever betting buttons are clicked. 
       */
      const betMsg = () => {
      let betMsgDiv = document.querySelector('#bet-msg')
      betMsgDiv.innerHTML = `Your Current Bet: ${betAmount}`
      }

      /**
       * A function which creates messages relating to the player's credits. Msg should change output whenever betting buttons are clicked. 
       */
      const outputPlayerCreditMsg = () => {
        let playerCreditMsgDiv = document.querySelector('#player-credit')
        playerCreditMsgDiv.innerHTML = `Total Credits: ${playerScore}`
      }

      /**
       * A function which initialises the game
       */
      const initGame = () => {
        //makes a deck and stores it in deck variable
        deck = makeDeck();
        //shuffles deck
        shuffleCards(deck);
        document.querySelector('#gameContainer').appendChild(buildScoreBoard())
        // deal the cards out to playerHandArray. playerHandSize is 5
        for (let i = 0; i < playerHandSize; i += 1) {
          //playerHandArray is an empty array, pushes 5 cards into the array
          playerHandArray.push(deck.pop());
          }
        for (let i = 0; i < playerHandSize; i += 1) {
          //playerHandArray2 is an empty array, pushes another 5 cards into the array, in preparation for swap
          playerHandArray2.push(deck.pop());
          }
        //storing playerHand into gameContainer div
        document.querySelector('#gameContainer').appendChild(buildPlayerHand());
        // document.body.appendChild(buildPlayerHand());
        document.querySelector('#gameContainer').appendChild(buildButtonBoard());
        //show 0 bet
        betMsg();
        //show 100 credits 
        outputPlayerCreditMsg();
        //First Msg for player, which is "PLACE YOUR BET!"
        msgForPlayer();
      };

      //tester, rmb to delete
      // const playerHandArrayFinalTest = [
      //   {rank: 1, suit: "hearts"},
      //   {rank: 10, suit: "hearts"},
      //   {rank: 11, suit: "hearts"},
      //   {rank: 12, suit: "hearts"},
      //   {rank: 13, suit: "hearts"}
      // ]

      console.log(playerHandArrayFinal);

      const calcHandScore = () => {
      let cardRankTally = {};
      let counter = 0;

      // I'll sort the array first
      playerHandArrayFinal.sort(function (a, b) {
        return a.rank - b.rank;
      });

      //Creates an object which tallies the cards
      for (let i = 0; i < playerHandArrayFinal.length; i += 1) {
        var cardRank = playerHandArrayFinal[i].rank;
        // If we have seen the card name before, increment its count
        if (cardRank in cardRankTally) {
          cardRankTally[cardRank] += 1;
        }
        // Else, initialise count of this card name to 1
        else {
          cardRankTally[cardRank] = 1;
        }
      }
      console.log(cardRankTally);

      let talliedArray = [];
      //What object.values does is that it takes the values of the object and stores them into an array. In this case, I name it talliedArray
      talliedArray = Object.values(cardRankTally);


      //test twoPair 
      for (let i = 0; i < talliedArray.length; i += 1) {
        if (talliedArray[i] === 2) {
          counter += 1;
          onePair = true;
          console.log("onePair is true")
        }
        if (counter === 2) {
          twoPair = true;
          console.log("twoPair is true")
        }
      }
      counter = 0;

      //test threeOfAKind
      for (let i = 0; i < talliedArray.length; i += 1) {
        if (talliedArray[i] === 3) {
          counter += 1;
        }
        if (counter === 1) {
          threeOfAKind = true;
          console.log("threeOfAKind is true")
        }
      }
      counter = 0;

      //test fourOfAKind
      for (let i = 0; i < talliedArray.length; i += 1) {
        if (talliedArray[i] === 4) {
          counter += 1;
        }
        if (counter === 1) {
          fourOfAKind = true;
          console.log("fourOfAKind is true")
        }
      }
      counter = 0;

      //test straights
      for (let i = 0; i < (playerHandArrayFinal.length - 1); i++) {
        let storeRank = playerHandArrayFinal[i].rank
        let scoreDifference = storeRank - playerHandArrayFinal[i+1].rank
        if (scoreDifference === -1) {
            counter += 1;
          }
        //account for A, 10, J, Q, K
        if ((counter === 4) || ((playerHandArrayFinal[0].rank === 1) && (playerHandArrayFinal[1].rank === 10) && (counter === 3))) {
          straight = true;
          console.log("straights is true")
        }
      }

      counter = 0;

      //test flush
      let storeSuit = playerHandArrayFinal[0].suit
      for (let i = 0; i < playerHandArrayFinal.length; i++)
        if (storeSuit === playerHandArrayFinal[i].suit) {
            counter += 1;
          }
        if (counter === 5) {
          flush = true;
          console.log("flush is true")
        }

      counter = 0;

      //test straightFlush
      if (straight === true && flush === true) {
        straightFlush = true;
        console.log("straight flush is true")
      }

      //test fullHouse
      if (onePair === true && threeOfAKind === true) {
        fullHouse = true;
        console.log("fullHouse is true")
      }

      //test royalFlush
      for (let i = 0; i < (playerHandArrayFinal.length - 1); i++) {
        let storeRank = playerHandArrayFinal[i].rank
        let scoreDifference = storeRank - playerHandArrayFinal[i+1].rank
        if (scoreDifference === -1) {
            counter += 1;
          }
        //account for A, 10, J, Q, K
        if ((flush === true) && ((playerHandArrayFinal[0].rank === 1) && (playerHandArrayFinal[1].rank === 10) && (counter === 3))) {
          royalFlush = true;
          console.log("royalFlush is true")
        }
      }
      console.log("end")
      }

      /**
       * A function which creates messages for the player to understand what's going on in the game. 
       */
      const msgForPlayer = () => {
      let winAmount = 0;
        if (gameMode === 0) {
        let msgsForPlayer = document.querySelector('#player-msg')
        msgsForPlayer.innerHTML = `PLACE YOUR BET!`
        } else if (gameMode === 1) {
            let msgsForPlayer = document.querySelector('#player-msg')
            msgsForPlayer.innerHTML = `CLICK ON THE CARDS YOU WANT TO SWITCH OUT!`
        } else if (gameMode === 99) {
            if (royalFlush === true) {
              let msgsForPlayer = document.querySelector('#player-msg')
              msgsForPlayer.innerHTML = `YOU GOT A ROYAL FLUSH!`
              winAmount = betAmount * 250
              playerScore += winAmount + betAmount
              outputPlayerCreditMsg(); 
            } else if (straightFlush === true) {
                let msgsForPlayer = document.querySelector('#player-msg')
                msgsForPlayer.innerHTML = `YOU GOT A STRAIGHT FLUSH!`
                winAmount = betAmount * 50
                playerScore += winAmount + betAmount
                outputPlayerCreditMsg(); 
            } else if (fourOfAKind === true) {
                let msgsForPlayer = document.querySelector('#player-msg')
                msgsForPlayer.innerHTML = `YOU GOT A FOUR OF A KIND!`
                winAmount = betAmount * 25
                playerScore += winAmount + betAmount
                outputPlayerCreditMsg(); 
            } else if (fullHouse === true) {
                let msgsForPlayer = document.querySelector('#player-msg')
                msgsForPlayer.innerHTML = `YOU GOT A FULL HOUSE!`
                winAmount = betAmount * 9
                playerScore += winAmount + betAmount
                outputPlayerCreditMsg(); 
            } else if (flush === true) {
                let msgsForPlayer = document.querySelector('#player-msg')
                msgsForPlayer.innerHTML = `YOU GOT A FLUSH!`
                winAmount = betAmount * 6
                playerScore += winAmount + betAmount
                outputPlayerCreditMsg(); 
            } else if (straight === true) {
                let msgsForPlayer = document.querySelector('#player-msg')
                msgsForPlayer.innerHTML = `YOU GOT A STRAIGHT!`
                winAmount = betAmount * 4
                playerScore += winAmount + betAmount
                outputPlayerCreditMsg(); 
            } else if (threeOfAKind === true) {
                let msgsForPlayer = document.querySelector('#player-msg')
                msgsForPlayer.innerHTML = `YOU GOT A THREE OF A KIND!`
                winAmount = betAmount * 3
                playerScore += winAmount + betAmount
                outputPlayerCreditMsg(); 
            } else if (twoPair === true) {
                let msgsForPlayer = document.querySelector('#player-msg')
                msgsForPlayer.innerHTML = `YOU GOT A TWO PAIR!`
                winAmount = betAmount * 2
                playerScore += winAmount + betAmount
                outputPlayerCreditMsg(); 
            } else {
                let msgsForPlayer = document.querySelector('#player-msg')
                msgsForPlayer.innerHTML = `BETTER LUCK NEXT TIME!`
            }
        }
      }

      initGame();
  }

  gameLoop();
