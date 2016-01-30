'use strict';

/**
 * @ngdoc function
 * @name issueTrackerApp.service:API
 * @description
 * # API
 * Service of the issueTrackerApp
 */
app
.service('Session',['$rootScope','$cookieStore', function ($rootScope,$cookieStore) {

    return {
        get: function () {
        	if (!$rootScope.logged && $cookieStore.get('sessionToken')) {
        		$rootScope.logged = true;
        	}
            return $rootScope.logged;
        },
        set: function(value,cookie) {
            $rootScope.logged = value;
            $cookieStore.put('sessionToken',cookie);
        },
        clear: function() {
            $rootScope.logged = false;
            $cookieStore.remove('sessionToken');
        }
    };
}]);

