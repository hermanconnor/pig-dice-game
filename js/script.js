'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const diceEl = document.querySelector('.dice');
  const btnRoll = document.getElementById('roll-dice');
  const btnHold = document.getElementById('hold');
  const btnNewGame = document.getElementById('new-game');
  const player0El = document.querySelector('.player-0');
  const player1El = document.querySelector('.player-1');
  const score0El = document.querySelector('.player-0 .player-score');
  const score1El = document.querySelector('.player-1 .player-score');
  const current0El = document.querySelector('.player-0 .player-current-score');
  const current1El = document.querySelector('.player-1 .player-current-score');

  const diceImages = [
    // Dice with 1 dot
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='10' fill='%23ffffff' stroke='%23000000' stroke-width='2'/%3E%3Ccircle cx='50' cy='50' r='8' fill='%23000000'/%3E%3C/svg%3E",
    // Dice with 2 dots
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='10' fill='%23ffffff' stroke='%23000000' stroke-width='2'/%3E%3Ccircle cx='25' cy='25' r='8' fill='%23000000'/%3E%3Ccircle cx='75' cy='75' r='8' fill='%23000000'/%3E%3C/svg%3E",
    // Dice with 3 dots
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='10' fill='%23ffffff' stroke='%23000000' stroke-width='2'/%3E%3Ccircle cx='25' cy='25' r='8' fill='%23000000'/%3E%3Ccircle cx='50' cy='50' r='8' fill='%23000000'/%3E%3Ccircle cx='75' cy='75' r='8' fill='%23000000'/%3E%3C/svg%3E",
    // Dice with 4 dots
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='10' fill='%23ffffff' stroke='%23000000' stroke-width='2'/%3E%3Ccircle cx='25' cy='25' r='8' fill='%23000000'/%3E%3Ccircle cx='25' cy='75' r='8' fill='%23000000'/%3E%3Ccircle cx='75' cy='25' r='8' fill='%23000000'/%3E%3Ccircle cx='75' cy='75' r='8' fill='%23000000'/%3E%3C/svg%3E",
    // Dice with 5 dots
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='10' fill='%23ffffff' stroke='%23000000' stroke-width='2'/%3E%3Ccircle cx='25' cy='25' r='8' fill='%23000000'/%3E%3Ccircle cx='25' cy='75' r='8' fill='%23000000'/%3E%3Ccircle cx='50' cy='50' r='8' fill='%23000000'/%3E%3Ccircle cx='75' cy='25' r='8' fill='%23000000'/%3E%3Ccircle cx='75' cy='75' r='8' fill='%23000000'/%3E%3C/svg%3E",
    // Dice with 6 dots
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='10' fill='%23ffffff' stroke='%23000000' stroke-width='2'/%3E%3Ccircle cx='25' cy='25' r='8' fill='%23000000'/%3E%3Ccircle cx='25' cy='50' r='8' fill='%23000000'/%3E%3Ccircle cx='25' cy='75' r='8' fill='%23000000'/%3E%3Ccircle cx='75' cy='25' r='8' fill='%23000000'/%3E%3Ccircle cx='75' cy='50' r='8' fill='%23000000'/%3E%3Ccircle cx='75' cy='75' r='8' fill='%23000000'/%3E%3C/svg%3E",
  ];

  let scores, currentScore, activePlayer, playing;

  function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.add('active');
    player1El.classList.remove('active');

    player0El.classList.remove('winner');
    player1El.classList.remove('winner');

    diceEl.style.visibility = 'hidden';
  }

  function switchPlayer() {
    document.querySelector(
      `.player-${activePlayer} .player-current-score`,
    ).textContent = 0;

    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0El.classList.toggle('active');
    player1El.classList.toggle('active');
  }

  function rollDice() {
    if (playing) {
      const dice = Math.floor(Math.random() * 6) + 1;

      diceEl.src = diceImages[dice - 1];
      diceEl.alt = `Dice showing ${dice}`;
      diceEl.style.visibility = 'visible';
      diceEl.classList.add('rolling');

      setTimeout(() => {
        diceEl.classList.remove('rolling');
      }, 400);

      if (dice !== 1) {
        currentScore += dice;

        document.querySelector(
          `.player-${activePlayer} .player-current-score`,
        ).textContent = currentScore;
      } else {
        switchPlayer();
      }
    }
  }

  function hold() {
    if (playing) {
      scores[activePlayer] += currentScore;

      document.querySelector(
        `.player-${activePlayer} .player-score`,
      ).textContent = scores[activePlayer];

      if (scores[activePlayer] >= 100) {
        playing = false;

        document
          .querySelector(`.player-${activePlayer}`)
          .classList.add('winner');
        document
          .querySelector(`.player-${activePlayer}`)
          .classList.remove('active');
        diceEl.style.visibility = 'hidden';
      } else {
        switchPlayer();
      }
    }
  }

  // EVENT LISTENERS
  btnRoll.addEventListener('click', rollDice);
  btnHold.addEventListener('click', hold);
  btnNewGame.addEventListener('click', init);

  // Initialize game on load
  init();
});
