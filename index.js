let isSnowfallEnabled = true; // Set to true to enable snowfall, false to disable

function createSnowflake(x, y) {
    if (!isSnowfallEnabled) return; // Exit if snowfall is disabled

    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.style.left = `${x}px`;
    snowflake.style.top = `${y}px`;

    // Add random size and speed for variety
    const size = Math.random() * 5 + 2;
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


function toggleSnowfall() {
    isSnowfallEnabled = !isSnowfallEnabled; // Toggle the variable
    const button = document.getElementById('snowflakeButton');
    if (isSnowfallEnabled) {
        button.querySelector('img').src = 'public/images/snowflake.gif'; // Start animation
    } else {
        button.querySelector('img').src = 'public/images/snowflake.png'; // Stop animation
    }
}

// Call toggleSnowfall() to enable/disable snowfall as needed
