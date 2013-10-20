'use strict';

/* Directives */


angular.module('halbtonApp.directives', []).directive('appVersion', ['version', function (version) {
    return function (scope, elm) {
      elm.text(version);
    };
  }]);
