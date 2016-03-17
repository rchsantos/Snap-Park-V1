'use strict';

angular.module('snapApp')

  .controller('TrouveMoiCtrl', function ($scope, $state, $cordovaGeolocation, $ionicLoading, $timeout) {

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
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var infoWindow = new google.maps.InfoWindow({
        content: "Here I am !",
        animation: google.maps.Animation.DROP
      });

      vm.map = new google.maps.Map(document.getElementById("map"), mapOptions);

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
