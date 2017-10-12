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
        new google.maps.Marker({
          position: {
            lat: parseLat,
            lng: parseLng
          },
          map: map,
          title: name
        })
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
          console.log(results[0].geometry.location.lat());
          console.log(results[0].geometry.location.lng())
          var marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
          });

          // SAVE TO DB
          // NEED AN AJAX CALL
          const jaxObj = {
            method: "POST",
            url: `/spots`,
            data: {
              lat: results[0].geometry.location.lat(),
              lon: results[0].geometry.location.lng(),
              // name: name,
              // location: location,
              // bust: bust,
              // difficulty: difficulty,
              // photo_url: photo_url,
              // description: description,
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
            }

          else {
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
