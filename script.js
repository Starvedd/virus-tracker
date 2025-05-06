// Initialize the map
const map = L.map("map", {
  crs: L.CRS.Simple,
  minZoom: 0,
  maxZoom: 5,
  zoomControl: false,
}).setView([0, 0], 2);

// Limit dragging
const bounds = [
  [-85, -180],
  [85, 180],
];
map.setMaxBounds(bounds);
map.on("drag", function () {
  map.panInsideBounds(bounds, { animate: false });
});

// Add map image (replace with your actual image path)
const imageUrl = "path_to_your_map_image.jpg";
const imageBounds = [
  [-85, -180],
  [85, 180],
];
L.imageOverlay(imageUrl, imageBounds).addTo(map);

// Infection simulation
const cities = [
  { name: "New York", lat: 40.7128, lon: -74.0060, population: 8419600 },
  { name: "London", lat: 51.5074, lon: -0.1278, population: 8982000 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503, population: 13929286 },
  { name: "Paris", lat: 48.8566, lon: 2.3522, population: 2148327 },
];

let infectionCircles = [];
let infectionIntensity = 1;

cities.forEach(city => {
  const circle = L.circle([city.lat, city.lon], {
    color: "red",
    fillColor: "red",
    fillOpacity: 0.4,
    radius: 20000 * infectionIntensity,
  }).addTo(map);

  infectionCircles.push({ city, circle });
});

function updateInfection() {
  infectionIntensity += 0.1;
  infectionCircles.forEach(({ circle }) => {
    circle.setRadius(20000 * infectionIntensity);
  });
}
setInterval(updateInfection, 3000);

// Solana price tracker using CoinGecko
async function fetchSolPrice() {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
    const data = await response.json();

    if (data.solana && data.solana.usd) {
      const price = data.solana.usd;
      document.getElementById("priceDisplay").innerText = `$${price.toFixed(2)}`;
    } else {
      throw new Error("Price data not found");
    }
  } catch (error) {
    console.error("Error fetching price data:", error);
    document.getElementById("priceDisplay").innerText = "Error loading price";
  }
}

// Update price every 15 seconds
fetchSolPrice();
setInterval(fetchSolPrice, 15000);
