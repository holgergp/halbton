'use strict';

/* Controllers */

var keinZielton={"name": "Keine Ahnung!"};

var halbtonApp = angular.module('halbtonApp.controllers', []);
halbtonApp.controller('HalbtonController', ['$scope', function ($scope) {
  $scope.zielton=keinZielton;


  $scope.halbtoene = [
    {"name": "C",
      index: 0
    },
    {"name": "C#",
      index: 1
    },
    {"name": "D",
      index: 2
    },
    {"name": "D#",
      index: 3
    },
    {"name": "E",
      index: 4
    },
    {"name": "F",
      index: 5
    },
    {"name": "F#",
      index: 6
    },
    {"name": "G",
      index: 7
    },
    {"name": "G#",
      index: 8
    },
    {"name": "A",
      index: 9
    },
    {"name": "A#",
      index: 10
    },
    {"name": "H",
      index: 11
    }

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


