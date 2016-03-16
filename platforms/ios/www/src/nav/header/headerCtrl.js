angular.module('snapApp')

  .controller('headerCtrl', function($state){
    var vm = this;

    //properties
    vm.title = _getTitle();

    function _getTitle() {
      return ($state.$current.data) ? $state.$current.data.title : "";
    }
  })
