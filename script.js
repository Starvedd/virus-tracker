<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Map with Meme Coin Price</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <style>
        /* Basic styling for the map */
        #map {
            height: 100vh;
        }
        
        /* Optional styling for the price display */
        #price {
            position: fixed;
            top: 10px;
            left: 10px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px;
            font-size: 20px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <!-- Price display area -->
    <div id="price">Meme Coin Price: $1.00</div>
    
    <!-- Map container -->
    <div id="map"></div>
    
    <!-- Leaflet JS -->
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <!-- Your custom script -->
    <script src="script.js"></script>
</body>
</html>
