// Initialize the interactive map using OpenStreetMap
const map = L.map("map", {
  minZoom: 2,
  maxZoom: 5,
  worldCopyJump: false,
}).setView([20, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Set boundaries to prevent infinite dragging
const southWest = L.latLng(-85, -180);
const northEast = L.latLng(85, 180);
const bounds = L.latLngBounds(southWest, northEast);
map.setMaxBounds(bounds);
map.on("drag", function () {
  map.panInsideBounds(bounds, { animate: false });
});

// City data
const cities = [
  { name: "New York", lat: 40.7128, lon: -74.006 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
];

let infectionIntensity = 1;
let infectionCircles = [];
let currentPrice = 0.02675;  // Starting GORK price for simulation
let priceChangeRate = 0.0005; // Price increase rate (per interval)
let retracementRate = 0.005; // Retracement rate (for random pullback)

// Create infection circles for each city
cities.forEach((city) => {
  const circle = L.circle([city.lat, city.lon], {
    color: "red",
    fillColor: "red",
    fillOpacity: 0.4,
    radius: 20000 * infectionIntensity,
  }).addTo(map);
  infectionCircles.push(circle);
});

// Simulate price growth with retracements and spread
setInterval(() => {
  // Simulate price growth and random retracement
  let randomChange = Math.random() > 0.95 ? -retracementRate : priceChangeRate; // Simulate retracement
  currentPrice += randomChange;
  if (currentPrice < 0.01) currentPrice = 0.01; // Prevent price from going below a minimum value

  // Update GORK price display
  document.getElementById("gork-price").textContent = `GORK Price: $${currentPrice.toFixed(4)}`;

  // Simulate the movement of infection circles across the world
  infectionCircles.forEach((circle) => {
    // Randomly move circles to a new location on the map (to simulate virus spread)
    let newLat = Math.random() * 180 - 90; // Latitude: range [-90, 90]
    let newLon = Math.random() * 360 - 180; // Longitude: range [-180, 180]
    circle.setLatLng([newLat, newLon]); // Move circle to new location

    // Optionally, update circle radius to simulate spread intensity
    let newRadius = 20000 * (1 + randomChange * 10); // Radius based on price growth rate
    circle.setRadius(newRadius);
  });
}, 500); // Update every 500ms (for fast simulation)

// Initial fetch and update every 10 seconds (optional, if you still want to show the real API price)
async function fetchGorkPrice() {
  try {
    const response = await fetch(
      "https://api.dexscreener.com/latest/dex/pairs/solana/37iWFSqgnTSAfShoBTBzQghwsTtkWAZW3yVzgJWKn6iK"
    );
    const data = await response.json();

    // Check if 'priceUsd' is present and valid
    if (data && data.pair && data.pair.priceUsd) {
      const priceUsd = parseFloat(data.pair.priceUsd).toFixed(4);
      document.getElementById("gork-price").textContent = `GORK Price: $${priceUsd}`;
    } else {
      console.error("Price data not found in API response.");
      document.getElementById("gork-price").textContent = "GORK Price: Not Available";
    }
  } catch (error) {
    console.error("Failed to fetch GORK price:", error);
    document.getElementById("gork-price").textContent = "GORK Price: Error Fetching";
  }
}

// Initial fetch and update every 10 seconds
fetchGorkPrice();
setInterval(fetchGorkPrice, 10000);
