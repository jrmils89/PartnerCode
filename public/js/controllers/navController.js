var app = angular.module("navController", ['ngRoute']);


app.controller("navController", ["$http","$scope","$location", function($http,$scope,$location) {

  var self = this;

  this.show = false;
  this.login = false;
  this.signup = false;

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
        self.click();
        $location.path('/codesession/'+response.data._id);
      },
      function(error){
        console.log(error)
      }
    )
  };

  this.signupUser = function(formdata) {
    consol.log(formdata)
  };

  this.loginUser = function(formdata) {
    consol.log(formdata)
  };

}]);