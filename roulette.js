const numbers = Array.from({ length: 37 }, (_, i) => i); 
const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 27, 29, 31, 33, 35]; 
const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]; 

let chipBalance = 100; // Starting chip balance
const chipBalanceDisplay = document.getElementById('chip-balance');
const betAmountInput = document.getElementById('bet-amount');
const betNumberInput = document.getElementById('bet-number');
const betColorSelect = document.getElementById('bet-color');
const resultMessage = document.getElementById('result-message');
const historyList = document.getElementById('history-list');

function spinWheel() {
    const betAmount = parseInt(betAmountInput.value, 10);
    const betNumber = parseInt(betNumberInput.value, 10);
    const betColor = betColorSelect.value;

    if (betAmount <= 0 || betAmount > chipBalance || betNumber < 0 || betNumber > 36) {
        alert('Invalid bet amount or number!');
        return;
    }

    const randomIndex = Math.floor(Math.random() * numbers.length);
    const winningNumber = numbers[randomIndex];
    const winningColor = blackNumbers.includes(winningNumber) ? 'black' : redNumbers.includes(winningNumber) ? 'red' : 'green';

    const wheelNumber = document.getElementById('wheel-number');
    const wheel = document.getElementById('wheel');

    wheelNumber.textContent = winningNumber;
    wheel.style.backgroundColor = winningColor;

    wheel.classList.add('wheel-spin');

    setTimeout(() => {
        wheel.classList.remove('wheel-spin');
        checkResult(winningNumber, betAmount, betNumber, betColor, winningColor);
    }, 2000); 
}

function checkResult(winningNumber, betAmount, betNumber, betColor, winningColor) {
    if (winningNumber === betNumber) {
        chipBalance += betAmount * 35; 
        resultMessage.textContent = `Congratulations! You won ${betAmount * 35} chips!`;
    } else if (betColor === winningColor) {
        chipBalance += betAmount * 2; 
        resultMessage.textContent = `You bet on ${betColor} and it was ${winningColor}. You won ${betAmount * 2} chips!`;
    } else {
        chipBalance -= betAmount; 
        resultMessage.textContent = `The winning number was ${winningNumber}. Try again!`;
    }

    updateChipBalance();
    updateGameHistory(winningNumber, betAmount, betNumber, betColor, winningColor);
}

function updateChipBalance() {
    chipBalanceDisplay.textContent = chipBalance;
}

function updateGameHistory(winningNumber, betAmount, betNumber, betColor, winningColor) {
    const historyItem = document.createElement('li');
    historyItem.textContent = `Bet: ${betAmount} on ${betNumber} (${betColor}) | Winning Number: ${winningNumber} (${winningColor}) | Balance: ${chipBalance}`;
    historyList.insertBefore(historyItem, historyList.firstChild);
}

document.getElementById('spin-btn').addEventListener('click', spinWheel);
document.getElementById('reset-btn').addEventListener('click', () => {
    document.getElementById('wheel').textContent = '';
    document.getElementById('result-message').textContent = '';
});
