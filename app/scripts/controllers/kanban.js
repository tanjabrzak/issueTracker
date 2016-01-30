'use strict';

/**
 * @ngdoc function
 * @name issueTrackerApp.controller:KanbanCtrl
 * @description
 * # KanbanCtrl
 * Controller of the issueTrackerApp
 */
app
.controller('KanbanCtrl', ['$scope','API','growl','$location', function($scope,API,growl,$location) {


    var where = {},
        include = 'assignee_id,category_id,creator_id';

    $scope.priorities_labels = ['high','medium','low'];
	$scope.statuses_labels = ['new','in progress','finished'];

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

    var load_status = function () {

    	$scope.loaded = false;

    	where.status = 'new';

    	API('classes/Issue').get({include:include,where:where}).$promise
		.then(
			function(response){
				$scope.new_issues = response.results;
			},
			function(error){
				growl.addErrorMessage(error.data.error);
			}
		)
		.then(function () {
			where.status = 'in progress';
			API('classes/Issue').get({include:include,where:where}).$promise
			.then(
				function(response){
					$scope.inprogress_issues = response.results;
				},
				function(error){
					growl.addErrorMessage(error.data.error);
				}
			)
			.then(function () {
				where.status = 'finished';
				API('classes/Issue').get({include:include,where:where}).$promise
				.then(
					function(response){
						$scope.finished_issues = response.results;
						$scope.loaded = true;
					},
					function(error){
						growl.addErrorMessage(error.data.error);
					}
				);
			});
		});
	};

    var load_all = function () {

    	$scope.loaded = false;
		load_status();
    };

    load_all();

    $scope.orderFunction = function(issue) {
    	
    	if (issue.priority === 'high') {
    		return 1;
    	} else if (issue.priority === 'medium') {
    		return 2;
    	} else if (issue.priority === 'low') {
    		return 3;
    	}
    };

    $scope.show = function () {

    	where = {};

    	if ($scope.fromDate && $scope.untilDate) {
    		var  createdAt = {
						    $gte: {
						        __type: 'Date',
						        iso: $scope.fromDate
						    },
						    $lte: {
						        __type: 'Date',
						        iso: $scope.untilDate
						    }
						};

			where.createdAt = createdAt;
			/*$scope.fromDate = null;
			$scope.untilDate = null;*/
    	}

    	if ($scope.priority) {
			where.priority = $scope.priority;
			/*$scope.priority = null;*/
    	}

    	if ($scope.assigneeid) {
			where.assigneeid = $scope.assigneeid;
			/*$scope.assigneeid = null;*/
    	}

    	load_all ();

    };

	$scope.$watch('loaded', function () {

		if ($scope.loaded) {

			$scope.statuses_data = [$scope.new_issues.length,$scope.inprogress_issues.length,$scope.finished_issues.length];
			delete where.status;
			where.priority = 'high';
			API('classes/Issue').get({where:where,count:1,limit:0}).$promise
			.then(
				function(response){
					$scope.priority_high = response.count;
				},
				function(error){
					growl.addErrorMessage(error.data.error);
				}
			)
			.then(function () {
				where.priority = 'medium';
				API('classes/Issue').get({where:where,count:1,limit:0}).$promise
				.then(
					function(response){
						$scope.priority_medium = response.count;
					},
					function(error){
						growl.addErrorMessage(error.data.error);
					}
				)
				.then(function () {
					where.priority = 'low';
					API('classes/Issue').get({where:where,count:1,limit:0}).$promise
					.then(
						function(response){
							$scope.priority_low = response.count;
						},
						function(error){
							growl.addErrorMessage(error.data.error);
						}
					)
					.then (function () {
						$scope.priorities_data = [$scope.priority_high,$scope.priority_medium,$scope.priority_low];
					});
				});
			});

			$scope.onClickStatus = function (points) {
				$location.search({status: points[0].label});
				$location.path('/issues');
			};

			$scope.onClickPriority = function (points) {
				$location.search({priority: points[0].label});
				$location.path('/issues');
			};
			
		}

	});

}]);