// Initialize the map and set default view
const map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: 5,
  zoomControl: false,
}).setView([0, 0], 2);

// Set map bounds to restrict scrolling beyond the map area
const bounds = [
  [-85, -180],
  [85, 180],
];
map.setMaxBounds(bounds);
map.on("drag", function () {
  map.panInsideBounds(bounds, { animate: false });
});

// Add map image
const imageUrl = "path_to_your_map_image.jpg";
const imageBounds = [
  [-85, -180],
  [85, 180],
];
L.imageOverlay(imageUrl, imageBounds).addTo(map);

// Define cities and infection circles
const cities = [
  { name: "New York", lat: 40.7128, lon: -74.0060, population: 8419600 },
  { name: "London", lat: 51.5074, lon: -0.1278, population: 8982000 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503, population: 13929286 },
  { name: "Paris", lat: 48.8566, lon: 2.3522, population: 2148327 },
];

let infectionCircles = [];
let infectionIntensity = 1;
let previousPrice = null; // Store the previous Solana price

// Add infection circles to map for each city
cities.forEach(city => {
  const circle = L.circle([city.lat, city.lon], {
    color: "red",
    fillColor: "red",
    fillOpacity: 0.4,
    radius: 20000 * infectionIntensity, // Initial radius based on infection intensity
  }).addTo(map);

  infectionCircles.push({ city, circle });
});

// Function to update infection circles based on infection intensity
function updateInfection() {
  infectionCircles.forEach(({ city, circle }) => {
    const newRadius = 20000 * infectionIntensity;
    circle.setRadius(newRadius);
  });
}

// Function to fetch Solana price
async function fetchSolPrice() {
  try {
    const url = 'https://api.dexscreener.com/latest/dex/pairs/solana/So11111111111111111111111111111111111111112'; // Example for Solana token
    const response = await fetch(url);
    const data = await response.json();
    
    const solPrice = parseFloat(data.pair.priceUsd);
    if (!isNaN(solPrice)) {
      console.log("Solana Price (USD): $" + solPrice.toFixed(2));
      updateInfectionBasedOnPrice(solPrice);
      updatePriceDisplay(solPrice);
    } else {
      console.log("Error: Price data not available");
    }
  } catch (error) {
    console.error("Error fetching price data:", error);
  }
}

// Function to update infection based on price change
function updateInfectionBasedOnPrice(price) {
  if (previousPrice !== null) {
    const priceChange = ((price - previousPrice) / previousPrice) * 100;
    console.log(`Price change: ${priceChange.toFixed(2)}%`);

    if (priceChange > 0) {
      infectionIntensity += priceChange / 2;
    } else {
      infectionIntensity = Math.max(1, infectionIntensity + priceChange / 2);
    }
    updateInfection();  // Update infection spread on map
  }

  previousPrice = price;
}

// Function to update the price display in the HTML
function updatePriceDisplay(price) {
  const priceElement = document.getElementById('price');
  priceElement.textContent = `$${price.toFixed(2)}`;
}

// Set interval to fetch Solana price periodically (every 60 seconds)
setInterval(fetchSolPrice, 60000);

// Fetch initial price when the page loads
fetchSolPrice();
