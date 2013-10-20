'use strict';

/* Controllers */

var halbtonApp = angular.module('halbtonApp.controllers', []);
/**
 * Definition of the controller responsible to display the Q/A
 */
halbtonApp.controller('HalbtonAbstandController', ['$scope', 'zieltonService', 'halbtoene', function ($scope, zieltonService, halbtoene) {

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

/**
 * Definition of the Controller responsible to display the guitar and its notes
 */
halbtonApp.controller('GitarrenController', ['$scope', 'zieltonService', 'halbtoene', function ($scope, zieltonService, halbtoene) {

  /**
   * Helper function, to create the data structure for one fret
   * @param ton a fret has a tone
   * @param leer a fret maybe empty if no chord has to be fingered
   * @returns {{note: *, leer: *, leerClass: Function, zieltonMarkiert: boolean, zieltonMarkiertClass: Function, grundtonMarkiert: boolean, grundtonMarkiertClass: Function}}
   */
  var createBund = function (ton, leer) {
    return {
      note: ton,
      leer: leer,
      leerClass: function () {
        return this.leer ? "Leer" : "";
      },
      zieltonMarkiert: false,
      zieltonMarkiertClass: function () {
        return this.zieltonMarkiert ? "zieltonMarkiert" : "zieltonNichtMarkiert";
      },
      grundtonMarkiert: false,
      grundtonMarkiertClass: function () {
        return this.grundtonMarkiert ? "grundtonMarkiert" : "grundtonNichtMarkiert";
      }

    };
  };

  /**
   * Helper function to initialise the data structure for one string
   * Layouts the frets on on string given a specific basetone and a length
   * Makes use of createBund(...) and the zieltonservice
   * @param grundton the basetone from which the layout of the string starts
   * @param bundRange how many frets do we need?
   * @param saitenIndex which string are we looking at?
   * @returns {{buende: Array, index: *}}
   */
  var initSaite = function (grundton, bundRange, saitenIndex) {
    var saite = {
      buende: new Array(bundRange.length + 1),
      index: saitenIndex

    };

    /**
     * We add an extra fret for the empty strum
     * @type {{note: *, leer: *, leerClass: Function, zieltonMarkiert: boolean, zieltonMarkiertClass: Function, grundtonMarkiert: boolean, grundtonMarkiertClass: Function}}
     */
    saite.buende[0] = createBund(grundton, true);

    for (var pos = 0; pos < bundRange.length; pos++) {
      saite.buende[pos + 1] = createBund(zieltonService.berechneZielton(grundton, pos + 1), false);
    }
    return saite;
  };

  /**
   * Helper for the specific notes
   * TODO refactor to halbton
   * @type {*}
   */
  var notee = halbtoene[4];
  var notea = halbtoene[9];
  var noted = halbtoene[2];
  var noteg = halbtoene[7];
  var noteh = halbtoene[11];


  /**
   * We want to have 12 frets
   * @type {Array}
   */
  $scope.bundRange = _.range(0, 12);


  var esaite = initSaite(notee, $scope.bundRange, 5);
  var asaite = initSaite(notea, $scope.bundRange, 4);
  var dsaite = initSaite(noted, $scope.bundRange, 3);
  var gsaite = initSaite(noteg, $scope.bundRange, 2);
  var hsaite = initSaite(noteh, $scope.bundRange, 1);
  var esaite2 = initSaite(notee, $scope.bundRange, 0);


  /**
   * Install strings
   * @type {Array}
   */
  $scope.saiten = [
    esaite2, hsaite, gsaite, dsaite, asaite, esaite
  ];

  /**
   * Watching for changes of the target tone
   */
  $scope.$watch('zielton', function (newVal) {
    $scope.markiereZielton(newVal);
  });

  /**
   * Watching for changes of the base tone
   */
  $scope.$watch('grundton', function (newVal) {
    $scope.markiereGrundton(newVal);
  });

  /**
   * 'Busiuness Logic' of this controller
   * Mark every occurence of the target tone on the guitar
   * @param zielton the target tone to be marked
   */
  $scope.markiereZielton = function (zielton) {
    var markiereZieltoeneAufEinerSaite = function (bund) {
      bund.zieltonMarkiert = bund.note === zielton;
      return bund;
    };

    //TODO refactor me
    for (var i = 0; i < 6; i++) {
      var saite = $scope.saiten[i].buende;
      $scope.saiten[i].buende = _.map(saite, markiereZieltoeneAufEinerSaite);
    }

  };

  /**
   * 'Business Logic' of this controller
   * Mark every occurence of the base tone on the guitar
   * @param grundton the base tone to be marked
   */
  $scope.markiereGrundton = function (grundton) {
    var markiereGrundtoeneAufEinerSaite = function (bund) {
      bund.grundtonMarkiert = bund.note === grundton;
      return bund;
    };
    //TODO refactor me
    for (var i = 0; i < 6; i++) {
      var saite = $scope.saiten[i].buende;
      $scope.saiten[i].buende = _.map(saite, markiereGrundtoeneAufEinerSaite);
    }

  };


}]);



