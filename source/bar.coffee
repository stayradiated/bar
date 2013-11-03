gui = app = win = doc = null

parse  = require './parse'
config = require './config'
socket = require './socket'

bar =
  init: ->

    # Set size and position
    app.resizeTo win.screen.width, config.height

    if config.position is 'bottom'
      app.moveTo 0, win.screen.height - config.height
    else
      app.moveTo 0, 0

    # Set font
    doc.body.style.font = config.font

    # Cache DOM elements
    el =
      left: doc.querySelector '.left'
      center: doc.querySelector '.center'
      right: doc.querySelector '.right'

    # Listen on socket
    server = socket (buffer) ->
      info = parse buffer
      reset = {}

      console.log info

      for block in info
        if not reset[block.position]?
          el[block.position].innerHTML = ''
          reset[block.position] = yes
        el[block.position].innerHTML += block.text

    # debugging
    doc.addEventListener 'keydown', (event) ->

      switch event.keyCode

        when 82 # r
          if event.ctrlKey
            app.reloadDev()

        when 68 # d
          if event.ctrlKey
            app.showDevTools()

        when 81 # q
          if event.ctrlKey
            server.close()
            app.close()

module.exports = (_gui, _app, _win) ->
  gui = _gui
  app = _app
  win = _win
  doc = win.document
  return bar