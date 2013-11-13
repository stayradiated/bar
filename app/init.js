(function () {

  var gui = require('nw.gui');
  var app = gui.Window.get();
  var bar = require('./js/bar')(gui, app, window, document);

  document.addEventListener('DOMContentLoaded', function () {
    document.removeEventListener('DOMContentLoaded', arguments.callee, false);
    bar.init();
  });

}());
