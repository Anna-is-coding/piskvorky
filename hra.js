import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';

const playerElement = document.querySelector('.circle__icon img');
const allButtons = document.querySelectorAll('.game__btn');

allButtons.forEach((game__btn) => {
  game__btn.addEventListener('click', (event) => {
    event.target.disabled = true;

    if (currentPlayer === 'circle') {
      event.target.classList.add('board__field--circle');
      currentPlayer = 'cross';
    } else {
      event.target.classList.add('board__field--cross');
      currentPlayer = 'circle';
    }

    playerElement.src =
      currentPlayer === 'circle' ? 'icons/circle.svg' : 'icons/cross.svg';

    // NOVÁ ČÁST: zjistit, jestli někdo nevyhrál ===
    const boardState = Array.from(allButtons).map((btn) => {
      if (btn.classList.contains('board__field--circle')) {
        return 'o';
      } else if (btn.classList.contains('board__field--cross')) {
        return 'x';
      } else {
        return '_';
      }
    });

    const winner = findWinner(boardState);
    if (winner === 'o' || winner === 'x') {
      setTimeout(() => {
        alert(`Vyhrál hráč se symbolem ${winner}.`);
        location.reload();
      }, 100);
    }
  });
});
