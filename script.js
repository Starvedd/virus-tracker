// Initialize the map
const map = L.map('map', {
    center: [51.505, -0.09],  // Initial center of the map (London)
    zoom: 2,                  // Initial zoom level
    minZoom: 2,               // Minimum zoom level
    maxZoom: 6,               // Maximum zoom level
    zoomControl: true,        // Enable zoom control
    scrollWheelZoom: true,    // Allow zoom with mouse wheel
    touchZoom: true,          // Enable pinch zoom
    keyboard: true,           // Enable zoom with keyboard
    dragging: true,           // Allow dragging the map
    worldCopyJump: false,     // Prevent the map from wrapping horizontally
    attributionControl: true // Show the attribution control
});

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a marker to the map
L.marker([51.505, -0.09]).addTo(map)
    .bindPopup('Meme Coin Region Price is fluctuating.')
    .openPopup();

// Update the meme coin price every 3 seconds
let memeCoinPrice = 1.00;
const priceElement = document.getElementById('price');

// Function to fluctuate the meme coin price
function fluctuatePrice() {
    const fluctuation = (Math.random() - 0.5) * 0.5;  // ±0.25 per update
    memeCoinPrice = Math.max(0.01, memeCoinPrice + fluctuation);
    priceElement.innerText = `Meme Coin Price: $${memeCoinPrice.toFixed(2)}`;
}

// Update price every 3 seconds
setInterval(fluctuatePrice, 3000);

// Add some example regions
function addRegionMarker(lat, lon, regionName) {
    L.marker([lat, lon]).addTo(map)
        .bindPopup(`${regionName} Price is fluctuating.`);
}

// Adding some regions
addRegionMarker(40.7128, -74.0060, "New York");
addRegionMarker(34.0522, -118.2437, "Los Angeles");
addRegionMarker(48.8566, 2.3522, "Paris");
addRegionMarker(35.6762, 139.6503, "Tokyo");
