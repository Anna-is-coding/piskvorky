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
  const winner = findWinner(boardState());
  if (winner === 'o' || winner === 'x') {
    setTimeout(() => {
      alert(`Vyhrál hráč se symbolem ${winner}.`);
      location.reload();
    }, 100);
  }
  if (winner === 'tie') {
    setTimeout(() => {
      alert(`Hra skončila nerozhodně.`);
      location.reload();
    }, 100);
  }
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

  if (!targetField) {
    console.error('Neexistující políčko na indexu:', index, data);
    return;
  }

  targetField.click();
};

const btnClickHandler = async (event) => {
  const field = event.target;
  field.disabled = true;

  if (currentPlayer === 'circle') {
    field.classList.add('board__field--circle');
    currentPlayer = 'cross';
  } else {
    field.classList.add('board__field--cross');
    currentPlayer = 'circle';
  }

  playerElement.src =
    currentPlayer === 'circle' ? 'icons/circle.svg' : 'icons/cross.svg';

  gameCheck();

  if (currentPlayer === 'cross') {
    setTimeout(aiPlayer, 500);
  }
};

allButtons.forEach((btn) => {
  btn.addEventListener('click', btnClickHandler);
});
