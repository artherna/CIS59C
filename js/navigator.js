var $ = function (id) {
    return document.getElementById(id);
}

var map;
let infowindow;
let markers = []
let wineries = [{ name: 'Boa Ventura De Caires Winery', lat: 37.6622242, lng: -121.6751873 }, { name: '3 Steves Winery', lat: 37.6485433, lng: -121.694541 },
{ name: 'Bodegas Aguirre Winery', lat: 37.6670238, lng: -121.6890554 }, { name: 'Charles R Vineyards', lat: 37.6449445, lng: -121.6933311 },
{ name: 'Bent Creek Winery', lat: 37.6500151, lng: -121.7021226 }, { name: 'Caddis Winery', lat: 37.6542616, lng: -121.6976399 },
{ name: 'Arroyo Cellars', lat: 37.6764002, lng: -121.7213251 }, { name: 'Big White House Winery and John Evan Cellars', lat: 37.64711, lng: -121.6957399 },
{ name: 'Cedar Mountain Winery', lat: 37.6612418, lng: -121.6588128 }, { name: 'Almost Famous Wine', lat: 37.6760742, lng: -121.7193931 },
{ name: 'Ehrenberg Cellars', lat: 37.6972639, lng: -121.8154042 }, { name: 'Concannon Vineyard', lat: 37.6670827, lng: -121.7397954 },
{ name: 'Darcie Kent Vineyards', lat: 37.6659675, lng: -121.7061218 }, { name: 'Cuda Ridge Wines', lat: 37.6547921, lng: -121.7668362 },
{ name: 'Del Valle Winery', lat: 37.6658241, lng: -121.7336671 }, { name: 'Eagle Ridge Vineyard', lat: 37.653502, lng: -121.672361 },
{ name: 'Favalora Vineyards Winery', lat: 37.6764357, lng: -121.7191618 }, { name: 'El Sol', lat: 37.6879021, lng: -121.6875288 },
{ name: 'Crooked Vine Vineyard and Winery', lat: 45.429022, lng: -84.773046 }, { name: 'Dante Robere Vineyards', lat: 37.6456844, lng: -121.7821115 },
{ name: 'Fenestra Winery', lat: 37.6418073, lng: -121.7959684 }, { name: 'Mitchell Katz Winery', lat: 37.666449, lng: -121.719954 },
{ name: 'McGrail Vineyards and Winery', lat: 37.6503411, lng: -121.6950897 }, { name: 'Longevity Wines Inc', lat: 37.6759437, lng: -121.7192298 },
{ name: 'Las Positas Vineyards', lat: 37.6458024, lng: -121.7704979 }, { name: 'Leisure Street Winery', lat: 37.66257, lng: -121.683039 },
{ name: 'Nottingham Cellars - Livermore Winery and Wine Tasting', lat: 37.6765212, lng: -121.7192675 }, { name: "Murrieta's Well", lat: 37.659, lng: -121.73449 },
{ name: 'Garré Vineyard Restaurant & Event Center', lat: 37.6657331, lng: -121.6979142 }, { name: 'Rios-Lovell Winery', lat: 37.6663853, lng: -121.7145094 },
{ name: 'Rodrigue Molyneaux Winery', lat: 37.6544685, lng: -121.7573462 }, { name: 'Rosa Fierro Cellars', lat: 37.6764, lng: -121.7193616 },
{ name: 'Omega Road Winery', lat: 37.6772196, lng: -121.7194014 }, { name: 'Retzlaff Vineyards', lat: 37.6724055, lng: -121.7532201 },
{ name: 'Occasio Winery', lat: 37.6764513, lng: -121.7195675 }, { name: 'The Singing Winemaker', lat: 37.6649648, lng: -121.731373 },
{ name: 'Paulsen Wines', lat: 37.6646371, lng: -121.7310154 }, { name: 'The Lineage Wine Collection', lat: 37.664289, lng: -121.728086 },
{ name: 'Page Mill Winery', lat: 37.6691513, lng: -121.7459135 }, { name: 'Wente Vineyards Tasting Lounge', lat: 37.6233946, lng: -121.7560431 },
{ name: 'Wood Family Vineyards', lat: 37.6753661, lng: -121.7200067 }];


//Initialize the map using Google Maps API
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
    let count = 0
    wineries.forEach(element => {
        createMarker(element);
    });


    function createMarker(place) {
        //if (!place.geometry || !place.geometry.location) return;

        const marker = new google.maps.Marker({
            map,
            position: { lat: place.lat, lng: place.lng },
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

//Reset all the checkboxs and drop down options
var resetCheckBox = function () {
    for (let i = 0; i < wineries.length; i++) {
        if ($(`w${i}`).checked) {
            $(`w${i}`).checked = false
            addRemoveOptions("start", true, $(`w${i}`).value)
            addRemoveOptions("end", true, $(`w${i}`).value)
            addRemoveOptions("waypoints", true, $(`w${i}`).value)
        }
    }
}


// helper function to add/remove options from menus dynamically
var addRemoveOptions = function (select, remove, value) {
    if (!select) return;
    if (remove) {
        for (var i = 0; i < $(select).length; i++) {
            if ($(select).options[i].value == value)
                $(select).remove(i);
        }
        return
    }
    $(select).add(new Option(value));
}

// Generate all the checkboxes from the winery list
var genCheckboxField = function () {
    let l1 = document.createElement("label")
    l1.innerHTML = "Winery List"
    $("wineries").appendChild(l1);
    $("wineries").appendChild(document.createElement('br'));
    let count = 0;
    displayTable = document.createElement("table"); // Create the new Table to store winery options
    displayTable.id = "displaytable"
    displayTable.setAttribute("class", "DisplayTable");
    let newDataRow = displayTable.insertRow(-1)
    let t = []
    t.push(newDataRow)
    wineries.forEach(element => {
        // only create a row if there are less than 13 rows in the table lets you divide up winery options in columns of 12
        if (count % 12 != 0 && count < 13) {
            newDataRow = displayTable.insertRow(-1)
            t.push(newDataRow)
        }

        newDataCell = t[count % 12].insertCell(-1) // create the table cell
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox'; // create the checkbox and its options
        checkbox.id = `w${count}`;
        checkbox.name = `w${count}`;
        checkbox.value = element.name;

        // add a listener to each checkbox. when its changed add/remove it to the dropdown elements
        checkbox.addEventListener('change', (event) => {
            if (event.currentTarget.checked) {
                addRemoveOptions("start", false, checkbox.value)
                addRemoveOptions("end", false, checkbox.value)
                addRemoveOptions("waypoints", false, checkbox.value)
            } else {
                addRemoveOptions("start", true, checkbox.value)
                addRemoveOptions("end", true, checkbox.value)
                addRemoveOptions("waypoints", true, checkbox.value)
            }
        })

        var label = document.createElement('label')
        label.htmlFor = `w${count}`;
        label.appendChild(document.createTextNode(element.name));

        newDataCell.appendChild(checkbox);// add checkbox and label to the table cell
        newDataCell.appendChild(label);
        count += 1
    });

    //create the buttons for reset,calculate route and add all elements to the DOM
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
