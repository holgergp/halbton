'use strict';

/* Controllers */

angular.module('halbtonApp.qa')
/**
 * Definition of the controller responsible to display the Q/A
 */
  .controller('HalbtonAbstandController', ['$scope', 'zieltonService', 'halbtoene', function ($scope, zieltonService, halbtoene) {

    $scope.zielton = zieltonService.keinZielton;
    $scope.halbtoene = halbtoene;

    /**
     * This controller is able to compute a tone, by applying a threshold (abstand) to a basetone
     * @param grundton the basetone
     * @param abstand the threshold to obtain the targettone
     */
    $scope.berechneZielton = function (grundton, abstand) {
      $scope.zielton = zieltonService.berechneZielton(grundton, abstand);
    };
  }]);



