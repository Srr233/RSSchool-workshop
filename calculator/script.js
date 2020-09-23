"Use strict"
class Calculator {
    constructor(previousOperand, currentOperand) {
        this.previousOperandText = previousOperand;
        this.currentOperandText = currentOperand;
        this.clear();
    }

    clear () {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operand = undefined;
    }
    deleteNumber () {
        this.currentOperand = this.currentOperand.slice(0, this.currentOperand.length - 1);
    }
    addNumber(number) {
        if (number !== '.') {
            this.currentOperand += number;
        } else if (!this.currentOperand.includes('.') && this.currentOperand !== "" && !this.currentOperand.includes("√")) {
            this.currentOperand += '.';
        } else if (!this.currentOperand.includes('.') && this.currentOperand.length > 1 && this.currentOperand.includes("√")) {
            this.currentOperand += '.';
        }
    }
    addOperation (operation) {
        if (this.currentOperand && this.previousOperand) {
            this.compute();
        }
        if (this.currentOperand !== "" && !this.currentOperand.includes("√") && operation !== "√") {
            this.previousOperand = `${this.currentOperand} ${operation}`;
            this.currentOperand = '';
        } else if (operation === "-" && !this.currentOperand.includes("√")){
            this.currentOperand = "-";
        } else if (this.currentOperand === "" && operation === "√") {
            this.currentOperand = "√";
        } else if (this.currentOperand.includes("√") && operation !== "√" && this.currentOperand.length !== 1) {
            const num = +this.currentOperand.slice(1);
            this.compute(num, operation);
        } 
    }
    compute (sqrt, operator) {
        if (this.currentOperand && this.previousOperand) {
            const operation = this.previousOperand[this.previousOperand.length-1];
            const current = +this.currentOperand;
            const previous = +this.previousOperand.slice(0, this.previousOperand.length - 2);
            let result = '';
            switch (operation) {
                case "+":
                    result = `${previous + current}`;
                    this.previousOperand = "";
                    break;
                case "-":
                    result = `${previous - current}`;
                    this.previousOperand = "";
                    break;
                case "*":
                    result = `${previous * current}`;
                    this.previousOperand = "";
                    break;
                case "÷":
                    result = `${previous / current}`;
                    this.previousOperand = "";
                    break;
                case "^":
                    result = `${previous ** current}`;
                    this.previousOperand = "";
                    break;
            }

            if (result.includes(".")) {
                this.currentOperand = Number(result).toFixed(2);
            } else this.currentOperand = result;
        } else if (sqrt || this.currentOperand.includes("√") && this.currentOperand.length > 1) {
            if (sqrt) {
                this.previousOperand = `${Math.sqrt(sqrt).toFixed(2)} ${operator}`;
                this.currentOperand = "";
            } else {
                this.currentOperand = `${Math.sqrt(this.currentOperand.slice(1)).toFixed(2)}`;
            }
        }
    }
    updateDisplay () {
            this.currentOperandText.innerText = this.currentOperand;
            this.previousOperandText.innerText = this.previousOperand;
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
    button.addEventListener("click", () => {
        calculator.addNumber(button.innerText);
        calculator.updateDisplay();
    });
});
operationButton.forEach(button => {
    button.addEventListener("click", () => {
        calculator.addOperation(button.innerText);
        calculator.updateDisplay();
    });
})
deleteButton.addEventListener("click", () => {
    calculator.deleteNumber();
    calculator.updateDisplay();
});
allClearButton.addEventListener("click", () => {
        calculator.clear();
        calculator.updateDisplay();
});
equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});

