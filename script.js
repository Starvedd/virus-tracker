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

// Initialize infection circles array
let infectionCircles = [];
let cities = [
  { name: "New York", lat: 40.7128, lon: -74.0060 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
];

// Set initial price and movement rates
let currentPrice = 0.02675; // Example starting price of GORK in USD
let priceChangeRate = 0.002; // Increase rate for price movement
let retracementRate = 0.0008; // Retracement rate to simulate fluctuations

// Simulate price change
setInterval(() => {
  let randomChange = Math.random() > 0.95 ? -retracementRate : priceChangeRate; // Random retracement or increase
  currentPrice += randomChange;

  if (currentPrice < 0.01) currentPrice = 0.01; // Ensure price doesn't go below 0.01

  // Log price for debugging
  console.log("Current Price:", currentPrice);

  // Scatter infection circles based on price change
  scatterInfectionCircles();
}, 500); // Adjust interval to simulate faster movement

// Function to scatter infection circles across continents
function scatterInfectionCircles() {
  // Remove all previous circles
  infectionCircles.forEach((circle) => {
    map.removeLayer(circle);
  });
  infectionCircles = [];

  // Calculate the number of circles based on the price
  let numCircles = Math.floor(currentPrice * 100);

  // Randomly scatter circles around the world based on the current price
  for (let i = 0; i < numCircles; i++) {
    // Randomly generate lat/lon coordinates for the circle
    let lat = Math.random() * 180 - 90; // Latitude between -90 and 90
    let lon = Math.random() * 360 - 180; // Longitude between -180 and 180

    // Add circle to the map
    const circle = L.circle([lat, lon], {
      color: "red",
      fillColor: "red",
      fillOpacity: 0.4,
      radius: 2000 + (Math.random() * 10000), // Random radius size based on price
    }).addTo(map);
    
    infectionCircles.push(circle);
  }
}

// Fetch GORK price in USD and display it
async function fetchGorkPrice() {
  try {
    const response = await fetch(
      "https://api.dexscreener.com/latest/dex/pairs/solana/37iWFSqgnTSAfShoBTBzQghwsTtkWAZW3yVzgJWKn6iK"
    );
    const data = await response.json();

    // Check if 'priceUsd' is present and valid
    if (data && data.pair && data.pair.priceUsd) {
      currentPrice = parseFloat(data.pair.priceUsd); // Update the price with the actual API price
      document.getElementById("gork-price").textContent = `GORK Price: $${currentPrice.toFixed(4)}`;
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
setInterval(fetchGorkPrice, 10000); // Fetch price every 10 seconds

