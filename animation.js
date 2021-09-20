/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const onCardEnter = (cardEl) => {
  if (canClickCard === true) {
    cardEl.classList.add('mouse-on');
  }
};

const onCardLeave = (cardEl) => {
  if (canClickCard === true) {
    cardEl.classList.remove('mouse-on');
  }
};

const onButtonEnter = (buttonEl) => {
  buttonEl.classList.add('mouse-on');
};

const onButtonLeave = (buttonEl) => {
  buttonEl.classList.remove('mouse-on');
};

const onTitleEnter = (titleEl) => {
  titleEl.classList.add('glitch');
};

const onTitleLeave = (titleEl) => {
  titleEl.classList.remove('glitch');
};
