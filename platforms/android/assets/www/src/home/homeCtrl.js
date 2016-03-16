angular.module('snapApp')

  .controller('homeCtrl', function () {
    var vm = this;

    vm.title = 'SnapPark';
    vm.discript = 'city of lakes';

    console.log('########## Welcome to the ' + vm.title + ' ' + vm.discript + ' ##########');
  });

