gui = require 'nw.gui'
app = gui.Window.get()
bar = require('./bar')(gui, app, window, document)

document.addEventListener 'DOMContentLoaded', -> bar.init()
