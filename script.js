// Initialises link to github repository
const viewCode = document.getElementById("viewCode");
viewCode.setAttribute("href", "https://github.com/domhawke25/Calculator");

// Initialise variables
const buttons = document.querySelectorAll("button");
const mainDisplay = document.getElementById("display-main");
const upperDisplay = document.getElementById("display-upper");
let currentNum = "0";
let total = 0;
let operator = undefined;

// onKeypress event for kyeboard
window.onkeydown = event => {
    console.log(event.key);
    selectFunction(event.key);
}

// onClick event for buttons
buttons.forEach(button => {
    button.onclick = event => {
        console.log(event.target.id);
        selectFunction(event.target.id);
    }
});

// selects relevant function based on input
const selectFunction = id => {
    if (id === "Escape" || id === "keypad-C") {
        // Clear calc
        clearCalc();
    } else if (id === "Delete" || id === "keypad-CE") {
        // Clear entry
        clearDisplay();
    } else if (id === "0" || id === "keypad-0") {
        // Number 0
        addToNumber("0");
    } else if (id === "1" || id === "keypad-1") {
        // Number 1
        addToNumber("1");
    } else if (id === "2" || id === "keypad-2") {
        // Number 2
        addToNumber("2");
    } else if (id === "3" || id === "keypad-3") {
        // Number 3
        addToNumber("3");
    } else if (id === "4" || id === "keypad-4") {
        // Number 4
        addToNumber("4");
    } else if (id === "5" || id === "keypad-5") {
        // Number 5
        addToNumber("5");
    } else if (id === "6" || id === "keypad-6") {
        // Number 6
        addToNumber("6");
    } else if (id === "7" || id === "keypad-7") {
        // Number 7
        addToNumber("7");
    } else if (id === "8" || id === "keypad-8") {
        // Number 8
        addToNumber("8");
    } else if (id === "9" || id === "keypad-9") {
        // Number 9
        addToNumber("9");
    } else if (id === "." || id === "keypad-.") {
        // Decimal Point
        addToNumber(".")
    } else if (id === "+" || id === "keypad-+") {
        // Addition Operand
        useOperator("+");
    } else if (id === "-" || id === "keypad--") {
        // Minus Operand
        useOperator("-");
    } else if (id === "/" || id === "keypad-divide") {
        // Divide Operand
        useOperator("&#247");
    } else if (id === "*" || id === "keypad-x") {
        // Multiply Operand
        useOperator("x");
    } else if (id === "Enter" || id === "=" || id === "keypad-=") {
        // Equals Operand
        equals();
    } else if (id === "Backspace" || id === "keypad-delete") {
        // Delete
        deleteNumber();
    } else if (id === "@" || id === "keypad-root") {
        // Square Root
        specialOperator("root");
    } else if (id === "%" || id === "keypad-%") {
        // Percentage
        specialOperator("percent");
    } else if (id === "R" || id === "r" || id === "keypad-fraction") {
        // Fraction
        specialOperator("fraction");
    } else if (id === "Q" || id === "q" || id === "keypad-power") {
        // Squared
        specialOperator("power");
    }
        // +/-
        // Memory
}

// formats text to be printed to the display
const printToDisplay = (num) => {
    return num;
}

// Clears current number entered (CE)
const clearDisplay = () => {
    currentNum = "0";
    mainDisplay.innerHTML = printToDisplay(currentNum);
}

// Clears current calculation (C)
const clearCalc = () => {
    clearDisplay();
    total = 0;
    operator = undefined;
    upperDisplay.innerHTML = "";
}

// Add entered number to current number
const addToNumber = num => {
    // if a previous calculation has been done, clear all, to enter new number
    if (upperDisplay.innerHTML.indexOf("=") !== -1) {
        clearCalc();
    }
    // if the decimal button is pressed, check if number already contains decimal point
    if (num === ".") {
        if (currentNum.indexOf(".") === -1) {
            currentNum = `${currentNum}${num}`;
        }
    // stops user entering leading 0's
    } else if (currentNum === "0") {
        currentNum = num;
    // adds number entered to end of string
    } else {
        currentNum = `${currentNum}${num}`;
    }
    mainDisplay.innerHTML = printToDisplay(currentNum);
}

// deletes last number from string
const deleteNumber = () => {
    currentNum = currentNum.length > 1 ? currentNum.slice(0, -1) : "0";
    mainDisplay.innerHTML = printToDisplay(currentNum);
}

const useOperator = (newOperator) => {
    // updates display and operator after calculation 
    const updateOperator = () => {
        upperDisplay.innerHTML = `${printToDisplay(total.toString())} ${newOperator}`;
        operator = newOperator;
        clearDisplay();
    }
    // does calculation based on previous operator
    switch (operator) {
        case undefined:
            total = parseFloat(currentNum);
            updateOperator();
            break;
        case "+":
            total += parseFloat(currentNum);
            updateOperator();
            break;
        case "-":
            total -= parseFloat(currentNum);
            updateOperator();
            break;
        case "x":
            total *= parseFloat(currentNum);
            updateOperator();
            break;
        case "&#247":
            total /= parseFloat(currentNum);
            updateOperator();
            break;
        default:
            break;
    }
}

// does final calculation and displays answer
const equals = () => {
    // equals button only works if the operator variable contains an operand
    if (operator !== undefined) {
        upperDisplay.innerHTML = `${printToDisplay(total.toString())} ${operator} ${printToDisplay(currentNum)} =`;
        switch (operator) {
            case "+":
                total += parseFloat(currentNum);
                break;
            case "-":
                total -= parseFloat(currentNum);
                break;
            case "x":
                total *= parseFloat(currentNum);
                break;
            case "&#247":
                total /= parseFloat(currentNum);
                break;
            default:
                break;
        }
        mainDisplay.innerHTML = printToDisplay(total.toString());
        operator = undefined;
        currentNum = total.toString();
    }
}

const specialOperator = (newOperator) => {
    console.log(currentNum);
    console.log(total);
    if (parseFloat(currentNum) !== 0) {
        switch (newOperator) {
            case "root":
                total = Math.sqrt(parseFloat(currentNum));
                upperDisplay.innerHTML = `<sup>2</sup>&#8730<span style="text-decoration: overline;"> ${printToDisplay(currentNum)}</span> =`;
                break;
            case "power":
                total = parseFloat(currentNum) * parseFloat(currentNum);
                upperDisplay.innerHTML = `${printToDisplay(currentNum)}<sup>2</sup> =`;
                break;
            case "fraction":
                total = 1 / parseFloat(currentNum);
                upperDisplay.innerHTML = `<sup>1</sup>/<sub>${printToDisplay(currentNum)}</sub> =`;
                break;
            case "percent":
                break;
            default:
                break;
        }
        mainDisplay.innerHTML = printToDisplay(total.toString());
        operator = undefined;
        currentNum = total.toString();
    }
}