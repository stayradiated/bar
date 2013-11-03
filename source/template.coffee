# Template generator
# Does the backgrounds/foregrounds/underlines

# **input**
#
# {
#   background: #333,
#   foreground: #555,
#   underline: #123
# }
#
# **output**
#
# <span style="background-color: #333, color: #555, border-bottom-color: #123">
#   text
# </span>

config = require './config'

template = (block) ->

  if block.foreground?
    fg = config.colors[block.foreground]

  if block.background?
    bg = config.colors[block.background]

  if block.underline?
    border = config.colors[block.underline]

  html = """<span style="#{
    if bg? then 'background-color: ' + bg + '; ' else ''
  }#{
    if fg? then 'color: ' + fg + '; ' else ''
  }#{
    if border? then 'border-bottom-color: ' + border + '; ' else ''
  }"">#{ block.text }</span>"""

  return html


module.exports = template
