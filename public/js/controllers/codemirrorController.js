var app = angular.module("codemirrorController", []);

app.controller("codemirrorController", ["$http","$scope","$routeParams", function($http,$scope,$routeParams) {
  var self = this;

  this.id = $routeParams.id;

  var pathName = window.location.pathname;

  var socket = io.connect('', {query: 'pathName='+pathName});


  this.createEditor = function() {
    $http({
      method: "GET",
      url: "/api/v1/coding/"+self.id,
    }).then(
      function(response){
        self.session = response.data;
        var intialData = self.session.typedData;
        var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
          lineNumbers: true,
          tabSize: 2,
          mode: self.session.language.toLowerCase(),
          theme: self.session.theme.toLowerCase()
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

        document.getElementById("session-theme").onchange = function() {
          editor.setOption("theme", self.session.theme);
        };

        document.getElementById("session-language").onchange = function() {
          editor.setOption("mode", self.session.language);
          socket.emit('mode change', self.session.language);
        };

        socket.on('event change', function(doc){
          editor.getDoc().setValue(doc[0]);
          editor.getDoc().setCursor(doc[1])
        });

        socket.on('changed mode', function(value) {
          document.getElementById("session-language").value = value;
          self.session.language = value;
          editor.setOption("mode", value);
        });

        socket.on('roomsUpdated', function(value) {
          self.numberOfConnections = 0;
          for (var key in value) {
            if (value[key].urlName == pathName) {
              self.numberOfConnections += 1;
            };
          }
        });

        socket.on('leftRoom', function(value) {
          self.numberOfConnections = 0;
          for (var key in value) {
            if (value[key].urlName == pathName) {
              self.numberOfConnections += 1;
            };
          }
        });

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