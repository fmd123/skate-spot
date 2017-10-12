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
        // console.log(contentThing)
        var contentString = [];
        // var contentThing =
        // '<div id="content">'+
        // '<div id="siteNotice">'+
        // '</div>'+
        // '<h1 id="firstHeading" class="firstHeading">' + resjson[q][0]+ '</h1>'+
        // '<div id="bodyContent">'+
        // '<p>Location: ' + resjson[q].location +'</p>'+
        // '<p>Bust: ' + contentString[2] + '</p>'+
        // '<p>Difficulty: ' + contentString[3] + '</p>'+
        // '<p>Photo_url: ' + contentString[4] + '</p>'+
        // '<p>Description: ' + contentString[5]+ '</p>'+
        // '</div>'+
        // '</div>'

        for(q=0; q<resjson.length; q++){
          console.log(resjson[q])
          var innerObj = resjson[q]
            var postObj =
              {
                id: innerObj.id,
                name: innerObj.name,
                location: innerObj.location,
                bust: innerObj.bust,
                description: innerObj.description,
                difficulty: innerObj.difficulty
              }
            // ['<div id="content">'+
            // '<div id="siteNotice">'+
            // '</div>'+
            // '<h1 id="firstHeading" class="firstHeading">' + innerObj[w]+ '</h1>'+
            // '<div id="bodyContent">'+
            // '<p>Location: ' + innerObj[w] +'</p>'+
            // '<p>Bust: ' + innerObj[w] + '</p>'+
            // '<p>Difficulty: ' + innerObj[w] + '</p>'+
            // '<p>Photo_url: ' + innerObj[w] + '</p>'+
            // '<p>Description: ' + innerObj[w]+ '</p>'+
            // '</div>'+
            // '</div>']
          }
          contentString.push(postObj)

        console.log(contentString)

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
                '<div id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h1 id="firstHeading" class="firstHeading">' + resjson[i].name+ '</h1>'+
                '<div id="bodyContent">'+
                '<p>Location: ' + resjson[i].location +'</p>'+
                '<p>Bust: ' + resjson[i].bust + '</p>'+
                '<p>Difficulty: ' + resjson[i].bust + '</p>'+
                '<p>Photo_url: ' + resjson[i].photo_urlt + '</p>'+
                '<p>Description: ' + resjson[i].description+ '</p>'+
                '</div>'+
                '</div>'
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

//   var makeMarker = (latlng) => {
//     var marker = new google.maps.Marker({
//     position: latlng,
//     map: map,
//     title: 'Hello World!'
//   })
// }
