var coordinants = [];

function initMap(latlng) {
  // var myLatLng = {lat: 21, lng: -141};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {
      lat: 40.015861,
      lng: -105.279284
    }
  })

  //geocode init thing
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });

  // set pre-existing markers
  fetch('http://localhost:3000/spots')
    .then((res) => res.json())
    .then((resjson) => {
        console.log(resjson)
        for (j = 0; j < resjson.length; j++) {
          for (var prop in resjson[j]) {
            var name = resjson[j].name;
            var lat = resjson[j].lat;
            var lng = resjson[j].lon;

          }

          const coord = {
            lat: lat,
            lng: lng
          }
          coordinants.push(coord);
        }

        var filterFloat = function(value) {
          if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
            .test(value))
            return Number(value);
          return NaN;
        };

        for (i = 0; i < coordinants.length; i++) {
          var parseLat = filterFloat(coordinants[i].lat)
          console.log(parseLat)
          var parseLng = filterFloat(coordinants[i].lng)
          var marker = new google.maps.Marker({
            position: {
              lat: parseLat,
              lng: parseLng
            },
            map: map,
            title: name,

          })
          var infowindow = new google.maps.InfoWindow();
          google.maps.event.addListener(marker, 'click', (function(marker, i, infowindow) {
            return function mapWindow() {
              console.log('Klick! Marker=' + resjson[i]);
                var contentThing =
                '<div class="content">'+
                '<div class="siteNotice">'+
                '</div>'+
                '<h1 class="firstHeading" class="firstHeading">' + resjson[i].name+ '</h1>'+
                '<div class="bodyContent">'+
                '<p>Location: ' + resjson[i].location +'</p>'+
                '<p>Bust: ' + resjson[i].bust + '</p>'+
                '<p>Difficulty: ' + resjson[i].difficulty + '</p>'+
                '<p>Photo_url: ' + resjson[i].photo_urlt + '</p>'+
                '<p>Description: ' + resjson[i].description+ '</p>'+
                '</div>'+
                '<button onclick="editFunction()">Edit</button>' +
                '<button onclick="deleteFunction('+resjson[i].id+')" >Delete</button></div>'
              infowindow.setContent(contentThing);
              infowindow.open(map, marker);
            };
          })(marker, i, infowindow));

          google.maps.event.trigger(marker, 'click');
          if (infowindow.open()) {

            infowindow.open(map, marker);
          } else {
            infowindow.close(map,marker);
          }

        }
    })


///GEOCODE SHIT
function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({
    'address': address
  }, function newMark(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      var location = document.getElementById('address').value;
      var name = document.getElementById('name').value;
      var bust = document.getElementById('bust').value;
      var difficulty = document.getElementById('difficulty').value;
      var photo_url = document.getElementById('photo_url').value;
      var description = document.getElementById('description').value;

      // SAVE TO DB
      // NEED AN AJAX CALL
      const jaxObj = {
        method: "POST",
        url: `/spots`,
        data: {
          lat: results[0].geometry.location.lat(),
          lon: results[0].geometry.location.lng(),
          name: name,
          location: location,
          bust: bust,
          difficulty: difficulty,
          photo_url: photo_url,
          description: description
        }
      }
      $.ajax(jaxObj)
        .done((spot) => {
          //nothing needed per say, maybe refresh page?
          window.location.href = '/map'
          console.log('you won that ajax bruv' + spot)
        })
        .fail(($xhr) => {
          console.log('you failed that ajax bruv' + $xhr)
          //ajax failed
        })
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
}

function deleteFunction(id){
  fetch(`http://localhost:3000/spots/${id}`, {
    method: 'DELETE'
  })
  .then(() => {
    console.log('deleted the thing');
    window.location.href='/map'
  })

};

function editFunction(id, item){
  fetch(`http://localhost:3000/spots/${id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item)
  })
  .then(() => {
    window.location.href='/map'
  })
};

// Create modal on edit click
// populate modal with the information
// ^^in form
// on modal submit close modal and send form data to patch route with the spots id
// bam
