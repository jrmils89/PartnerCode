(function() {

  var app = angular.module('partnerCode', ['ngRoute','ngCookies','nav-directive','codemirror-directive','signup-directive','login-directive','homeController']);

  app.controller('appController',['$cookies','$location','$scope','$http', function($cookies,$location,$scope,$http) {

    var self = this;
    var cookies = $cookies.getAll();

    if (cookies.redirectPartnerCode != 'null' ) {
      $location.path(cookies.redirectPartnerCode)
    };

    this.user = {};
    this.loggedIn = false;

    $http({
      method: "GET",
      url: "/api/v1/users/checkLogin"
    }).then(
      function(response) {
        if (response.data != false) {
          self.user = response.data;
          self.loggedIn = true;
        };
    }, function(error) {
      console.log(error);
    });


    $scope.$on('signup', function(eventObj, data) {
      self.user = data;
      self.loggedIn = true;
    });

    $scope.$on('login', function(eventObj, data) {
      self.user = data;
      self.loggedIn = true;
    });

    $scope.$on('logout', function(eventObj, data) {
      self.user = {};
      self.loggedIn = false;
    });

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