angular.module('snapApp')
  .controller('mapsCtrl', mapsCtrl)

  function mapsCtrl( $ionicLoading) {

    console.log('maps fonctionne');
    var vm = this;

    vm.mapCreated = function (map) {
      vm.map = map;
      vm.centerOnMe();
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
    }
  }
