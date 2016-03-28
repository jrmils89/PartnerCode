(function() {

  var app = angular.module('partnerCode', ['ngRoute','ngCookies','nav-directive','codemirror-directive','signup-directive','login-directive']);

  app.controller('appController',['$cookies','$location', function($cookies,$location) {
    var cookies = $cookies.getAll();

    if (cookies.redirectPartnerCode != 'null' ) {
      $location.path(cookies.redirectPartnerCode)
    };

  }]);
  //sets up angular routing
  app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true });
    $routeProvider.
        when('/', {
          templateUrl: '/views/pages/home.html',
        }).
        when('/codesession/:id', {
          templateUrl: '/views/pages/code-session.html',
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

  app.config(['$compileProvider', function ($compileProvider) {
      $compileProvider.debugInfoEnabled(false);
  }]);

})()