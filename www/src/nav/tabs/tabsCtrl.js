angular.module('snapApp')
  .controller('tabsCtrl', function($scope,$ionicModal) {

    $scope.openModal= function(){

      $ionicModal.fromTemplateUrl('src/places/more/more.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });

    }

  });
