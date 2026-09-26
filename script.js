const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");

let currentNumber = "";
let previousNumber = "";
let selectedOperator = null;
let shouldResetDisplay = false;

document.querySelectorAll("[data-number]").forEach(button => {
    button.addEventListener("click", () => {
        addNumber(button.dataset.number);
    });
});

document.querySelectorAll("[data-operator]").forEach(button => {
    button.addEventListener("click", () => {
        chooseOperator(button.dataset.operator);
    });
});

document.querySelector("[data-action='clear']").addEventListener("click", clearCalculator);

document.querySelector("[data-action='delete']").addEventListener("click", deleteNumber);

document.querySelector("[data-action='equals']").addEventListener("click", calculate);

function addNumber(number) {
    if (shouldResetDisplay) {
        currentNumber = "";
        shouldResetDisplay = false;
    }

    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    if (currentNumber === "" && number === ".") {
        currentNumber = "0.";
    } else {
        currentNumber += number;
    }

    updateDisplay();
}

function chooseOperator(operator) {
    if (currentNumber === "" && previousNumber === "") {
        return;
    }

    if (currentNumber === "" && previousNumber !== "") {
        selectedOperator = operator;
        updateDisplay();
        return;
    }

    if (previousNumber !== "" && selectedOperator !== null) {
        calculate();
    }

    previousNumber = currentNumber;
    selectedOperator = operator;
    currentNumber = "";
    shouldResetDisplay = false;

    updateDisplay();
}

function calculate() {
    if (previousNumber === "" || currentNumber === "" || selectedOperator === null) {
        return;
    }

    const firstNumber = parseFloat(previousNumber);
    const secondNumber = parseFloat(currentNumber);
    let result;

    if (selectedOperator === "+") {
        result = firstNumber + secondNumber;
    } else if (selectedOperator === "-") {
        result = firstNumber - secondNumber;
    } else if (selectedOperator === "*") {
        result = firstNumber * secondNumber;
    } else if (selectedOperator === "/") {
        if (secondNumber === 0) {
            currentNumber = "Cannot divide by 0";
            previousNumber = "";
            selectedOperator = null;
            shouldResetDisplay = true;
            updateDisplay();
            return;
        }

        result = firstNumber / secondNumber;
    }

    currentNumber = Number(result.toFixed(10)).toString();
    previousNumber = "";
    selectedOperator = null;
    shouldResetDisplay = true;

    updateDisplay();
}

function clearCalculator() {
    currentNumber = "";
    previousNumber = "";
    selectedOperator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteNumber() {
    if (shouldResetDisplay) {
        currentNumber = "";
        shouldResetDisplay = false;
    } else {
        currentNumber = currentNumber.slice(0, -1);
    }

    updateDisplay();
}

function updateDisplay() {
    currentDisplay.textContent = currentNumber || "0";

    if (previousNumber && selectedOperator) {
        previousDisplay.textContent = `${previousNumber} ${getOperatorSymbol(selectedOperator)}`;
    } else {
        previousDisplay.textContent = "";
    }
}

function getOperatorSymbol(operator) {
    if (operator === "*") return "×";
    if (operator === "/") return "÷";
    if (operator === "-") return "−";
    return "+";
}