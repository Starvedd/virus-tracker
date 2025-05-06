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

// Fetch the Solana price from CoinGecko API
async function fetchSolPrice() {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
    const data = await response.json();
    const solPrice = data.solana.usd;
    document.getElementById("sol-price").innerText = `SOL Price: $${solPrice.toFixed(2)}`;
  } catch (error) {
    console.error("Error fetching Solana price:", error);
    document.getElementById("sol-price").innerText = "SOL Price: Error";
  }
}

// Update the price every 30 seconds
setInterval(fetchSolPrice, 30000);

// Initial fetch when the page loads
fetchSolPrice();

// Fetch the GORK price from an API
async function fetchGorkPrice() {
  try {
    const response = await fetch("YOUR_GORK_API_URL_HERE"); // Replace with the actual GORK API URL
    const data = await response.json();
    console.log(data); // Log the full response for debugging purposes

    const price = data && data.priceUsd;
    if (price) {
      document.getElementById("gork-price").innerText = `GORK Price: $${price.toFixed(2)}`;
    } else {
      throw new Error("Price not found in the response");
    }
  } catch (error) {
    console.error("Error fetching GORK price:", error);
    document.getElementById("gork-price").innerText = "GORK Price: Error";
  }
}

// Update the GORK price every 30 seconds
setInterval(fetchGorkPrice, 30000);

// Initial fetch when the page loads
fetchGorkPrice();
