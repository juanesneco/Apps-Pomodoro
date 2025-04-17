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
        this.addTimeButton = document.getElementById('add-time');
        this.modeButtons = document.querySelectorAll('.mode-icon');
        this.currentTimeDisplay = document.getElementById('current-time');
        this.timeIcon = document.querySelector('.current-time i');
        
        // Set initial active mode
        this.activeMode = document.getElementById('standard');
        this.activeMode.classList.add('active');
        
        // Event Listeners
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
        this.addTimeButton.addEventListener('click', () => this.addTime());
        
        this.modeButtons.forEach(button => {
            button.addEventListener('click', () => this.handleModeChange(button));
        });
        
        // Update current time every second
        this.updateCurrentTime();
        setInterval(() => this.updateCurrentTime(), 1000);
        
        this.updateDisplay();
    }
    
    updateCurrentTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        
        // Update time display
        this.currentTimeDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        
        // Update sun/moon icon
        if (hours >= 6 && hours < 18) {
            this.timeIcon.className = 'fas fa-sun';
        } else {
            this.timeIcon.className = 'fas fa-moon';
        }
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.addTimeButton.classList.remove('disabled');
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
            this.addTimeButton.classList.add('disabled');
            clearInterval(this.timerId);
        }
    }
    
    reset() {
        this.pause();
        this.addTimeButton.classList.add('disabled');
        this.timeLeft = parseInt(this.activeMode.dataset.time) * 60;
        this.updateDisplay();
    }
    
    addTime() {
        if (this.isRunning) {
            this.timeLeft += 5 * 60; // Add 5 minutes
            this.updateDisplay();
        }
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