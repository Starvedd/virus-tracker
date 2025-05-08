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
let priceIncreaseRate = 0.002; // Rate at which the price increases

// Define continents with approximate bounding boxes for each (latitudes and longitudes)
const continents = {
  Africa: { lat: [37, -34], lon: [51, -18] },
  Asia: { lat: [81, 10], lon: [180, -180] },
  Europe: { lat: [72, 36], lon: [40, -25] },
  NorthAmerica: { lat: [71, 20], lon: [-67, -170] },
  SouthAmerica: { lat: [12, -60], lon: [-35, -85] },
  Australia: { lat: [-10, -50], lon: [112, 155] },
  Antarctica: { lat: [-90, -60], lon: [-180, 180] },
};

// Simulate price increase
setInterval(() => {
  currentPrice += priceIncreaseRate;

  // Log price for debugging
  console.log("Current Price:", currentPrice);

  // Scatter infection circles based on price increase
  scatterInfectionCircles();
}, 500); // Adjust interval to simulate faster movement

// Function to scatter infection circles across continents based on their regions
function scatterInfectionCircles() {
  // Remove all previous circles
  infectionCircles.forEach((circle) => {
    map.removeLayer(circle);
  });
  infectionCircles = [];

  // Calculate the number of circles based on the price
  let numCircles = Math.floor(currentPrice * 5000); // Adjust multiplier for faster spread

  // Loop over each continent
  for (let continent in continents) {
    let continentCoords = continents[continent];
    
    // Scatter circles for each continent
    for (let i = 0; i < numCircles; i++) {
      let lat = getRandomInRange(continentCoords.lat[1], continentCoords.lat[0]);
      let lon = getRandomInRange(continentCoords.lon[1], continentCoords.lon[0]);

      // Random radius size, increasing if price goes up
      let radius = Math.max(1000, Math.random() * (currentPrice * 20000)); // Random radius based on price

      // Add circle to the map
      const circle = L.circle([lat, lon], {
        color: "red",
        fillColor: "red",
        fillOpacity: 0.4,
        radius: radius,
      }).addTo(map);

      infectionCircles.push(circle);
    }
  }
}

// Function to get a random value within a given range
function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Initially scatter circles based on the starting price
scatterInfectionCircles();
