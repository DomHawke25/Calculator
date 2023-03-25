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
    selectFunction(event.key);
}

// onClick event for buttons
buttons.forEach(button => {
    button.onclick = event => {
        document.activeElement.blur(); // set focus back to <body>
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
        percentOperator();
    } else if (id === "R" || id === "r" || id === "keypad-fraction") {
        // Fraction
        specialOperator("fraction");
    } else if (id === "Q" || id === "q" || id === "keypad-power") {
        // Squared
        specialOperator("power");
    } else if (id === "F9" || id === "keypad-+-") {
        // +/-
        switchNegativePositive();
    }
        // Memory
}

// formats text to be printed to the display
const formatNumber = (num) => {
    /* Process
    1. Split Num by Decimal Point
    2. If whole number is greater than 16 digits, display as exponent.
    3. Round decimal number, so number displayed is no more than 16 digits.
    4. Add thousand's seprators.
    */

    // round last digit displayed
    const roundLastNumber = (firstDigit, secondDigit) => {
        if (parseFloat(secondDigit) >= 5) {
            let newNum = parseFloat(firstDigit) + 1;
            return newNum.toString();
        }
        return firstDigit;
    }
    
    let numArray = num.split(".");
    // test if number contains muinus sign
    let minusSign = numArray[0].indexOf("-") === -1 ? 0 : 1;
    
    // If the first part of the number is larger than 16 digits then convert to an exponential
    if (numArray[0].length > 16 + minusSign) {
        return parseFloat(num).toExponential(); // returns in text format
        /*
        // build a 16 digit number, removes any trailing 0's
        let numTemp = parseFloat(`${numArray[0].substring(0, 1)}.${numArray[0].substring(1, 15)}${roundLastNumber(numArray[0][15], numArray[0][16])}`);
        // convert number to string
        let numString = numTemp.toString();
        // checks if number rounded to single digit, adds .0 if it did
        if (numString.indexOf(".") === -1) {
            numString = `${numString}.0`;
        }
        return `${numString}e+${numArray[0].length - 1}`;
        */
    }

    /*
    if (numArray[0].length === 16 + minusSign && numArray[1].length > 0) {
        numArray[0] = `${numArray[0].substring(0, 14 + minusSign)${roundLastNumber(numArray[0][15 + minusSign], numArray[1][0])}}`;
        numArray[1] = "";
    }
    */

    // Add thousand seperators
    if (numArray[0].length > 3 + minusSign) {
        let newNum = "";
        let diff = numArray[0].length % 3;
        // Loop through string, to place thousands seprators.
        for (i = 0; i < numArray[0].length; i++) {
            if (i > 0 + minusSign && (i - diff) % 3 === 0) {
                newNum = `${newNum},`;
            }
            newNum = `${newNum}${numArray[0][i]}`;
        }
        numArray[0] = newNum;
    }

    // Round to total of 16 digits

    return numArray.join(".");
}

// Clears current number entered (CE)
const clearDisplay = () => {
    currentNum = "0";
    mainDisplay.innerHTML = formatNumber(currentNum);
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
        //checks if number is no more than 16 digits
        let tempNum = currentNum.replace(".", "");
        if (tempNum.length < 16) {
            currentNum = `${currentNum}${num}`;
        }
    }
    mainDisplay.innerHTML = formatNumber(currentNum);
}

// switches between positive and negative of numbered entered
const switchNegativePositive = () => {
    // checks if a calculation has been done, stops user changing value of answer
    if (upperDisplay.innerHTML.indexOf("=") === -1) {
        // checks if value is positive
        if (currentNum.indexOf("-") === -1) {
            currentNum = `-${currentNum}`;
        // else value must be negative
        } else {
            currentNum = currentNum.slice(1, currentNum.length);
        }
        mainDisplay.innerHTML = formatNumber(currentNum);
    }
}

// deletes last number from string
const deleteNumber = () => {
    currentNum = currentNum.length > 1 ? currentNum.slice(0, -1) : "0";
    mainDisplay.innerHTML = formatNumber(currentNum);
}

const useOperator = (newOperator) => {
    // updates display and operator after calculation 
    const updateOperator = () => {
        upperDisplay.innerHTML = `${formatNumber(total.toString())} ${newOperator}`;
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
        upperDisplay.innerHTML = `${formatNumber(total.toString())} ${operator} ${formatNumber(currentNum)} =`;
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
        mainDisplay.innerHTML = formatNumber(total.toString());
        operator = undefined;
        currentNum = total.toString();
    }
}

const percentOperator = () => {
    // percent button only works if the operator variable contains an operand
    if (operator !== undefined) {
        upperDisplay.innerHTML = `${formatNumber(total.toString())} ${operator} ${formatNumber(currentNum)}% =`;
        switch (operator) {
            case "+":
                total *= 1 + (parseFloat(currentNum) / 100);
                break;
            case "-":
                total *= 1 - (parseFloat(currentNum) / 100);
                break;
            case "x":
                total *= parseFloat(currentNum) / 100;
                break;
            case "&#247":
                total /= parseFloat(currentNum) / 100;
                break;
            default:
                break;
        }
        mainDisplay.innerHTML = formatNumber(total.toString());
        operator = undefined;
        currentNum = total.toString();
    }
}

const specialOperator = (newOperator) => {
    if (parseFloat(currentNum) !== 0) {
        switch (newOperator) {
            case "root":
                total = Math.sqrt(parseFloat(currentNum));
                upperDisplay.innerHTML = `<sup>2</sup>&#8730<span style="text-decoration: overline;"> ${formatNumber(currentNum)}</span> =`;
                break;
            case "power":
                total = parseFloat(currentNum) * parseFloat(currentNum);
                upperDisplay.innerHTML = `${formatNumber(currentNum)}<sup>2</sup> =`;
                break;
            case "fraction":
                total = 1 / parseFloat(currentNum);
                upperDisplay.innerHTML = `<sup>1</sup>/<sub>${formatNumber(currentNum)}</sub> =`;
                break;
            default:
                break;
        }
        mainDisplay.innerHTML = formatNumber(total.toString());
        operator = undefined;
        currentNum = total.toString();
    }
}
