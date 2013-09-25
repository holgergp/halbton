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

    var halbtoene=$scope.halbtoene;
    var zieltonIndex = (grundton.index + abstand) % halbtoene.length;


    var zielton = halbtoene[zieltonIndex];
    $scope.zielton =_.isNull(zielton)||_.isUndefined(zielton)?keinZielton:zielton;


  }

}]);


