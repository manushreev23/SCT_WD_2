let startTime = 0, updatedTime = 0, difference = 0, tInterval;
let running = false;
let lapTimes = [];

const timeDisplay = document.getElementById("time");
const startStopButton = document.getElementById("startStopButton");
const resetButton = document.getElementById("resetButton");
const lapButton = document.getElementById("lapButton");
const lapList = document.getElementById("lapList");

function startStop() {
  if (!running) {
    running = true;
    startTime = new Date().getTime() - difference; // Initialize startTime
    
//console.log("startTime"+startTime);

    tInterval = setInterval(updateTime, 1); // Update every 1 ms
    startStopButton.innerHTML = "Pause";
  } else {
    running = false;
    clearInterval(tInterval);
    startStopButton.innerHTML = "Resume";
  }
}

function updateTime() {
  updatedTime = new Date().getTime(); // Get current time
  //console.log("updatedTime"+updatedTime);
  difference = updatedTime - startTime; // Calculate the difference
  //console.log("difference=udptime-startTime"+difference);
  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Get hours
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)); // Get minutes
  let seconds = Math.floor((difference % (1000 * 60)) / 1000); // Get seconds
  timeDisplay.innerHTML = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds); // Format and display time
}

function formatTime(time) {
  if (time < 10) {
    return "0" + time;
  } else {
    return time;
  }
}

function reset() {
  running = false;
  clearInterval(tInterval);
  timeDisplay.innerHTML = "00:00:00"; // Reset the time display
  startStopButton.innerHTML = "Start"; // Reset button text
  lapList.innerHTML = ""; // Clear lap times
  lapTimes = []; // Reset lapTimes array
}

function recordLap() {
  if (running) {
    let lapTime = timeDisplay.innerHTML; // Get current time display
    lapTimes.push(lapTime); // Store the lap time
    let lapItem = document.createElement("li");
    lapItem.innerHTML = "Lap " + lapTimes.length + ": " + lapTime; // Display lap time
    lapList.appendChild(lapItem); // Add lap time to the list
  }
}
