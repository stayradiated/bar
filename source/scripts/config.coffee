
config =

  height: 22 # height of OSX panel
  position: 'top' # or 'bottom'

  # Unix socket path
  # WARNING: Will be deleted if it already exists
  socket: '/tmp/bar.sock'

  # Script to run when we start the app

  # WARNING: If you are using my script, then make sure to edit it first
  # It will likely crash the app because it uses some tools that you
  # probably don't have installed.
  
  # script: '~/Projects/Bar/init_bar_script'

module.exports = config
