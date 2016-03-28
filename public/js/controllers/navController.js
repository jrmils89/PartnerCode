var app = angular.module("navController", ['ngRoute']);


app.controller("navController", ["$http","$scope","$location", function($http,$scope,$location) {

  var self = this;

  this.show = false;

  this.click = function() {
    self.show = !self.show
  }

  this.codesession = {};

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
  }

}]);