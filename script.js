// Initialize map
const map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 2,
    minZoom: 2,
    maxZoom: 6,
    zoomControl: false,
    scrollWheelZoom: false,
    touchZoom: false,
    keyboard: false,
    dragging: true,
    worldCopyJump: false,
    attributionControl: false,
});

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Set bounds to keep the map within the world, adjusting the horizontal bounds to be tighter
const bounds = [[-90, -170], [90, 170]]; // This tightens the left/right edges slightly (from -180 to -170 and 180 to 170)
map.setMaxBounds(bounds);

// Ensure that map doesn't go out of bounds when dragged
map.on('drag', function() {
    if (map.getBounds().getNorth() > 90) map.setView([90, map.getCenter().lng]);
    if (map.getBounds().getSouth() < -90) map.setView([-90, map.getCenter().lng]);
    if (map.getBounds().getEast() > 170) map.setView([map.getCenter().lat, 170]);
    if (map.getBounds().getWest() < -170) map.setView([map.getCenter().lat, -170]);
});

// Meme coin price
let memeCoinPrice = 1.00;
const priceElement = document.getElementById('price');

function fluctuatePrice() {
    const fluctuation = (Math.random() - 0.5) * 0.1;
    memeCoinPrice = Math.max(0.01, memeCoinPrice + fluctuation);
    priceElement.innerText = `Meme Coin Price: $${memeCoinPrice.toFixed(2)}`;
}

// Update price every 3 seconds
setInterval(fluctuatePrice, 3000);

// Add a marker to the map
L.marker([51.505, -0.09]).addTo(map)
    .bindPopup('Meme Coin Region Price is fluctuating.')
    .openPopup();

// Add more example markers
function addRegionMarker(lat, lon, regionName) {
    L.marker([lat, lon]).addTo(map)
        .bindPopup(`${regionName} Price is fluctuating.`)
        .openPopup();
}

// Adding more regions
addRegionMarker(40.7128, -74.0060, "New York");
addRegionMarker(34.0522, -118.2437, "Los Angeles");
addRegionMarker(48.8566, 2.3522, "Paris");
addRegionMarker(35.6762, 139.6503, "Tokyo");
