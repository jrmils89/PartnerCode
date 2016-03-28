var app = angular.module("signup-directive", ['navController']);

app.directive("signupDirective", [function() {
  return {
    restrict: "E",
    templateUrl: "views/templates/signup-form.html",
    controller: "navController",
    controllerAs: "navCtrl"
  }
}]);