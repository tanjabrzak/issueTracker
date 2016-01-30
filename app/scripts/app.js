'use strict';

/**
 * @ngdoc overview
 * @name issueTrackerApp
 * @description
 * # issueTrackerApp
 *
 * Main module of the application.
 */
var app = angular
  .module('issueTrackerApp', [
    'config',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-growl', 
    'mgcrea.ngStrap',
    'ui.grid','ui.grid.pagination',
    'ngWig',
    'chart.js'
  ])
  .config(['growlProvider', function(growlProvider) {
      growlProvider.globalTimeToLive(5000);
  }]);
