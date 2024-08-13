const symbols = ['🍒', '🍋', '🍊', '🍉', '🍇', '🍓'];

let chipBalance = 100; 
const betAmountInput = document.getElementById('bet-amount');
const chipBalanceDisplay = document.getElementById('chip-balance');
const historyList = document.getElementById('history-list');
const bonusRound = document.getElementById('bonus-round');

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function spinSlots() {
    const betAmount = parseInt(betAmountInput.value, 10);

    if (betAmount <= 0 || betAmount > chipBalance) {
        alert('Invalid bet amount!');
        return;
    }

    const slot1 = document.getElementById('slot1');
    const slot2 = document.getElementById('slot2');
    const slot3 = document.getElementById('slot3');

    slot1.classList.add('spin');
    slot2.classList.add('spin');
    slot3.classList.add('spin');

    setTimeout(() => {
        const symbol1 = getRandomSymbol();
        const symbol2 = getRandomSymbol();
        const symbol3 = getRandomSymbol();

        slot1.textContent = symbol1;
        slot2.textContent = symbol2;
        slot3.textContent = symbol3;

        slot1.classList.remove('spin');
        slot2.classList.remove('spin');
        slot3.classList.remove('spin');

        checkResult(symbol1, symbol2, symbol3, betAmount);
    }, 1000); 
}

function checkResult(symbol1, symbol2, symbol3, betAmount) {
    const resultMessage = document.getElementById('result-message');

    if (symbol1 === symbol2 && symbol2 === symbol3) {
        chipBalance += betAmount * 2; 
        resultMessage.textContent = 'Congratulations! You won!';
        showBonusRound();
    } else if (symbol1 === symbol2 || symbol2 === symbol3 || symbol1 === symbol3) {
        chipBalance += betAmount; 
        resultMessage.textContent = 'You got 2 of a kind!';
    } else {
        chipBalance -= betAmount; 
        resultMessage.textContent = 'Try again!';
    }

    updateChipBalance();
    updateGameHistory(symbol1, symbol2, symbol3, betAmount);
}

function updateChipBalance() {
    chipBalanceDisplay.textContent = chipBalance;
}

function updateGameHistory(symbol1, symbol2, symbol3, betAmount) {
    const historyItem = document.createElement('li');
    historyItem.textContent = `Bet: ${betAmount} | Outcome: ${symbol1} ${symbol2} ${symbol3} | Balance: ${chipBalance}`;
    historyList.insertBefore(historyItem, historyList.firstChild);
}

function showBonusRound() {
    bonusRound.classList.add('active');
}

document.getElementById('spin-btn').addEventListener('click', spinSlots);
document.getElementById('reset-btn').addEventListener('click', () => {
    document.getElementById('slot1').textContent = '';
    document.getElementById('slot2').textContent = '';
    document.getElementById('slot3').textContent = '';
    document.getElementById('result-message').textContent = '';
    bonusRound.classList.remove('active');
});

