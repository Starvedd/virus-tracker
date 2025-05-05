let price = 1.00;
const priceBox = document.getElementById('price-box'); // Ensure this is the correct ID for the price display.

function updatePrice() {
    const change = (Math.random() - 0.5) * 0.1; // This generates a number between -0.05 and +0.05
    price = Math.max(0.01, price + change); // Ensure the price never goes below $0.01
    priceBox.innerText = `Meme Coin Price: $${price.toFixed(2)}`; // Update the price display
}

// Update the price every 1 seconds
setInterval(updatePrice, 1000);
