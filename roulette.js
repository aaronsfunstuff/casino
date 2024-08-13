const numbers = Array.from({ length: 37 }, (_, i) => i); 
const chipBalanceDisplay = document.getElementById('chip-balance');
const betAmountInput = document.getElementById('bet-amount');
const betNumberInput = document.getElementById('bet-number');
const resultMessage = document.getElementById('result-message');
const historyList = document.getElementById('history-list');

let chipBalance = 100; 

function spinWheel() {
    const betAmount = parseInt(betAmountInput.value, 10);
    const betNumber = parseInt(betNumberInput.value, 10);

    if (betAmount <= 0 || betAmount > chipBalance || betNumber < 0 || betNumber > 36) {
        alert('Invalid bet amount or number!');
        return;
    }

    const randomIndex = Math.floor(Math.random() * numbers.length);
    const winningNumber = numbers[randomIndex];

    const wheel = document.getElementById('wheel');
    wheel.textContent = winningNumber;
    wheel.classList.add('spin');

    setTimeout(() => {
        wheel.classList.remove('spin');
        checkResult(winningNumber, betAmount, betNumber);
    }, 1000); 
}

function checkResult(winningNumber, betAmount, betNumber) {
    if (winningNumber === betNumber) {
        chipBalance += betAmount * 35; 
        resultMessage.textContent = `Congratulations! You won ${betAmount * 35} chips!`;
    } else {
        chipBalance -= betAmount; 
        resultMessage.textContent = `The winning number was ${winningNumber}. Try again!`;
    }

    updateChipBalance();
    updateGameHistory(winningNumber, betAmount, betNumber);
}

function updateChipBalance() {
    chipBalanceDisplay.textContent = chipBalance;
}

function updateGameHistory(winningNumber, betAmount, betNumber) {
    const historyItem = document.createElement('li');
    historyItem.textContent = `Bet: ${betAmount} on ${betNumber} | Winning Number: ${winningNumber} | Balance: ${chipBalance}`;
    historyList.insertBefore(historyItem, historyList.firstChild);
}

document.getElementById('spin-btn').addEventListener('click', spinWheel);
document.getElementById('reset-btn').addEventListener('click', () => {
    document.getElementById('wheel').textContent = '';
    document.getElementById('result-message').textContent = '';
});
