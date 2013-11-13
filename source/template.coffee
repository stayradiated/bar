# Template generator
# Does the backgrounds/foregrounds/underlines

# **input**
#
# block = {
#   background: 0,
#   foreground: 1,
#   underline: 3,
#   text: 'text'
# }
#
# **output**
#
# <span class="bg-0 fg-1 ul-3">
#   text
# </span>

config = require './config'

template = (block) ->

  html = """<span class="#{
    if block.background? then 'bg-' + block.background + ' ' else ''
  }#{
    if block.foreground? then 'fg-' + block.foreground + ' ' else ''
  }#{
    if block.underline?  then 'ul-' + block.underline  + ' ' else ''
  }">#{
    block.text
  }</span>"""

  return html


module.exports = template
