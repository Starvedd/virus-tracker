const priceDisplay = document.getElementById('price');
const canvas = document.getElementById('infectionCanvas');
const ctx = canvas.getContext('2d');

// Replace with your actual coin ID from Pump.fun
const COIN_ID = 'your_coin_id_here'; 

async function fetchPrice() {
  try {
    const res = await fetch(`https://pump.fun/api/coin/${COIN_ID}`);
    const data = await res.json();
    const price = parseFloat(data.price).toFixed(4);
    priceDisplay.textContent = `Current Price: ${price} SOL`;
    return price;
  } catch (err) {
    console.error("Error fetching price:", err);
  }
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
  infectionLevel = Math.floor(price / 0.005);
  drawInfection(infectionLevel);
}

setInterval(updateVisuals, 10000);
updateVisuals();
