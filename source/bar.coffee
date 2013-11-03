gui = app = win = doc = null

parse    = require './parse'
config   = require './config'
socket   = require './socket'
template = require './template'

bar =
  init: ->

    # Set size
    app.resizeTo win.screen.width, config.height

    # Set position
    if config.position is 'bottom'
      app.moveTo 0, win.screen.height - config.height
    else
      app.moveTo 0, 0

    # Cache DOM elements
    el =
      left: doc.querySelector '.left'
      center: doc.querySelector '.center'
      right: doc.querySelector '.right'

    # Listen on socket
    server = socket (buffer) ->
      info = parse buffer
      html = {}

      # Generate html
      for block in info
        html[block.position] ?= ''
        html[block.position] += template(block)

      # Insert into DOM
      for position, content of html
        el[position].innerHTML = content

    # Debugging
    doc.addEventListener 'keydown', (event) ->

      switch event.keyCode

        when 68 # d
          if event.ctrlKey
            app.showDevTools()

module.exports = (_gui, _app, _win) ->
  gui = _gui
  app = _app
  win = _win
  doc = win.document
  return bar