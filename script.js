// Define the bounding box (limits for panning and zooming)
// These are the corners of the region you want to keep the map within (full world view bounds)
const bounds = [[-90, -180], [90, 180]]; // From 90°S, 180°W to 90°N, 180°E

// Initialize the map with options
const map = L.map('map', {
    center: [51.505, -0.09], // Initial map center (e.g., London)
    zoom: 2, // Initial zoom level
    minZoom: 2, // Minimum zoom level
    maxZoom: 6, // Maximum zoom level
    zoomControl: false, // Disable zoom control
    scrollWheelZoom: false, // Disable zoom with mouse wheel
    touchZoom: false, // Disable pinch zoom
    keyboard: false, // Disable zoom with keyboard
    dragging: true, // Allow dragging the map
    maxBounds: bounds, // Set the bounds for the map's panning
    maxBoundsViscosity: 1.0, // Prevent panning beyond the set bounds
    worldCopyJump: false, // Prevent the map from wrapping around horizontally (to avoid infinite scrolling)
    attributionControl: false // Optional: Hide the attribution control
});

// Add OpenStreetMap tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
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
    .bindPopup('Meme Coin Region<br>Price is fluctuating.')
    .openPopup();

// Update the price every 3 seconds
setInterval(fluctuatePrice, 3000); // Update the price every 3 seconds

// Example of adding more markers as the simulation grows (for more regions)
function addRegionMarker(lat, lon, regionName) {
    L.marker([lat, lon]).addTo(map)
        .bindPopup(`${regionName}<br>Price is fluctuating.`)
        .openPopup();
}

// Adding a few example regions
addRegionMarker(40.7128, -74.0060, "New York"); // New York
addRegionMarker(34.0522, -118.2437, "Los Angeles"); // Los Angeles
addRegionMarker(48.8566, 2.3522, "Paris"); // Paris
addRegionMarker(35.6762, 139.6503, "Tokyo"); // Tokyo
