class Calculator {
    constructor(recentTextElement, currentTextElement) {
        this.recentTextElement = recentTextElement
        this.currentTextElement = currentTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.recentOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        
        if (this.recentOperand != '') {
            this.compute()
        }
        this.operation = operation
        this.recentOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let result
        const prev = parseFloat(this.recentOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                result = prev + current
                break
            case '-':
                result = prev - current
                break
            case '/':
                if(current === 0) {
                    this.operation = undefined
                    this.recentOperand = ''
                    return this.currentOperand = 'ERROR'
                }
                result = prev / current
                break
            case 'x':
                result = prev * current
                break
            case '%':
                result = prev / 100 * current
                break
            default:
                return
        }
        this.currentOperand = result
        this.operation = undefined
        this.recentOperand = ''
    }

    updateDisplay() {
        this.currentTextElement.innerText = this.currentOperand
        if (this.operation != null) {
            this.recentTextElement.innerText = 
            `${this.recentOperand} ${this.operation}`
        }else {
            this.recentTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const allClearButton = document.querySelector('[data-all-clear]')
const recentTextElement = document.querySelector('[data-recent]')
const currentTextElement = document.querySelector('[data-current]')

const calculator = new Calculator(recentTextElement, currentTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})