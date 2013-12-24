(function () {
  'use strict';

  var template, app, bar, config, doc, child, gui, parse, socket, win;

  gui = app = win = doc = null;

  parse    = require('./parse');
  config   = require('./config');
  socket   = require('./socket');
  template = require('./template');
  child    = require('child_process');

  bar = {

    // Move the bar to top or bottom of the screen
    snap: function () {
      // Set size
      app.resizeTo(win.screen.width, config.height);
      // Set position
      if (config.position === 'bottom') {
        app.moveTo(0, win.screen.height - config.height);
      } else {
        app.moveTo(0, 0);
      }
    },

    // Reload css files
    reloadStyles: function () {
      var i, len, styles, el;
      styles = doc.querySelectorAll('link');
      len = styles.length;
      for (i = 0; i < len; i++) {
        el = styles[i];
        el.href = el.href.split('?')[0] + '?' + Date.now();
      }
    },

    // Start shell script
    startScript: function () {
      if (config.script) {
        return child.execFile(config.script, {
          cwd: config.cwd
        }, function (err, dout, derr) {
          console.log(arguments);
        });
      }
    },


    init: function () {
      var el, script, server;
      bar.snap();

      // Cache DOM elements
      el = {
        left: doc.querySelector('.left'),
        center: doc.querySelector('.center'),
        right: doc.querySelector('.right')
      };

      // Create unix socket server
      server = socket(function (buffer) {
        var info, html, len, i, block, position;

        info = parse(buffer);
        html = {};
        len = info.length;

        // Generate html
        for (i = 0; i < len; i++) {
          block = info[i];
          if (! html[block.position]) html[block.position] = '';
          html[block.position] += template.compile(block);
        }

        // Insert html into DOM
        for (position in html) {
          el[position].innerHTML = html[position];
        }

      });

      // Start the script
      script = bar.startScript();

      // Be sure to end the socket and kill the script on close
      app.on('close', function () {
        if (script) script.kill();
        server.close();
        return this.close(true);
      });

      // Keyboard shortcuts
      return doc.addEventListener('keydown', function (event) {
        switch (event.keyCode) {

          case 68: // d
            if (event.ctrlKey) app.showDevTools();
            break;

          case 82: // r
            bar.reloadStyles();
            break;

          case 83: // s
            bar.snap();
            break;

        }
      });

    }

  };

  module.exports = function (_gui, _app, _win, _doc) {
    gui = _gui;
    app = _app;
    win = _win;
    doc = _doc;
    return bar;
  };

}());
