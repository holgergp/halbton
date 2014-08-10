'use strict';

/* Directives */


angular.module('halbtonApp.fretboard')

  .directive('myGuitar', function () {
    return {
      restrict: 'A',              // trigger on Element e.g. <bs-rating></bs-rating>
      templateUrl: 'fretboard/guitar.html', // template location
      controller: 'GitarrenController'
      /**scope: {                    // isolate scope variable mappings
      rating: '=',              // two-way data-binding to the expression specified by `rating` attribute
      //    you could also use '=ngModel' instead to get the component to support validation
      maxRating: '=',           // two-way data-binding to the expression specified by `max-rating` attribute
      rated: '&'                // expose function that will evaluate expression specified by `rated` attribute
    }
       link: function (scope, iElement, iAttrs) {

        //Done in controller
      }**/
    };
  })
;