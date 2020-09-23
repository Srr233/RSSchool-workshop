"Use strict"
class Calculator {
    constructor(previousOperand, currentOperand) {
        this.previousOperand = previousOperand;
        this.currentOperand = currentOperand;
    }

    clear () {
        
    }
    deleteNumber () {

    }
    addNumber(number) {

    }
    addOperation (operation) {

    }
    compute (operand) {

    }
    updateOperand () {

    }
}

const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const deleteButton = document.querySelector("[data-delete]");
const previousOperand = document.querySelector("[data-previous-operand]");
const currentOperand = document.querySelector("[data-current-operand]");
const allClearButton = document.querySelector("[data-all-clear]");
const equalsButton = document.querySelector("[data-equals]");