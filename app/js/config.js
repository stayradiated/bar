(function () {
  'use strict';

  /*
   * Bar Configuration
   * This could be just a JSON file but I thought it would be better to use
   * JS just for the sake of having comments.
   */

  var config = {

    // Height of the panel in pixels
    height: 22,

    // Positon on screen. 'top' or 'bottom'
    position: 'top',

    // Location of the unix socket path
    // Will delete it if it already exists
    socket: '/tmp/bar.sock',

    // Optional: script file to run on startup
    // Will be killed when the Bar is closed
    // script: '~/Projects/Bar/init_bar_script'

  };

  module.exports = config;

}());
