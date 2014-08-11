'use strict';

// Declare app level module which depends on filters, and services
angular.module('halbtonApp', ['halbtonApp.qa', 'halbtonApp.fretboard', 'halbtonApp.services', 'halbtonApp.version']).config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/default', {templateUrl: 'qa/halbtonberechnung.html', controller: 'HalbtonAbstandController'});
  $routeProvider.otherwise({redirectTo: '/default'});
}]);
