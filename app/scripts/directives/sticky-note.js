'use strict';

/**
 * @ngdoc function
 * @name issueTrackerApp.directive:stickyNote
 * @description
 * # stickyNote
 * directive of the issueTrackerApp
 */
app
.directive('stickyNote',['$location', function($location) {
    return {
        templateUrl: 'views/sticky_note.html',
        transclude: true,
        scope: {
            issue: '=issue'
        },
        controller: function($scope){

            $scope.progress = Math.round(($scope.issue.spent/$scope.issue.estimation)*100);

            $scope.show_issue = function () {
            	$location.path('/issues/edit/' + $scope.issue.objectId);
            };

        },
        link: function(scope) {

            if (scope.issue.priority==='low') {
           	   scope.priorityStyle = {'background-color':'white'};
            } else if (scope.issue.priority==='medium') {
           	   scope.priorityStyle = {'background-color':'#F6E788'};
            } else if (scope.issue.priority==='high') {
           	   scope.priorityStyle = {'background-color':'#EC4F4F'};
            }

        }
    };
}]);