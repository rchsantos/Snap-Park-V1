angular.module('snapApp')
  .controller('countdownCtrl', function($state, $timeout) {
    console.log('########## Park countdown ##########');
      var vm = this;

      vm.title = 'countdown';
      vm.thirtyMin = 30000;
      vm.sixtyMin = 60000;
      vm.ninetyMin = 90000;
  });
