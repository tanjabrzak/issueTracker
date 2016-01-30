'use strict';

/**
 * @ngdoc function
 * @name issueTrackerApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the issueTrackerApp
 */
app
 .controller('LogoutCtrl', ['Session','$location','$cookieStore','$rootScope', function(Session,$location,$cookieStore,$rootScope) {

	Session.clear();
	$cookieStore.remove('sessionToken');
	$rootScope.logged = false;
	$location.path('/login');

 }]);