angular.module('snapApp')
  .controller('mapsCtrl', function ($ionicLoading) {

    var vm = this;

    vm.test = "test";
    console.log(vm.test);


    $scope.mapCreated = function(map) {
      $scope.map = map;
      $scope.centerOnMe();
    };

    vm.centerOnMe = function () {
      console.log("Centering");
      if (!vm.map) {
        return;
      }

      vm.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(function (pos) {
        console.log('Got pos', pos);
        vm.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $ionicLoading.hide();
      }, function (error) {
        alert('Unable to get location: ' + error.message);
      });
    };

  })
