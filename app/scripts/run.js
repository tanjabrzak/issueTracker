'use strict';

/**
 * @ngdoc overview
 * @name issueTrackerApp
 * @description
 * # issueTrackerApp
 *
 * Main module of the application - run.
 */
app
.run(['$window', '$modal', 'Session', '$location', '$rootScope', function($window, $modal, Session, $location, $rootScope) {

	Session.get();

    // register listener to watch route changes
    $rootScope.$on( '$routeChangeStart', function(event, next) {
      if (!Session.get()) {
        // no logged user, we should be going to #login
        if ( next.templateUrl === 'views/login.html' ) {
          // already going to #login, no redirect needed
        } else {
          // not going to #login, we should redirect now
          $location.path( '/login' );
        }
      }         
    });

	$window.alert = function (message, type) {

        if (!type) {
            type = 'default';
        }

        $modal({
            templateUrl: 'views/alert.html',
            controller: function(){
                this.message = message;
                this.type = type;
                this.text = type ? 'text-'+type : false;
                this.btn = type ? 'btn-'+type : false;
            },
            controllerAs: 'alertCtrl'
        });

    };

    $window.confirm = function (message, callback, button_text, type) {

        if (!type) {
            type = 'default';
        }
        if (!button_text) {
            button_text = 'Yes';
        }

        var $modalInstance = $modal({
            templateUrl: 'views/confirm.html',
            controller: function(){
                this.message = message;
                this.button_text = button_text;
                this.type = type;
                this.text = type ? 'text-'+type : false;
                this.btn = type ? 'btn-'+type : false;

                this.ok = function () {
                    callback();
                    $modalInstance.hide();
                };

            },
            controllerAs: 'confirmCtrl'
        });
    };

}]);