angular.module('snapApp')
  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.home', {
        url: '/home',
        data:{
          title:"Accueil"
        },
        views: {
          'tab-home': {
            templateUrl: 'templates/tab-home.html',
            controller: 'homeCtrl as home'
          }
        }
      })

      .state('tab.map', {
        url: '/trouve-moi',
        data:{
          title:"Trouver Moi"
        },
        views: {
          'tab-map': {
            templateUrl: 'templates/tab-maps.html',
            controller: 'trouveMoiCtrl as map'
          }
        }
      })
      .state('tab.countdown', {
        url: '/countdown',
        views: {
          'tab-countdown': {
            templateUrl: 'templates/tab-countdown.html',
            controller: 'countdownCtrl as count'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

  });
