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
        }
    }
    addOperation (operation) {
        if (this.currentOperand !== "" && !this.currentOperand.includes("√")) {
            this.previousOperand = `${this.currentOperand} ${operation}`;
            this.currentOperand = '';
        } else if (operation === "-" && !this.currentOperand.includes("√")){
            this.currentOperand = "- ";
        } else if (this.currentOperand === "" && operation === "√") {
            this.currentOperand = "√";
        } else if (this.currentOperand.includes("√") && this.currentOperand.length !== 1) {
            const num = +this.currentOperand.slice(1);
            this.compute(num);
        }
    }
    compute (sqrt) {
        if (this.currentOperand && this.previousOperand) {
            const operation = this.previousOperand[this.previousOperand.length-1];
            if (this.currentOperand.includes("-")) {}
            const current = +this.currentOperand;
            const previous = +this.previousOperand.slice(0, this.previousOperand.length - 2)
            switch (operation) {
                case "+":
                    this.currentOperand = `${previous + current}`;
                    this.previousOperand = "";
                    break;
                case "-":
                    this.currentOperand = `${previous - current}`;
                    this.previousOperand = "";
                    break;
                case "*":
                    this.currentOperand = `${previous * current}`;
                    this.previousOperand = "";
                    break;
                case "÷":
                    this.currentOperand = `${previous / current}`;
                    this.previousOperand = "";
                    break;
                case "^":
                    this.currentOperand = `${previous ** current}`;
                    this.previousOperand = "";
                    break;
            } 
        } else if (sqrt || this.currentOperand.includes("√") && this.currentOperand.length > 1) {
            if (sqrt) {
                this.previousOperand = `${Math.sqrt(sqrt)}`;
                this.currentOperand = "";
            } else {
                this.currentOperand = `${Math.sqrt(this.currentOperand.slice(1))}`;
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

