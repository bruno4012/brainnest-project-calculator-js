const display = document.getElementById('display');
const numbers = document.querySelectorAll('[id*=key]');
const operators = document.querySelectorAll('[id*=operator]');

let newNumber = true;
let operator;
let numberBefore;

const operacaoPendente = () => operator !== undefined;

const calcular = () => {
    if (operacaoPendente()) {
        const momentNumber = parseFloat(display.textContent.replace('.','').replace(',', '.'));
        newNumber = true;
        const result = eval(`${numberBefore}${operator}${momentNumber}`);
        updateDisplay(result);
    }
};

const updateDisplay = (txt) => {
    if (newNumber) {
        display.textContent = txt;
        newNumber = false;
    } else {
        display.textContent += txt;
    }
    document.querySelector('#equal').focus();
};

const insertNumber = (e) => updateDisplay(e.target.textContent);
numbers.forEach((number) => number.addEventListener('click', insertNumber));

const selecionarOperador = (e) => {
    if (!newNumber) {
        calcular();
        newNumber = true;
        operator = e.target.textContent;
        numberBefore = parseFloat(display.textContent.replace('.','').replace(',', '.'));
    }
};
operators.forEach((operator) =>
    operator.addEventListener('click', selecionarOperador)
);

const activeEqual = () => {
    calcular();
    operator = undefined;
};
document.getElementById('equal').addEventListener('click', activeEqual);

const cleanDisplay = () => (window.location.reload());
document
    .getElementById('cleanDisplay')
    .addEventListener('click', cleanDisplay);

const cleanCalc = () => {
    cleanDisplay();
    operator = undefined;
    newNumber = true;
    numberBefore = undefined;
};
document
    .getElementById('cleanCalc')
    .addEventListener('click', cleanCalc);

const removeLastNum = () =>
    (display.textContent = display.textContent.slice(0, -1));
document
    .getElementById('backspace')
    .addEventListener('click', removeLastNum);

const invert = () => {
    newNumber = true;
    updateDisplay(display.textContent * -1);
};
document.getElementById('change').addEventListener('click', invert);


const existDecimal = () => display.textContent.indexOf(',') !== -1;
const existValue = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existDecimal()) {
        if (newNumber) {
            updateDisplay('0,');
        } else {
            updateDisplay(',');
        }
    }
};
document.getElementById('decimal').addEventListener('click', inserirDecimal);

const keyboardMap = {
    0: 'key0',
    1: 'key1',
    2: 'key2',
    3: 'key3',
    4: 'key4',
    5: 'key5',
    6: 'key6',
    7: 'key7',
    8: 'key8',
    9: 'key9',
    '/': 'operatorDiv',
    '*': 'operadorMultip',
    '-': 'operatorSub',
    '+': 'operatorAdd',
    '=': 'equal',
    Enter: 'equal',
    Backspace: 'backspace',
    c: 'cleanDisplay',
    Escape: 'cleanCalc',
    ',': 'decimal',
};


const keyMap = (e) => {
    const key = e.key;
    const keyList = () => Object.keys(keyboardMap).indexOf(key) !== -1;
    if (keyList()) document.getElementById(keyboardMap[key]).click();
};
document.addEventListener('keydown', keyMap);