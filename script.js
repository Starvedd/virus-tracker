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
const imageUrl = "path_to_your_map_image.jpg"; // replace with actual path
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

// Add infection circles to map for each city
cities.forEach(city => {
  const circle = L.circle([city.lat, city.lon], {
    color: "red",
    fillColor: "red",
    fillOpacity: 0.4,
    radius: 20000 * infectionIntensity,
  }).addTo(map);

  infectionCircles.push({ city, circle });
});

// Function to simulate infection spread
function updateInfection() {
  infectionIntensity += 0.1;

  infectionCircles.forEach(({ city, circle }) => {
    const newRadius = 20000 * infectionIntensity;
    circle.setRadius(newRadius);
  });
}

// Simulate infection spread over time
setInterval(updateInfection, 3000);
