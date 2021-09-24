/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/**
 * Function that adds animation classes and removes them automatically after animation ends
 * (copied from animate.css documentation)
 * @param element element to be animated
 * @param animation name of animation
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

/**
 * Function that ADDS offset to bottom of element
 * @param cardEl element to offset
 */
const onCardEnter = (cardEl) => {
  if (canClickCard && !inLoseMsg) {
    cardEl.classList.add('mouse-on');
  }
};

/**
 * Function that REMOVES offset to bottom of element
 * @param cardEl element to offset
 */
const onCardLeave = (cardEl) => {
  if (canClickCard && !inLoseMsg) {
    cardEl.classList.remove('mouse-on');
  }
};

/**
 * Function that ADDS offset to bottom of element
 * @param buttonEl element to offset
 */
const onButtonEnter = (buttonEl) => {
  if (buttonEl.classList.contains('lose-btn') || (!inLoseMsg)) {
    buttonEl.classList.add('mouse-on');
  }
};

/**
 * Function that REMOVES offset to bottom of element
 * @param buttonEl element to offset
 */
const onButtonLeave = (buttonEl) => {
  if (buttonEl.classList.contains('lose-btn') || (!inLoseMsg)) {
    buttonEl.classList.remove('mouse-on');
  }
};
