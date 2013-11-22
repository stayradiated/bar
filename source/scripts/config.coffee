
config =

  height: 22 # height of OSX panel
  position: 'top' # or 'bottom'

  # Unix socket path
  # WARNING: Will be deleted if it already exists
  socket: '/tmp/bar.sock'

  # Script to run when we start the app
  script: './init_bar_script'

module.exports = config
