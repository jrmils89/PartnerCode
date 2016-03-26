window.onload = function() {
  var myCodeMirror = CodeMirror(document.body, {
    lineNumbers: true,
    tabSize: 2,
    mode: "ruby",
    theme: "monokai"
  });

  // on and off handler like in jQuery
  myCodeMirror.on('change',function(obj, change){
    console.log(change);
  });

  //https://codemirror.net/doc/manual.html#setOption
  // myCodeMirror.setOption("mode", "javascript")
};
