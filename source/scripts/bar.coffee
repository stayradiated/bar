gui = app = win = doc = null

parse    = require './parse'
config   = require './config'
socket   = require './socket'
Template = require './template'
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
      return exec config.script, (err, dout, derr) ->
        console.log arguments

  init: ->

    bar.snap()

    # Cache DOM elements
    el =
      left:   doc.querySelector '.left'
      center: doc.querySelector '.center'
      right:  doc.querySelector '.right'

    # Create template
    template = new Template()

    # Listen on socket
    server = socket (buffer) ->
      info = parse buffer
      html = {}

      # Generate html
      for block in info
        html[block.position] ?= ''
        html[block.position] += template.compile block

      # Insert into DOM
      for position, content of html
        el[position].innerHTML = content

    # Start the script
    script = bar.startScript()

    # Be sure to close the socket
    app.on 'close', ->
      script.kill()
      server.close()
      @close(true)

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
