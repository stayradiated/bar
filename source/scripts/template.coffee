# Template generator
# Does the backgrounds/foregrounds/underlines

config = require './config'
themes = require './themes'

# Create a template from the theme
createTemplate = (theme) ->
  theme = theme.join ''
  return (obj) ->
    html = theme
    for name, value of obj
      regex = new RegExp "\\{\\{\\s*#{ name }\\s*\\}\\}", 'gi'
      html = html.replace regex, value
    return html

class Template

  constructor: ->
    theme = themes[themes.theme]
    @template = createTemplate theme

  compile: (block) =>

    classname = []

    if block.background > -1
      classname.push 'bg'
      classname.push 'bg-' + block.background

    if block.foreground > -1
      classname.push 'fg'
      classname.push 'fg-' + block.foreground

    if block.underline  > -1
      classname.push 'ul'
      classname.push 'ul-' + block.underline

    if block.icon > -1
      classname.push 'ic'
      classname.push 'ic-' + block.icon

    @template
      text: block.text
      classname: classname.join ' '

module.exports = Template
