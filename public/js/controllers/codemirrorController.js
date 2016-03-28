var app = angular.module("codemirrorController", []);

app.controller("codemirrorController", ["$http","$scope","$routeParams", function($http,$scope,$routeParams) {
  var self = this;

  this.id = $routeParams.id;

  var socket = io();

  this.createEditor = function() {
    $http({
      method: "GET",
      url: "/api/v1/coding/"+self.id,
    }).then(
      function(response){
        data = response.data;
        var intialData = data.typedData;
        var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
          lineNumbers: true,
          tabSize: 2,
          mode: data.language.toLowerCase(),
          theme: data.theme.toLowerCase()
        });

        if (intialData) {
          editor.getDoc().setValue(intialData);
        };
        // on and off handler like in jQuery
        // editor.on('change', function(obj, change){

        // var myEditor = document.getElementById("code");
        editor.on('inputRead', function(obj){
          changes();
        });

        editor.on('change', function(obj, change) {
          if (change.origin == "+delete") {
            changes();
          };
        });

        var changes = function() {
          value = editor.getDoc().getValue();
          cursor = editor.getDoc().getCursor();
          socket.emit('change event', [value, cursor]);
        }


        // });
        socket.on('event change', function(doc){
          editor.getDoc().setValue(doc[0]);
          editor.getDoc().setCursor(doc[1])
        });
        //https://codemirror.net/doc/manual.html#setOption
        // myCodeMirror.setOption("mode", "javascript")
        this.callback = function() {
          thisDoc = editor.getDoc().getValue();
          $http({
            method: "PUT",
            url: "/api/v1/coding/"+self.id,
            data: {typedData: thisDoc}
          }).then(function(response) {
            return true;
          },
          function(error) {
            console.log(error);
          })

        };

        this.interval = window.setInterval(this.callback, 5000)


      },
      function(error){
        console.log(error)
      }
    )
  };

  self.createEditor();







}]);