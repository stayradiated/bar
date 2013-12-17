(function () {

  'use strict';

  var config, fs, net, path;

  fs     = require('fs');
  net    = require('net');
  config = require('./config');
  path   = config.socket;

  if (! path) console.error('config.socket is not defined!');

  module.exports = function (fn) {

    var server = net.createServer(function (socket) {
      socket.on('data', fn);
    });

    fs.exists(path, function (exists) {
      if (exists) fs.unlink(path);
      server.listen(path);
    });

    return server;
  };

}());
