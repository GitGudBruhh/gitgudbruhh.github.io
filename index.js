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

function scrollColors() {
    const element = document.getElementById('titleMainPage');
    const text = element.textContent; // Get the original text
    const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#7FFF00', '#00FF00', '#00FFFF', '#0000FF'];  // 7 different colors

    // Create a new HTML string with each character wrapped in a span
    const coloredText = text.split('').map((char, index) => {
        const color = colors[index % colors.length];
        return `<span style="color: ${color};">${char}</span>`;
    }).join('');

    element.innerHTML = coloredText; // Set the innerHTML to the colored text

    let offset = 0;
    setInterval(() => {
        offset = (offset + 1) % text.length; // Update the offset for scrolling
        element.innerHTML = text.split('').map((char, index) => {
            const color = colors[(index + offset) % colors.length]; // Get the color for the current character
            return `<span style="color: ${color};">${char}</span>`; // Wrap each character in a span
        }).join('');
    }, 500); // Change colors every 500 milliseconds
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', scrollColors);



