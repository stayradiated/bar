(function () {
  'use strict';

  var root, config;

  /*
   * Bar Configuration
   * This could be just a JSON file but I thought it would be better to use
   * JS just for the sake of having comments.
   */

  root = '/Volumes/Home/Projects/Bar/bin/';

  config = {

    // Height of the panel in pixels
    height: 22,

    // Positon on screen. 'top' or 'bottom'
    position: 'top',

    // Location of the unix socket path
    // Will delete it if it already exists
    socket: '/tmp/bar.sock',

    // Optional: script file to run on startup
    // Will be killed when the Bar is closed
    script: root + 'init_bar_script.sh',

    // Where to run the script from
    cwd: root

  };

  module.exports = config;

}());
