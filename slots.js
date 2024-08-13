const symbols = ['🍒', '🍋', '🍊', '🍉', '🍇', '🍓'];

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function spinSlots() {
    const slot1 = document.getElementById('slot1');
    const slot2 = document.getElementById('slot2');
    const slot3 = document.getElementById('slot3');

    const symbol1 = getRandomSymbol();
    const symbol2 = getRandomSymbol();
    const symbol3 = getRandomSymbol();

    slot1.textContent = symbol1;
    slot2.textContent = symbol2;
    slot3.textContent = symbol3;

    checkResult(symbol1, symbol2, symbol3);
}

function checkResult(symbol1, symbol2, symbol3) {
    const resultMessage = document.getElementById('result-message');

    if (symbol1 === symbol2 && symbol2 === symbol3) {
        resultMessage.textContent = 'Congratulations! You won!';
    } else {
        resultMessage.textContent = 'Try again!';
    }
}

document.getElementById('spin-btn').addEventListener('click', spinSlots);
document.getElementById('reset-btn').addEventListener('click', () => {
    document.getElementById('slot1').textContent = '';
    document.getElementById('slot2').textContent = '';
    document.getElementById('slot3').textContent = '';
    document.getElementById('result-message').textContent = '';
});
