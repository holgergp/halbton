'use strict';

/* Directives */


angular.module('halbtonApp.version').directive('appVersion', ['version', function (version) {
  return function (scope, elm) {
    elm.text(version);
  };
}])
;