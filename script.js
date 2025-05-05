// Debugging: Check if the script is loading
console.log("Script loaded successfully!");

// Get the price display and canvas context
const priceDisplay = document.getElementById('price');
const canvas = document.getElementById('infectionCanvas');
const ctx = canvas.getContext('2d');

// Function to simulate a price change (mock data)
function getSimulatedPrice() {
  return Math.random() * (0.1 - 0.01) + 0.01; // Random price between 0.01 and 0.1 SOL
}

// Function to visualize the infection
function drawInfection(price) {
  const infectionRate = price * 1000; // Increase the size based on price
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, infectionRate, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
}

// Update price and infection every 2 seconds for demo
function updateVisuals() {
  const price = getSimulatedPrice(); // Get the simulated price
  priceDisplay.textContent = `Current Price: ${price.toFixed(4)} SOL`; // Display price
  drawInfection(price); // Update the infection visual
}

// Run the update every 2 seconds for demo purposes
setInterval(updateVisuals, 2000);
