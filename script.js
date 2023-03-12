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
        selectFunction(event.target.id);
    }
});


// selects relevant function based on input
const selectFunction = id => {
    switch (id) {
        // Clear calc
        case "keypad-C":
            clearCalc();
            break;
        // Clear entry
        case "keypad-CE":
            clearDisplay();
            break;
        // Number 0
        case "0":
            addToNumber("0");
            break;
        case "keypad-0":
            addToNumber("0");
            break;
        // Number 1
        case "1":
            addToNumber("1");
            break;
        case "keypad-1":
            addToNumber("1");
            break;
        // Number 2
        case "2":
            addToNumber("2");
            break;
        case "keypad-2":
            addToNumber("2");
            break;
        // Number 3
        case "3":
            addToNumber("3");
            break;
        case "keypad-3":
            addToNumber("3");
            break;
        // Number 4
        case "4":
            addToNumber("4");
            break;
        case "keypad-4":
            addToNumber("4");
            break;
        // Number 5
        case "5":
            addToNumber("5");
            break;
        case "keypad-5":
            addToNumber("5");
            break;
        // Number 6
        case "6":
            addToNumber("6");
            break;
        case "keypad-6":
            addToNumber("6");
            break;
        // Number 7
        case "7":
            addToNumber("7");
            break;
        case "keypad-7":
            addToNumber("7");
            break;
        // Number 8
        case "8":
            addToNumber("8");
            break;
        case "keypad-8":
            addToNumber("8");
            break;
        // Number 9
        case "9":
            addToNumber("9");
            break;
        case "keypad-9":
            addToNumber("9");
            break;
        // Decimal Point
        case ".":
            addToNumber(".")
            break;
        case "keypad-.":
            addToNumber(".");
            break;
        // + Operand
        // - Operand
        // / Operand
        // * Operand
        // = Operand
        // Percentage
        // Fraction
        // Squared
        // Square Root
        // +/-
        // Delete
        case "Backspace":
            deleteNumber();
            break;
        case "keypad-delete":
            deleteNumber();
            break;
        // Memory
        //
        default:
            break;
    }
}

// Clears current calculation (C)
const clearCalc = () => {
    clearDisplay();
    total = 0;
    upperDisplay.innerHTML = "";
}

// Clears current number entered (CE)
const clearDisplay = () => {
    currentNum = "0";
    mainDisplay.innerHTML = currentNum;
}

// Add entered number to current number
const addToNumber = num => {
    if (num === ".") {
        if (currentNum.indexOf(".") === -1) {
            currentNum = `${currentNum}${num}`;
        }
    } else if (currentNum === "0") {
        currentNum = num;
    } else {
        currentNum = `${currentNum}${num}`;
    }

    mainDisplay.innerHTML = currentNum;
}

// deletes last number from string
const deleteNumber = () => {
    if (currentNum.length > 1) {
        currentNum = currentNum.slice(0, -1);
        mainDisplay.innerHTML = currentNum;
    } else {
        currentNum = "0";
        mainDisplay.innerHTML = currentNum;
    }
}

const useOperator = () => {
    switch (operator) {
        case "+":
            break;
        case "-":
            break;
        case "x":
            break;
        case "/":
            break;
        default:
            break;
    }
}