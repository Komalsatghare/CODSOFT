// Create click sound
const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3');

class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number;
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('Cannot divide by zero!');
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '0';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }
}

const calculator = new Calculator(
    document.querySelector('.previous-operand'),
    document.querySelector('.current-operand')
);

// Theme toggle functionality
document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("dark-mode");
    const themeToggle = document.getElementById("themeToggle");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
};

// Function to play click sound
function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(error => console.log("Audio play failed:", error));
}

// Function to handle button clicks
function handleButtonClick(button) {
    playClickSound();
    if (button.classList.contains('number')) {
        calculator.appendNumber(button.innerText);
    } else if (button.classList.contains('operator')) {
        calculator.chooseOperation(button.innerText);
    } else if (button.classList.contains('equals')) {
        calculator.compute();
    } else if (button.classList.contains('clear')) {
        calculator.clear();
    } else if (button.classList.contains('delete')) {
        calculator.delete();
    }
    calculator.updateDisplay();
}

// Add click event listeners to all buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button));
});

// Keyboard support
document.addEventListener('keydown', function(event) {
    playClickSound();
    
    if (/[0-9]/.test(event.key)) {
        calculator.appendNumber(event.key);
    } else if (event.key === '.') {
        calculator.appendNumber('.');
    } else if (event.key === '+') {
        calculator.chooseOperation('+');
    } else if (event.key === '-') {
        calculator.chooseOperation('-');
    } else if (event.key === '*') {
        calculator.chooseOperation('×');
    } else if (event.key === '/') {
        event.preventDefault();
        calculator.chooseOperation('÷');
    } else if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculator.compute();
    } else if (event.key === 'Backspace') {
        calculator.delete();
    } else if (event.key === 'Escape') {
        calculator.clear();
    }
    
    calculator.updateDisplay();
}); 