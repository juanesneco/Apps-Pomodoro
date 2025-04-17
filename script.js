class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.timerId = null;
        this.isRunning = false;
        
        // DOM Elements
        this.timeDisplay = document.querySelector('.time-display');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.modeInputs = document.querySelectorAll('input[name="timer-mode"]');
        
        // Event Listeners
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
        
        this.modeInputs.forEach(input => {
            input.addEventListener('change', () => this.handleModeChange(input));
        });
        
        this.updateDisplay();
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft <= 0) {
                    this.reset();
                    // You could add a notification sound here
                }
            }, 1000);
        }
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.timerId);
        }
    }
    
    reset() {
        this.pause();
        const activeMode = document.querySelector('input[name="timer-mode"]:checked');
        this.timeLeft = parseInt(activeMode.value) * 60;
        this.updateDisplay();
    }
    
    handleModeChange(input) {
        if (this.isRunning) {
            if (confirm('Timer is running. Do you want to stop the current timer and switch modes?')) {
                this.pause();
                this.timeLeft = parseInt(input.value) * 60;
                this.updateDisplay();
            } else {
                // Revert the radio button selection
                const previousMode = document.querySelector('input[name="timer-mode"]:checked');
                previousMode.checked = true;
            }
        } else {
            this.timeLeft = parseInt(input.value) * 60;
            this.updateDisplay();
        }
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 