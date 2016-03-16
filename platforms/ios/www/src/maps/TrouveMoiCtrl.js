angular.module('snapApp')

  .controller('TrouveMoiCtrl', function ($scope, $ionicLoading) {
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

  });
