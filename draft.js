const display = document.querySelector('.item-header');
let oldnum;
let number;
let operator;
let result;
let isCalc = false;


function show(event) {
    if (isCalc) {
        display.textContent = null;
        isCalc = false;
    }

    if (display.textContent.includes('.') &&
        event.target.innerHTML === '.') {
        display.innerHTML = display.innerHTML;
    }
    else if (!display.textContent && event.target.textContent === '.') {
        display.textContent = '0.'
    }
    else {
        display.innerHTML += event.target.innerHTML;
    }
}

function clean(event) {
    display.textContent = "";
    isCalc = false;
}

function divide(number, event) {
    if ((oldnum / number) % 1 !== 0) {
        result = (oldnum / number).toFixed(8);
    }
    else {
        result = (oldnum / number);
    }
}

function sum(event) {
    oldnum = parseFloat(display.textContent);
    display.textContent = null;
    operator = event.target.textContent;
}

function change(event) {
    display.innerHTML = -display.innerHTML;
}

function sup(number) {
    result = oldnum ** number;
}

function calculate(event) {
    number = parseFloat(display.textContent);
    display.innerHTML = null;

    if (!oldnum) {
        alert('Input number before action!');
        return;
    }

    switch (operator) {
        case "%" :
            result = oldnum / 100 * number;
            break;
        case "/" :
            divide(number);
            break;
        case "X" :
            result = oldnum * number;
            break;
        case "-" :
            result = oldnum - number;
            break;
        case "+" :
            result = oldnum + number;
            break;
        case "Sup" :
            sup(number);
            break;
    }
    if (result === undefined || result === null) {
        display.textContent = null;
    }
    else if (number === 0 && operator === '/') {
        display.textContent = 'Not allowed';
    }
    else {
        display.innerHTML = result;
        isCalc = true;
    }
}
