const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let current = '';
let operator = '';
let operand = '';
let resultShown = false;

function updateDisplay(val) {
    display.value = val || '0';
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        if (!isNaN(action) || action === '.') {
            if (resultShown) {
                current = '';
                resultShown = false;
            }
            if (action === '.' && current.includes('.')) return;
            current += action;
            updateDisplay(current);
        } else if (['+', '-', '*', '/'].includes(action)) {
            if (current === '' && operand === '') return;
            if (operand && current) {
                operand = operate(operand, current, operator);
                updateDisplay(operand);
                current = '';
            } else if (current) {
                operand = current;
                current = '';
            }
            operator = action;
            resultShown = false;
        } else if (action === '=') {
            if (operator && operand !== '' && current !== '') {
                operand = operate(operand, current, operator);
                updateDisplay(operand);
                current = '';
                operator = '';
                resultShown = true;
            }
        } else if (action === 'clear') {
            current = '';
            operand = '';
            operator = '';
            updateDisplay('0');
        } else if (action === 'percent') {
            if (current) {
                current = (parseFloat(current) / 100).toString();
                updateDisplay(current);
            }
        } else if (action === 'plus-minus') {
            if (current) {
                current = (parseFloat(current) * -1).toString();
                updateDisplay(current);
            }
        }
    });
});

function operate(a, b, op) {
    let x = parseFloat(a), y = parseFloat(b);
    if (op === '+') return (x + y).toString();
    if (op === '-') return (x - y).toString();
    if (op === '*') return (x * y).toString();
    if (op === '/') return y === 0 ? 'Error' : (x / y).toString();
    return b;
}

updateDisplay('0');
