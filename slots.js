const symbols = ['🍒', '🍋', '🍊', '🍉', '🍇', '🍓'];
const spinSound = document.getElementById('spin-sound');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function spinSlots() {
    const slot1 = document.getElementById('slot1');
    const slot2 = document.getElementById('slot2');
    const slot3 = document.getElementById('slot3');

    slot1.classList.add('spin');
    slot2.classList.add('spin');
    slot3.classList.add('spin');

    spinSound.play();

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

        checkResult(symbol1, symbol2, symbol3);
    }, 500); // Match duration of the spin animation
}

function checkResult(symbol1, symbol2, symbol3) {
    const resultMessage = document.getElementById('result-message');

    if (symbol1 === symbol2 && symbol2 === symbol3) {
        resultMessage.textContent = 'Congratulations! You won!';
        winSound.play();
    } else {
        resultMessage.textContent = 'Try again!';
        loseSound.play();
    }
}

document.getElementById('spin-btn').addEventListener('click', spinSlots);
document.getElementById('reset-btn').addEventListener('click', () => {
    document.getElementById('slot1').textContent = '';
    document.getElementById('slot2').textContent = '';
    document.getElementById('slot3').textContent = '';
    document.getElementById('result-message').textContent = '';
});

