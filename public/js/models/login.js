var app = angular.module("login-directive", ['navController']);

app.directive("loginDirective", [function() {
  return {
    restrict: "E",
    templateUrl: "views/templates/login-form.html",
    controller: "navController",
    controllerAs: "navCtrl"
  }
}]);