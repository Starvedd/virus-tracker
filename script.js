const priceDisplay = document.getElementById('price');
const canvas = document.getElementById('infectionCanvas');
const ctx = canvas.getContext('2d');

// Replace this with your actual coin ID when it's live
// For now, we are using a mock price that increases over time
let simulatedPrice = 0.01;  // Start price (mock)

async function fetchPrice() {
  // Simulating price increase for demo purposes
  simulatedPrice += 0.001;  // Increase price by 0.001 SOL every time it's called
  const price = simulatedPrice.toFixed(4);
  priceDisplay.textContent = `Current Price: ${price} SOL`;
  return price;
}

let infectionLevel = 0;

function drawInfection(level) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'red';

  for (let i = 0; i < level; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 10 + 5;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

async function updateVisuals() {
  const price = await fetchPrice();
  if (!price) return;
  infectionLevel = Math.floor(price / 0.005);  // Adjust this to control infection spread speed
  drawInfection(infectionLevel);
}

setInterval(updateVisuals, 10000);  // Update every 10 seconds
updateVisuals();
