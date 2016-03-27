var app = angular.module("codemirror-directive", ['codemirrorController']);

app.directive("codemirrorDirective", [function() {
  return {
    restrict: "E",
    templateUrl: "views/templates/codemirror.html",
    controller: "codemirrorController",
    controllerAs: "codemirrorCtrl"
  }
}]);