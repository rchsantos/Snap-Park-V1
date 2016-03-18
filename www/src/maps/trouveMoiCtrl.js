angular.module('snapApp')

  .controller('TrouveMoiCtrl', function ($scope, $state, $cordovaGeolocation, $ionicLoading, $timeout, mapsProvider) {

    var vm = this;

    // Options map
    var options = {
      timeout: 500
      //enableHighAccuracy: true
    };

    // Setup the loader
    vm.loading = $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    // init maps geolocation
    $cordovaGeolocation.getCurrentPosition(options).then(function(position) {

      /*
      **
      ** INITIALIZATION DES VARIABLES
      **
      */

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      // Finalize le loader
      $ionicLoading.hide();

      // display the position curency
      var positionsLat = position.coords.latitude;
      var positionLon = position.coords.longitude;

      // Options du map
      var mapOptions = {
        center: latLng,
        zoom: 16,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.WALKING
      };

      var infoWindow = new google.maps.InfoWindow({
        content: "Here I am !",
        animation: google.maps.Animation.DROP
      });

      var directionsDisplay = new google.maps.DirectionsRenderer;
      var directionsService = new google.maps.DirectionsService;

      vm.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      directionsDisplay.setMap(vm.map);

      // Affichage du positionement
      console.log('position Latitude: ' + positionsLat);
      console.log('position Longitude: ' + positionLon);


      var btnMarker = document.getElementsByClassName('mdl-button');

          vm.btnMarker = function () {
            var marker = new google.maps.Marker({
              map: vm.map,
              animation: google.maps.Animation.DROP,
              position: latLng
            });

            $timeout(function(){
              infoWindow.open(vm.map, marker);
            }, 500);


            console.log('Position Marker: ' + marker.position);
          };

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {

        directionsService.route({
          origin: {lat: positionsLat, lng: positionLon},  // Haight.
          destination: {lat: 37.768, lng: -122.511},  // Ocean Beach.
          // Note that Javascript allows us to access the constant
          // using square brackets and a string value as its
          // "property."


          travelMode: google.maps.TravelMode.Walking


        }, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            console.log(origin);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });

      }


          //document.addEventListener('btnMarker', 'click', function() {
           // console.log('#### click ####');
          //);

          //get Marker until the map is loaded
          /* google.maps.event.addListenerOnce(vm.map, 'idle', function(){
            var marker = new google.maps.Marker({
              map: vm.map,
              animation: google.maps.Animation.DROP,
              position: latLng
            });

            var infoWindow = new google.maps.InfoWindow({
              content: "Here I am!"
            });

            google.maps.event.addListener(marker, 'click', function () {
              infoWindow.open(vm.map, marker);
            });

          }); */
    }, function(error){
      google.maps.event.addDomListener(window, 'load');
      console.log('Unable to get location: ' + error.message);
    });

    /*function initMap() {
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var directionsService = new google.maps.DirectionsService;

      directionsDisplay.setMap(map);

      calculateAndDisplayRoute(directionsService, directionsDisplay);
      document.getElementById('mode').addEventListener('change', function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      });
    }

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      var selectedMode = document.getElementById('mode').value;
      directionsService.route({
        origin: {lat: 37.77, lng: -122.447},  // Haight.
        destination: {lat: 37.768, lng: -122.511},  // Ocean Beach.
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: google.maps.TravelMode[selectedMode]
      }, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }*/


  });


/*.controller('TrouveMoiCtrl', function ($scope, $ionicLoading) {
  var vm = this;

  vm.test = "test";
  console.log(vm.test);


  $scope.mapCreated = function(map) {
    $scope.map = map;
    $scope.centerOnMe();
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);

      console.log('lat', pos.coords.latitude);
      console.log('lon', pos.coords.longitude);
      $scope.map.setCenter(
        new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
      );
      $ionicLoading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };

});*/
