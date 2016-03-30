var app = angular.module("homeController", []);


app.controller("homeController", [function() {

  var self = this;

  this.hello = "Hello";

  if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    window.addEventListener("scroll", function(e) {
      if (window.scrollY >= 380) {
        document.getElementsByClassName("intro-container")[0].className = document.getElementsByClassName("intro-container")[0].className.replace(/(intro\-container)/gi,'hidden');
        window.scroll(0,10);
      }
      if (window.scrollY < 5 && document.getElementsByClassName("hidden") != []) {

        var lastEl = document.getElementsByClassName("hidden").length - 1;
        if (lastEl != -1) {
          document.getElementsByClassName('hidden')[lastEl].className = document.getElementsByClassName('hidden')[lastEl].className.replace(/(hidden)/gi,'intro-container');
          window.scroll(0,379);
        }
      }
    })
  };

}]);