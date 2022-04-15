// Initialize and add the map
var map;
let infowindow;
let markers = []
function initMap() {
    // The map, centered on Livermore
    var livermore = new google.maps.LatLng(37.661888, -121.718930);

    const center = { lat: 37.661888, lng: -121.718930 };
    const options = { zoom: 13, scaleControl: true, center: livermore };
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), options);
    let search = ['Wente Vineyard', 'Mitchel Katz Winery', "Murrieta's Well", 'Concannon Vineyard'];
    let complete = false
    console.log("About to Search")
    search.forEach(element => {
        console.log("Searching")
        var request = {
            query: element,
            //location: livermore,
            //radius: '1000',
            fields: ['name', 'geometry'],
        };

        var service = new google.maps.places.PlacesService(map);

        service.findPlaceFromQuery(request, function (results, status) {
            //service.nearbySearch(request, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
                map.setCenter(results[0].geometry.location);
                if (element == search[search.length - 1]) {
                    complete = true
                }
            }
        });
    });


    function createMarker(place) {
        if (!place.geometry || !place.geometry.location) return;

        console.log("Creating Markers")
        const marker = new google.maps.Marker({
            map,
            position: place.geometry.location,
        });
        markers.push(marker);
        google.maps.event.addListener(marker, "click", () => {
            infowindow.setContent(place.name || "none");
            infowindow.open({
                anchor: marker,
                map,
                shouldFocus: false,
            });
            let directionsService = new google.maps.DirectionsService();
            let directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map); // Existing map object displays directions
            // Create route from existing points used for markers
            const route = {
                origin: marker.getPosition(),
                destination: markers[0].getPosition(),
                travelMode: 'DRIVING'
            }

            directionsService.route(route,
                function (response, status) { // anonymous function to capture directions
                    if (status !== 'OK') {
                        window.alert('Directions request failed due to ' + status);
                        return;
                    } else {
                        directionsRenderer.setDirections(response); // Add route to the map
                        var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
                        if (!directionsData) {
                            window.alert('Directions request failed');
                            return;
                        }
                        else {
                            document.getElementById('msg').innerHTML += " Driving distance is " + directionsData.distance.text + " (" + directionsData.duration.text + ").";
                        }
                    }
                });
        });
    }
    console.log("Getting Directions")
}
console.log("test")

window.onload = function() {
    initMap
}