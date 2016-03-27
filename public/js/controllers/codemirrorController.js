var app = angular.module("codemirrorController", []);

  app.controller("codemirrorController", ["$http", function($http) {

  var self = this;

  var socket = io();

  var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    tabSize: 2,
    mode: "ruby",
    theme: "monokai"
  });


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

}]);