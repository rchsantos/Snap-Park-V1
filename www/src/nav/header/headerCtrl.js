angular.module('snapApp')

  .controller('headerCtrl', function($state, $rootScope){
    var vm = this;

   //properties
    vm.enabled = _isEnabled();
    vm.title = _getTitle();

    //events
    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams){

        vm.title = _getTitle();
        vm.enabled = _isEnabled();

      });

    //privates
    function _isEnabled(){
      return !$state.is("login");
    };

    function _getTitle(){
      return ($state.$current.data) ? $state.$current.data.title : "";
    };
  })
