"Use strict"
class Calculator {
    constructor(previousOperand, currentOperand) {
        this.previousOperand = previousOperand;
        this.currentOperand = currentOperand;
        this.clear();
    }

    clear () {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operand = undefined;
    }
    deleteNumber () {

    }
    addNumber(number) {

    }
    addOperation (operation) {

    }
    compute (operand) {

    }
    updateDisplay () {

    }
}

const previousOperand = document.querySelector("[data-previous-operand]");
const currentOperand = document.querySelector("[data-current-operand]");
const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const equalsButton = document.querySelector("[data-equals]");

const calculator = new Calculator (previousOperand, currentOperand);

numberButton.forEach(button => {
    button.addEventListener("click", calculator.addNumber);
});
operationButton.forEach(button => {
    button.addEventListener("click", calculator.addOperation);
})
deleteButton.addEventListener("click", calculator.deleteNumber);
allClearButton.addEventListener("click", calculator.clear);
equalsButton.addEventListener("click", calculator.compute);

