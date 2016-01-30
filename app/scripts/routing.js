'use strict';

/**
 * @ngdoc overview
 * @name issueTrackerApp
 * @description
 * # issueTrackerApp
 *
 * Main module of the application - routing.
 */
app
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'MainCtrl'
    })
    .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'AboutCtrl'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'LoginCtrl'
      })
    .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        controllerAs: 'LogoutCtrl'
    })
    .when('/issues', {
        templateUrl: 'views/issues.html',
        controller: 'IssuesCtrl',
        controllerAs: 'IssuesCtrl'
    })
    .when('/issues/new', {
        templateUrl: 'views/issue.html',
        controller: 'IssueCtrl',
        controllerAs: 'IssueCtrl'
    })
    .when('/issues/edit/:id', {
        templateUrl: 'views/issue.html',
        controller: 'IssueCtrl',
        controllerAs: 'IssueCtrl'
    })
    .when('/kanban', {
        templateUrl: 'views/kanban.html',
        controller: 'KanbanCtrl',
        controllerAs: 'KanbanCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
  }]);