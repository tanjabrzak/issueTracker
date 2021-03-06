'use strict';

/**
 * @ngdoc function
 * @name issueTrackerApp.service:API
 * @description
 * # API
 * Service of the issueTrackerApp
 */
app
.factory('API', ['$resource','ENV', function($resource, ENV) {
    return function(entity){
		var apiEndpoint = ENV.apiEndpoint;
		var headers = {
			'X-Parse-Application-Id': ENV.appId,
			'X-Parse-REST-API-Key': ENV.appKey,
			'Content-Type': 'application/json'
		};
        return $resource(
		apiEndpoint + entity + '/:id/:action', 
		{
            id: '@id',
            action: '@action'
        }, {
            'get': { method: 'GET', headers: headers },
			'post': { method: 'POST', headers: headers },
            'put': { method:'PUT', headers: headers },
            'delete': { method:'DELETE', headers: headers }
        });
    };
}]);

