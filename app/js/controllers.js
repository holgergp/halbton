'use strict';

/* Controllers */

var notec={"name": "C",
  index: 0
};
var notecsharp={"name": "C#",
  index: 1
};
var noted={"name": "D",
  index: 2
};
var notedsharp={"name": "D#",
  index: 3
};
var notee={"name": "E",
  index: 4
};
var notef={"name": "F",
  index: 5
};
var notefsharp={"name": "F#",
  index: 6
};
var noteg={"name": "G",
  index: 7
};
var notegsharp={"name": "G#",
  index: 8
};
var notea={"name": "A",
  index: 9
};
var noteasharp={"name": "A#",
  index: 10
};
var noteh={"name": "H",
  index: 11
};

var keinZielton={"name": "Keine Ahnung!"};

var halbtonApp = angular.module('halbtonApp.controllers', []);
halbtonApp.controller('HalbtonAbstandController', ['$scope', function ($scope) {
  $scope.zielton=keinZielton;


  $scope.halbtoene = [
    notec,notecsharp,noted,notedsharp,notee,notef,notefsharp,noteg,notegsharp,notea,noteasharp,noteh

  ];
  $scope.berechneZielton = function (grundton, abstand) {

    if(isNullOrEmpty(grundton)||isNullOrEmpty(abstand)){
      $scope.zielton=keinZielton;
      return;
    }

   var halbtoene=$scope.halbtoene;
   var zieltonIndex = mod( halbtoene.length,grundton.index + abstand );

   var zielton = halbtoene[zieltonIndex];
   $scope.zielton =isNullOrEmpty(zielton)?keinZielton:zielton;


  }

  /**
   * Überprüft (mithilfe von Underscore) on
   * @param object
   * Null oder undefined ist
   * @returns {Boolean}
   * true falls null oder undefined
   * false falls nicht
   */
  var isNullOrEmpty=function(object){
    return _.isNull(object)||_.isUndefined(object);
  }

  /**
   * Helferfunktion die die Modulofunktion in Javascript geraderückt
   * siehe auch http://stackoverflow.com/questions/4467539/javascript-modulo-not-behaving
   * @param n
   * @param m
   * @returns {number}
   * Beispiel n:12 m:-1 returns 11
   */
  var mod=function mod(n, m) {
    return ((m % n) + n) % n;
  }

}]);


halbtonApp.controller('GitarrenController', ['$scope', function ($scope) {
  $scope.saiten = [
    {"name": "C",
      index: 0
    }
  ];


  $scope.halbtoene = [
    notec,notecsharp,noted,notedsharp,notee,notef,notefsharp,noteg,notegsharp,notea,noteasharp,noteh

  ];
  $scope.berechneZielton = function (grundton, abstand) {

    if(isNullOrEmpty(grundton)||isNullOrEmpty(abstand)){
      $scope.zielton=keinZielton;
      return;
    }

    var halbtoene=$scope.halbtoene;
    var zieltonIndex = mod( halbtoene.length,grundton.index + abstand );

    var zielton = halbtoene[zieltonIndex];
    $scope.zielton =isNullOrEmpty(zielton)?keinZielton:zielton;


  }


  /**
   * Überprüft (mithilfe von Underscore) on
   * @param object
   * Null oder undefined ist
   * @returns {Boolean}
   * true falls null oder undefined
   * false falls nicht
   */
  var isNullOrEmpty=function(object){
    return _.isNull(object)||_.isUndefined(object);
  }

  /**
   * Helferfunktion die die Modulofunktion in Javascript geraderückt
   * siehe auch http://stackoverflow.com/questions/4467539/javascript-modulo-not-behaving
   * @param n
   * @param m
   * @returns {number}
   * Beispiel n:12 m:-1 returns 11
   */
  var mod=function mod(n, m) {
    return ((m % n) + n) % n;
  }

}]);


