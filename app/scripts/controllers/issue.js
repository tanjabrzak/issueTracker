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

	API('data/Category').get().$promise
	.then(
		function(response){
			$scope.categories = response.data;
		},
		function(error){
			growl.addErrorMessage(error.data.error);
		}
	);

	API('data/Employee').get().$promise
	.then(
		function(response){
			$scope.assignees = response.data;
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

		API('data/Issue/'+$routeParams.id).get().$promise
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

			issue.assignee_id = {__type:'Pointer',className:'Employee','objectId':issue.assigneeid,___class:'Employee'};

			issue.category_id = {__type:'Pointer',className:'Category','objectId':issue.categoryid,___class:'Category'};

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
				API('data/Issue').post(issue).$promise
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
				API('data/Issue/'+$routeParams.id).put(issue).$promise
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
