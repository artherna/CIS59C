var $ = function (id) {
    return document.getElementById(id);
}

var map;
let infowindow;
let markers = []
let wineries = ["3 Steves Winery", "Almost Famous Wine Company", "Arroyo Cellars", "Bent Creek Winery",
    "Big White House Winery", "BoaVentura de Caires Winery", "Bodegas Aguirre Winery", "Caddis Winery",
    "Cedar Mountain Winery & Port Works", "Charles R Vineyards", "Concannon Vineyard", "Crooked Vine Winery",
    "Cuda Ridge Wines", "Dante Robere Vineyards", "Darcie Kent Vineyards", "Del Valle Winery", "Eagle Ridge Vineyard",
    "Ehrenberg Cellars", "el Sol Winery", "Favalora Vineyards Winery", "Fenestra Winery", "Free Range Flower Winery",
    "Garre' Vineyard and Winery", "Las Positas Vineyards", "Leisure Street Winery", "Longevity Wines", "McGrail Vineyards and Winery",
    "Mitchell Katz Winery", "Murrieta's Well", "Nottingham Cellars", "Occasio Winery", "Omega Road Winery", "Page Mill Winery",
    "Paulsen Wines", "Retzlaff Vineyards and Estate Winery", "Rios-Lovell Winery", "Rodrigue Molyneaux Winery", "Rosa Fierro Cellars",
    "The Lineage Collection - Home of Steven Kent Winery, Lineage Wine Co., L'Autre Cote & Mia Nipote", "The Singing Winemaker",
    "Wente Vineyards Tasting Lounge", "Wood Family Vineyards"];

function initMap() {
    // The map, centered on Livermore
    var livermore = new google.maps.LatLng(37.661888, -121.718930);

    const center = { lat: 37.661888, lng: -121.718930 };
    const options = { zoom: 13, scaleControl: true, center: livermore };
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), options);
    //let search = ['Wente Vineyard', 'Mitchel Katz Winery', "Murrieta's Well", 'Concannon Vineyard'];
    let complete = false
    console.log("About to Search")
    let count =0
    wineries.forEach(element => {
        if(count > 5){
		count += 1
		return;
	}
	count+=1
	console.log(`Searching ${element}`)
	
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
                    console.log(`${results[i].name}:${results[i].geometry.location.lat()}:${results[i].geometry.location.lng()}`);
                    createMarker(results[i]);
                }
                map.setCenter(results[0].geometry.location);
                if (element == wineries[wineries.length - 1]) {
                    complete = true
                }
            }
        });
    });


    function createMarker(place) {
        if (!place.geometry || !place.geometry.location) return;

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
}

var resetCheckBox = function () {
    for (let i = 0; i < wineries.length; i++) {
        if ($(`w${i}`).checked) {
            $(`w${i}`).checked = false
        }
    }
}

var genCheckboxField = function () {
    let l1 = document.createElement("label")
    l1.innerHTML = "Winery List"
    $("wineries").appendChild(l1);
    $("wineries").appendChild(document.createElement('br'));
    let count = 0;
    displayTable = document.createElement("table");
    displayTable.id = "displaytable"
    displayTable.setAttribute("class", "DisplayTable");
    let newDataRow = displayTable.insertRow(-1)
    let t = []
    t.push(newDataRow)
    wineries.forEach(element => {
        if (count % 12 != 0 && count < 13) {
            newDataRow = displayTable.insertRow(-1)
            t.push(newDataRow)
        }

        newDataCell = t[count % 12].insertCell(-1)
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `w${count}`;
        checkbox.name = `w${count}`;
        checkbox.value = element;

        var label = document.createElement('label')
        label.htmlFor = `w${count}`;
        label.appendChild(document.createTextNode(element));

        newDataCell.appendChild(checkbox);
        newDataCell.appendChild(label);
        count += 1
    });
    $("wineries").appendChild(displayTable);
    var button = document.createElement('input');
    button.type = "button"
    button.id = "navigate";
    button.value = "Calculate Route"
    $("wineries").appendChild(button);
    //$("navigate").onclick = calculatetrack;

    button = document.createElement('input');
    button.type = "button"
    button.id = "reset";
    button.value = "Reset"
    $("wineries").appendChild(button);
    $("reset").onclick = resetCheckBox;
}

window.onload = function () {
    genCheckboxField()
    //initMap()
}
