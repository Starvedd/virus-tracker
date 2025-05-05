// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 2); // Centered around the world map

// Add tile layer (background map)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Set up the initial meme coin price
let memeCoinPrice = 1.00;
const priceElement = document.getElementById('price');

// Function to update the meme coin price
function fluctuatePrice() {
    const fluctuation = (Math.random() - 0.5) * 0.1; // Fluctuates the price by a random amount between -0.05 and 0.05
    memeCoinPrice = Math.max(0.01, memeCoinPrice + fluctuation); // Ensure the price doesn't go below $0.01
    priceElement.innerText = `Meme Coin Price: $${memeCoinPrice.toFixed(2)}`;
}

// Add a marker to the map to represent a region (example)
const marker = L.marker([51.505, -0.09]).addTo(map)
    .bindPopup('<b>Meme Coin Region</b><br>Price is fluctuating.')
    .openPopup();

// Update the price every 3 seconds
setInterval(fluctuatePrice, 3000); // Update the price every 3 seconds

// Example of adding more markers as the simulation grows (for more regions)
function addRegionMarker(lat, lon, regionName) {
    L.marker([lat, lon]).addTo(map)
        .bindPopup(`<b>${regionName}</b><br>Price is fluctuating.`)
        .openPopup();
}

// Adding a few example regions
addRegionMarker(40.7128, -74.0060, "New York"); // New York
addRegionMarker(34.0522, -118.2437, "Los Angeles"); // Los Angeles
addRegionMarker(48.8566, 2.3522, "Paris"); // Paris
addRegionMarker(35.6762, 139.6503, "Tokyo"); // Tokyo

