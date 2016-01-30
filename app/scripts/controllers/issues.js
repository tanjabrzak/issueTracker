'use strict';

/**
 * @ngdoc function
 * @name issueTrackerApp.controller:IssuesCtrl
 * @description
 * # IssuesCtrl
 * Controller of the issueTrackerApp
 */
app
 .controller('IssuesCtrl', ['$scope','API','growl','$routeParams','$location', function($scope,API,growl,$routeParams,$location) {

 	var load = function () {
 		var include = 'assignee_id,category_id,creator_id';

 		API('classes/Issue').get({include:include,where:$routeParams}).$promise
		.then(
			function(response){
				$scope.issues = [];
				angular.forEach(response.results,function(data){
					$scope.issues.push({
						name: data.assignee_id.first_name + ' ' + data.assignee_id.last_name,
						created: data.createdAt,
						updated: data.updatedAt,
						priority: data.priority,
						title: data.title,
						status: data.status,
						objectId: data.objectId,
						category: data.category_id.name,
						assigneeid: data.assigneeid,
						categoryid: data.categoryid
					});
				});
				$scope.loaded = true;

				$scope.gridOptions = {
					data: 'issues',
					enableRowSelection: true,
					multiSelect: false,
					enableColumnResize: true,
					enableColumnMenus: true,
					paginationPageSizes: [5, 10, 25],
     				paginationPageSize: 5,
					columnDefs: [
					{ field: 'title', displayName: 'Title'  },
					{ field: 'category', displayName: 'Category', cellTemplate: '<a href ng-click="grid.appScope.query(\'categoryid\',row.entity.categoryid)">{{row.entity.category}}</a>' },
					{ field: 'priority', displayName: 'Priority', cellTemplate: '<a href ng-click="grid.appScope.query(\'priority\',row.entity.priority)">{{row.entity.priority}}</a>' },
					{ field: 'status', displayName: 'Status', cellTemplate: '<a href ng-click="grid.appScope.query(\'status\',row.entity.status)">{{row.entity.status}}</a>' },
					{ field: 'name', displayName: 'Assignee', cellTemplate: '<a href ng-click="grid.appScope.query(\'assigneeid\',row.entity.assigneeid)">{{row.entity.name}}</a>'},
					{ field: 'created', displayName: 'Created',type: 'date', cellFilter: 'date:\'dd-MM-yyyy HH:mm\'' },
					{ field: 'updated', displayName: 'Updated',type: 'date', cellFilter: 'date:\'dd-MM-yyyy HH:mm\'' },
					{ field: 'objectId', displayName: 'objectId', visible:false },
					{ field: 'assigneeid', displayName: 'assigneeid', visible:false },
					{ field: 'categoryid', displayName: 'categoryid', visible:false },
					{ name: 'Edit', cellTemplate: '<button class="btn-xs btn-default" ng-click="grid.appScope.edit(row)"> {{row.entity.status == "finished" ? "Show" : "Edit"}} </button>' }]
				};

				

			},
			function(error){
				growl.addErrorMessage(error.data.error);
		});
 	};

 	load();

 	$scope.edit = function (row) {
		$location.path('/issues/edit/'+row.entity.objectId);
	};

	$scope.query = function (key,value) {

		var qry = $location.$$search;

		if (key === 'assigneeid') {
			qry.assigneeid = value;
		} else if (key === 'priority') {
			qry.priority = value;
		} else if (key === 'status') {
			qry.status = value;
		} else if (key === 'categoryid') {
			qry.categoryid = value;
		} 

		$location.search(qry);
	};

 }]);

