'use strict';

/**
 * @ngdoc function
 * @name issueTrackerApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the issueTrackerApp
 */
app
.controller('LoginCtrl', ['$scope','API','growl','Session','$location', function($scope,API,growl,Session,$location) {
  
    $scope.tryLogin = function (loginData) {
	
		$scope.submitted = true;
		
		if ($scope.formLogin.$valid) {
			
			var username = loginData.username;
			var password = loginData.password;

			API('login').get({username:username,password:password}).$promise
			.then(
				function(response){
					Session.set(true,response.sessionToken);
					$location.path('/');
				},
				function(error){
					if (error.status===404) {
						growl.addErrorMessage('Your credentials are not valid or account is not active');
					} else {
						growl.addErrorMessage(error.statusText);
					}
			});
		}

    };

}]);
