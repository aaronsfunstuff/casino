let deck, playerHand, dealerHand, playerScore, dealerScore;

function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];

    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value, suit });
        }
    }
    return deck.sort(() => Math.random() - 0.5);
}

function getCardValue(card) {
    if (['J', 'Q', 'K'].includes(card.value)) {
        return 10;
    } else if (card.value === 'A') {
        return 11;
    } else {
        return parseInt(card.value);
    }
}

function calculateHandScore(hand) {
    let score = hand.reduce((acc, card) => acc + getCardValue(card), 0);
    let aces = hand.filter(card => card.value === 'A').length;

    while (score > 21 && aces > 0) {
        score -= 10;
        aces -= 1;
    }
    return score;
}

function dealCard(hand, elementId) {
    const card = deck.pop();
    hand.push(card);
    document.getElementById(elementId).innerHTML += `<div class="card">${card.value} of ${card.suit}</div>`;
}

function startGame() {
    deck = createDeck();
    playerHand = [];
    dealerHand = [];

    document.getElementById('player-cards').innerHTML = '';
    document.getElementById('dealer-cards').innerHTML = '';
    document.getElementById('result-message').textContent = '';

    dealCard(playerHand, 'player-cards');
    dealCard(playerHand, 'player-cards');
    dealCard(dealerHand, 'dealer-cards');

    updateScores();
}

function updateScores() {
    playerScore = calculateHandScore(playerHand);
    dealerScore = calculateHandScore(dealerHand);

    document.getElementById('player-score').textContent = `Score: ${playerScore}`;
    document.getElementById('dealer-score').textContent = `Score: ${dealerScore}`;

    if (playerScore === 21) {
        document.getElementById('result-message').textContent = 'Blackjack! You win!';
        disableButtons();
    } else if (playerScore > 21) {
        document.getElementById('result-message').textContent = 'Bust! You lose!';
        disableButtons();
    }
}

function hit() {
    dealCard(playerHand, 'player-cards');
    updateScores();
}

function stand() {
    while (dealerScore < 17) {
        dealCard(dealerHand, 'dealer-cards');
        dealerScore = calculateHandScore(dealerHand);
    }

    document.getElementById('dealer-score').textContent = `Score: ${dealerScore}`;

    if (dealerScore > 21) {
        document.getElementById('result-message').textContent = 'Dealer busts! You win!';
    } else if (dealerScore > playerScore) {
        document.getElementById('result-message').textContent = 'Dealer wins!';
    } else if (dealerScore < playerScore) {
        document.getElementById('result-message').textContent = 'You win!';
    } else {
        document.getElementById('result-message').textContent = 'It\'s a tie!';
    }
    disableButtons();
}

function disableButtons() {
    document.getElementById('hit-btn').disabled = true;
    document.getElementById('stand-btn').disabled = true;
}

function enableButtons() {
    document.getElementById('hit-btn').disabled = false;
    document.getElementById('stand-btn').disabled = false;
}

document.getElementById('hit-btn').addEventListener('click', hit);
document.getElementById('stand-btn').addEventListener('click', stand);
document.getElementById('restart-btn').addEventListener('click', () => {
    enableButtons();
    startGame();
});

startGame();
