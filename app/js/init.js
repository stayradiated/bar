var app, bar, gui;

gui = require('nw.gui');
app = gui.Window.get();
bar = require('./js/bar')(gui, app, window, document);

document.addEventListener('DOMContentLoaded', function() {
  bar.init();
});
