class Calculator {
    constructor(previousOperator, currentOperator){
        this.previousOperator = previousOperator
        this.currentOperator = currentOperator
        this.clear()
    }
    clear(){
        this.previous = ""
        this.current = ""
        this.operation = undefined
    }

    delete(){
        this.current = this.current.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number === "." && this.current.includes(".")) return

        this.current = this.current.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.current === "")
        return
        if(this.previous !== ""){
            this.compute()
        }
        this.operation = operation
        this.previous = this.current
        this.current = ""
        }

    compute(){
        let computation
        const prev = parseFloat(this.previous)
        const current = parseFloat(this.current)
        if(isNaN(prev) || isNaN(current))
            return
        
        switch (this.operation){
        case '+': 
            computation = prev + current
            break
        case '-': 
            computation = prev - current
            break
        case '/': 
            computation = prev / current
            break
        case '*': 
            computation = prev * current
            break

            default: 
            return
        }

        this.current = computation
        this.previous = ""
        this.operation = undefined
    }

    updateDisplay(){
        this.currentOperator.innerText = this.current
        this.previousOperator.innerText = this.previous
    }
}

const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const previousOperator = document.querySelector("[data-previous-operator]")
const currentOperator = document.querySelector("[data-current-operator]")


const calculator = new Calculator(previousOperator, currentOperator)

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
}) 

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
}) 

equalsButton.addEventListener("click", button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", button =>{
    calculator.delete()
    calculator.updateDisplay()
})
