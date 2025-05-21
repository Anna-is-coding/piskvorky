import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';

const playerElement = document.querySelector('.circle__icon img');
const allButtons = document.querySelectorAll('.game__btn');

const boardState = () => {
  return Array.from(allButtons).map((btn) => {
    if (btn.classList.contains('board__field--cross')) return 'x';
    if (btn.classList.contains('board__field--circle')) return 'o';
    return '_';
  });
};

const gameCheck = () => {
  const winner = findWinner(boardState);
  if (winner === 'x' || winner === 'o') {
    setTimeout(() => {
      alert(`Vyhrál hráč se symbolem ${winner}.`);
      window.location.reload();
    }, 300);
    return true;
  }
  if (winner === 'tie') {
    alert(`Hra skončila nerozhodně.`);
    window.location.reload();
    return true;
  }

  return false;
};

const aiPlayer = async () => {
  const response = await fetch(
    'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        board: boardState(),
        player: 'x',
      }),
    },
  );
  const data = await response.json();
  const { x, y } = data.position;
  const index = x + y * 10;
  const targetField = allButtons[index];

  if (targetField) {
    console.error('Neexistující políčko na indexu:', index, data);
    return;
  }
  targetField.click();
};

allButtons.forEach((btn) => {
  btn.addEventListener('click', (event) => {
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
    if (gameCheck() && currentPlayer === 'cross') {
      setTimeout(aiPlayer, 5000);
    }
  });
});
