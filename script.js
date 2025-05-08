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

// Initially scatter circles based on the starting price
scatterInfectionCircles();

