(function() {
    var shouldHandleKeyDown = true;
    var heart1 = document.getElementById('heart');
    var heart2 = document.getElementById('myheart');
    var congrats = document.getElementById("congrats");
    var thisTimer = document.getElementById("timer");
    var instructions = document.getElementById("instructions")

    var startTime = null; // To track the start time
    var interval = null; // For continuously updating the timer

    // Get the viewport width
    var screenWidth = window.innerWidth;
    var centerX = screenWidth / 2 - 50; // Center X position

    // Set initial positions
    let posX1 = 0;  // Heart 1 starts from the left
    let posX2 = screenWidth - 100; // Heart 2 starts from the right

    // Set both hearts at the same Y level
    heart1.style.position = "absolute";
    heart1.style.left = posX1 + "px";
    heart1.style.top = "50%"; // Center vertically

    heart2.style.position = "absolute";
    heart2.style.left = posX2 + "px";
    heart2.style.top = "50%"; // Center vertically

    document.onkeydown = function(event) {
        if (event.key === " ") {  
            if (!shouldHandleKeyDown) return;
            shouldHandleKeyDown = false;

            // Start the timer only on the first press
            if (startTime === null) {
                startTime = new Date().getTime();
                interval = setInterval(updateTimer, 10); // Update every 10ms for a smooth experience
            }

            // Move Heart 1 → Right
            if (posX1 < centerX) {
                posX1 += 10;
                heart1.style.left = posX1 + "px";
            }

            // Move Heart 2 ← Left
            if (posX2 > centerX) {
                posX2 -= 10;
                heart2.style.left = posX2 + "px";
            }

            // Check if hearts have met
            if (posX1 >= centerX && posX2 <= centerX) {
                clearInterval(interval); // Stop updating the timer
                congrats.innerHTML = "YAY! The hearts have met! ❤️";
                instructions.innerHTML = "Play again?"
                
            }
        }
    };

    document.onkeyup = function(event) {
        if (event.key === " ") {  
            shouldHandleKeyDown = true;
        }
    };

    function updateTimer() {
        if (startTime !== null) {
            let currentTime = new Date().getTime();
            let timeElapsed = (currentTime - startTime) / 1000; // Convert to seconds
            thisTimer.innerHTML = `Time: ${timeElapsed.toFixed(2)} seconds`;
        }
    }

})();