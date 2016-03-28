var app = angular.module("nav-directive", ['navController']);

app.directive("navDirective", [function() {
  return {
    restrict: "E",
    templateUrl: "views/templates/nav-bar.html",
    controller: "navController",
    controllerAs: "navCtrl"
  }
}]);