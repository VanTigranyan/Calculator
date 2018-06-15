const display = document.querySelector('.item-header');
let oldnum;
let number;
let modNum;
let operator;
let previousOperator;
let result = '';
let isCalc = false;


function show(event) {
    if (isCalc) {
        display.textContent = null;
        isCalc = false;
    }

    if (previousOperator === 'calculate' || display.textContent === 'Not allowed') {
        clean();
    }

    if (display.textContent.includes('.') &&
        event.target.innerHTML === '.') {
        display.innerHTML = display.innerHTML;
    }
    else if (!display.textContent && event.target.textContent === '.') {
        display.textContent = '0.'
    }
    else {
        if (display.textContent.length > 9) {
            display.innerHTML = display.innerHTML;
        } else {
            display.innerHTML += event.target.innerHTML;

        }
    }

    previousOperator = 'number';
}

function clean(event) {

    if (previousOperator !== 'clean') {
        display.textContent = "";
        isCalc = false;
        number = null;
        oldnum = null;
        result = '';
        modNum = null;
        operator = null;
        previousOperator = null;
        isCalc = false;
        previousOperator = 'clean'
    }

}

function divide(number, event) {
    if ((oldnum / number) % 1 !== 0) {
        result = tofix((oldnum / number).toFixed(8));
    }
    else {
        result = (oldnum / number);
    }
}

function tofix(value) {

    value = value.toString();
    if (value.indexOf('.') === -1) {
        return value;
    }

    while (value.slice(-1) === '0') {
        value = value.substr(0, value.length - 1);
    }
    return +value;

}

function sum(event) {
    if (previousOperator === 'operator') {
        operator = event.target.textContent;
        previousOperator = 'operator';

    } else {

        if (previousOperator === 'number' && oldnum) {
            calculate();
        }


        if (previousOperator === 'calculate') {
            oldnum = result;
            result = '';
            display.textContent = null;
            operator = event.target.textContent;

            previousOperator = 'operator';

        } else {

            oldnum = parseFloat(display.textContent);
            display.textContent = null;
            operator = event.target.textContent;

            previousOperator = 'operator';
        }
    }
}


function change(event) {
    display.innerHTML = -display.innerHTML;
}

function sup(number) {
    result = oldnum ** number;
}

function calculate(event) {
    if (previousOperator === 'calculate' && result !== '') {
        if (result === '0' || result === 0){
            return;
        }
        oldnum = result;
        result = '';
        number = modNum;
    } else {
        number = parseFloat(display.textContent);
        modNum = number;
        display.innerHTML = null;
    }


    if (previousOperator === 'operator') {
        number = oldnum;
    }


    if (oldnum === undefined || oldnum === null) {
        alert('Input number before action!');
        return;
    }

    switch (operator) {
        case "%" :
            result = tofix((oldnum / 100 * number).toFixed(2));

            break;
        case "/" :
            divide(number);
            break;
        case "X" :
            result = tofix((oldnum * number).toFixed(8));
            break;
        case "-" :
            result = tofix(oldnum - number);
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
        display.innerHTML = tofix(result);
        isCalc = true;
    }

    previousOperator = 'calculate';
}
