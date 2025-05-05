let price = 1.00;
const priceBox = document.getElementById('price-box');

function updatePrice() {
    const change = (Math.random() - 0.5) * 0.1; // -0.05 to +0.05
    price = Math.max(0.01, price + change);
    priceBox.innerText = `Meme Coin Price: $${price.toFixed(2)}`;
}

setInterval(updatePrice, 3000);
