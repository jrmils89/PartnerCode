window.onload = function() {
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

  document.onkeyup = function(e) {
    value = editor.getDoc().getValue();
    cursor = editor.getDoc().getCursor();
    socket.emit('change event', [value, cursor]);

  };


  // });
  socket.on('event change', function(doc){
    editor.getDoc().setValue(doc[0]);
    editor.getDoc().setCursor(doc[1])
  });



  //https://codemirror.net/doc/manual.html#setOption
  // myCodeMirror.setOption("mode", "javascript")
};
