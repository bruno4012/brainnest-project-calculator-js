
const display = document.getElementById('display');
const keyBtn = document.querySelectorAll('[id*=key]');
const clearBtn = document.getElementById("clear").addEventListener("click", clear);
const equalBtn = document.getElementById("equal").addEventListener("click", calculate);

// inser number to div display
const updateDisplay =(text) =>{
    display.textContent += text
}
const insertNumber = (e) => updateDisplay(e.target.textContent);
keyBtn.forEach((numero) => numero.addEventListener('click', insertNumber));

// get number from display 
function calculate(){
    let displayVal = document.getElementById('display').textContent;
    // calculating information from display
    calc = eval(displayVal)
    // print on display resolt 
    display.innerHTML = calc;

}
function clear(){
    display.innerHTML = "";
    // console.log('clicked')
}
// set keyboard allowed key arr
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
    '/': 'keyDiv',
    '*': 'keyX',
    '-': 'keySub',
    '+': 'keyAdd',
    '=': 'equal',
    Enter: 'equal',
    c: 'clear',
    '.': 'keyDot',
};

const keyMap = (e) => {
    const key = e.key;
    const keyList = () => Object.keys(keyboardMap).indexOf(key) !== -1;
    if (keyList()) document.getElementById(keyboardMap[key]).click();
};
document.addEventListener('keydown', keyMap);
