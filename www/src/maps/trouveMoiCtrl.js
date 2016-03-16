angular.module('snapApp')

  .controller('TrouveMoiCtrl', function ($scope, $state, $cordovaGeolocation, $ionicLoading) {

    var vm = this;

    // Options map
    var options = {
      timeout: 500,
      enableHighAccuracy: true
    };

    // init maps geolocation
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      // display the position curency
      var positionsLat = position.coords.latitude;
      var positionLon = position.coords.longitude;

      var mapOptions = {
        center: latLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      vm.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      console.log('position Latitude: ' + positionsLat);
      console.log('position Longitude: ' + positionLon);

      var btnMarker = document.getElementsByClassName('mdl-button');

      vm.btnMarker = function () {
        console.log('test click');
      };

      //get Marker until the map is loaded
        google.maps.event.addListenerOnce(vm.map, 'idle', function(){

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

      });

    }, function(error){
      console.log("Could not get location");
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
