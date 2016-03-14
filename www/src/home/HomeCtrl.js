angular.module('snapApp')
  .controller('homeCtrl', homeCtrl)
  function homeCtrl() {
    var vm = this;

    vm.title = 'SnapPark';
    vm.discript = 'city of lakes';

    console.log('Welcome to ' + vm.title + ' ' + vm.discript);
  }

