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
  this.userId = null;

  this.codesession.language = 'javascript';
  this.codesession.theme = 'monokai';


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
    // Get the location of where the user is making the request from
    var locationURL = $location.url();
    $http({
      method: "POST",
      url: "/signup",
      data: formdata
    }).then(
      function(response) {
        $scope.$emit('signup', response.data);
        self.user = {};
        self.userId = response.data._id;
        self.showSignup();
        self.loggedIn = true;
        // This line is to send the user back to where they try to signup / login
        // it was redirecting them back to / and this fixes that small bug
        $location.path(locationURL);
      },
      function(error) {
        console.log(error);
      }
    );
  };

  this.loginUser = function(formdata) {
    // Get the location of where the user is making the request from
    var locationURL = $location.url();
    $http({
      method: "POST",
      url: "/login",
      data: formdata
    }).then(
      function(response) {
        $scope.$emit('login', response.data);
        self.user = {};
        self.userId = response.data._id;
        console.log(response.data);
        self.showLogin();
        self.loggedIn = true;
        // This line is to send the user back to where they try to signup / login
        // it was redirecting them back to / and this fixes that small bug
        $location.path(locationURL);
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
        $scope.$emit('logout', response.data);
        self.user = {};
        self.userId = null;
        self.loggedIn = false;
      },
      function(error) {
        console.log(error);
      }
    );
  };



  this.authorizeGithub = function() {
    location.href = "https://github.com/login/oauth/authorize?client_id=4ed007d2a494af25d518&redirect_uri=http://127.0.0.1:3000/api/v1/users/github/56fd89f430319c2b748bd46f";
  };

}]);