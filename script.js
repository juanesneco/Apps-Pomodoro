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
        this.modeButtons = document.querySelectorAll('.mode-icon');
        
        // Set initial active mode
        this.activeMode = document.getElementById('standard');
        this.activeMode.classList.add('active');
        
        // Event Listeners
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
        
        this.modeButtons.forEach(button => {
            button.addEventListener('click', () => this.handleModeChange(button));
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
        this.timeLeft = parseInt(this.activeMode.dataset.time) * 60;
        this.updateDisplay();
    }
    
    handleModeChange(button) {
        if (this.isRunning) {
            if (confirm('Timer is running. Do you want to stop the current timer and switch modes?')) {
                this.pause();
                this.switchMode(button);
            }
        } else {
            this.switchMode(button);
        }
    }
    
    switchMode(button) {
        this.activeMode.classList.remove('active');
        button.classList.add('active');
        this.activeMode = button;
        this.timeLeft = parseInt(button.dataset.time) * 60;
        this.updateDisplay();
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