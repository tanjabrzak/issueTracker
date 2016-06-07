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


    var where = "",whereStr="",
        include = 'assignee_id,category_id,creator_id';

    $scope.priorities_labels = ['high','medium','low'];
	$scope.statuses_labels = ['new','in progress','finished'];

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

    var load_status = function () {

    	$scope.loaded = false;
		whereStr = where;
    	where = "status='new'";
		if (whereStr.length===0) {
			where = "status='new'";
		} else {
			where=whereStr+' AND '+"status='new'";
		}

    	API('data/Issue').get({where:where}).$promise
		.then(
			function(response){
				$scope.new_issues = response.data;
			},
			function(error){
				growl.addErrorMessage(error.data.error);
			}
		)
		.then(function () {
			if (whereStr.length===0) {
				where = "status='in progress'";
			} else {
				where=whereStr+' AND '+"status='in progress'";
			}
			API('data/Issue').get({where:where}).$promise
			.then(
				function(response){
					$scope.inprogress_issues = response.data;
				},
				function(error){
					growl.addErrorMessage(error.data.error);
				}
			)
			.then(function () {
				if (whereStr.length===0) {
					where = "status='finished'";
				} else {
					where=whereStr+' AND '+"status='finished'";
				}
				API('data/Issue').get({where:where}).$promise
				.then(
					function(response){
						$scope.finished_issues = response.data;
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

    	where = '';

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

			if (where.length===0) {
				where='created>='+"'"+$scope.fromDate.toLocaleDateString()+"' AND created<="+"'"+$scope.untilDate.toLocaleDateString()+"'";
			} else {
				where=where+' AND '+'created>='+"'"+$scope.fromDate.toLocaleDateString()+"' AND created<="+"'"+$scope.untilDate.toLocaleDateString()+"'";
			}
			//where.createdAt = createdAt;
			/*$scope.fromDate = null;
			$scope.untilDate = null;*/
    	}

    	if ($scope.priority) {
			if (where.length===0) {
				where='priority='+"'"+$scope.priority+"'";
			} else {
				where=where+' AND '+'priority='+"'"+$scope.priority+"'";
			}
			//where.priority = $scope.priority;
			/*$scope.priority = null;*/
    	}

    	if ($scope.assigneeid) {
			if (where.length===0) {
				where='assigneeid='+"'"+$scope.assigneeid+"'";
			} else {
				where=where+' AND '+'assigneeid='+"'"+$scope.assigneeid+"'";
			}
			//where.assigneeid = $scope.assigneeid;
			/*$scope.assigneeid = null;*/
    	}

    	load_all ();

    };

	$scope.$watch('loaded', function () {

		if ($scope.loaded) {

			$scope.statuses_data = [$scope.new_issues.length,$scope.inprogress_issues.length,$scope.finished_issues.length];
			delete where.status;
			where = "priority='high'"; 
			API('data/Issue').get({where:where,pageSize:1}).$promise
			.then(
				function(response){
					$scope.priority_high = response.totalObjects;
				},
				function(error){
					growl.addErrorMessage(error.data.error);
				}
			)
			.then(function () {
				where = "priority='medium'"; 
				API('data/Issue').get({where:where,pageSize:1}).$promise
				.then(
					function(response){
						$scope.priority_medium = response.totalObjects;
					},
					function(error){
						growl.addErrorMessage(error.data.error);
					}
				)
				.then(function () {
					where = "priority='low'"; 
					API('data/Issue').get({where:where,pageSize:1}).$promise
					.then(
						function(response){
							$scope.priority_low = response.totalObjects;
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