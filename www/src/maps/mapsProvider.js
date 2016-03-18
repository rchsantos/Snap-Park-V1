var listPos = [
  { name: 'test', pos: [41, -87] },
  { name: 'test2', pos: [40, -86] }
];

angular.module('snapApp')
  .service('mapsProvider', function($firebaseArray){

    var ref = new Firebase('https://snappark.firebaseio.com/positions/');
    var sync = $firebaseArray(ref);
    var listPos = sync;

    /*ref.push([
      { name: 'test', pos: [ {depart: 40}, {arival: -86}] },
      { name: 'test2', pos: [{depart: 40}, {arival: -86}] }
    ]);*/
  });
