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

// Smooth transition variables
let lastPrice = currentPrice;
let lastNumCircles = 0;
let lastCircleRadius = 100; // Start with a smaller initial radius

// Simulate price increase gradually
setInterval(() => {
  currentPrice += priceIncreaseRate;

  // Log price for debugging
  console.log("Current Price:", currentPrice);

  // Calculate smooth changes in circle count and size
  smoothCircleGrowth();
}, 500); // Adjust interval to simulate faster movement

// Function to smoothly adjust the number of circles and their size
function smoothCircleGrowth() {
  // Calculate the new number of circles based on the price
  let numCircles = Math.floor(currentPrice * 3000); // Adjust multiplier for a slower spread
  let circleRadius = Math.max(50, Math.random() * (currentPrice * 300)); // Smaller radius scale, reduced size

  // Add new circles gradually if price has increased
  let circlesToAdd = numCircles - lastNumCircles;
  let radiusChange = circleRadius - lastCircleRadius;

  // Loop over each continent and gradually add circles
  for (let continent in continents) {
    let continentCoords = continents[continent];

    for (let i = 0; i < circlesToAdd; i++) {
      let lat = getRandomInRange(continentCoords.lat[1], continentCoords.lat[0]);
      let lon = getRandomInRange(continentCoords.lon[1], continentCoords.lon[0]);

      // Add circle to the map with gradual radius change
      const circle = L.circle([lat, lon], {
        color: "red",
        fillColor: "red",
        fillOpacity: 0.4,
        radius: lastCircleRadius + (radiusChange * (i / circlesToAdd)), // Gradual radius increase
      }).addTo(map);

      infectionCircles.push(circle);
    }
  }

  // Update last values
  lastNumCircles = numCircles;
  lastCircleRadius = circleRadius;
}

// Function to get a random value within a given range
function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Initially scatter circles based on the starting price
smoothCircleGrowth();
