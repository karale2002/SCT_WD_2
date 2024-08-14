let startTime = 0;
let updatedTime = 0;
let difference = 0;
let interval = null;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function startStopwatch() {
    if (!running) {
        startTime = Date.now() - difference;
        interval = setInterval(updateDisplay, 10);
        startPauseBtn.textContent = 'Pause';
        resetBtn.disabled = false;
        lapBtn.disabled = false;
        running = true;
    } else {
        clearInterval(interval);
        startPauseBtn.textContent = 'Start';
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(interval);
    running = false;
    difference = 0;
    lapCounter = 0;
    display.textContent = '00:00:00.00';
    lapsContainer.innerHTML = '';
    startPauseBtn.textContent = 'Start';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
}

function updateDisplay() {
    updatedTime = Date.now();
    difference = updatedTime - startTime;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.textContent = 
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
        (seconds > 9 ? seconds : "0" + seconds) + "." +
        (milliseconds > 9 ? milliseconds : "0" + milliseconds);
}

function recordLap() {
    lapCounter++;
    const lapTime = display.textContent;
    const lapRecord = document.createElement('div');
    lapRecord.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapsContainer.appendChild(lapRecord);
}

startPauseBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);