//Custom sleep function
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

let isSnowfallEnabled = false; // Set to true to enable snowfall, false to disable

// Function to create a snowflake at specified coordinates
function createSnowflake(x, y) {
    if (!isSnowfallEnabled) return; // Exit if snowfall is disabled

    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.style.left = `${x}px`;
    snowflake.style.top = `${y}px`;

    // Add random size and speed for variety
    const size = Math.random() * 5 + 4;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.animationDuration = `${Math.random() * 7 + 2}s`;

    // Generate a random color
    const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    snowflake.style.backgroundColor = randomColor;

    document.body.appendChild(snowflake);

    // Remove the snowflake after it falls
    setTimeout(() => {
        snowflake.remove();
    }, 3000);
}

// Create snowflakes on mouse movement
document.addEventListener("mousemove", (event) => {
    createSnowflake(event.clientX, event.clientY);
});

// Track touch events for mobile devices
let isTouching = false; // Flag to track if the user is touching the screen

document.addEventListener("touchstart", (event) => {
    isTouching = true; // Set the flag to true when touch starts
    const touch = event.touches[0];
    createSnowflake(touch.clientX, touch.clientY); // Create snowflake at the touch point
});

document.addEventListener("touchmove", (event) => {
    if (isTouching) {
        const touch = event.touches[0];
        createSnowflake(touch.clientX, touch.clientY); // Create snowflake as the finger moves
    }
});

document.addEventListener("touchend", () => {
    isTouching = false; // Reset the flag when touch ends
});

// Function to toggle snowfall on and off
function toggleSnowfall() {
    isSnowfallEnabled = !isSnowfallEnabled; // Toggle the variable
    const button = document.getElementById('snowflakeButton');
    const img = button.querySelector('img');
    img.style.animation = isSnowfallEnabled ? "rotate 5s linear infinite" : "none"; // Start or stop animation
}

let colorChangeInterval = 500; // Initial interval for color changes
let textFlashToggle = false; // Toggle for black and white text
let offset = 0; // Offset for color cycling

// Function to scroll colors in the title
async function scrollColors() {
    const titleElement = document.getElementById('titleMainPage');

    const text = titleElement.textContent; // Get the original text
    const coloredText = text.split('').map((char, index) => {
        return `<span>${char}</span>`;
    }).join('');

    titleElement.innerHTML = coloredText; // Set the innerHTML to the colored text

    const spans = titleElement.querySelectorAll('span');
    // const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#7FFF00', '#00FF00', '#00FFFF'];  // 6 different colors
    // const colors = ['#FF0000', '#7F7F00', '#00FF00', '#007F7F', '#0000FF', '#7F007F'];  // 6 different colors
    const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#7FFF00', '#00FF00', '#00FF7F', '#00FFFF', '#007FFF', '#0000FF', '#7F00FF', '#FF00FF', '#FF007F']; // Different colors

    // Change colors
    while (1) {
        if (textFlashToggle) {
            for (let count = 0; count < 12; count++) {
                spans.forEach((span, index) => {
                    // Alternate colors based on index and count
                    let color = (count % 2 === 0) ? (index % 2 === 0 ? 'black' : 'white') : (index % 2 === 0 ? 'white' : 'black');
                    span.style.color = color; // Update the color of the existing span
                });
                await sleep(250);
            }

            colorChangeInterval = 500; // Reset interval
            textFlashToggle = false; // Reset toggle
        } else {
            spans.forEach((span, index) => {
                offset = (offset + 1) % colors.length; // Update offset for cycling colors
                const color = colors[(index + offset) % colors.length]; // Get color based on index and offset
                span.style.color = color; // Update the color of the existing span
            });

            await sleep(colorChangeInterval);
        }
    }
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', scrollColors);

// Defines the particle number for fireworks
const numFireworkParticles = 20;

// Function to create a particle for fireworks effect
function createParticle(x, y) {
    const snowflakeFireworkParticle = document.createElement("div");

    snowflakeFireworkParticle.className = "snowflake";
    snowflakeFireworkParticle.style.left = `${x}px`;
    snowflakeFireworkParticle.style.top = `${y}px`;

    // Add random size for variety
    const size = Math.random() * 10 + 4;
    snowflakeFireworkParticle.style.width = `${size}px`;
    snowflakeFireworkParticle.style.height = `${size}px`;

    // Generate a random color
    const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    snowflakeFireworkParticle.style.backgroundColor = randomColor;

    document.body.appendChild(snowflakeFireworkParticle);

    // Define initial velocity components (vx, vy)
    const initialVelocityX = (Math.random() - 0.5) * 200; // Random horizontal velocity
    const initialVelocityY = (Math.random() - 0.5) * 200; // Random vertical velocity
    const gravity = -100; // Acceleration due to gravity in pixels per second squared
    const duration = 1000; // Total animation duration in milliseconds

    // Calculate the final position using the gravity formula
    const finalY = y + initialVelocityY * (duration / 1000) - 0.5 * gravity * Math.pow(duration / 1000, 2);
    const finalX = x + initialVelocityX * (duration / 1000); // Calculate final horizontal position

    // Animate the particle
    const animation = snowflakeFireworkParticle.animate(
        [
            { transform: `translate(0, 0)`, opacity: 1 },
            { transform: `translate(${finalX - x}px, ${finalY - y}px)`, opacity: 0 }
        ],
        {
            duration: duration,
            easing: 'ease-out'
        }
    );

    // Remove the particle at the end of animation
    animation.finished.then(() => snowflakeFireworkParticle.remove());
}

// Add click event listener to the title for fireworks effect
document.addEventListener('DOMContentLoaded', function() {
    let titleMainPage = document.getElementById('titleMainPage');

    titleMainPage.addEventListener('click', function() {
        if(textFlashToggle) {
            console.log("L-L-L-Lava, Ch-Ch-Ch-Chicken!");
            return;
        }

        // Adjust color change interval based on clicks
        if (colorChangeInterval > 100) {
            colorChangeInterval -= 100;
        } else if (colorChangeInterval > 50) {
            colorChangeInterval = 50;
        } else if (colorChangeInterval > 20) {
            colorChangeInterval = 20;
        } else if (colorChangeInterval === 20) {
            textFlashToggle = true; // Reset to longer interval
            const rect = titleMainPage.getBoundingClientRect(); // Get the position of the title

            const delay = 300; // Delay in milliseconds for fireworks
            const numSets = 8; // Specify how many times to call the loop
            let currentSet = 0; // Track the current set

            // Define the grid for fireworks positions
            const gridX = [0.25, 0.375, 0.5, 0.625, 0.75]; // X factors
            const gridY = [-1, -0.5, 0, 0.5, 1]; // Y factors
            let lastXIndex = -1; // Track last used X index
            let lastYIndex = -1; // Track last used Y index

            // Function to create fireworks
            function createFireworks() {
                if (currentSet < numSets) {
                    let xIndex, yIndex;

                    // Ensure new indices are not the same as the last used ones
                    do {
                        xIndex = Math.floor(Math.random() * gridX.length);
                        yIndex = Math.floor(Math.random() * gridY.length);
                    } while (
                        (lastXIndex !== -1 && lastYIndex !== -1) &&
                        (Math.abs(gridX[xIndex] - gridX[lastXIndex]) + Math.abs(gridY[yIndex] - gridY[lastYIndex]) < 1) // Manhattan distance check
                    );

                    lastXIndex = xIndex; // Update last used X index
                    lastYIndex = yIndex; // Update last used Y index

                    const x = rect.left + rect.width * gridX[xIndex]; // Calculate x using selected grid factor
                    const y = rect.top + rect.height * gridY[yIndex]; // Calculate y using selected grid factor

                    // Create multiple particles for the fireworks effect
                    for (let j = 0; j < numFireworkParticles; j++) {
                        createParticle(x, y);
                    }

                    currentSet++; // Move to the next set
                    setTimeout(createFireworks, delay); // Call the function again after the delay
                }
            }

            createFireworks(); // Start the fireworks
        }
    });
});
