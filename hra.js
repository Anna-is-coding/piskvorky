let currentPlayer = 'circle';

const playerElement = document.querySelector('.circle__icon img');
const allButtons = document.querySelectorAll('.game__btn');

allButtons.forEach((game__btn) => {
  game__btn.addEventListener('click', (event) => {
    event.target.disabled = true;
    if (currentPlayer === 'circle') {
      playerElement.src = 'icons/circle.svg';
      event.target.classList.add('board__field--circle');
      currentPlayer = 'cross';
    } else {
      playerElement.src = 'icons/cross.svg';
      event.target.classList.add('board__field--cross');
      currentPlayer = 'circle';
    }
  });
});
