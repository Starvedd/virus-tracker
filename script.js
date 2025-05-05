let previousPrice = null;
let infectionIntensity = 1;
const infectedRegions = {};

const map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Constrain map bounds to prevent endless dragging
const bounds = L.latLngBounds(
  L.latLng(-85, -180),
  L.latLng(85, 180)
);
map.setMaxBounds(bounds);
map.on('drag', function () {
  map.panInsideBounds(bounds, { animate: false });
});

// Cities to infect
const cities = [
  { name: "New York", coords: [40.7128, -74.0060] },
  { name: "London", coords: [51.5074, -0.1278] },
  { name: "Tokyo", coords: [35.6895, 139.6917] },
  { name: "Sydney", coords: [-33.8688, 151.2093] },
  { name: "Rio de Janeiro", coords: [-22.9068, -43.1729] },
  { name: "Cairo", coords: [30.0444, 31.2357] },
  { name: "Moscow", coords: [55.7558, 37.6173] },
  { name: "Cape Town", coords: [-33.9249, 18.4241] }
];

// Add infected city circles
cities.forEach(city => {
  infectedRegions[city.name] = {
    ...city,
    circle: L.circle(city.coords, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.3,
      radius: 20000
    }).addTo(map)
  };
});

// Fetch token price from Dexscreener
async function fetchPrice() {
  try {
    const response = await fetch('https://api.dexscreener.com/latest/dex/pairs/solana/So11111111111111111111111111111111111111112');
    const data = await response.json();
    const currentPrice = parseFloat(data.pair.priceUsd);

    if (previousPrice !== null) {
      const change = ((currentPrice - previousPrice) / previousPrice) * 100;
      console.log(`Price change: ${change.toFixed(2)}%`);

      if (change > 0) {
        infectionIntensity += change / 2;
      } else {
        infectionIntensity = Math.max(1, infectionIntensity + change / 2);
      }

      updateInfection();
    }

    previousPrice = currentPrice;
  } catch (error) {
    console.error("Error fetching price:", error);
  }
}

// Adjust infection radius based on price changes
function updateInfection() {
  Object.values(infectedRegions).forEach(region => {
    const newRadius = 20000 * infectionIntensity;
    region.circle.setRadius(newRadius);
  });
}

// Run every 60 seconds
setInterval(fetchPrice, 60000);
fetchPrice(); // Initial fetch
