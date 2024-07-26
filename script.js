// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const movesDisplay = document.getElementById('moves');
    const pairsDisplay = document.getElementById('pairs');

    const cardValues = [
        'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 
        'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
    ];

    let cards = [];
    let firstCard = null;
    let secondCard = null;
    let moves = 0;
    let pairs = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function initializeGame() {
        shuffle(cardValues);
        cardValues.forEach(value => {
            const card = document.createElement('div');
            card.classList.add('card', 'hidden');
            card.dataset.value = value;
            card.addEventListener('click', handleCardClick);
            gameBoard.appendChild(card);
            cards.push(card);
        });
    }

    function handleCardClick(event) {
        const clickedCard = event.target;

        if (clickedCard === firstCard || clickedCard.classList.contains('matched')) {
            return;
        }

        clickedCard.classList.remove('hidden');
        clickedCard.textContent = clickedCard.dataset.value;

        if (!firstCard) {
            firstCard = clickedCard;
        } else {
            secondCard = clickedCard;
            moves++;
            movesDisplay.textContent = moves;

            if (firstCard.dataset.value === secondCard.dataset.value) {
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                pairs++;
                pairsDisplay.textContent = pairs;

                if (pairs === cardValues.length / 2) {
                    setTimeout(() => alert('You won!'), 500);
                }

                resetSelection();
            } else {
                setTimeout(() => {
                    firstCard.classList.add('hidden');
                    firstCard.textContent = '';
                    secondCard.classList.add('hidden');
                    secondCard.textContent = '';
                    resetSelection();
                }, 1000);
            }
        }
    }

    function resetSelection() {
        firstCard = null;
        secondCard = null;
    }

    initializeGame();
});
