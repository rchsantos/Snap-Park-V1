angular.module('snapApp')
  .controller('countdownCtrl', function($state, $timeout) {
    console.log('########## Park countdown ##########');

    var vm = this;

    vm.title = 'Time Parking';

    vm.thirtyMin = false;
    vm.sixtyMin  = false;
    vm.ninetyMin = false;
    vm.thirty = 1800;
    vm.sixty  = 3540;
    vm.ninety = 5400;

    vm.time = function () {
      $state.go ('tab.countdown');
    };

    //vm.counter    = 10;
    vm.stopped    = false;
    vm.buttonText ='Stop';



    vm.onTimeout = function() {

      vm.counter --;

      timeoutPark = $timeout(vm.onTimeout,1000);

      if (vm.counter <= 0) {
        $timeout.cancel(timeoutPark);
        vm.buttonText = 'Go Back';

        vm.goBack = function () {
          $state.go('tab.countdownSett');
        }
      }
    };

    vm.timeoutPark = $timeout(vm.onTimeout,1000);

    vm.takeAction = function(){

      if(!vm.stopped) {
        $timeout.cancel(timeoutPark);
        vm.buttonText = 'Resume';
      } else {
        timeoutPark = $timeout(vm.onTimeout,1000);
        vm.buttonText='Stop';
      }

      vm.stopped = !vm.stopped;
    }

    vm.tooglethirty = function () {

      if (vm.thirtyMin.checked) {
        $state.go ('tab.countdown');
        vm.counter = vm.thirty;
        console.log(vm.counter);
        console.log('Time 30 min change ' + vm.thirtyMin.checked);

        vm.onTimeout();
      }

    };

  })



  .filter('formatTimer', function() {

    return function(input)

    {
      function z(n) {return (n < 10 ? '0' : '') + n;}
      var seconds = input % 60;
      var minutes = Math.floor( input / 60);
      var hours = Math.floor( minutes / 60);
      return (z(hours) +':'+z(minutes)+':'+z(seconds));
    };
  });
