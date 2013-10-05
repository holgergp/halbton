'use strict';

/* Controllers */

var halbtonApp = angular.module('halbtonApp.controllers', []);
halbtonApp.controller('HalbtonAbstandController', ['$scope', 'zieltonService', 'halbtoene', function ($scope, zieltonService, halbtoene) {

  $scope.zielton = zieltonService.keinZielton;
  $scope.halbtoene = halbtoene;

  $scope.berechneZielton = function (grundton, abstand) {
    $scope.zielton = zieltonService.berechneZielton(grundton, abstand)
  }
}]);


halbtonApp.controller('GitarrenController', ['$scope', 'zieltonService', 'halbtoene', function ($scope, zieltonService, halbtoene) {
  var createBund =function(grundton,leer){
    return {
      note: grundton,
      leer: leer,
      leerClass: function () {
        return this.leer?"Leer":"";
      },
      zieltonMarkiert: false,
      zieltonMarkiertClass: function(){
        return this.zieltonMarkiert?"zieltonMarkiert":"zieltonNichtMarkiert";
      },
      grundtonMarkiert: false,
      grundtonMarkiertClass: function(){
      return this.grundtonMarkiert?"grundtonMarkiert":"grundtonNichtMarkiert";
    }

    }
  }
  var initSaite = function (grundton, bundRange,saitenIndex) {
    var saite= {
      buende : new Array(bundRange.length + 1),
      index: saitenIndex

    }

    saite.buende[0] = createBund(grundton,true);

    for (var pos = 0; pos < bundRange.length; pos++) {
      saite.buende[pos+1] = createBund(zieltonService.berechneZielton(grundton, pos+1),false);
    }
    return saite;
  }

  var notee = halbtoene[4];
  var notea = halbtoene[9];
  var noted = halbtoene[2];
  var noteg = halbtoene[7];
  var noteh = halbtoene[11];


  $scope.normalSaiten = [
    {note: notee, index: 0},
    {note: notea, index: 1},
    {note: noted, index: 2},
    {note: noteg, index: 3},
    {note: noteh, index: 4},
    {note: notee, index: 5}

  ];

  $scope.bundRange = _.range(0, 12);


  var esaite = initSaite(notee, $scope.bundRange,5);
  var asaite = initSaite(notea, $scope.bundRange,4);
  var dsaite = initSaite(noted, $scope.bundRange,3);
  var gsaite = initSaite(noteg, $scope.bundRange,2);
  var hsaite = initSaite(noteh, $scope.bundRange,1);
  var esaite2 = initSaite(notee, $scope.bundRange,0);


  $scope.saiten = [
    esaite2,hsaite,gsaite,dsaite,asaite,esaite
  ];

  $scope.$watch('zielton', function(newVal, oldVal){
    $scope.markiereZielton(newVal);
  });

  $scope.$watch('grundton', function(newVal, oldVal){
    $scope.markiereGrundton(newVal);
  });

  $scope.markiereZielton = function (zielton) {
//TODO refactor me
  for (var i=0; i<6;i++){
    var saite = $scope.saiten[i].buende;
    $scope.saiten[i].buende=_.map(saite, function (bund) {
      bund.zieltonMarkiert = bund.note === zielton;
      return bund;
    });
  }

  }

  $scope.markiereGrundton = function (grundton) {

    //TODO refactor me
    for (var i=0; i<6;i++){
      var saite = $scope.saiten[i].buende;
      $scope.saiten[i].buende=_.map(saite, function (bund) {
        bund.grundtonMarkiert = bund.note === grundton;
        return bund;
      });
    }

  }


}]);


