angular.module('snapApp')

  .controller('trouveMoiCtrl', function ($scope, $state, $cordovaGeolocation, $ionicLoading, $timeout, mapsProvider, $rootScope) {

    var vm = this;

    // Options map
    var options = {
      timeout: 500,
      enableHighAccuracy: false
    };


    // Setup the loader
    vm.loading = $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });



    // Options du map
     var mapOptions = {
      center: { lat: 46.204677, lng: 6.143106 },
      zoom: 16,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // init maps geolocation
    $cordovaGeolocation.getCurrentPosition(options).then(function(position) {

      /*
       **
       ** INITIALIZATION DES VARIABLES
       **
       */

      vm.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


      // Finalize le loader
      $ionicLoading.hide();

      // display the position curency
      var positionsLat = position.coords.latitude;
      var positionLon = position.coords.longitude;



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

      /*vm.btnMarker = function () {
        var marker = new google.maps.Marker({
          map: vm.map,
          animation: google.maps.Animation.DROP,
          position: latLng
        });

        $timeout(function(){
          infoWindow.open(vm.map, marker);
        }, 500);


        console.log('Position Marker: ' + marker.position);
      };*/





    }, function(error){
      google.maps.event.addDomListener(window, 'load');
      console.log('Unable to get location: ' + error.message);
    });

    function calculateRoute(from, to, $rootScope) {



      var directionsService = new google.maps.DirectionsService();

      var directionsRequest = {
        origin: from,
        destination: to,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
      };

      directionsService.route(
        directionsRequest,
        function(response, status)
        {
          if (status == google.maps.DirectionsStatus.OK)
          {
            new google.maps.DirectionsRenderer({
              map: vm.map,
              directions: response
            });
          }
          else
            $("#error").append("Unable to retrieve your route<br />");
        }
      );

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
    }




    $(document).ready(function() {
      // If the browser supports the Geolocation API
      if (typeof navigator.geolocation == "undefined") {
        $("#error").text("Your browser doesn't support the Geolocation API");
        return;
      }


      $("#from-link, #to-link").click(function(event) {

        event.preventDefault();

        var addressId = this.id.substring(0, this.id.indexOf("-"));

        navigator.geolocation.getCurrentPosition(function(position) {

          var geocoder = new google.maps.Geocoder();

          geocoder.geocode({
                "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
              },
              function(results, status) {
                if (status == google.maps.GeocoderStatus.OK)
                  $("#" + addressId).val(results[0].formatted_address);
                else
                  $("#error").append("Unable to retrieve your address<br />");
              });
          },
          function(positionError){
            $("#error").append("Error: " + positionError.message + "<br />");
          },
          {
            enableHighAccuracy: true,
            timeout: 10 * 1000 // 10 seconds
          });
      });

      $("#calculate-route").submit(function(event) {
        event.preventDefault();
        calculateRoute($("#from").val(), $("#to").val());
      });
    });

  });



