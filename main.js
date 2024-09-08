// Store values and operator
let displayVal = '0';
let firstNum = null;
let secondNum = null;
let currentOperator = null;
let decimalAdded = false; // Track if a decimal point has been added


// Basic functions for each operators
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Cannot divide by zero!";
    }
    return a / b;
}

// Operate Function
function operate(operator, firstNum, secondNum) {
    switch (operator) {
        case '+':
            return add(firstNum, secondNum);
        case '-':
            return subtract(firstNum, secondNum);
        case '*':
            return multiply(firstNum, secondNum);
        case '/':
            return divide(firstNum, secondNum);
        default:
            return "Invalid operator!";
    }
}

// Function to round the result
function roundResult(result) {
    if (typeof result === 'number') {
        return parseFloat(result.toFixed(10)); // Adjust precision as needed
    }
    return result;
}

// Get display element
const display = document.getElementById("display");

// Function to update display
function updateDisplay() {
    display.textContent = displayVal;
}

// Function to handle number button clicks
function handleNumberClick(event) {
    const clickedNumber = event.target.textContent;

    // If displayVal is '0' or a new number input, replace it with the clicked number
    if (displayVal === '0' || displayVal === '0.' || decimalAdded && clickedNumber === '.') {
        displayVal = clickedNumber;
    } else {
        // Append the clicked number to the current display value
        displayVal += clickedNumber;
    }

    // Update the display to show the new value
    updateDisplay();
}

// Function to handle decimal button clicks
function handleDecimalClick() {
    // Only add a decimal point if one hasn't been added yet
    if (!decimalAdded) {
        displayVal += '.';
        decimalAdded = true;
        updateDisplay();
    }
}

// Function to handle backspace button clicks
function handleBackspaceClick() {
    // Remove the last character from the displayVal
    displayVal = displayVal.slice(0, -1) || '0'; // Default to '0' if empty
    if (displayVal.includes('.')) {
        decimalAdded = true;
    } else {
        decimalAdded = false;
    }
    updateDisplay();
}

function handleOperatorClick(event) {
    const operator = event.target.textContent;

    if (currentOperator) {
        // If an operator is already set, evaluate the current operation
        if (firstNum === null || displayVal === '') {
            // Incomplete operation, do nothing
            return;
        }
        secondNum = parseFloat(displayVal);
        firstNum = roundResult(operate(currentOperator, firstNum, secondNum));
        displayVal = firstNum.toString();
        updateDisplay();
    } else {
        firstNum = parseFloat(displayVal);
    }

    // Store the operator and reset displayVal for next number
    currentOperator = operator;
    displayVal = '0';
    decimalAdded = false; // Reset decimal flag for new number
}

// Function to handle the equals button
function handleEqualsClick() {
    if (currentOperator && firstNum !== null && displayVal !== '') {
        secondNum = parseFloat(displayVal);
        const result = operate(currentOperator, firstNum, secondNum);
        displayVal = roundResult(result).toString();
        currentOperator = null; // Reset operator after calculation
        decimalAdded = displayVal.includes('.'); // Update decimal flag based on result
        updateDisplay();
    }
}

// Function to clear the display
function clearDisplay() {
    displayVal = '0';
    firstNum = null;
    secondNum = null;
    currentOperator = null;
    decimalAdded = false; // Reset decimal flag
    updateDisplay();
}

// Add event listeners to the number buttons
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', handleNumberClick);
});

// Add event listener to decimal button
const decimalButton = document.querySelector('.number:nth-child(11)'); // Adjust selector as needed
decimalButton.addEventListener('click', handleDecimalClick);

// Add event listener to backspace button
const backspaceButton = document.querySelector('.backspace');
backspaceButton.addEventListener('click', handleBackspaceClick);

// Add event listeners to operator buttons
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', handleOperatorClick);
});

// Add event listener to the equals button
const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', handleEqualsClick);

// Add event listener to the clear button
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clearDisplay);

// Handle keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;

    // Prevent default action for Enter key
    if (key === 'Enter') {
        event.preventDefault();
        handleEqualsClick();
    } else if (!isNaN(key)) {
        // Handle number keys
        handleNumberClick({ target: { textContent: key } });
    } else if (key === '.') {
        handleDecimalClick();
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperatorClick({ target: { textContent: key } });
    } else if (key === 'Backspace') {
        handleBackspaceClick();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

// Initial update to set the display
updateDisplay();

