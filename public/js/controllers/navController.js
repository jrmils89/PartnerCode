var app = angular.module("navController", ['ngRoute']);


app.controller("navController", ["$http","$scope","$location", function($http,$scope,$location) {

  var self = this;

  this.show = false;
  this.login = false;
  this.signup = false;
  this.loggedIn = false;

  this.showSession = function() {
    self.show = !self.show
  }

  this.showLogin = function() {
    self.login = !self.login
  }

  this.showSignup = function() {
    self.signup = !self.signup
  }

  this.codesession = {};
  this.user = {};

  this.submit = function(formdata) {
    $http({
      method: "POST",
      url: "/api/v1/coding",
      data: formdata
    }).then(
      function(response){
        self.codesession = {};
        self.showSession();
        $location.path('/codesession/'+response.data._id);
      },
      function(error){
        console.log(error)
      }
    )
  };

  this.signupUser = function(formdata) {
    $http({
      method: "POST",
      url: "/signup",
      data: formdata
    }).then(
      function(response) {
        $scope.$emit('signup', response.data);
        self.user = {};
        self.showSignup();
        self.loggedIn = true;
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.loginUser = function(formdata) {
    $http({
      method: "POST",
      url: "/login",
      data: formdata
    }).then(
      function(response) {
        $scope.$emit('login', response.data);
        self.user = {};
        self.showLogin();
        self.loggedIn = true;
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.logoutUser = function() {
    $http({
      method: "GET",
      url: "/logout",
    }).then(
      function(response) {
        $scope.$emit('login', response.data);
        self.user = {};
        self.loggedIn = false;
      },
      function(error) {
        console.log(error);
      }
    );
  };

}]);