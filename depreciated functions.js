const dealCardBtn = () => {
  // button is placed in overall container only FYI
  const btnEl = document.createElement('button');
  btnEl.innerText = 'Deal Cards';
  btnEl.classList.add('btn-deal-cards', 'btn');
  overallContainer.appendChild(btnEl);
  btnEl.addEventListener('click', () => {
    for (let i = 0; i < 5; i += 1) {
      const card = deck.pop();
      card.holdStatus = false;
      userHand.push(card);

      console.log(`${userHand[i].name} of ${userHand[i].suit} dealt`);
      const cardEl = makeCard(userHand[i]);

      // adds the index of the card to saved card array on 1st click
      let clickedTimes = 0;
      cardEl.addEventListener('click', () => {
        cardEl.classList.toggle('clicked');
        console.log(`cardname: ${card.name}`);

        if (clickedTimes % 2 === 0) {
          // console.log('clickedTimes = 0');
          savedCardsArray.splice(i, 0, i);
          console.log(`array of card: ${i}`);
          // removes index of card from array on 2nd click
        } else if (clickedTimes % 2 === 1) {
          if (i >= savedCardsArray.length) {
            savedCardsArray.splice(-1, 1);
            console.log('last');
          } else {
            savedCardsArray.splice(i, 1);
          }
          console.log(`splicing: ${i}`);
          // console.log('clickedTimes = 1');
        }
        clickedTimes += 1;
        console.log(savedCardsArray);
      });

      gameContainer.appendChild(cardEl);
    }
  });
};
