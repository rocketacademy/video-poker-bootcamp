/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/**
 * Function that adds animation classes and removes them automatically after animation ends
 * (copied from animate.css documentation)
 */
// eslint-disable-next-line
const animateCSS = (element, animation, prefix = 'animate__') => new Promise((resolve, reject) => {
  const animationName = `${prefix}${animation}`;

  element.classList.add(`${prefix}animated`, animationName);

  function handleAnimationEnd(event) {
    event.stopPropagation();
    element.classList.remove(`${prefix}animated`, animationName);
    resolve('Animation ended');
  }

  element.addEventListener('animationend', handleAnimationEnd, { once: true });
});

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
