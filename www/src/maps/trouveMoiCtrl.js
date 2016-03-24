angular.module('snapApp')

  .controller('trouveMoiCtrl', function ($scope, $state, $cordovaGeolocation, $ionicLoading, $timeout, mapsProvider, $rootScope) {

    console.log('########## Park maps ##########');


    // Variables
    var vm = this;
    var marker;

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

    //Info Window
    var infoWindow = new google.maps.InfoWindow({
      content: "Here I am !",
      animation: google.maps.Animation.DROP
    });


    // init maps geolocation


      // Finalize le loader
      $ionicLoading.hide();


      var directionsDisplay = new google.maps.DirectionsRenderer;
      var directionsService = new google.maps.DirectionsService;

      vm.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      directionsDisplay.setMap(vm.map);


      var btnMarker = document.getElementsByClassName('mdl-button');


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

    }


    $(document).ready(function() {


        $("#from-link, #to-link").click(function (event) {

          event.preventDefault();

          // Address google maps
          var addressId = this.id.substring(0, this.id.indexOf("-"));


          navigator.geolocation.getCurrentPosition(function (position) {

              var geocoder = new google.maps.Geocoder();

              geocoder.geocode({
                  "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                },
                function (results, status) {

                  if (status == google.maps.GeocoderStatus.OK) {

                    // New position
                    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


                    // Creation new Marker
                    marker = new google.maps.Marker({
                      map: vm.map,
                      draggable: true,
                      animation: google.maps.Animation.DROP,
                      position: latLng
                    });

                    // Display the new Marker with infoWindow
                    $timeout(function(){
                      console.log('Enter in Marker');
                      vm.map.setCenter(marker.getPosition());

                      // InfoWindow
                      $timeout(function() {
                        infoWindow.open(vm.map, marker);
                      }, 500);
                    }, 500);

                    console.log('Position Marker: ' + marker.getPosition);

                    //$('#from-link').hide();
                    $("#" + addressId).val(results[0].formatted_address);



                  } else
                    $("#error").append("Unable to retrieve your address<br />");
                });

            },
            function (positionError) {
              $("#error").append("Error: " + positionError.message + "<br />");
            },
            {
              enableHighAccuracy: true,
              timeout: 10 * 1000 // 10 seconds
            });

        });

        $("#calculate-route").submit(function (event) {
          event.preventDefault();
          calculateRoute($("#from").val(), $("#to").val());
        });
      });

  });



