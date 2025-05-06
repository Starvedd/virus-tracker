// Function to fetch the GORK price from Dexscreener API
async function fetchGorkPrice() {
  try {
    // Fetch data from the provided Dexscreener API URL
    const response = await fetch("https://api.dexscreener.com/latest/dex/pairs/solana/37iWFSqgnTSAfShoBTBzQghwsTtkWAZW3yVzgJWKn6iK");
    const data = await response.json();

    // Extract the GORK price in USD from the API response
    const gorkPrice = data.pairs[0].priceUsd;

    // Check if the price is valid before updating
    if (gorkPrice && !isNaN(gorkPrice)) {
      document.getElementById("gork-price").innerText = `GORK Price: $${gorkPrice.toFixed(4)}`;
    } else {
      document.getElementById("gork-price").innerText = "GORK Price: Error";
    }
  } catch (error) {
    console.error("Error fetching GORK price:", error);
    document.getElementById("gork-price").innerText = "GORK Price: Error";
  }
}

// Initial fetch when the page loads
fetchGorkPrice();

// Update the GORK price every 30 seconds
setInterval(fetchGorkPrice, 30000);

// Leaflet map setup (ensure you include Leaflet JS/CSS in the HTML file as well)
const map = L.map('map').setView([51.505, -0.09], 13); // Example coordinates (London)

// Set up the OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Example marker data (replace with actual data)
const markers = [
  { lat: 51.505, lng: -0.09, title: "Marker 1" },
  { lat: 51.515, lng: -0.1, title: "Marker 2" },
  { lat: 51.525, lng: -0.12, title: "Marker 3" }
];

// Add markers to the map
markers.forEach(marker => {
  L.marker([marker.lat, marker.lng])
    .addTo(map)
    .bindPopup(marker.title);
});
