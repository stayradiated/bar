(function() {
  (function(files) {
    var cache, module, req;
    cache = {};
    req = function(id) {
      var file;
      if (cache[id] == null) {
        if (files[id] == null) {
          if ((typeof require !== "undefined" && require !== null)) {
            return require(id);
          }
          console.error("Cannot find module '" + id + "'");
          return null;
        }
        file = cache[id] = {
          exports: {}
        };
        files[id][1].call(file.exports, (function(name) {
          var realId;
          realId = files[id][0][name];
          return req(realId != null ? realId : name);
        }), file, file.exports);
      }
      return cache[id].exports;
    };
    if (typeof module === 'undefined') {
      module = {};
    }
    return module.exports = req(0);
  })([
    [
      {
        /*
          /Volumes/Home/Projects/bar/source/bar.coffee
        */

        './config': 1
      }, function(require, module, exports) {
        var config, gui, win;
        gui = require('nw.gui');
        win = gui.Window.get();
        config = require('./config');
        window.bar = {
          init: function() {
            win.resizeTo(window.screen.width, config.height);
            win.moveTo(0, 0);
            return document.body.style.font = config.font;
          }
        };
        return document.addEventListener('keydown', function(event) {
          switch (event.keyCode) {
            case 82:
              if (event.ctrlKey) {
                return win.reloadDev();
              }
              break;
            case 68:
              if (event.ctrlKey) {
                return win.showDevTools();
              }
              break;
            case 81:
              if (event.ctrlKey) {
                return win.close();
              }
          }
        });
      }
    ], [
      {
        /*
          /Volumes/Home/Projects/bar/source/config.coffee
        */

      }, function(require, module, exports) {
        var config;
        config = {
          height: 26,
          font: "12px/26px 'PanicSans'",
          colors: ['#1D1F21']
        };
        return module.exports = config;
      }
    ]
  ]);

}).call(this);
