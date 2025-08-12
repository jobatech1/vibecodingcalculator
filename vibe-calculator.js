let display = document.getElementById('display');
let currentInput = '0';
let shouldResetDisplay = false;

function updateDisplay() {
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '0';
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '0';
        shouldResetDisplay = false;
    }
    
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else if (value === '.' && currentInput.includes('.')) {
        return;
    } else {
        currentInput += value;
    }
    
    updateDisplay();
}

function calculate() {
    try {
        let result = eval(currentInput.replace('×', '*').replace('÷', '/'));
        
        if (result === Infinity || isNaN(result)) {
            currentInput = 'Error';
        } else {
            currentInput = result.toString();
        }
        
        shouldResetDisplay = true;
    } catch (error) {
        currentInput = 'Error';
        shouldResetDisplay = true;
    }
    
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        if (key === '*') appendToDisplay('*');
        else if (key === '/') appendToDisplay('/');
        else appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    }
});

// Add some visual feedback for keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;
    let button;
    
    if (key >= '0' && key <= '9') {
        button = document.querySelector(`button[onclick*="${key}"]`);
    } else if (key === '.') {
        button = document.querySelector('button[onclick*="."]');
    } else if (key === '+') {
        button = document.querySelector('button[onclick*="+"]');
    } else if (key === '-') {
        button = document.querySelector('button[onclick*="-"]');
    } else if (key === '*') {
        button = document.querySelector('button[onclick*="*"]');
    } else if (key === '/') {
        button = document.querySelector('button[onclick*="/"]');
    } else if (key === 'Enter' || key === '=') {
        button = document.querySelector('button[onclick*="calculate"]');
    }
    
    if (button) {
        button.style.transform = 'translateY(2px)';
        setTimeout(() => {
            button.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Initialize
updateDisplay();
