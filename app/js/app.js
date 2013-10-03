'use strict';


// Declare app level module which depends on filters, and services
angular.module('halbtonApp', ['halbtonApp.filters', 'halbtonApp.services', 'halbtonApp.directives', 'halbtonApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    /*$routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});*/
    $routeProvider.when('/default', {templateUrl: 'partials/halbtonberechnung.html', controller: 'HalbtonAbstandController'});
    $routeProvider.otherwise({redirectTo: '/default'});
  }]);
