(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

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
          /Volumes/Home/Projects/bar/source/scripts/init.coffee
        */

        './bar': 1
      }, function(require, module, exports) {
        var app, bar, gui;
        gui = require('nw.gui');
        app = gui.Window.get();
        bar = require('./bar')(gui, app, window, document);
        return document.addEventListener('DOMContentLoaded', function() {
          return bar.init();
        });
      }
    ], [
      {
        /*
          /Volumes/Home/Projects/bar/source/scripts/bar.coffee
        */

        './parse': 2,
        './config': 3,
        './socket': 4,
        './template': 5
      }, function(require, module, exports) {
        var Template, app, bar, config, doc, exec, gui, parse, socket, win;
        gui = app = win = doc = null;
        parse = require('./parse');
        config = require('./config');
        socket = require('./socket');
        Template = require('./template');
        exec = require('child_process').exec;
        bar = {
          snap: function() {
            app.resizeTo(win.screen.width, config.height);
            if (config.position === 'bottom') {
              return app.moveTo(0, win.screen.height - config.height);
            } else {
              return app.moveTo(0, 0);
            }
          },
          reloadStyles: function() {
            var el, _i, _len, _ref, _results;
            _ref = doc.querySelectorAll('link');
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              el = _ref[_i];
              _results.push(el.href = el.href.split('?')[0] + '?' + Date.now());
            }
            return _results;
          },
          startScript: function() {
            if (config.script != null) {
              return exec(config.script);
            }
          },
          init: function() {
            var el, server, template;
            bar.snap();
            el = {
              left: doc.querySelector('.left'),
              center: doc.querySelector('.center'),
              right: doc.querySelector('.right')
            };
            template = new Template();
            server = socket(function(buffer) {
              var block, content, html, info, position, _i, _len, _name, _results;
              info = parse(buffer);
              html = {};
              for (_i = 0, _len = info.length; _i < _len; _i++) {
                block = info[_i];
                if (html[_name = block.position] == null) {
                  html[_name] = '';
                }
                html[block.position] += template.compile(block);
              }
              _results = [];
              for (position in html) {
                content = html[position];
                _results.push(el[position].innerHTML = content);
              }
              return _results;
            });
            app.on('close', function() {
              server.close();
              return this.close(true);
            });
            bar.startScript();
            return doc.addEventListener('keydown', function(event) {
              switch (event.keyCode) {
                case 68:
                  if (event.ctrlKey) {
                    return app.showDevTools();
                  }
                  break;
                case 82:
                  return bar.reloadStyles();
                case 83:
                  return bar.snap();
              }
            });
          }
        };
        return module.exports = function(_gui, _app, _win, _doc) {
          gui = _gui;
          app = _app;
          win = _win;
          doc = _doc;
          return bar;
        };
      }
    ], [
      {
        /*
          /Volumes/Home/Projects/bar/source/scripts/parse.coffee
        */

      }, function(require, module, exports) {
        var Block, parse;
        Block = (function() {
          function Block(obj) {
            if (obj == null) {
              obj = {};
            }
            this.text = '';
            this.position = obj.position != null ? obj.position : 'left';
            this.underline = obj.underline != null ? obj.underline : -1;
            this.foreground = obj.foreground != null ? obj.foreground : -1;
            this.background = obj.background != null ? obj.background : -1;
          }

          return Block;

        })();
        parse = function(data) {
          var block, char, createNewBlock, info, isBackground, isCommand, isForeground, isUnderline, text, _i, _len;
          info = [];
          text = data.toString();
          isCommand = false;
          block = null;
          createNewBlock = function(obj) {
            if (obj == null) {
              obj = block;
            }
            if ((block != null ? block.text.length : void 0) === 0) {
              return block;
            }
            block = new Block(obj);
            info.push(block);
            return block;
          };
          createNewBlock();
          for (_i = 0, _len = text.length; _i < _len; _i++) {
            char = text[_i];
            if (isCommand) {
              isCommand = false;
              if (char === '\\') {
                block.text += '\\';
              } else {
                createNewBlock();
              }
              switch (char) {
                case 'l':
                  block.position = 'left';
                  break;
                case 'c':
                  block.position = 'center';
                  break;
                case 'r':
                  block.position = 'right';
                  break;
                case 'f':
                  isForeground = true;
                  break;
                case 'b':
                  isBackground = true;
                  break;
                case 'u':
                  isUnderline = true;
              }
            } else if (isForeground) {
              isForeground = false;
              if (char === 'r') {
                block.foreground = -1;
              } else {
                block.foreground = parseInt(char);
              }
            } else if (isBackground) {
              isBackground = false;
              if (char === 'r') {
                block.background = -1;
              } else {
                block.background = parseInt(char);
              }
            } else if (isUnderline) {
              isUnderline = false;
              if (char === 'r') {
                block.underline = -1;
              } else {
                block.underline = parseInt(char);
              }
            } else if (char === '\\') {
              isCommand = true;
            } else {
              block.text += char;
            }
          }
          if (info[info.length - 1].text === '') {
            info.splice(-1);
          }
          return info;
        };
        return module.exports = parse;
      }
    ], [
      {
        /*
          /Volumes/Home/Projects/bar/source/scripts/config.coffee
        */

      }, function(require, module, exports) {
        var config;
        config = {
          height: 22,
          position: 'top',
          socket: '/tmp/bar.sock',
          script: './init'
        };
        return module.exports = config;
      }
    ], [
      {
        /*
          /Volumes/Home/Projects/bar/source/scripts/socket.coffee
        */

        './config': 3
      }, function(require, module, exports) {
        var config, fs, net, path;
        fs = require('fs');
        net = require('net');
        config = require('./config');
        path = config.socket;
        if (!path) {
          console.error('config.socket is not defined!');
        }
        return module.exports = function(fn) {
          var server;
          server = net.createServer(function(socket) {
            return socket.on('data', fn);
          });
          fs.exists(path, function(exists) {
            if (exists) {
              fs.unlink(path);
            }
            return server.listen(path);
          });
          return server;
        };
      }
    ], [
      {
        /*
          /Volumes/Home/Projects/bar/source/scripts/template.coffee
        */

        './config': 3,
        './themes': 6
      }, function(require, module, exports) {
        var Template, config, createTemplate, themes;
        config = require('./config');
        themes = require('./themes');
        createTemplate = function(theme) {
          theme = theme.join('');
          return function(obj) {
            var html, name, regex, value;
            html = theme;
            for (name in obj) {
              value = obj[name];
              regex = new RegExp("\\{\\{\\s*" + name + "\\s*\\}\\}", 'gi');
              html = html.replace(regex, value);
            }
            return html;
          };
        };
        Template = (function() {
          function Template() {
            this.compile = __bind(this.compile, this);
            var theme;
            theme = themes[themes.theme];
            this.template = createTemplate(theme);
          }

          Template.prototype.compile = function(block) {
            var classname;
            classname = [];
            if (block.background > -1) {
              classname.push('bg');
              classname.push('bg-' + block.background);
            }
            if (block.foreground > -1) {
              classname.push('fg');
              classname.push('fg-' + block.foreground);
            }
            if (block.underline > -1) {
              classname.push('ul');
              classname.push('ul-' + block.underline);
            }
            return this.template({
              text: block.text,
              classname: classname.join(' ')
            });
          };

          return Template;

        })();
        return module.exports = Template;
      }
    ], [
      {
        /*
          /Volumes/Home/Projects/bar/source/scripts/themes.json
        */

      }, function(require, module, exports) {
        return module.exports = {
          "theme": "arrows",
          "arrows": ["<div class=\"block {{ classname }}\">", "<div class=\"arrow-in\"></div>", "<div class=\"text\">{{ text }}</div>", "<div class=\"arrow-out\"></div>", "</div>"]
        };
      }
    ]
  ]);

}).call(this);
