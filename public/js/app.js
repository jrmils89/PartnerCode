(function() {

  var app = angular.module('partnerCode', ['ngRoute','codemirror-directive']);

  //sets up angular routing
  app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true });
    $routeProvider.
        when('/', {
          templateUrl: '/views/pages/home.html',
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

  app.config(['$compileProvider', function ($compileProvider) {
      $compileProvider.debugInfoEnabled(false);
  }]);

})()