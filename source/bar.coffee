gui = app = win = doc = null

parse    = require './parse'
config   = require './config'
socket   = require './socket'
template = require './template'
{exec}   = require 'child_process'

bar =

  snap: ->

    # Set size
    app.resizeTo win.screen.width, config.height

    # Set position
    if config.position is 'bottom'
      app.moveTo 0, win.screen.height - config.height
    else
      app.moveTo 0, 0

  reloadStyles: ->

    for el in doc.querySelectorAll('link')
      el.href = el.href.split('?')[0] + '?' + Date.now()

  startScript: ->
    if config.script?
      exec config.script

  init: ->

    bar.snap()

    # Cache DOM elements
    el =
      left:   doc.querySelector '.left'
      center: doc.querySelector '.center'
      right:  doc.querySelector '.right'

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

    # Be sure to close the socket
    app.on 'close', ->
      server.close()
      @close(true)

    # Start the script
    bar.startScript()

    # Debugging
    doc.addEventListener 'keydown', (event) ->

      switch event.keyCode

        when 68 # d
          if event.ctrlKey
            app.showDevTools()

        when 82 # r
          bar.reloadStyles()

        when 83 # s
          bar.snap()

module.exports = (_gui, _app, _win, _doc) ->
  gui = _gui
  app = _app
  win = _win
  doc = _doc
  return bar
