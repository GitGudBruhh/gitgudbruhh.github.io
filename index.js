let isSnowfallEnabled = true; // Set to true to enable snowfall, false to disable

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

document.addEventListener("mousemove", (event) => {
    createSnowflake(event.clientX, event.clientY);
});

let isTouching = false; // Flag to track if the user is touching the screen

document.addEventListener("touchstart", (event) => {
    isTouching = true; // Set the flag to true when touch starts
    const touch = event.touches[0];
    createSnowflake(touch.clientX, touch.clientY); // Create firework at the touch point
});

document.addEventListener("touchmove", (event) => {
    if (isTouching) {
        const touch = event.touches[0];
        createSnowflake(touch.clientX, touch.clientY); // Create firework as the finger moves
    }
});

document.addEventListener("touchend", () => {
    isTouching = false; // Reset the flag when touch ends
});





function toggleSnowfall() {
    isSnowfallEnabled = !isSnowfallEnabled; // Toggle the variable
    const button = document.getElementById('snowflakeButton');
    const img = button.querySelector('img');
    if (isSnowfallEnabled) {
        img.style.animation = "rotate 5s linear infinite"; // Stop animation
    } else {
        img.style.animation = "none"; // Start animation
    }
}


let colorChangeInterval = 500;
let offset = 0;

function scrollColors() {
    const element = document.getElementById('titleMainPage');
    const text = element.textContent; // Get the original text
    const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#7FFF00', '#00FF00', '#00FF7F', '#00FFFF', '#007FFF', '#0000FF', '#7F00FF', '#FF00FF', '#FF007F'];  // different colors
    // const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#7FFF00', '#00FF00', '#00FFFF'];  // 6 different colors
    // const colors = ['#FF0000', '#7F7F00', '#00FF00', '#007F7F', '#0000FF', '#7F007F'];  // 6 different colors

    function changeColors() {
        if (colorChangeInterval === 20000) {
            for (let count = 0; count < 12; count++) {
                setTimeout(() => {
                    let flashingText = text.split('').map((char, index) => {
                    let color;
                    if (count % 2 === 0) { // Check if count is even
                        if (index % 2 === 0) { // Check if index is even
                            color = 'black'; // Set color to black for even index
                        } else {
                            color = 'white'; // Set color to white for odd index
                        }
                    } else { // If count is odd
                        if (index % 2 === 0) { // Check if index is even
                            color = 'white'; // Set color to white for even index
                        } else {
                            color = 'black'; // Set color to black for odd index
                        }
                    }

                    return `<span style="color: ${color};">${char}</span>`;
                    }).join('');
                    element.innerHTML = flashingText; // Update the element with the new colored text
                }, count * 250); // Delay for each iteration
            }

            colorChangeInterval = 500;
            setTimeout(changeColors, 6 * 500);
        } else {
            const coloredText = text.split('').map((char, index) => {
                offset = (offset + 1) % colors.length;
                const color = colors[(index + offset) % colors.length];
                return `<span style="color: ${color};">${char}</span>`;
            }).join('');

            element.innerHTML = coloredText; // Set the innerHTML to the colored text
            setTimeout(changeColors, colorChangeInterval); // Call changeColors again after the current interval
        }
    }

    changeColors(); // Start the color changing process
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', scrollColors);


// Defines the particle number
const numFireworkParticles = 50;

function createParticle(x, y) {
    const snowflakeFireworkParticle = document.createElement("div");

    snowflakeFireworkParticle.className = "snowflake";
    snowflakeFireworkParticle.style.left = `${x}px`;
    snowflakeFireworkParticle.style.top = `${y}px`;

    // Add random size for variety
    const size = Math.random() * 5 + 4;
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

document.addEventListener('DOMContentLoaded', function() {
    let titleMainPage = document.getElementById('titleMainPage');

    titleMainPage.addEventListener('click', function() {
        if (colorChangeInterval > 100) {
            colorChangeInterval -= 100;
        } else if (colorChangeInterval > 50) {
            colorChangeInterval = 50;
        } else if (colorChangeInterval > 20) {
            colorChangeInterval = 20;
        } else if (colorChangeInterval === 20) {
            colorChangeInterval = 20000;
            const rect = titleMainPage.getBoundingClientRect();

            const delay = 300; // Delay in milliseconds
            const numSets = 8; // Specify how many times to call the loop
            let currentSet = 0; // Track the current set

            // Define the grid
            const gridX = [0.25, 0.375, 0.5, 0.625, 0.75]; // X factors
            const gridY = [-1, -0.5, 0, 0.5, 1]; // Y factors
            let lastXIndex = -1;
            let lastYIndex = -1;

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
