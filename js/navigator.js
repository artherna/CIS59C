var map;
let infowindow;
let markers = []


//Initialize the map using Google Maps API
function initMap() {
    // The map, centered on Livermore
    var livermore = new google.maps.LatLng(37.661888, -121.718930);

    const center = { lat: 37.661888, lng: -121.718930 };
    const options = { zoom: 13, scaleControl: true, center: livermore };
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), options);

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    directionsRenderer.setMap(map);
    document.getElementById("submit").addEventListener("click", () => {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    });

}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const waypts = [];
    const checkboxArray = document.getElementById("waypoints");
  
    for (let i = 0; i < checkboxArray.length; i++) {
      if (checkboxArray.options[i].selected) {
        waypts.push({
          location: checkboxArray[i].value,
          stopover: true,
        });
      }
    }
  
    directionsService
      .route({
        origin: document.getElementById("start").value,
        destination: document.getElementById("end").value,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
  
        const route = response.routes[0];
        const summaryPanel = document.getElementById("directions-panel");
  
        summaryPanel.innerHTML = "";
  
        // For each route, display summary information.
        for (let i = 0; i < route.legs.length; i++) {
          const routeSegment = i + 1;
  
          summaryPanel.innerHTML +=
            "<b>Route Segment: " + routeSegment + "</b><br>";
          summaryPanel.innerHTML += route.legs[i].start_address + " to ";
          summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
          summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
        }
      })
      .catch((e) => window.alert("Directions request failed due to " + e));
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
    clearStorage("favorite_wineries")
}


// helper function to add/remove options from menus dynamically
var addRemoveOptions = function (select, remove, value) {
    if (!select) return;
    if (remove) {
        for (var i = 0; i < $(select).length; i++) {
            if ($(select).options[i].value == value)
                $(select).remove(i);
                if (select=="start"){
                    if (reservations.indexOf(value) == -1) {
                        deleteFavorite(value)
                    }        
                }
        }
        return
    }
    $(select).add(new Option(value));
    if (select=="start"){
        if (favorites.indexOf(value) == -1) {
            favorites.push(value);
            setStorage("favorite_wineries", favorites);
        }
    }
}

// Generate all the checkboxes from the winery list
var genCheckboxField = function () {
    if (favorites.length === 0) {
        favorites = getStorage("favorite_wineries");
    }
    if (reservations.length === 0) {
        reservations = getStorage("reserved_wineries");
    }
    //Add to routing options if winery has been reserved
    reservations.forEach(w => {
        if (favorites.indexOf(w) == -1) {
            addRemoveOptions("start", false, w)
            addRemoveOptions("end", false, w)
            addRemoveOptions("waypoints", false, w)
        }
    });
    sortWinery(wineries)
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
    button.id = "reset";
    button.value = "Reset"
    $("wineries").appendChild(button);
    $("reset").onclick = resetCheckBox;
}



window.onload = function () {
    genCheckboxField()
    //initMap()
}
