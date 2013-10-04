'use strict';

/* Controllers */

var halbtonApp = angular.module('halbtonApp.controllers', []);
halbtonApp.controller('HalbtonAbstandController', ['$scope', 'zieltonService','halbtoene',function ($scope,zieltonService,halbtoene) {

  $scope.zielton=zieltonService.keinZielton;
  $scope.halbtoene = halbtoene;

  $scope.berechneZielton = function (grundton, abstand) {
   $scope.zielton =zieltonService.berechneZielton(grundton,abstand)
  }
}]);


halbtonApp.controller('GitarrenController', ['$scope',  'zieltonService','halbtoene',function ($scope,zieltonService,halbtoene) {
  var initSaite=function(grundton,bundRange) {
    var saite=new Array(bundRange.length+1)
    saite[0]={
      note: grundton,
      leer: true,
      markiert:false
    }

    for (var pos=1; pos<bundRange.length; pos++) {
      saite[pos]= {
        note: zieltonService.berechneZielton(grundton,pos),
        leer:false,
        markiert:false
      }
    }
    return saite;
  }

  var notee=halbtoene[4];
  var notea=halbtoene[9];
  var noted=halbtoene[2];
  var noteg=halbtoene[7];
  var noteh=halbtoene[11];



  $scope.normalSaiten = [
    {note:notee,index:0},
    {note:notea,index:1},
    {note:noted,index:2},
    {note:noteg,index:3},
    {note:noteh,index:4},
    {note:notee,index:5}

  ];

  $scope.bundRange = _.range(0, 12);


  var esaite=initSaite(notee,$scope.bundRange);
  var asaite=initSaite(notea,$scope.bundRange);
  var dsaite=initSaite(noted,$scope.bundRange);
  var gsaite=initSaite(noteg,$scope.bundRange);
  var hsaite=initSaite(noteh,$scope.bundRange);
  var esaite2=initSaite(notee,$scope.bundRange);



  $scope.griffPositionen=[
    esaite,asaite,dsaite,gsaite,hsaite,esaite2
  ];






}]);


