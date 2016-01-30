'use strict';

/**
 * @ngdoc function
 * @name issueTrackerApp.controller:IssueCtrl
 * @description
 * # IssueCtrl
 * Controller of the issueTrackerApp
 */
app
.controller('IssueCtrl', ['$scope','API','growl','$routeParams','$location','$timeout', function($scope,API,growl,$routeParams,$location,$timeout) {

	API('classes/Category').get().$promise
	.then(
		function(response){
			$scope.categories = response.results;
		},
		function(error){
			growl.addErrorMessage(error.data.error);
		}
	);

	API('classes/Employee').get().$promise
	.then(
		function(response){
			$scope.assignees = response.results;
			angular.forEach($scope.assignees, function (data) {
				data.name = data.first_name + ' ' + data.last_name;
			});
		},
		function(error){
			growl.addErrorMessage(error.data.error);
		}
	);

	if ($routeParams.id) {

		var include = 'assignee_id,category_id,creator_id';

		API('classes/Issue/'+$routeParams.id).get({include:include}).$promise
		.then(
			function(response){
				$scope.issue = response;
				$scope.issue.name = $scope.issue.assignee_id.first_name + $scope.issue.assignee_id.last_name;
				if ($scope.issue.status === 'finished') {
					$scope.edit = true;
					$timeout(function(){
						$('#wig').find('.nw-editor__res').attr('contenteditable',false);
					},200);
					
				}
				if ($scope.issue.spent) {
					$scope.issue.remaining = $scope.issue.estimation - $scope.issue.spent;
					if ($scope.issue.remaining < 0) {
						$scope.issue.remaining = 0;
					}
				}
			},
			function(error){
				growl.addErrorMessage(error.data.error);
			}
		);
	} else {

		$scope.issue = {
			priority: 'high',
			status: 'new'
		};

		$timeout(function(){
			$scope.new = true;
		},300);
	}

	$scope.priorities = ['high','medium','low'];

	$scope.statuses = ['new','in progress','finished'];
  
    $scope.save = function (issue) {
	
		$scope.submitted = true;
		
		if ($scope.formIssue.$valid) {

			issue.assignee_id = {__type:'Pointer',className:'Employee','objectId':issue.assigneeid};

			issue.category_id = {__type:'Pointer',className:'Category','objectId':issue.categoryid};

			issue.creator_id = null;

			if (!issue.remaining) {
				issue.remaining = null;
			}

			if (!issue.spent) {
				issue.spent = null;
			} else {
				issue.remaining = issue.estimation - issue.spent;
				if (issue.remaining < 0) {
					issue.remaining = 0;
				}
			}

			delete issue.name;

			if (!$routeParams.id) {
				API('classes/Issue').post(issue).$promise
				.then(
					function(response){
						alert('Successfully saved','success');
						$scope.issueId = response.objectId;
						$location.path('/issues/edit/'+$scope.issueId);
					},
					function(error){
						growl.addErrorMessage(error.data.error);
					}
				);
			} else if ($routeParams.id) {
				if (issue.status === 'finished' && !issue.spent) {
					alert('Please enter spent time');
					return;
				}
				API('classes/Issue/'+$routeParams.id).put(issue).$promise
				.then(
					function(){
						alert('Successfully saved','success');
						$location.path('/issues');
					},
					function(error){
						growl.addErrorMessage(error.data.error);
					}
				);
			}

			
		}

    };

}]);
