(function() {
  'use strict';

  var config, formatInput, net, output, read, icons;

  config = require('../app/js/config');
  net = require('net');

  // Take input from std in and format it
  formatInput = function (fn) {
    var input = process.stdin;
    input.resume();
    input.setEncoding('utf8');

    input.on('data', function(line) {
      var text = read(line);
      if (text) fn(text, line);
    });
  };

  if (process.argv.indexOf('--debug') > -1) {

    // DEBUG MODE
    // echo 'Wa1:b2:c3' | node printer.js --debug

    formatInput(function (output, input) {
      console.log('INPUT: ', input.slice(0, -1));
      console.log('OUTPUT:', output);
    });

  } else {

    // Connect to the socket used by Bar
    output = net.connect({
      path: config.socket
    });

    // Display errors
    output.on('error', function(err) {
      return console.log(err);
    });

    // Start piping data from stdin to the socket
    output.on('connect', function () {
      formatInput(function (text) { output.write(text); });
    });

  }



  // --------------------------------------------------------------------------
  // EDIT BELOW THIS LINE
  // --------------------------------------------------------------------------

  // This is the icon syntax
  // You can remove or edit it depending on your setup
  icons = ['', ' \\i0 ', ' \\i1 ', ' \\i2 '];

  // This function will be passed a line of text
  // and is expected to return a formatted string for the Bar
  // See: https://github.com/LemonBoy/bar#text-formatting
  read = function(line) {

    // This code will change a lot for each setup
    // Personally I prefix contents with a single letter
    // to identify what it is

    // I then remove that first letter and use a switch statement
    // for each case

    // For example, the time is prefixed with an S
    //   S12:54 am - 10th Dec
    // Is converted into
    //   \\r\\b0 12:54 am \\b2\\b3 10th Dec \\fr\\br

    var id, text, workspaces, len, i, workspace, icon;

    id = line[0];
    line = line.slice(1).replace('\n', '');

    switch (id) {

      // clock
      case 'S':
        line = line.split('-');
        return '\\r\\b0 ' + line[0] + ' \\b2\\f3 ' + line[1] + ' \\fr\\br';

      // workspaces
      case 'W':
        text = '\\c';
        workspaces = line.split(':');
        len = workspaces.length;

        for (i = 0; i < len; i++) {
          workspace = workspaces[i];
          icon = icons[workspace[1]];

          // inactive workspace
          if (workspace[0] === 'd') text += '\\b0' + icon + '\\ir';

          // active workspace
          // workspace[0] === 'a'
          else text += '\\b2\\u4\\f3' + icon + '\\ur\\fr\\br\\ir';
        }

        return text;

      // current window
      case 'T':
        return '\\l ' + line;
    }
  };

}).call(this);
