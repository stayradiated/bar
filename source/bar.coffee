gui = require 'nw.gui'
win = gui.Window.get()

config = require './config'

window.bar =
  init: ->

    # Set size and position
    win.resizeTo window.screen.width, config.height
    win.moveTo(0, 0)

    # Set font
    document.body.style.font = config.font

# debugging
document.addEventListener 'keydown', (event) ->

  switch event.keyCode

    when 82 # r
      if event.ctrlKey
        win.reloadDev()

    when 68 # d
      if event.ctrlKey
        win.showDevTools()

    when 81 # q
      if event.ctrlKey
        win.close()
