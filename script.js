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
map.on("drag", () => {
  map.panInsideBounds(bounds, { animate: false });
});

// Add infection circles to major cities
const cities = [
  { name: "New York", lat: 40.7128, lon: -74.006 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
];

let infectionIntensity = 1;
let infectionCircles = [];

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

// Simulate infection growth
setInterval(() => {
  infectionIntensity += 0.2;
  infectionCircles.forEach((circle) => {
    circle.setRadius(20000 * infectionIntensity);
  });
}, 3000);

// Fetch GORK price in USD and display it
async function fetchGorkPrice() {
  try {
    const response = await fetch(
      "https://api.dexscreener.com/latest/dex/pairs/solana/37iWFSqgnTSAfShoBTBzQghwsTtkWAZW3yVzgJWKn6iK"
    );
    const data = await response.json();

    if (data?.pair?.priceUsd) {
      const price = parseFloat(data.pair.priceUsd).toFixed(5);
      document.getElementById("gork-price").textContent = `GORK Price: $${price}`;
    } else {
      document.getElementById("gork-price").textContent = "GORK Price: Not Found";
    }
  } catch (error) {
    console.error("Failed to fetch GORK price:", error);
    document.getElementById("gork-price").textContent = "GORK Price: Error";
  }
}

// Run immediately and then every 10 seconds
fetchGorkPrice();
setInterval(fetchGorkPrice, 10000);
